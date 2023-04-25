import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const mySecret = process.env['OPENAI_API_KEY']

const configuration =new Configuration({
  apiKey: mySecret,
});

const openai= new OpenAIApi(configuration);

//router.route('/').get((req,res)=>{
 // res.send("hello form dall-e");
//});

//export default router;
router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;

//dhd0iudky
//475764227523884
//pMdua8uqDKZ7j74cryFvUQsmJdA