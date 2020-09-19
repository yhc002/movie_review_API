module.exports = (sequelize, DataTypes) => {
  return sequelize.define('movie', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  });
};