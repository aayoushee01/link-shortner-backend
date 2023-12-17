const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000; // Define the port number
const Link = require('../src/models/Link');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const shortLinkRoutes = require('./routes/shortLinkRoutes');
app.use('/short-links', shortLinkRoutes); 

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.get('/:shortUrl', async (req, res) => {
  console.log("Short URL REQ", req.params);
  url = process.env.URL;
  const shortUrl = '${url}' + req.params.shortUrl;
  
  try {
    const link = await Link.findByShortUrl(shortUrl);
    if (!link) {
      return res.status(404).json({ error: 'Short link not found' });
    }
    const currentTimestamp = new Date().getTime();
    if(link.expiry_at > currentTimestamp){
      return res.status(404).json({ error: 'Link Expired' });
    }
    try {
      await Link.updateClicks(shortUrl);
      await Link.addEventLog('click', link.id);
      res.redirect(link.big_url);
    } catch (err) {
      await Link.updateErrorRates(shortUrl);
      await Link.addEventLog('error', link.id);
      res.status(500).json({ error: 'Error while processing click event' });
    }
  } catch (error) {
    console.error('Error accessing short link:', error);
    res.status(500).json({ error: 'Error while Redirecting' });
  }
});
app.get("/", (req,res) => {
  console.log("IN ROOT");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
