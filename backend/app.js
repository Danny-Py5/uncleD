const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('../frontend'));

app.get('/', (req, res) => {
    console.log(req.url);
    res.sendStatus(200)
})

app.listen(PORT, () => {
    console.log('Server running at port', PORT, '......')
});