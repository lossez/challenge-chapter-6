'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game extends Model {

    static associate(models) {
     this.hasOne(models.user_game_biodata, {
        foreignKey: 'user_id',
        as: 'user_game_biodata'
     })
     this.hasMany(models.user_game_history, {
        foreignKey: 'user_id',
        as: 'user_game_history'
     })
    }
  }
  user_game.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_game',
    underscored: true,
  });
  return user_game;
};