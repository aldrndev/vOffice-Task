const { Op } = require("sequelize");
const { RoomType, Room, RoomUsage, Client, sequelize } = require("../models");

class ClientController {
  static async getRoomType(req, res, next) {
    try {
      let filterRoom = req.query.filter
        ? {
            RoomId: {
              [Op.in]: req.query.filter.split(",").map(Number),
            },
          }
        : {};
      let searchRoom = req.query.search
        ? { roomName: { [Op.iLike]: `%${req.query.search}%` } }
        : {};
      let sortRoom = [];

      if (req.query.sort === "highest") {
        sortRoom = [["costPerHour", "DESC"]];
      } else if (req.query.sort === "lowest") {
        sortRoom = [["costPerHour", "ASC"]];
      }

      const limit = 6;
      const page = req.query.page ? Number(req.query.page) : 1;
      const offset = (page - 1) * limit;

      const { count, rows } = await RoomType.findAndCountAll({
        where: {
          ...searchRoom,
          ...filterRoom,
        },
        include: {
          model: Room,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        order: sortRoom,
        limit,
        offset,
      });

      if (count === 0) {
        return res.status(200).json({
          message: "No Room Type Found",
        });
      }

      res.status(200).json({
        message: "Success get Room Type from database",
        data: rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / limit),
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getRoom(req, res, next) {
    try {
      const getRoomData = await Room.findAll();

      if (getRoomData.length === 0) {
        return res.status(200).json({
          message: "No Room Found",
        });
      }

      res.status(200).json({
        message: "Success get Room from database",
        data: getRoomData,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async bookRoom(req, res, next) {
    const trx = await sequelize.transaction();
    try {
      const { id: clientId } = req.user;
      const { id } = req.params;
      const { bookingDate, startTime, endTime, quotaUsed } = req.body;

      const checkRoomType = await RoomType.findByPk(id);

      if (!checkRoomType) {
        return next(new Error("room_type_not_found"));
      }

      const checkClient = await Client.findByPk(clientId);

      if (!checkClient) {
        return next(new Error("client_not_found"));
      }

      if (checkRoomType.capacity < quotaUsed) {
        return next(new Error("not_available"));
      }

      const currentDateTime = new Date();
      const bookingDateTime = new Date(bookingDate);
      const startDateTime = new Date(`${bookingDate}T${startTime}`);
      const endDateTime = new Date(`${bookingDate}T${endTime}`);

      if (bookingDateTime < currentDateTime) {
        return next(new Error("invalid_date"));
      }

      if (startDateTime < currentDateTime || endDateTime < currentDateTime) {
        return next(new Error("invalid_time"));
      }

      const timeDifferenceInMinutes = (endDateTime - startDateTime) / 1000 / 60;
      if (timeDifferenceInMinutes < 60) {
        return next(new Error("min_time_60"));
      }

      const totalHour = timeDifferenceInMinutes / 60;
      const totalCost = totalHour * checkRoomType.costPerHour * quotaUsed;

      if (checkClient.credit < totalCost) {
        return next(new Error("client_credit_not_enough"));
      }

      const createBookRoom = await RoomUsage.create(
        {
          ClientId: clientId,
          RoomTypeId: id,
          bookingDate,
          startTime,
          endTime,
          quotaUsed,
        },
        { transaction: trx }
      );

      await checkClient.update(
        { credit: checkClient.credit - totalCost },
        { transaction: trx }
      );

      await checkRoomType.update(
        { capacity: checkRoomType.capacity - quotaUsed },
        { transaction: trx }
      );

      await trx.commit();

      res.status(201).json({
        message: `Sucess Book Room ${checkRoomType.roomName} for ${checkClient.name} on ${createBookRoom.bookingDate}, ${createBookRoom.startTime} - ${createBookRoom.endTime}!! Your remaining credit is ${checkClient.credit}`,
        data: createBookRoom,
      });
    } catch (error) {
      console.log(error);
      await trx.rollback();
      next(error);
    }
  }
  static async fetchMyBooking(req, res, next) {
    try {
      const { id } = req.user;

      const getMyBooking = await RoomUsage.findAll({
        where: {
          ClientId: id,
        },
        include: [
          {
            model: RoomType,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });

      if (getMyBooking.length === 0) {
        return res.status(200).json({
          message: "No Booking Found",
        });
      }

      res.status(200).json({
        message: "Success get my booking",
        data: getMyBooking,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ClientController;
