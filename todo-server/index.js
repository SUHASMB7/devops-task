require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT || 8000

const router = require('./router/router');
app.use(router);

require('./DB/connection')

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.get('/', (req, res) => {
   res.status(200).send('<h1>Project Started and waiting for request</h1>')
})