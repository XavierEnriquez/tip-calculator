export default function BillInput({ bill, onBill }) {
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
