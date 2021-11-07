function Transactions({ newTx, setNewTx, createTx, transactions }) {
  function handleChange({ target }) {
    setNewTx({ ...newTx, [target.id]: target.value });
  }

  const txCards = transactions.map((tx, index) => {
    return (
      <div className="card mb-2" key={tx.timestamp}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              <b>payer:</b> {tx.payer}
            </div>
            <div>tx#{index + 1}</div>
          </div>
          <div>
            <b>points:</b> {tx.points}
          </div>
          <div>
            <b>timestamp:</b> {tx.timestamp}e
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div>
        <h3>Transactions</h3>
      </div>

      <div className="card row mb-4">
        <div className="card-body">
          <h5 className="card-title">New Transaction</h5>
          <div className="d-flex row justify-content-around">
            <div className="h6 me-3 col-1">Payer:</div>
            <input
              id="payer"
              type="text"
              className="form-control w-75 col-11"
              placeholder="payer"
              aria-label="Payer"
              value={newTx.payer}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex row justify-content-around">
            <div className="h6 me-3 col-1">Points:</div>
            <input
              id="points"
              type="number"
              className="form-control w-75 col-11"
              placeholder="points"
              aria-label="Points"
              value={newTx.points}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex row justify-content-around">
            <div className="h6 me-3 col-1">Date:</div>
            <input
              id="timestamp"
              type="date"
              className="form-control w-75 col-11"
              placeholder="points"
              aria-label="Points"
              value={newTx.timestamp}
              onChange={handleChange}
            />
          </div>

          <div className="text-center mt-2">
            <button
              className="btn btn-outline-dark shadow-none ms-4"
              onClick={createTx}
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <h6>Transaction List</h6>
      <div>{transactions ? txCards : "loading"}</div>
    </>
  );
}

export default Transactions;
