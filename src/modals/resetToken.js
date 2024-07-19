'use strict';
module.exports = (sequelize, DataTypes) => {
    const resetToken = sequelize.define('resetToken', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.STRING(300),
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'resetToken'
    });

    return resetToken;
};