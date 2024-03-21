const errorHandler = (error, req, res, next) => {
  let message = "Internal Server Error";
  let statusCode = 500;

  if (error.message === "client_credit_not_enough") {
    message = "Insufficient credit";
    statusCode = 400;
  }

  if (error.message === "invalid_date") {
    message = "Date must greater or equal than today";
    statusCode = 400;
  }

  if (error.message === "invalid_time") {
    message =
      "Start Time must greater than now and End Time must greater than Start Time";
    statusCode = 400;
  }

  if (error.message === "min_time_60") {
    message = "Booking time must be at least 60 minutes";
    statusCode = 400;
  }

  if (error.message === "client_not_found") {
    message = "Client not found";
    statusCode = 404;
  }

  if (error.message === "room_type_not_found") {
    statusCode = 404;
    message = "Room type not found";
  }

  if (
    error.message === "email_not_found" ||
    error.message === "password_not_match"
  ) {
    statusCode = 401;
    message = "Invalid Email/Password";
  }

  if (error.message === "email_password_required") {
    message = "Please provide email and password";
    statusCode = 400;
  }

  if (error.name === "JsonWebTokenError" || error.message === "unathorized") {
    message = "Please login first to your account for booking room";
    statusCode = 401;
  }

  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeDatabaseError"
  ) {
    message = error.errors[0].message;
    statusCode = 400;
  }

  if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token Expired";
  }

  res.status(statusCode).json({
    message,
  });
};

module.exports = errorHandler;
