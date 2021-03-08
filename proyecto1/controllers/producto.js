const mysql = require('mysql');

 var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyectox0',
    port: 3306
 });


function getProduct(req, res){
    const id = req.params.id,
    consulta = 'select * from productos where codigo_producto=?';
    conexion.query(consulta, [id], (err, producto)=>{
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`}) 
    if (!producto) return res.status(404).send({message: `El producto no existe`})
    res.status(200).send({ producto})
/*
 conexion.query("SELECT * FROM customer WHERE id = ?", [id], (err, filas) => {
  res.render('customers-edit', {
    data:filas[0]
  })
  });
  */
});

}

function getProducts(req, res){
    const consulta = 'select * from productos';
    conexion.query(consulta, (err, productos) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`}) 
    if (!productos) return res.status(404).send({message: `No existen productos`})
    res.status(200).send({productos})
  

    /* 
res.render('customers', {
       data: productos
    });
*/
    });
}

function saveProduct(req, res){
    console.log(req.body)
    const  datos = [req.body.nombre, req.body.foto, req.body.precio, req.body.categoria, req.body.descripcion],
         consulta = `insert into productos(nombre, foto, precio, categoria, descripcion) 
                    values(?,?,?,?,?)`;
    
    conexion.query(consulta, datos, (err, producto)=>{
    if(err) res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
       console.log(producto);
       res.status(200).send({producto: producto})
        // res.status(200).send({message: 'El producto se ha recibido'})
       //res.redirect('/');
   });
}

function updateProduct(req, res){
    const id = req.params.id,
    nuevoProducto =req.body,
    consulta ='update productos set ? where codigo_producto = ?';
    conexion.query(consulta, [nuevoProducto, id], (err, productoActualizado) => {
      if(err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})
      res.status(200).send({ producto: productoActualizado })
      // res.redirect('/');
    });
}

function deleteProduct(req, res){
    const id = req.params.id, 
    consulta ='delete from productos where codigo_producto = ?';
    conexion.query(consulta, [id], (err, producto) => {
    if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
   res.status(200).send({message: `El producto ha sido eliminado: ${producto}`})
  // res.redirect('/');
});
}

module.exports ={
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct

}