import express from 'express'
import bodyParser from 'body-parser'
import database from '../../config/mongo.config'
import { execute } from '../../config/mysql.config'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(cors())


app.post('/user', async (req, res) => {
    try {
        const query = 'INSERT INTO users (email, password) VALUES (?,?)'
        const result = await execute(query, [
            req.body.email,
            req.body.password
        ])
        
        console.log(result)
        res.send(result)
    } catch (error) {
        console.log(error, 'deu erro')
    }
})


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})