
const express = require('express');
const redis = require('redis');
const app = express();


const client = redis.createClient({

    host: 'redis',
    port: 6379
});

client.on('connect', () => {
    console.log('Connected to Redis')
})

app.get('/', (req, res) => {
    res.send("Hello World")
})

// Route to set a key-value pair in Redis
app.get('/set/:key/:value', (req, res) => {
    client.set(req.params.key, req.params.value, (err, reply) => {
        if (err) {
            console.error(err)
            res.status(500).send('Error setting key')
        } else {
            res.send('Key set successfully')
        }
    })
})

// Route to get the value associated with a key in Redis
app.get('/get/:key', (req, res) => {
    client.get(req.params.key, (err, reply) => {
        if (err) {
            console.error(err)
            res.status(500).send('Error getting key')
        } else if (reply == null) {
            res.send('Key not found')
        } else {
            res.send(`Value for ${req.params.key}: ${reply}`)
        }
    })
})

var PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})