require('dotenv').config({ path: './.env'});
const express = require('express');
const authRouter=require('./routes/authRouter')

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
