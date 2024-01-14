import React, { useState } from "react";
import * as XLSX from "xlsx";
import { EmployeeAnalysis } from "./components/EmployeeAnalyze";
import './App.css'

const App = () => {
  const [file, setFile] = useState([]);

  const handleFile = async (e) => {
    console.log("reading input file:");
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });

    setFile(jsonData);
  };

  return (
    <>
      <input  type="file" onChange={handleFile} />

      <EmployeeAnalysis fileData={file} />
    </>
  );
};

export default App;
