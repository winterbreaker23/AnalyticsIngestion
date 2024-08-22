const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Analytics = sequelize.define("analytics", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    eventType: DataTypes.STRING,
    user: DataTypes.INTEGER,
    date: DataTypes.DATE
}, {timestamps: false});

module.exports = Analytics;
