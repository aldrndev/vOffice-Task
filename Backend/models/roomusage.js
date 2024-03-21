"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoomUsage.belongsTo(models.Client);
      RoomUsage.belongsTo(models.RoomType);
    }
  }
  RoomUsage.init(
    {
      ClientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      RoomTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      bookingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      quotaUsed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          min: {
            args: [1],
            msg: "Must be greater or equal to 1",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "RoomUsage",
    }
  );
  return RoomUsage;
};
