require('dotenv').config({ path: '.env.local' });
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
console.log(process.env.PORT);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
