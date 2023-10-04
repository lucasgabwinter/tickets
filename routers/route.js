const express = require('express');
const db = require('../config/db_sequelize');
const controllerUsuario = require('../controllers/controllerUsuario');
const controllerCategoria = require('../controllers/controllerCategoria');
const controllerTicket = require('../controllers/controllerTicket');
const route = express.Router();
db.sequelize.sync({ force: true }).then(() => {
    console.log('{ force: true }');
    db.Usuario.create({ login: 'admin', senha: '1234', tipo: 3 });
    db.Usuario.create({ login: 'tecnico', senha: '1234', tipo: 2 });
    db.Usuario.create({ login: 'lucas', senha: '1234', tipo: 1 });
});


module.exports = route;

//Home
route.get("/home", function (req, res) {
    if (req.session.login) {
        res.render('home')
    }
    else
        res.redirect('/');
});

//Controller Usuario
route.get("/", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);
route.get("/logout", controllerUsuario.getLogout);
route.get("/usuarioCreate", controllerUsuario.getCreate);
route.post("/usuarioCreate", controllerUsuario.postCreate);
route.get("/usuarioList", controllerUsuario.getList);

//Controller Categoria
route.get("/categoriaCreate", controllerCategoria.getCreate);
route.post("/categoriaCreate", controllerCategoria.postCreate);
route.get("/categoriaList", controllerCategoria.getList);
route.get("/categoriaUpdate/:id", controllerCategoria.getUpdate);
route.post("/categoriaUpdate", controllerCategoria.postUpdate);
route.get("/categoriaDelete/:id", controllerCategoria.getDelete);

//Controller Ticket
route.get("/ticketCreate", controllerTicket.getCreate);
route.post("/ticketCreate", controllerTicket.postCreate);
route.get("/ticketList", controllerTicket.getList);
route.get("/ticketUpdate", controllerTicket.getUpdate);
route.post("/ticketUpdate", controllerTicket.postUpdate);
route.get("/ticketDelete", controllerTicket.getDelete);