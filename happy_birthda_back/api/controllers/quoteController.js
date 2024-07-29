const parseService = require('../services/parseServiceQuote');
const quote = require("../models/quote");
const CSV_QUOTES = 'quotes.csv';


exports.getRandomQuote = async (req, res) => {
  const TODAYS_QUOTE = await parseService.parseFile(CSV_QUOTES);
  res.json({ ...TODAYS_QUOTE });
};



exports.bulkImportQuote = async (req, res) => {
  try{
    const quoteList = req.body.quoteList;

    await quote.bulkCreate(quoteList);
    res.status(201).json({ message: 'Quotes imported successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to import quotes', error: error.message });
  }
}

exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await quote.findAll();
    res.status(200).json({ quotes: quotes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get quotes', error: error.message });
  }
}

exports.getQuoteById = async (req, res) => {
  try {
    const id = req.params.id;
    const quoteFound = await quote.findByPk(id);
    res.status(200).json({ quote: quoteFound });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get quote', error: error.message });
  }
}

exports.updateQuote = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await quote.update(data, { where: { id } });
    res.status(200).json({ message: 'Quote updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update quote', error: error.message });
  }
}

exports.deleteQuote = async (req, res) => {
  try {
    const id = req.params.id;
    await quote.destroy({ where: { id } });
    res.status(200).json({ message: 'Quote deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete quote', error: error.message });
  }
}
