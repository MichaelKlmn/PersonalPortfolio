import React, { useState } from "react";
import Home from "./pages/Home";
import Software from "./pages/Software";
import "./App.css";

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="App">
      {/* HOME PAGE */}
      {!selected && <Home setSelected={setSelected} />}

      {/* SOFTWARE PAGE */}
      {selected === "software" && <Software onBack={() => setSelected(null)} />}

      {/* MODELLING PAGE (placeholder for now) */}
      {selected === "modelling" && (
        <div className="page-content">
          <h1>Michael Kleiman | Modelling</h1>
          <p>
            Editorial, commercial, and e-commerce work from Canada and abroad.
          </p>
          <button className="back-btn" onClick={() => setSelected(null)}>
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
