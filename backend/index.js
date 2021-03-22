const express = require('express');
const cors = require('cors');
const { generate } = require('./functions/generate');

const app = express();
const port = 4000;


app.use(cors());
app.use(express.json());

app.use('/files', express.static(__dirname + '/files'));

app.get('/generate', generate);

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal server error'
  })
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});