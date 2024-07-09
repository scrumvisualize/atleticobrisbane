'use strict';
module.exports = (sequelize, DataTypes) => {
    const announcement = sequelize.define('announcement', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        announcementheading: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        urllink: {
            type: DataTypes.STRING(400),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(2000),
            allowNull: false
        },
        deleted: {
            type: DataTypes.STRING(20),
            allowNull: true
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
        tableName: 'announcement'
    });
    return announcement;
};