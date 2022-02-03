// Create a wrapper for async functions that returns a promise with the result of the async function

const { messageGeneral } = require("./messages");
const {
  StatusCodes: { INTERNAL_SERVER_ERROR },
} = require("http-status-codes");

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next({
        message: messageGeneral(
          res,
          INTERNAL_SERVER_ERROR,
          false,
          null,
          error.message
        ),
      });
    }
  };
};

module.exports = asyncWrapper;
