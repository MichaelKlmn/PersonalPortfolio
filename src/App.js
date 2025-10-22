import React, { useState } from "react";
import Home from "./pages/Home";
import Software from "./pages/Software";
import Modelling from "./pages/Modelling";
import "./App.css";

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="App">
      {/* HOME PAGE */}
      {!selected && <Home setSelected={setSelected} />}

      {/* SOFTWARE PAGE */}
      {selected === "software" && <Software onBack={() => setSelected(null)} />}

      {/* MODELLING PAGE */}
      {selected === "modelling" && (
        <Modelling onBack={() => setSelected(null)} />
      )}
    </div>
  );
}

export default App;
