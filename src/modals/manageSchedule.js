'use strict';
module.exports = (sequelize, DataTypes) => {
    const manageSchedule = sequelize.define('manageSchedule', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        schedulename: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        scheduledate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        scheduletime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        details: {
            type: DataTypes.STRING(250),
            allowNull: true
        },
        recurrencepattern: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: true,
        tableName: 'manageSchedule'
    });
    return manageSchedule;
};