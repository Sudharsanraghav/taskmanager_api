const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes')
const app = express();
require('dotenv').config();
require('./db')
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use('/users', userRoutes)
app.use('/task', taskRoutes)

app.get('/', (req, res) => {
    res.json({
        message: 'Helloooooo'
    })
})

app.listen(PORT, () => {
    console.log(`Server Started Running on PORT : ${PORT}`)
})