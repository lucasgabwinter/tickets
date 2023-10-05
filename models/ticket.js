module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define('ticket', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true, allowNull: false, primaryKey: true
        },
        titulo: {
            type: Sequelize.STRING, allowNull: false
        },
        descricao: {
            type: Sequelize.STRING, allowNull: false
        },
        concluido: {
            type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false
        },
        observacao: {
            type: Sequelize.STRING, allowNull: true
        },
        categoriaId: {
            type: Sequelize.INTEGER, allowNull: true
        },
        tecnicoId: {
            type: Sequelize.INTEGER, allowNull: true
        }
    });
    return Ticket;
}