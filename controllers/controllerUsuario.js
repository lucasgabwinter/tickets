const db = require('../config/db_sequelize');
const path = require('path');

module.exports = {
    async getLogin(req, res) {
        res.render('usuario/login', { layout: 'noMenu.handlebars' });
    },
    async getLogout(req, res) {
        req.session.destroy();
        res.redirect('/');
    },
    async postLogin(req, res) {
        var user = {
            login: req.body.login
        }
        db.Usuario.findAll({ where: { login: req.body.login, senha: req.body.senha } }
        ).then(usuarios => {
            if (usuarios.length > 0) {
                req.session.login = req.body.login;
                res.locals.login = req.body.login;
                if (usuarios[0].dataValues.tipo == "3") {
                    req.session.tipo = usuarios[0].dataValues.tipo;
                    res.locals.admin = true;
                }
                if (usuarios[0].dataValues.tipo == "2") {
                    req.session.tipo = usuarios[0].dataValues.tipo;
                    res.locals.tecnico = true;
                }
                if (usuarios[0].dataValues.tipo != "2" &&
                    usuarios[0].dataValues.tipo != "3") {
                    req.session.tipo = usuarios[0].dataValues.tipo;
                    res.locals.comum = true;
                }
                res.render('home');
            } else
                res.redirect('/');
        }).catch((err) => {
            console.log(err);
        });
    },
    /* async postLogin(req, res) {
        var user = {
            login: req.body.login
        }
        db.Usuario.findAll({ where: { login: req.body.login, senha: req.body.senha } }
        ).then(usuarios => {
            if (usuarios.length > 0) {
                req.session.login = req.body.login;
                res.locals.login = req.body.login;
                if (usuarios[0].dataValues.tipo == 3) {
                    req.session.tipo = usuarios[0].dataValues.tipo;
                    res.locals.admin = true;
                }
                if (usuarios[0].dataValues.tipo == 2) {
                    req.session.tipo = usuarios[0].dataValues.tipo;
                    res.locals.tecnico = true;
                }
                if (usuarios[0].dataValues.tipo != 2 &&
                    usuarios[0].dataValues.tipo != 3) {
                    req.session.tipo = usuarios[0].dataValues.tipo;
                    res.locals.comum = true;
                }
                res.render('home');
            } else
                res.redirect('/');
        }).catch((err) => {
            console.log(err);
        });
    }, */

    async getCreate(req, res) {
        res.render('usuario/usuarioCreate');
    },

    async postCreate(req, res) {
        db.Usuario.create({
            login: req.body.login,
            senha: req.body.senha,
            tipo: req.body.tipo
        }).then(() => {
            res.redirect('/home');
        }).catch((err) => {
            console.log(err);
        });
    },

    async getList(req, res) {
        db.Usuario.findAll().then(usuarios => {
            res.render('usuario/usuarioList', { usuarios: usuarios.map(user => user.toJSON()) });
        }).catch((err) => {
            console.log(err);
        });
    }
}   










/* async function renderPage(req, res) {
    try {
        const tecnicos = await db.Usuario.findAll({ where: { tipo: "2" } });
        res.render('sua_pagina', { usuarios: tecnicos });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
}
 */