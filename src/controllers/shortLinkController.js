const Link = require('../models/Link');

function generateRandomString(){
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
}
const shortLinkController = {
  async createShortLink(req, res) {
    console.log("REQ URL in CREATE", req);
    const {bigUrl} = req.body;
    const user = req.user;
    console.log("BIG URL in CREATE", bigUrl);
    url = process.env.URL;
    let shortUrl = '${url}'+generateRandomString();
    
    try {
      const createdLink = await Link.create(user.userId, bigUrl, shortUrl);
      res.json(createdLink);
    } catch (error) {
      console.error('Error creating short link:', error);
      res.status(500).json({ error: 'Error creating short link' });
    }
  },

  async getShortLinkDetails(req, res) {
    const { shortUrl } = req.params;

    try {
      const link = await Link.findByShortUrl(shortUrl);
      if (!link) {
        return res.status(404).json({ error: 'Short link not found' });
      }

      res.json(link);
    } catch (error) {
      console.error('Error fetching short link details:', error);
      res.status(500).json({ error: 'Error fetching short link details' });
    }
  },

  async updateClicksAndErrorRates(req, res) {
    const { shortUrl } = req.params;
    try {
      await Link.updateClicks(shortUrl);
      await Link.addEventLog('click')
      res.status(204).send();
    } catch (error) {
      console.error('Error updating clicks:', error);
      await Link.updateErrorRates(shortUrl);

      res.status(500).json({ error: 'Error updating clicks and error rates' });
    }
  },
};

module.exports = shortLinkController;
