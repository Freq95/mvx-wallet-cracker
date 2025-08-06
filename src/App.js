import React from "react";
import GuardianSim from "./GuardianSim";

function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <div className="flex-grow overflow-hidden p-4">
        <GuardianSim />
      </div>
      <footer className="text-center text-sm text-gray-400 p-2">
        v0.2.0.2025
      </footer>
    </div>
  );
}

export default App;
