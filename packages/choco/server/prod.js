const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist/')));

app.get('/abc', (req, res) => {
  res.send("abc");
})

const port = 3001;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});