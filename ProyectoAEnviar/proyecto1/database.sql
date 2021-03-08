create database proyectoX0
/* un usuario puede crear muchas partidas
creo que un usuario puede hacer muchas partidas y una partida le pertenece a un usuario
*/ 
create table usuarios (
     codigo_usuario smallint unsigned auto_increment not null,
     nombre varchar(100) not null,
    -- fecha_nacimiento date, 
    -- sexo char(1),
    -- genero varchar(10),
    -- telefono bigint,
    -- foto varchar(50),
     nombre_usuario varchar(50) not null,
    -- correo_electronico varchar(50) unique,
     clave varchar(50) not null,
     constraint pk_cu primary key(codigo_usuario)
 );

create table partidas (
   codigo_partida int unsigned auto_increment not null,
   partidas_ganadas smallint unsigned,
   partidas_perdidas smallint unsigned,
   codigo_usuario1 smallint unsigned,
   constraint pk_cp primary key(codigo_partida),
   constraint fk_cu foreign key (codigo_usuario1) references usuarios(codigo_usuario)
);

create table links(
    id int(11) not null auto_increment,
    title varchar(150) not null,
    url varchar(255) not null,
    description text,
    codigo_usuario1 smallint unsigned,
    created_at timestamp not null default current_timestamp,
    primary key (id),
    index fk_codigo_usuario1(codigo_usuario1),
    constraint fk_codigo_usuario1 foreign key(codigo_usuario1) references usuarios(codigo_usuario)
    -- constraint pk_l primary key(id),
    -- constraint fk_user foreign key (codigo_usuario1) references usuarios(codigo_usuario)
);
-- con esta tabla probe las rutas CRUD en el archivo producto.js dentro de la carpeta controllers
-- solo que no la tengo relacionada con las otras tablas
create table productos(
  codigo_producto smallint unsigned auto_increment not null,
  nombre varchar(100),
  foto varchar(50),
  precio float(16,2) unsigned default 0,
  categoria enum('computadoras','celulares', 'accesorios'),
  descripcion text,
  constraint pk_cp primary key(codigo_producto)
 );

-- el objetivo de esta tabla es porque pense que un usuario puede retar a muchos usuarios
-- un usuario de forma individual se registra en la tabla usuarios y se relaciona con muchos compañeros
--create table amigos ()

