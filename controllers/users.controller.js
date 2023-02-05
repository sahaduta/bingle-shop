const { User } = require("../database/models");
const Response = require("../helpers/response.helper");
const ErrorResponse = require("../helpers/error.helper");
const { validate } = require("../middlewares/validation.middleware");
const { registerSchema } = require("../validations/schemas/register.schema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UsersController {
    async register(req, res, next) {
        try {
            // validasi penulisan input
            const {email, password, name, address, phone} = req.body
            await validate(registerSchema, req.body);

            // cek apakah email sudah terdaftar
            const isUserExist = await User.findOne({
                where: {
                    email
                },
                attributes: ['id']
            });

            if (isUserExist) {
                throw new ErrorResponse(400, "Email sudah terdaftar");
            }

            // hash password
            const hashPassword = await bcrypt.hash(password, 10);

            // input data user ke table users
            const user = await User.create({
                email,
                password: hashPassword,
                fullname: name,
                address,
                phone
            });

            return new Response(res, 201, {
                email: user.email,
                fullname: user.fullname
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            console.log('hi');

            // cek apakah email terdaftar
            const user = await User.findOne({
                where: {
                    email
                },
                attributes: ['email', 'password', 'id']
            });

            if (!user) {
                throw new ErrorResponse(400, 'Email tidak ditemukan!');
            }

            // verifikasi password
            const isPasswordSame = await bcrypt.compare(password, user.password);

            if (!isPasswordSame) {
                throw new ErrorResponse(400, 'Password Salah!')
            }

            const jwtPayLoad = {
                user_id: user.id
            };
            const accessToken = jwt.sign(jwtPayLoad, process.env.JWT_KEY, {expiresIn: '30 days'});

            return new Response(res, 201, {
                accessToken
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    UsersController
};