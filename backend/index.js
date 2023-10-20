const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { PORT } = require('./src/configs/generalConfigs')

const app = express()

app.use(bodyParser.json())
app.use(cors())


const simulationRoute = require('./src/Routes/simulationRoute')
app.use('/simulate', simulationRoute)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});