// NUESTRAS DEPENDENCIAS
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())

// EJECUTAMOS EL SERVIDOR, SI PONEMOS http://localhost:3002/ YA ESTARA CORRIENDO
app.listen(3002, ()=>{
  console.log('El servidor esta corriendo en el puerto 3002')
})

// PROCEDEMOS A LA CONEXION DE LA BASE DE DATOS EN MYSQL
const db = mysql.createConnection({
  user:'root',
  host: 'localhost',
  password:'',
  database:'octidb'
})

// CREAMOS UNA RUTA AL SERVIDOR QUE REGISTRARA UN USUARIO
app.post('/register', (req, res)=>{
  // NECESITAMOS OBTENER LAS VARIABLES DEL FORMULARIO
  const sentEmail = req.body.Email
  const sentUserName = req.body.UserName
  const sentPassword = req.body.Password

  // VAMOS A CREAR UN QUERY PARA INSERTAR A LA BASE DE DATOS TABLA USUARIOS
  const SQL = 'INSERT INTO users (email,username,password) VALUES (?,?,?)'  // VAMOS A ENTRAR LOS VALORES ENTRELAZADSOS A LAS VARIABLES
  const Values = [sentEmail, sentUserName, sentPassword]

  // QUERY A EJECUTAR
  db.query(SQL, Values, (err, results)=>{
    if (err) {
      res.send(err)
    }else{
      console.log('Usuario ingresado con exito')
      res.send({message:'Usuario agregado'})
      // SI EL USUARIO NO FUE SUBIDO,  NECESITAMOS USAR express Y cors
    }
  })
})

// NECESITAMOS LEER LAS CREDENCIALES PARA INICIO DE SESION
app.post('/login', (req, res)=>{
  // NECESITAMOS OBTENER LAS VARIABLES DEL FORMULARIO
  const sentloginUserName = req.body.LoginUserName
  const sentLoginPassword = req.body.LoginPassword

  // VAMOS A CREAR UN QUERY PARA INSERTAR A LA BASE DE DATOS TABLA USUARIOS
  const SQL = 'SELECT * FROM users WHERE username = ? && password = ?'  // VAMOS A ENTRAR LOS VALORES ENTRELAZADSOS A LAS VARIABLES
  const Values = [sentloginUserName, sentLoginPassword]

  // QUERY A EJECUTAR
  db.query(SQL, Values, (err, results)=>{
      if (err) {
        res.send({error: err})
      } 
      if (results.length > 0) {
        res.send(results)
      }
      else{
        res.send({message: 'Las credenciales no coinciden'})
      }
  })
})