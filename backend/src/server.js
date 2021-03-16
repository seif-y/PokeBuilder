const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send("Welcome")
});

app.listen(port, () => {
    console.log(`Listening at *:${port}`)
});