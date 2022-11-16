require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const { token } = req.body;

  // check if there is a token
  if (!token) {
    res.status(403).send('Token required');
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.body.user_id = decoded.id;
  } catch (e) {
    console.error(e);
    res.send(401).send('invalid token');
  }
  next();
}

module.exports = {
  verifyToken,
};
