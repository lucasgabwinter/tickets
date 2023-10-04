const routes = require('./routers/route');
const handlebars = require('express-handlebars');
const express = require('express');
var session = require('express-session');
const middlewares = require('./middlewares/middlewares');
const app = express();
app.use(session({
    secret: 'textosecreto',
    cookie: { maxAge: 5 * 60 * 1000 }
}));

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middlewares.logRegister, middlewares.sessionControl)
app.use(routes);

app.use(
    express.urlencoded({
        extended: true
    })
)

app.listen(8081, function () {
    console.log("Servidor no http://localhost:8081")
});