const db = require("../data/db");

function sortTxs(req, res, next) {
  db.transactions.sort((a, b) => {
    return Date.parse(a.timestamp) - Date.parse(b.timestamp);
  });
  next();
}

function create(req, res) {
  const tx = req.body.newTx;
  tx.points = Number(tx.points);
  db.transactions.push(tx);
  res.status(201).json(tx);
}

function list(req, res, next) {
  res.json(db.transactions);
}

module.exports = { create, list: [sortTxs, list] };
