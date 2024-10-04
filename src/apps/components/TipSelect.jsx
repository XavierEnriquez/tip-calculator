import TipOption from "./TipOption";

export default function TipSelect({
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
