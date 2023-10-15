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
        //------------------------------------------------------------------- CORREÇÃO CHECKBOX
        req.body.concluido = false;
        //-------------------------------------------------------------------
        db.Ticket.create(req.body).then(() => {
            //res.redirect('/home');
            res.redirect('/ticketList');
        }).catch((err) => {
            console.log(err);
        });
    },
    /*
        async getList(req, res) {
            db.Ticket.findAll().then(tickets => {
                res.render('ticket/ticketList', { tickets: tickets.map(tick => tick.toJSON()) });
            }).catch((err) => {
                console.log(err);
            });
        },
        */

       async getList(req, res) {
           try {
               const categorias = await db.Categoria.findAll();
               const usuarios = await db.Usuario.findAll();
               const tickets = await db.Ticket.findAll();
               
               const ticketsComNomes = tickets.map(ticket => {
                   const tecnico = usuarios.find(usuario => usuario.id === ticket.tecnicoId);
                   const categoria = categorias.find(categoria => categoria.id === ticket.categoriaId);
                   
                return {
                    ...ticket.dataValues,
                    tecnicoNome: tecnico ? tecnico.nome : 'Técnico não encontrado',
                    categoriaNome: categoria ? categoria.nome : 'Categoria não encontrada',
                };
            });

            res.render('ticket/ticketList', {
                tickets: ticketsComNomes,
                usuarios: usuarios.map(usuario => usuario.toJSON()),
                categorias: categorias.map(categoria => categoria.toJSON()),
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('Erro ao obter tickets');
        }
    },



    async getUpdate(req, res) {
        var categorias = await db.Categoria.findAll();
        var usuarios = await db.Usuario.findAll();
        await db.Ticket.findByPk(req.params.id).then(
            ticket => res.render('ticket/ticketUpdate', {
                ticket: ticket.dataValues,
                usuarios: usuarios.map(usuario => usuario.toJSON()),
                categorias: categorias.map(categoria => categoria.toJSON())
            })
        ).catch(function (err) {
            console.log(err);
        });
    },

    async postUpdate(req, res) {
        //--------------------------------------------------------------- CORREÇÃO CHECKBOX
        const valorConcluido = req.body.concluido === 'true';
        req.body.concluido = valorConcluido;
        //---------------------------------------------------------------
        await db.Ticket.update(req.body, { where: { id: req.body.id } }).then(
            //res.render('home')
            res.redirect('/ticketList')
            ).catch(function (err) {
            console.log(err);
        });
    },

    async getDelete(req, res) {
        await db.Ticket.destroy({ where: { id: req.params.id } }).then(
            //res.redirect('/home')
            res.redirect('/ticketList')
        ).catch(err => {
            console.log(err);
        });
    }
}    
