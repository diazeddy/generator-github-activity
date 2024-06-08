import { ChangeEvent, useState } from "react";

import "./App.css";
import { generate } from "./api";

function App() {
  const [startDate, setStartDate] = useState(new Date(2020, 7, 20, 0, 0, 0));
  const [endDate, setEndDate] = useState(new Date(2020, 7, 21, 0, 0, 0));
  const [commits, setCommits] = useState(5);
  const [frequency, setFrequency] = useState(100);

  const onChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value.split("-");
    setStartDate(new Date(Number(values[0]), Number(values[1]) - 1, Number(values[2]), 0, 0, 0));
  }
  const onChangeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value.split("-");
    setEndDate(new Date(Number(values[0]), Number(values[1]) - 1, Number(values[2]), 0, 0, 0));
  }
  const onChangeCommits = (e: ChangeEvent<HTMLInputElement>) => {
    setCommits(Number(e.target.value));
  }
  const onChangeFrequency = (e: ChangeEvent<HTMLInputElement>) => {
    setFrequency(Number(e.target.value));
  }
  const onClickGenerate = async () => {
    if (startDate > endDate || commits < 0 || frequency < 0) {
      alert("Invalid data");
    }
    await generate(startDate, endDate, commits, frequency);
  }

  return (
    <section>
      <label>Start Date:</label>
      <input type="date" value={startDate.toISOString().slice(0, 10)} onChange={onChangeStartDate}  />
      <label>End Date:</label>
      <input type="date" value={endDate.toISOString().slice(0, 10)} onChange={onChangeEndDate} />
      <label>Commits:</label>
      <input type="number" value={commits} onChange={onChangeCommits} />
      <label>Frequency:</label>
      <input type="number" value={frequency} onChange={onChangeFrequency} />
      <button onClick={onClickGenerate}>Generate</button>
    </section>
  );
}

export default App;
