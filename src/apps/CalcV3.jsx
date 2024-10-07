import { useState, useEffect } from "react";
import { tipOptions1, tipOptions2 } from "../utils/tip-options";
import TipSelect from "./components/TipSelect";
import BillInput from "./components/BillInput";

function CalcV3() {
  return (
    <div>
      <TipCalculator data={{ tipOptions1, tipOptions2 }} />
    </div>
  );
}

function TipCalculator({ data }) {
  const [bill, setBill] = useState("");
  const [subTotal, setSubTotal] = useState("0.00");
  const [totalBill, setTotalBill] = useState("0.00");
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);
  const [totalTips, setTotalTips] = useState(0);
  const [tipAverage, setTipAverage] = useState(0);
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");

  useEffect(() => {
    const billAmount = parseFloat(bill);
    if (billAmount >= 1) {
      const tipAmount = (billAmount * (tip1 + tip2)) / 100;
      const total = billAmount + tipAmount;
      const tipAverage = tipAmount / 2;
      setTotalTips(tipAmount.toFixed(2));
      setTipAverage(tipAverage.toFixed(2));
      setTotalBill(total.toFixed(2));
      setSubTotal(billAmount.toFixed(2));
    } else {
      setTotalTips("0.00");
      setTipAverage("0.00");
      setTotalBill("0.00");
      setSubTotal("0.00");
      setBill("");
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
      <h1>Tip Calculator v3</h1>
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
          {"How did your friend liked it?"}
        </TipSelect>
      </div>
      {bill < 1 ? (
        <h2 className="bill-prompt">Enter your bill amount</h2>
      ) : (
        <div>
          <h3>
            Your total is ${bill ? totalBill : bill} {`(${subTotal}`} +
            {totalTips > 0
              ? ` $${totalTips} 😀)  $${tipAverage} tip - each
                `
              : " No tip 😭)"}
          </h3>
        </div>
      )}

      <div>
        {bill || selectedOption1 || selectedOption2 ? (
          <button type="reset" className="button" onClick={handleReset}>
            Reset
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CalcV3;
