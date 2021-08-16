const express = require('express');
const fs = require('fs');// встроенный мкетод в node
const bodyParser = require('body-parser'); // метод непонятный в express
const moment = require('moment');
const dateFormat = moment().format('llll');
const app = express();//Глобальный объект express'a
var os = require("os");
const port = 4001;
// const dirName = __dirname + 'data.json';
app.use(express.static('./'));//Статические файлы фронтенда(html, css, img...)

const jsonParser = bodyParser.json();



app.post('/data', jsonParser, (request, resolve) => {
   fs.readFile('./server/data.json', 'utf8', (err, data) => {
      const dataInfo = JSON.parse(data);
      const guestData = { time: dateFormat, ip: os.hostname(), browser:request.headers['user-agent'] }
      dataInfo.push(guestData);
      fs.writeFile('./server/data.json', JSON.stringify(dataInfo), () => {
         resolve.end();
      })
   });
})



app.listen(port, () => {//слушатель
   console.log(`Example app listening at http://localhost:${port}`)
})

