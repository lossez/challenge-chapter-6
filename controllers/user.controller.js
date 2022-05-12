const {
  user_game,
  user_game_biodata,
  user_game_history,
} = require("../models");

const getAllUser = async (req, res) => {
  user_game
    .findAll({
      attributes: ["id", "username"],
      include: [
        {
          model: user_game_biodata,
          as: "user_game_biodata",
          attributes: ["user_id", "first_name", "last_name", "email", "umur"],
        },
      ],
    })
    .then((result) => {
      if (result.length < 1) {
        return res.status(404).json({
          message: "data not found",
        });
      }
      res.status(200).json({
        message: "Success get all user",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error",
        data: err,
      });
    });
};

const getUserById = async (req, res) => {
  user_game
    .findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "username"],
      include: [
        {
          model: user_game_biodata,
          as: "user_game_biodata",
          attributes: ["user_id", "first_name", "last_name", "email", "umur"],
        },
        {
          model: user_game_history,
          as: "user_game_history",
          attributes: ["user_id", "score", "createdAt", "updatedAt"],
        },
      ],
    })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "user id not found",
          data: result,
        });
      }
      res.status(200).json({
        message: "Success get user by id",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        data: err,
      });
    });
};

const createUser = async (req, res) => {
  user_game
    .create({
      username: req.body.username,
      password: req.body.password,
    })
    .then((result) => {
      return user_game_biodata
        .create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          umur: req.body.umur,
          email: req.body.email,
          gender: req.body.gender,
          user_id: result.id,
        })
        .then((result) => {
          res.status(201).json({
            message: "user sucessfully created",
            data: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
            data: null,
            error: err.errors,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        data: null,
        error: err.errors,
      });
    });
};

const updateUser = async (req, res) => {
  user_game
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "user id not found",
        });
      }
      result.update(req.body).then((result) => {
        return user_game_biodata
          .update(req.body, {
            where: {
              user_id: req.params.id,
            },
          })
          .then((result) => {
            res.status(200).json({
              message: "sucessfully update user",
              // data: result,
            });
          });
      });
    })

    .catch((err) => {
      res.status(500).json({
        message: err.message,
        data: null,
        error: err.errors,
      });
    });
};

const deleteUser = async (req, res) => {
  user_game
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "user id not found",
        });
      }
      res.status(200).json({
        message: "successful operation",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        data: null,
        error: err.errors,
      });
    });
};

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
