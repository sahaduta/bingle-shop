const { Model,DataTypes } = require("sequelize");
const sequelize = require('./sequelize');

class Orders extends Model {
    
}

Orders.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true
      },
      total: {
        type: DataTypes.DOUBLE,
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

module.exports = Orders;