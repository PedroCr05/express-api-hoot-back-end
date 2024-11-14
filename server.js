const app = express();
const cors = require(`cors`);
const dotenv = require(`dotenv`);
const express = require(`express`);
const hootsRouter = require(`./controllers/hoots.js`);
const mongoose = require(`mongoose`);
const profilesRouter = require(`./controllers/profiles`);
const testJWTRouter = require(`./controllers/test-jwt`);
const usersRouter = require(`./controllers/users`);
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on(`connected`, () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(cors());
app.use(express.json());

// Routes go here
app.use(`/hoots`, hootsRouter);
app.use(`/profiles`, profilesRouter);
app.use(`/test-jwt`, testJWTRouter);
app.use(`/users`, usersRouter);

app.listen(3000, () => {
  console.log(`The express app is ready!`);
});
