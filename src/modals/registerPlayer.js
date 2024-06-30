'use strict';
module.exports = (sequelize, DataTypes) => {
    const registerPlayer = sequelize.define('registerPlayer', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        mobile: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        jerseynumber: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        agegroup: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        position: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING(300),
        },
        code: {
            type: DataTypes.STRING(50),
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        comments: {
            type: DataTypes.STRING(150),
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
        tableName: 'registerPlayer'
    });
    return registerPlayer;
};