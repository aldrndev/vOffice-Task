const express = require("express");
const ClientController = require("../../controllers/clientController");
const { authenticate } = require("../../middlewares/auth");

const router = express.Router();

router.get("/room", ClientController.getRoom);
router.get("/roomtype", ClientController.getRoomType);

router.use(authenticate);
router.get("/booking", ClientController.fetchMyBooking);
router.post("/room/:id", ClientController.bookRoom);

module.exports = router;
