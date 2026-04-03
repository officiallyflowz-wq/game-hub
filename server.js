const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing url parameter');
  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    res.setHeader('Content-Type', contentType);
    const body = await response.buffer();
    res.send(body);
  } catch (e) {
    res.status(500).send('Proxy error: ' + e.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
