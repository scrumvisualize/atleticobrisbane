'use strict';
module.exports = (sequelize, DataTypes) => {
    const videoViews = sequelize.define('videoViews', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        videoname: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        views: {
            type: DataTypes.STRING(20), 
            allowNull: true
        }
    }, {
        timestamps: true,
        tableName: 'videoViews'
    });

    return videoViews;
};