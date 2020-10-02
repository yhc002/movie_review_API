'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);  

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Movie = require('./movie')(sequelize, Sequelize);
db.Rating = require('./rating')(sequelize, Sequelize);

db.Rating.belongsTo(db.User, {foreignKey: 'user_id', sourceKey: 'id'});
db.Rating.belongsTo(db.Movie, {foreignKey: 'movie_id', sourceKey: 'id'});


module.exports = db;
