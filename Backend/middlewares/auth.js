const { checkToken } = require("../utils/jwt");
const { Client } = require("../models");

const authenticate = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      return next(new Error("unathorized"));
    }

    const verify = checkToken(access_token);

    const checkUser = await Client.findByPk(verify.id);

    if (!checkUser) {
      return next(new Error("unathorized"));
    }

    req.user = verify;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  authenticate,
};
