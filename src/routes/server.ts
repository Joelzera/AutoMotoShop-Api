import express from 'express'
import bodyParser from 'body-parser'
import { execute } from '../../config/mysql.config'
import cors from 'cors'
import car from '../models/car'
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(cors())


mongoose.connect('mongodb://localhost:27017/auto_moto')

app.post('/user/login', async (req, res) => {
    try {
       const query = 'SELECT * FROM users WHERE email = ?'
       const result = await execute(query, [req.body.email]) 
       console.log(result)
       res.send(result)
    } catch (error) {
        console.log(error, 'deu erro')
    }
})


app.post('/user', async (req, res) => {
    try {
        const query = 'INSERT INTO users (name, email, password) VALUES (?,?,?)'
        const result = await execute(query, [
            req.body.name,
            req.body.email,
            req.body.password
        ])

        console.log(result)
        res.send(result)
    } catch (error) {
        console.log(error, 'deu erro')
    }
})

app.get('/car/:nome', async (req, res) =>{
    try {
        const data = await car.find({ nome: req.params.nome })
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error, 'deu erro')
    }
})

app.get('/car/marca/:marca', async (req, res) =>{
    try {
        const data = await car.find({ marca: req.params.marca })
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error, 'deu erro')
    }
})

app.get('/car/tipo/:tipo', async (req, res) =>{
    try {
        const data = await car.find({ tipo: req.params.tipo })
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error, 'deu erro')
    }
})

app.get('/car/all/:ativo', async (req, res) =>{
    try {
        const data = await car.find({ ativo: req.params.ativo})
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error, 'deu um erro')
    }
})

app.post('/car', async (req, res) => {
    const dataCar =  new car({
        id: uuidv4(),
        nome: req.body.nome,
        marca: req.body.marca,
        ano: req.body.ano,
        motor: req.body.motor,
        modelo: req.body.modelo,
        tipo: req.body.tipo,
        cor: req.body.cor,
        cambio: req.body.cambio,
        combustivel: req.body.combustivel,
        quilometragem: req.body.quilometragem,
        preço: req.body.preço,
        ativo: true
    })
    try {
        const dataSaveCar =  await dataCar.save()
        res.status(200).json(dataSaveCar)
        console.log(dataSaveCar)
    } catch (error) {
        console.log(error)
    }
})


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})