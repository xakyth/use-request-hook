import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/fetch-html', async (req: Request, res: Response) => {
  const { url } = req.query;

  if (typeof url !== 'string') {
    return res.status(400).json({ message: `Invalid URL: ${url}` });
  }

  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        res.status(error.response.status).json({
          message: error.message,
        });
      } else {
        if (error.code === 'ENOTFOUND') {
          res.status(404).json({
            message: `${url} not found`,
          });
        } else if (error.code === 'ECONNREFUSED') {
          res.status(400).json({
            message: `Inavalid URL: ${url}`,
          });
        } else {
          res.status(500).json({
            message: `Unexpected error: ${error.message}`,
          });
        }
      }
    } else {
      res.status(500).json({
        message: `Unexpected error: ${(error as Error).message}`,
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
