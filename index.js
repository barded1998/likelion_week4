import express from 'express';
import api from './api/api.js';
import dotevn from 'dotenv';
import db from './models/index.js';

dotevn.config();

const app = express();
const port = 8080;

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use('/api', api);

app.listen(port);
