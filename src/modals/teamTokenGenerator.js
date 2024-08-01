'use strict';
module.exports = (sequelize, DataTypes) => {
    const teamTokenGenerator = sequelize.define('teamTokenGenerator', {
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
            type: DataTypes.STRING(20), 
            allowNull: false
        },
        token: {
            type: DataTypes.STRING(300),
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'teamTokenGenerator'
    });

    return teamTokenGenerator;
};