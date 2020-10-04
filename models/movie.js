module.exports = (sequelize, DataTypes) => {
  return sequelize.define('movie', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    director: {
      type: DataTypes.STRING(20),
    },
    release_global: {
      type: DataTypes.DATE,
    },
    release_kr: {
      type: DataTypes.DATE,
    },
  });
};