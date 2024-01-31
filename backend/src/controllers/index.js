const UserModel = require("../models/users");
const createError = require("http-errors");
const sendEmail = require("../utils/sendMail");
const {
  validateUserInput,
  validateAdminInput,
  validateQueryInput,
} = require("../utils/validateInput");
const moment = require("moment");

exports.create = async (req, res, next) => {
  const { name, email, instagram } = req.body;
  try {
    // Validate user Input
    validateUserInput(req.body);
    // Check if user already exist
    const user = await UserModel.findOneByEmail(email);
    if (user) throw createError(409, "Email already in use");
    // Create user in Database
    const response = await UserModel.create(name, email, instagram);
    // Send Success Email After user added to Database
    if (response) {
      const mail = await sendEmail(name, email);
      if (mail) {
        res.status(200).send("Email sent successfully");
      } else {
        res.status(500).send("Failed to send email");
      }
    } else {
      throw createError(404, "Failed");
    }
  } catch (err) {
    next(err);
  }
};

exports.createAdmin = async (req, res, next) => {
  const { name, email, is_admin } = req.body;
  try {
    // Validate user Input
    validateAdminInput(req.body);
    // Check if user already exist
    const user = await UserModel.findOneByEmail(email);
    if (user) throw createError(409, "Email already in use");
    // Create user in Database
    const response = await UserModel.createAdmin(name, email, is_admin);
    res.send(response);
  } catch (err) {
    next(err);
  }
};

exports.read = async (req, res, next) => {
  const time = req.query.time;
  if (time) {
    try {
      validateQueryInput(time);
      const since = moment().subtract(time, "hours").toISOString();
      const users = await UserModel.findManyByDay(since);
      res.status(200).send(users);
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const users = await UserModel.findMany();
      res.status(200).send(users);
    } catch (err) {
      next(err);
    }
  }
};
