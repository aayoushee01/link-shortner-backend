const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized: Missing token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Unauthorized: Invalid token' });
    console.log(user);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
