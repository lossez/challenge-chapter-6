const {
  user_game,
  user_game_biodata,
  user_game_history,
} = require("../models");

module.exports = {
  index: (req, res) => {
    user_game_history
      .findAll({
        include: [
          {
            model: user_game,
            as: "user_game",
            include: [
              {
                model: user_game_biodata,
                as: "user_game_biodata",
                attributes: ["first_name", "last_name"],
              },
            ],
          },
        ],
      })
      .then((result) => {
        res.render("history/index", { result });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
          data: err,
        });
      });
  },
  show: (req, res) => {
    user_game_history
      .findByPk(req.params.id, {
        include: [
          {
            model: user_game,
            as: "user_game",
            attributes: ["username"],
            include: [
              {
                model: user_game_biodata,
                as: "user_game_biodata",
                attributes: ["first_name", "last_name"],
              },
            ],
          },
        ],
      })
      .then((result) => {
        res.render("history/show", { result });
      });
  },
  new: (req, res) => {
    user_game
      .findAll({
        attributes: ["id"],
      })
      .then((result) => {
        res.render("history/new", { result });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
          data: err,
        });
      });
  },

  edit: (req, res) => {
    user_game_history
      .findByPk(req.params.id)
      .then((result) => {
        if (!result) {
          return res.redirect("/view/history");
        }
        res.render("history/edit", { result });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error",
          data: err,
        });
      });
  },
};
