import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express()
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post',postRoutes);
app.use("/api/v1/dalle",dalleRoutes);

app.get('/', async (req, res) => {
  res.send("hello form dall-e");
})

const startServer = async () => {
  const mySecret = process.env['MONGODB_URl']

  try {
    connectDB(mySecret);
    app.listen(8000, () => {
      console.log("the server is running")
    })
  } catch (err) {
    console.log("the err")
    console.log(err);
  }
}
//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
startServer();