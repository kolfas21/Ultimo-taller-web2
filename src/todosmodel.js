const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../db/sequelize');

const Todo = sequelize.define(
    'todos',
    {
        id: {
            type: DataTypes.INTEGER,            
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false, // Permitir valores NULL en title
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);

Todo.sync({ alter: true });

module.exports = Todo;
