import express from 'express';
import bodyParser from 'body-parser';
import api from './api/chat.js';

const app = express();
app.use(bodyParser.json());

app.use('/api', api);
app.use(express.static('dist'));

app.listen(3000, () => {
  console.log('Servidor a correr em http://localhost:3000');
});
