const cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', `${req.get('origin')}`);
    res.header('Access-Control-Allow-Credentials', `true`);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Credentials');

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      res.end();
    } else {
      next();
    }
  }

module.exports = {
    cors
};