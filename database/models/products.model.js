const { Model,DataTypes } = require("sequelize");
const sequelize = require('./sequelize');

class Product extends Model {
    
}

Product.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
          },
        name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        price: {
          type: DataTypes.DOUBLE,
          allowNull: true
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        sku: {
          type: DataTypes.STRING,
          allowNull: true
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true
        }
    },
    {
        sequelize: sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
        deletedAt: 'deleted_at',
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    },
)

module.exports = Product;