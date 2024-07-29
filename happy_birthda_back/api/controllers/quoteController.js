const parseService = require('../services/parseServiceQuote');
const quote = require("../models/quote");
const CSV_QUOTES = 'quotes.csv';


exports.getRandomQuote = async (req, res) => {
  const TODAYS_QUOTE = await parseService.parseFile(CSV_QUOTES);
  res.json({ ...TODAYS_QUOTE });
};



exports.bulkImportBirthday = async (req, res) => {
  try{
    const quoteList = req.body.quoteList;

    await quote.bulkCreate(quoteList);

  } catch (error) {
    throw new Error(error.message);
  }
}