import { useState, useEffect } from "react";

const tipOptions1 = [
  {
    value: "",
    message: "Make selection",
  },
  {
    value: "0",
    message: "No bueno (0%)",
  },
  {
    value: "5",
    message: "It was okay (5%)",
  },
  {
    value: "10",
    message: "It was good! (10%)",
  },
  {
    value: "20",
    message: "Best service ever! (20%)",
  },
];
const tipOptions2 = [
  {
    value: "",
    message: "Make selection",
  },
  {
    value: "0",
    message: "Not happy (0%)",
  },
  {
    value: "5",
    message: "Thinks it was okay, add (5%)",
  },
  {
    value: "10",
    message: "liked it, add (10%)",
  },
  {
    value: "20",
    message: "loved it! add (20%)",
  },
];

function CalcV2() {
  return (
    <div>
      <TipCalculator data={{ tipOptions1, tipOptions2 }} />
    </div>
  );
}

function TipCalculator({ data }) {
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
      <h1>Tip Calculator v2</h1>
      <div>
        <BillInput bill={bill} onBill={setBill} />
        <TipSelect
          data={data.tipOptions1}
          onSetTip={setTip1}
          onSelectedOption={selectedOption1}
          onSetSelectedOption={setSelectedOption1}
        >
          {"How did you like the service?"}
        </TipSelect>

        <TipSelect
          data={data.tipOptions2}
          onSetTip={setTip2}
          onSelectedOption={selectedOption2}
          onSetSelectedOption={setSelectedOption2}
        >
          {"Did your friend liked it? Tip more and split total tip"}
        </TipSelect>
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

function BillInput({ bill, onBill }) {
  function handleOnChange(e) {
    onBill(Number(e.target.value));
  }
  return (
    <div className="step-wrapper">
      <p>How much is your bill?</p>
      <input
        type="number"
        placeholder="Enter amount"
        value={bill}
        onChange={handleOnChange}
      />
    </div>
  );
}

function TipSelect({
  data,
  onSetTip,
  onSelectedOption,
  onSetSelectedOption,
  children,
}) {
  function handleOnChange(e) {
    onSetTip(Number(e.target.value));
    onSetSelectedOption(e.target.value);
  }
  return (
    <div className="step-wrapper">
      <p>{children}</p>
      <select value={onSelectedOption} onChange={handleOnChange}>
        {data.map((el, i) => (
          <TipOption key={i} num={i} onValue={el.value} children={el.message} />
        ))}
      </select>
    </div>
  );
}

function TipOption({ num, onValue, children }) {
  return (
    <option num={num} value={onValue}>
      {children}
    </option>
  );
}

export default CalcV2;
