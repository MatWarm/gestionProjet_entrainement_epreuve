module.exports = (server) => {
    const quoteController = require("../controllers/quoteController");

    server.get("/getQuote", quoteController.getRandomQuote)

    server.post("/bulkQuoteImport", quoteController.bulkImportQuote);

    server.patch("/admin/updateQuote/:id", quoteController.updateQuote);

    server.delete("/admin/deleteQuote/:id", quoteController.deleteQuote);

    server.get("/admin/getAllQuotes", quoteController.getAllQuotes);

    server.post("/admin/createQuote", quoteController.createQuote);
}