import { ChangeEvent, useState } from "react";
import { generate } from "./api";

function App() {
  const [startDate, setStartDate] = useState(new Date(2020, 7, 20, 0, 0, 0));
  const [endDate, setEndDate] = useState(new Date(2020, 7, 21, 0, 0, 0));
  const [commits, setCommits] = useState(10);
  const [frequency, setFrequency] = useState(50);

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
    <section className="w-screen h-screen flex items-center justify-center p-10">
      <div className="w-1/2 bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-5">GitHub Commit Generator</h1>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
            <input type="date" value={startDate.toISOString().slice(0, 10)} onChange={onChangeStartDate} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
            <input type="date" value={endDate.toISOString().slice(0, 10)} onChange={onChangeEndDate} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Commits:</label>
            <input type="number" value={commits} onChange={onChangeCommits} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Frequency:</label>
            <input type="number" value={frequency} onChange={onChangeFrequency} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
        </div>
        <button onClick={onClickGenerate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5">Generate</button>
      </div>
    </section>
  );
}

export default App;
