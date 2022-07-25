import express from "express";
import redis from "redis";
import axios from "axios";
import util from "util";

const app = express();
app.use(express.json());

// Redis Url for connecting it to the local server
const redisUrl = "redis://127.0.0.1:6379";
const redisClient = redis.createClient(redisUrl);

// Converting the Redis Callback Nature to Promise based implementation
redisClient.set = util.promisify(redisClient.set);
redisClient.get = util.promisify(redisClient.get);

// POST Request
app.post("/", async (req, res) => {
  const { key, value } = req.body;
  const parsedValue = JSON.stringify(value);
  const response = await redisClient.set(key, parsedValue);
  res.status(201).json({ message: response });
});

// GET Request
app.get("/", async (req, res) => {
  const { key } = req.body;
  const value = await redisClient.get(key);
  const parsedValue = JSON.parse(value);
  res.status(200).json(parsedValue);
});

// REDIS + DB Request
app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const cachedPost = await redisClient.get(`post-${id}`);
  if (cachedPost) {
    return res.status(201).json(JSON.parse(cachedPost));
  }
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  //   Expires the (Key,Value) pair after seconds
  redisClient.set(`post-${id}`, JSON.stringify(response.data), "EX", 10);
  return res.status(201).json(response.data);
});

// Listening to PORT 8000
const PORT = 8000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
