module.exports = (sequelize, DataTypes) => {
    return sequelize.define('rating', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      movie_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      comment: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
    });
  };