import React, { useState, useEffect } from "react";

const G2Mol = () => {
  const [mass, setMass] = useState("");
  const [basePairCount, setBasePairCount] = useState("");
  const [molar, setMolar] = useState(0);

  const [massUnit, setMassUnit] = useState("ng");
  const [bpUnit, setBpUnit] = useState("bp");
  const [molUnit, setMolUnit] = useState("pmol");

  useEffect(() => {
    const initialMassUnit = localStorage.getItem("massUnit") || "ng";
    const initialBpUnit = localStorage.getItem("bpUnit") || "bp";
    const initialMolUnit = localStorage.getItem("molUnit") || "pmol";
    setMassUnit(initialMassUnit);
    setBpUnit(initialBpUnit);
    setMolUnit(initialMolUnit);
  }, []);

  useEffect(() => {
    if (mass !== "" && basePairCount !== "") {
      const moles = calculateMoles(mass, basePairCount);
      setMolar(moles);
    } else {
      setMolar(0);
    }
  }, [mass, basePairCount, massUnit, bpUnit, molUnit]);

  useEffect(() => {
    localStorage.setItem("massUnit", massUnit);
  }, [massUnit]);

  useEffect(() => {
    localStorage.setItem("bpUnit", bpUnit);
  }, [bpUnit]);

  useEffect(() => {
    localStorage.setItem("molUnit", molUnit);
  }, [molUnit]);

  function calculateMoles(mass, basePairCount) {
    const gPerMol = 660;

    let g;
    switch (massUnit) {
      case "ng":
        g = mass * Math.pow(10, -9);
        break;
      case "ug":
        g = mass * Math.pow(10, -6);
        break;
      default:
        g = mass;
    }

    let bp;
    switch (bpUnit) {
      case "bp":
        bp = basePairCount;
        break;
      case "kbp":
        bp = basePairCount * Math.pow(10, 3);
        break;
      case "Mbp":
        bp = basePairCount * Math.pow(10, 6);
        break;
      default:
        bp = basePairCount;
    }

    const basePairMolWeight = gPerMol * bp;
    const moles = g / basePairMolWeight;

    let molRes;
    switch (molUnit) {
      case "fmol":
        molRes = moles * Math.pow(10, 15);
        break;
      case "pmol":
        molRes = moles * Math.pow(10, 12);
        break;
      case "nmol":
        molRes = moles * Math.pow(10, 9);
        break;
      default:
        molRes = moles;
    }

    return molRes;
  }

  return (
    <div className="flex flex-col space-y-3 max-w-lg">
      <div className="flex flex-row justify-between items-center">
        <span>質量 (Mass):</span>
        <div>
          <input
            type="number"
            value={mass}
            onChange={(e) =>
              setMass(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 text-right"
          />
          <select
            value={massUnit}
            onChange={(e) => setMassUnit(e.target.value)}
          >
            <option value="ng">ng</option>
            <option value="ug">ug</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <span>塩基数 (Base Pair Count):</span>
        <div>
          <input
            type="number"
            value={basePairCount}
            onChange={(e) =>
              setBasePairCount(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300 text-right"
          />
          <select value={bpUnit} onChange={(e) => setBpUnit(e.target.value)}>
            <option value="bp">bp</option>
            <option value="kbp">kbp</option>
            <option value="Mbp">Mbp</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <span>モル数 (Molar):</span>
        <div>
          <p className="text-xl font-semibold text-right inline mr-1">
            {molar.toFixed(3)}
          </p>
          <select value={molUnit} onChange={(e) => setMolUnit(e.target.value)}>
            <option value="fmol">fmol</option>
            <option value="pmol">pmol</option>
            <option value="nmol">nmol</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default G2Mol;
