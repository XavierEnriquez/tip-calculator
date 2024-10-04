export default function TipOption({ num, onValue, children }) {
  return (
    <option num={num} value={onValue}>
      {children}
    </option>
  );
}
