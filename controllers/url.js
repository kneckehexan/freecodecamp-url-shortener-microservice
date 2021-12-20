const URLModel = require('../models/URL');
const {StatusCodes} = require('http-status-codes');

const getURL = async (req, res) => {
  const {params: {id: short_url}} = req;
  const url = await URLModel.findOne({
    short_url: short_url
  });

  res.redirect(url.original_url);
}

const createURL = async (req,res) => {
  req.body.original_url = req.body.url;
  const url = await URLModel.create(req.body);
  res.json({original_url: url.original_url, short_url: url.short_url});
}

module.exports = {
  getURL,
  createURL
}