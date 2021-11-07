import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Points from "./Points";
import Transactions from "./Transactions";

function Layout() {
  const [transactions, setTransactions] = useState([]);
  const [points, setPoints] = useState(0);
  const [toSpend, setToSpend] = useState(0);
  const [newTx, setNewTx] = useState({
    payer: "",
    points: 0,
    timestamp: new Date().toISOString(),
  });

  // load initial state
  useEffect(() => {
    getTransactions();
    getPoints();
  }, [newTx, toSpend, points]);

  // GET /transactions
  function getTransactions() {
    axios("http://localhost:5000/transactions")
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((err) => console.log(err));
  }

  // POST /transactions newTx
  function createTx() {
    axios
      .post("http://localhost:5000/transactions", { newTx })
      .then((response) => {
        console.log("created:", response.data);
      })
      .catch((err) => console.log(err));
    setNewTx({ payer: "", points: 0, timestamp: new Date().toISOString() });
  }

  // GET /points balance
  function getPoints() {
    let total = 0;
    axios("http://localhost:5000/points")
      .then((response) => {
        for (const value of Object.values(response.data)) {
          total += value;
        }
        setPoints(total);
      })
      .catch((err) => console.log(err));
  }

  // PUT /points
  function spendPoints() {
    axios
      .put("http://localhost:5000/points", { points: Number(toSpend) })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
    setToSpend(0);
  }

  return (
    <div className="container pb-5">
      <Header />
      <Points
        points={points}
        toSpend={toSpend}
        spendPoints={spendPoints}
        setToSpend={setToSpend}
      />
      <Transactions
        newTx={newTx}
        setNewTx={setNewTx}
        createTx={createTx}
        transactions={transactions}
      />
    </div>
  );
}

export default Layout;
