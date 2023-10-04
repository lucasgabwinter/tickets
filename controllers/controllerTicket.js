const db = require('../config/db_sequelize');
const path = require('path');

module.exports = {
    async getCreate(req, res) {
        var categorias = await db.Categoria.findAll();
        var usuarios = await db.Usuario.findAll();
        res.render('ticket/ticketCreate', {
            usuarios: usuarios.map(usuario => usuario.toJSON()),
            categorias: categorias.map(categoria => categoria.toJSON()),
        });
    },

    async postCreate(req, res) {
        db.Ticket.create(req.body).then(() => {
            res.redirect('/home');
        }).catch((err) => {
            console.log(err);
        });
    },

    async getList(req, res) {
        db.Ticket.findAll().then(tickets => {
            res.render('ticket/ticketList', { tickets: tickets.map(tick => tick.toJSON()) });
        }).catch((err) => {
            console.log(err);
        });
    },

    async getUpdate(req, res) {
        await db.Ticket.findByPk(req.params.id).then(
            ticket => res.render('ticket/ticketUpdate', { ticket: ticket.dataValues })
        ).catch(function (err) {
            console.log(err);
        });
    },

    async postUpdate(req, res) {
        await db.Ticket.update(req.body, { where: { id: req.body.id } }).then(
            res.render('home')
        ).catch(function (err) {
            console.log(err);
        });
    },

    async getDelete(req, res) {
        await db.Ticket.destroy({ where: { id: req.params.id } }).then(
            res.redirect('/home')
        ).catch(err => {
            console.log(err);
        });
    }
}    