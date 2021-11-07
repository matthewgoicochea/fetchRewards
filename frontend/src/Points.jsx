import bone from "./images/bone.svg";

function Points({ points, toSpend, setToSpend, spendPoints }) {
  function handleSpend({ target }) {
    setToSpend(target.value);
  }
  return (
    <div className="mb-4">
      <h2 className="h2">
        Points Balance: {points}
        <img
          src={bone}
          className="align-baseline ms-1"
          style={{ width: "0.8em" }}
          alt="bone reward symbol"
        />
      </h2>
      <div className="input-group mb-3 w-50">
        <button
          className="btn btn-outline-dark"
          type="button"
          id="spendPoints"
          onClick={spendPoints}
        >
          Spend Points
        </button>
        <input
          type="number"
          value={toSpend}
          onChange={handleSpend}
          className="form-control"
          placeholder={0}
          max={points}
          min={0}
        />
      </div>
    </div>
  );
}

export default Points;
