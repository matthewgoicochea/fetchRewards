const db = require("../data/db");

function sortTxs(req, res, next) {
  db.transactions.sort((a, b) => {
    return Date.parse(a.timestamp) - Date.parse(b.timestamp);
  });
  next();
}

function update(req, res, next) {
  let toSpend = req.body.points;
  const spent = [];

  for (let i = 0; i < db.transactions.length; i++) {
    let tx = db.transactions[i];

    if (tx.points !== 0) {
      // if tx > toSpend
      if (tx.points - toSpend >= 0) {
        response = { payer: tx.payer, points: toSpend * -1 };
        spent.push(response);
        db.transactions[i] = { ...tx, points: tx.points - toSpend };
        return res.send(spent);
      }

      // if tx < toSpend
      if (tx.points - toSpend < 0) {
        // if tx is negative
        if (tx.points * -1 > 0) {
          toSpend += tx.points * -1;
          // check result array for specific player then update points
          const existingPayer = spent.find(
            (element) => element.payer === tx.payer
          );
          if (existingPayer) {
            const index = spent.findIndex(
              (element) => element.payer === tx.payer
            );
            spent.splice(index, 1, {
              ...existingPayer,
              points: existingPayer.points + tx.points * -1,
            });
          } else {
            // no existing payer - add negative points to total
            response = { payer: tx.payer, points: tx.points * -1 };
            spent.push(response);
          }
          db.transactions[i] = { ...tx, points: 0 };
        } else {
          // if tx is positive
          toSpend = toSpend - tx.points;
          response = { payer: tx.payer, points: tx.points * -1 };
          spent.push(response);
          db.transactions[i] = { ...tx, points: 0 };
        }
      }
    }
  }

  return res.send(spent);
}

function list(req, res) {
  const result = {};
  let points = 0;
  for (let i = 0; i < db.transactions.length; i++) {
    const tx = db.transactions[i];
    points += tx.points;
    // if payer exists combine tx points
    if (result[tx.payer]) {
      result[tx.payer] = result[tx.payer] + tx.points;
    } else {
      // if payer doesn't exist create new
      result[tx.payer] = tx.points;
    }
  }
  res.json(result);
}

module.exports = { update: [sortTxs, update], list };
