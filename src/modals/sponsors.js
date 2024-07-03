'use strict';
module.exports = (sequelize, DataTypes) => {
    const sponsors = sequelize.define('sponsors', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        logo: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        link: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        header: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        titlesponsor: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        category: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(400),
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
        tableName: 'sponsors'
    });
    return sponsors;
};