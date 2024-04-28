import express from 'express'
import bodyParser from 'body-parser'
import { routes } from './routes/user_routes.js'

const app = express()
const port = 8000

// MIDDLEWARE
app.use(express.json())
app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "50mb",
    })
);

app.use(routes)

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`)
})
