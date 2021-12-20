const dns = require('dns');

const validateURL = (req, res, next) => {
  try {
    const uri = new URL(req.body.url);
  } catch (error){
    return res.json({error: 'invalid url'});
  }
  const uri = new URL(req.body.url);
  const prefix = /^https?:\/\//i;
  dns.lookup(uri.hostname, (err) => {
    if(err || !prefix.test(uri.href)){
      return res.json({error: 'invalid url'});
    } else {
      next();
    }
  });
}

module.exports = validateURL;