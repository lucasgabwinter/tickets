const Sequelize = require('sequelize');
const sequelize = new Sequelize('cch1', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
  });

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Usuario = require('../models/usuario.js')(sequelize, Sequelize);
db.Ticket = require('../models/ticket.js')(sequelize, Sequelize);
db.Categoria = require('../models/categoria.js')(sequelize, Sequelize);
db.Categoria.hasMany(db.Ticket, {foreignKey:'categoriaId', onDelete: 'NO ACTION'});
db.Usuario.hasMany(db.Ticket, {foreignKey:'tecnicoId', onDelete: 'NO ACTION'});
module.exports = db;

