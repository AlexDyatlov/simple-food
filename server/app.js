const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');
const dotenv = require('dotenv');

const initDatabase = require('./startUp/initDatabase');
const routes = require('./routes');

dotenv.config({ path: './config.env' });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', routes);

const PORT = config.get('port') ?? 8080;
const urlMongo = process.env.MONGO_URI;

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase();
    });
    await mongoose.connect(urlMongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(chalk.green('MongoDB connected'));

    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}...`))
    );
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();
