const  app = require('./appi'),
       mysql = require('mysql'),
       port = process.env.PORT || 3001;
      
  var conexion =  mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'proyectox0',
        port: 3306
     })

conexion.connect((error) =>{
    if(error) {
     return console.log(`Error al conectar a la base de datos: ${error}`)
    }
    console.log('Conexion correcta a la base de datos');
    app.listen(port, () => { 
        console.log(`Servidor corriendo en http://localhost:${port}`) 
    })
   });


