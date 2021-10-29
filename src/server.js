require('dotenv').config({ path: './.env'});
const express = require('express');
const authRouter = require('./routes/authRouter');
const privateRoute=require('./routes/private')
const { connectDB } = require('./config/db')
const app = express();
const errorHandler = require('./middleware/error');

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/private', privateRoute);

const PORT = process.env.PORT || 5000;

//Error handler should be last middleware
app.use(errorHandler);


async function startServer() {
  await connectDB();
  const server = app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}...`);
  });
  
  process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err}`);
    server.close(() => process.exit(1));  
  })
}

startServer();