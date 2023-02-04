const { Model,DataTypes } = require("sequelize");
const sequelize = require('./sequelize');

class OrderItems extends Model {
    
}

OrderItems.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: true
      }
    },
    {
        sequelize: sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'order-items',
        deletedAt: 'deleted_at',
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    },
)

module.exports = OrderItems;