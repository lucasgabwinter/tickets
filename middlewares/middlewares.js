module.exports = {
    logRegister(req, res, next) {
        console.log(req.url + req.method + new Date())
        next();
    },
    sessionControl(req, res, next) {
        if (req.session.login != undefined) {
            res.locals.login = req.session.login;
            if (req.session.tipo == "3") {
                res.locals.admin = "admin"
            }
            if (req.session.tipo == "2") {
                res.locals.tecnico = "tecnico"
            }
            if (req.session.tipo == "1") {
                res.locals.comum = "comum"
            }
            next();
        }
        else if ((req.url == '/usuarioCreate') && (req.method == 'GET')) next();
        else if ((req.url == '/usuarioCreate') && (req.method == 'POST')) next();
        else if ((req.url == '/') && (req.method == 'GET')) next();
        else if ((req.url == '/login') && (req.method == 'POST')) next();
        else res.redirect('/');
    }
};