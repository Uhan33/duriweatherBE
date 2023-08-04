/* export default function handler(request, response) {
  const { name = 'World' } = request.query;
  return response.send(`Hello ${name}!`);
} */

const express = require('express');
const app = express();

app.use("/", (req, res) => {
res.send("Server On");
});