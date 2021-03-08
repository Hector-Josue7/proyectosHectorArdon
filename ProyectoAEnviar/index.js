
/*
const  app = require('./app'),
       mysql = require('mysql'),
       port = process.env.PORT || 3001,
       {database} = require('./config'),
       pool = mysql.createPool(database);
*/
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
app.listen(app.get('port'));
console.log('Server is in port', app.get('port'));
      
  /* 
  
  pool.getConnection((error) =>{
    if(error) {
     return console.log(`Error al conectar a la base de datos: ${error}`)
    }
    console.log('Conexion correcta a la base de datos');
    app.listen(port, () => { 
        console.log(`Servidor corriendo en http://localhost:${port}`) 
    })
   });
  */




