const express = require('express');

const app = express();

const verification = require('./middlewares/verification.middleware');

const itemRouter = require('./routers/items.router');
const userRouter = require('./routers/users.router');
const orderRouter = require('./routers/orders.router');

app.use(express.json());

app.use('/v1', userRouter);

app.use(verification);

app.use('/v1', itemRouter);

app.use('/v1', orderRouter);

app.use((err, req, res, next) => {
    return res.status(err.status).json({
        status: false,
        data: {},
        error: err.error
    })
})

module.exports = app;