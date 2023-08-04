/* export default function handler(request, response) {
  const { name = 'World' } = request.query;
  return response.send(`Hello ${name}!`);
} */

const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("This is Hello");
});

module.exports = router;
