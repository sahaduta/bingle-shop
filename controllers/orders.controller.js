const ErrorResponse = require("../helpers/error.helper");
const Response = require("../helpers/response.helper");
const { Order,Product,OrderItem } = require('../database/models');
const { where } = require("sequelize");

class OrdersController {
    async createOrder(req, res, next) {
        try {
            // hitung total harga
            let total = 0;
            const productPriceMapping = {}

            for(let item of req.body) {
                let price = await Product.findOne({
                    attributes: ['id', 'price','name'],
                    where: { id: item.product_id }
                })
                productPriceMapping[price.id] = price.price * item.qty;
                total += price.price * item.qty;
            }

            // data untuk tabel orders
            const dataOrder = {
                user_id: req.decodedJWT.user_id,
                status: "Waiting for Payment",
                total: total
            };

            // masukkan data ke tabel orders
            const result = await Order.create(dataOrder);


            // data untuk tabel order_items
            const dataOrderItems = []
            req.body.forEach(body => {
                dataOrderItems.push({
                order_id: result.id,
                product_id: body.product_id,
                qty: body.qty,
                price: productPriceMapping[body.product_id]
                })

                Product.decrement('stock', { by: body.qty, where: { id: body.product_id }});
            })
            console.log(dataOrderItems)

            // masukkan banyak baris ke tabel order_items
            await OrderItem.bulkCreate(dataOrderItems);

            if (!result) {
                throw new ErrorResponse(401, "Product ID tidak ditemukan!");
            }

            // data untuk response
            const response = {
                user_id : req.decodedJWT.user_id,
                id: result.id,
                total: total,
                status: "Waiting for Payment"
            }

            return new Response(res, 201, response);
        } catch (error) {
            next(error);
        }
    }

    async updateStatusOrder(req, res, next) {
        try {
            const cekOrderId = await Order.findOne(
                {
                    where: {id: req.body.id}
                }
            )

            const cekUserId = await Order.findOne(
                {
                    where: {user_id: req.decodedJWT.user_id}
                }
            )

            if (!cekOrderId && !cekUserId) {
                throw new ErrorResponse(400, `Order ID ${req.body.id} tidak ditemukan dan User ID ${req.decodedJWT.user_id} tidak memiliki order!`);
            }

            if (!cekOrderId) {
                throw new ErrorResponse(400, `Order ID ${req.body.id} tidak ditemukan!`);
            }

            if (!cekUserId) {
                throw new ErrorResponse(400, `User ID ${req.decodedJWT.user_id} tidak memiliki order!`);
            }

            const result = await Order.update(
                {
                    status: req.body.status
                },
                {
                    where: { id: req.body.id, user_id: req.decodedJWT.user_id }
                }
            );

            if (result == 0) {
                throw new ErrorResponse(400, 'Order ID dan User ID tidak sesuai!');
            }

            const response = {
                result: 'Status updated successfully',
                id: req.body.id,
                status: req.body.status
            }

            return new Response(res, 200, response);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    OrdersController
};