const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/branches', (req, res) => {
    fs.readFile('branches.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        res.send(JSON.parse(data));
    });
});

app.post('/branches', (req, res) => {
    fs.readFile('branches.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        const branches = JSON.parse(data);
        branches.push(req.body);
        fs.writeFile('branches.json', JSON.stringify(branches), err => {
            if (err) {
                return res.status(500).send('Error saving data');
            }
            res.send('Branch added');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
