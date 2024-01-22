const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const engine = require('express-handlebars');
const app = express();

const clientsRoutes = require('./routes/clientsRoutes');
const productsRoutes = require('./routes/productsRoutes');

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use('/clients', clientsRoutes);
app.use('/products', productsRoutes);

app.engine('handlebars', engine());

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

app.get('/', (req, res) => {
    res.render('home');
});

module.exports = app;