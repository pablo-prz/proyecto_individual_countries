const { DataTypes } = require("sequelize");

module.exports = (Sequelize) => {
    Sequelize.define('Activity', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
              min: 1,
              max: 5,
            },
          },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        season: {
            type: DataTypes.ENUM("Spring", "Summer", "Autumn", "Winter"),
            allowNull: false,
        }
    },
        { timestamps: false });
}