import { useState } from "react";
import "./App.css";
import React from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <h1 className="text-red-500">
      Design It
    </h1>
  );
}

export default App;
