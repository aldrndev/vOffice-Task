const { Client } = require("../models");
const { checkPassword } = require("../utils/bcrypt");
const { createToken } = require("../utils/jwt");

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new Error("email_password_required"));
      }

      const checkUser = await Client.findOne({
        where: {
          email,
        },
      });

      if (!checkUser) {
        return next(new Error("email_not_found"));
      }

      if (!checkPassword(password, checkUser.password)) {
        return next(new Error("password_not_match"));
      }

      const payload = {
        id: checkUser.id,
        name: checkUser.name,
        email: checkUser.email,
      };

      const token = createToken(payload);
      res.status(200).json({
        message: `Welcome back ${checkUser.name}`,
        access_token: token,
        data: {
          name: checkUser.name,
          email: checkUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { name, email, password, phone } = req.body;

      const createClient = await Client.create({
        name,
        email,
        password,
        phone,
      });

      res.status(201).json({
        message: `Welcome ${createClient.name}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
