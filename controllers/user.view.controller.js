const {
  user_game,
  user_game_biodata,
  user_game_history,
} = require("../models");

module.exports = {
  index: (req, res) => {
    user_game
      .findAll({
        include: [
          {
            model: user_game_biodata,
            as: "user_game_biodata",
          },
        ],
      })
      .then((result) => {
        res.render("userGame/index", { result });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
          data: err,
        });
      });
  },
  show: (req, res) => {
    user_game
      .findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: user_game_biodata,
            as: "user_game_biodata",
          },
          {
            model: user_game_history,
            as: "user_game_history",
          },
        ],
      })
      .then((result) => {
        res.render("userGame/user_detail", { result });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
          data: err,
        });
      });
  },
  new: (req, res) => {
    res.render("userGame/new");
  },

  edit: (req, res) => {
    user_game
      .findByPk(req.params.id, {
        include: [
          {
            model: user_game_biodata,
            as: "user_game_biodata",
          },
        ],
      })
      .then((result) => {
        res.render("userGame/edit", { result });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
          data: err,
        });
      });
  },
};
