const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = express.Router();

// Middleware
routes.use(express.static(path.join(__dirname, 'public')));
routes.use(express.static('public'));
routes.use(express.json());
routes.use(bodyParser.json());

routes.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'))
});


module.exports = routes;