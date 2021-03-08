const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const pool = require('../db');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  nombreUsuarioCampo: 'nombre_usuario',
  claveCampo: 'clave',
  passReqToCallback: true
},

async (req, nombre_usuario, clave, done) => {
  const rows = await pool.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(clave, user.clave);
    if (validPassword) {
      done(null, user, req.flash('success', 'Welcome ' + user.nombre_usuario));
    } else {
      done(null, false, req.flash('message', 'Incorrect clave'));
    }
  } else {
    return done(null, false, req.flash('message', 'The nombre_usuario does not exists.'));
  }
}));

passport.use('local.signup', new LocalStrategy({
    nombreUsuarioCampo: 'nombre_usuario',
    claveCampo: 'clave',
  passReqToCallback: true
}, async (req, nombre_usuario, clave, done) => {

  const { nombre } = req.body;
  let newUser = {
    nombre,
    nombre_usuario,
    clave
  };
  newUser.clave = await helpers.encryptPassword(clave);
  // Saving in the Database
  const result = await pool.query('INSERT INTO usuarios SET ? ', newUser);
  newUser.codigo_usuario = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.codigo_usuario);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM usuarios WHERE codigo_usuario = ?', [id]);
  done(null, rows[0]);
});