require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  // check if there is a token
  if (!token) {
    res.status(403).send('Token required');
  }

  try {
    // decode the token, verify will throw an error if unsuccessful
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
