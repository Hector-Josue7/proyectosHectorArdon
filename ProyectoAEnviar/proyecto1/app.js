const express = require('express'),
      path = require('path'),
      exphbs = require('express-handlebars'),
      session = require('express-session'),
      passport = require('passport'),
      flash = require('connect-flash'),
      morgan = require('morgan'),
     // validator = require('express-validator'),
      MySQLStore = require('express-mysql-session')(session),
      app = express();;

const { database, port } = require('./config');

/*======RUTAS====*/
const rutas = require('./routes/producto')
/*===============*/

require('./modules/passport');
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./modules/handlebars')
  }))
  app.set('view engine', '.hbs');

       
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'cualquierCosa',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  //app.use(validator());
  

// Global variables
app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
  });

// Routes
app.use('/api', rutas)
app.use(require('./routes/indexRoutes'));
app.use('/links', require('./routes/linksRoutes'));


app.use(express.static("public")); //Exponer una carpeta como publica para archivos estaticos
module.exports = app