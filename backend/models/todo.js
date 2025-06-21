const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user");

const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "todo",
  },
});

Todo.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Todo, { foreignKey: "user_id" });

module.exports = Todo;
