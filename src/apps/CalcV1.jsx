import { useState, useEffect } from "react";

function CalcV1() {
  return (
    <div className="apps-wrapper">
      <TipCalculator />
    </div>
  );
}
function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);
  const [totalTips, setTotalTips] = useState(0);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");

  useEffect(() => {
    const billAmount = parseFloat(bill);
    if (billAmount >= 1) {
      const tipAmount = (billAmount * (tip1 + tip2)) / 100;
      setTotalTips(tipAmount);
    } else {
      setTotalTips(0);
    }
  }, [bill, tip1, tip2]);

  function handleReset() {
    setBill("");
    setTip1(0);
    setTip2(0);
    setTotalTips(0);
    setSelectedOption1("");
    setSelectedOption2("");
  }

  return (
    <div className="app">
      <h1>Tip Calculator v1</h1>
      <div>
        <div className="step-wrapper">
          <p>How much is your bill?</p>
          <input
            type="number"
            placeholder="Enter amount"
            value={bill}
            onChange={(e) => {
              setBill(Number(e.target.value));
            }}
          />
        </div>
        <div className="step-wrapper">
          <p>How did you like the service?</p>
          <select
            value={selectedOption1}
            onChange={(e) => {
              setTip1(Number(e.target.value));
              setSelectedOption1(e.target.value);
            }}
          >
            <option value="">Make selection</option>
            <option value="0">No bueno (0%)</option>
            <option value="5">It was okay (5%)</option>
            <option value="10">Really good! (10%)</option>
            <option value="20">Best service ever! (20%)</option>
          </select>
        </div>
        <div className="step-wrapper">
          <p>Add an additional tip?</p>
          <select
            value={selectedOption2}
            onChange={(e) => {
              setTip2(Number(e.target.value));
              setSelectedOption2(e.target.value);
            }}
          >
            <option value="">Make selection</option>
            <option value="0">No thanks (0%)</option>
            <option value="5">Here's an extra (5%)</option>
            <option value="10">Here's extra (10%)</option>
            <option value="15">You earn it! (15%)</option>
          </select>
        </div>
      </div>
      <h2>
        {bill < 1
          ? "Enter your bill amount"
          : `Your total is $${bill ? bill + totalTips : bill} ($${bill} + ${
              tip1 + tip2 > 0 ? `$${totalTips} tip 😀` : "No tip 😭"
            })`}
      </h2>

      <button type="reset" className="button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
export default CalcV1;
