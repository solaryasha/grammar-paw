import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import apiRouter from './routes/api';


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/api', apiRouter)

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});