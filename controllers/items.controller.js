const ErrorResponse = require("../helpers/error.helper");
const Response = require("../helpers/response.helper");
const { Product } = require('../database/models');

class ItemsController {
    async getItems(req, res, next){
        const {page='1', limit='3'} = req.query;

        const pageInt = Number(page);
        const limitInt = Number(limit);
        const offset = (pageInt - 1) * limitInt
        const data = await Product.findAll({
            attributes: ['id', 'name', 'price', 'stock', 'sku'],
            limit: limitInt,
            offset: offset,
            // raw : true
        });
        
        return new Response(res, 200, data);
    };
    
    async insertItem(req, res, next){
        try {
            const data = {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                sku: req.body.sku,
                user_id: req.body.user_id
            };
            const result = await Product.create(data);
        
            return new Response(res, 201, result);
        } catch (error) {
            next(error);
        }
    };

    async deleteItem(req, res, next){
        try {
            const result = await Product.destroy({ where: { id: req.body.id } });
            if (result == 0) {
                throw new ErrorResponse(401, `id ${req.body.id} tidak ditemukan`);
            }
        
            return new Response(res, 201, `id ${req.body.id} berhasil dihapus`);
        } catch (error) {
            next(error);
        }
    };

}


module.exports = {
    ItemsController
};