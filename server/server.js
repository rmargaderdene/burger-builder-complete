const express = require('express');
const dbConnection = require('./dbConn');

const app = express();

app.get('/hello', (req, res) => {
    // dbConnection.connect();
    // dbConnection.query("SELECT * FROM `burgerBuilder`.`ingredient_prices`", function (err, result, fields) {
    //     console.log('test')
    //     if (err) throw err;
    //     console.log(result);
    // });
    res.send("Hello World");
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);