const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const handler = require('./handler');

filePath = path.join(__dirname, '/../../dist/cart.json');

router.get('/', (req, res) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ success: 0, text: err }));
        } else {
            res.send(data);
        }
    })
});
router.post('/', (req, res) => {
    handler(req, res, 'add', filePath);
});
router.put('/:id', (req, res) => {
    handler(req, res, 'change', filePath);
});
router.delete('/:id', (req, res) => {
    handler(req, res, 'del', filePath);
});

module.exports = router;