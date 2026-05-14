import { useState } from "react";
import { Calculator, DollarSign } from "lucide-react";

export default function JurosCalculator() {
  const [capital, setCapital] = useState("");
  const [taxa, setTaxa] = useState("");
  const [tempo, setTempo] = useState("");
  const [tipo, setTipo] = useState<"simples" | "composto">("simples");

  const [result, setResult] = useState<{
    total: number;
    juros: number;
  } | null>(null);

  const calcular = () => {
    if (!capital || !taxa || !tempo) return;

    const c = parseFloat(capital);
    const i = parseFloat(taxa) / 100;
    const t = parseFloat(tempo);

    let total = 0;
    let juros = 0;

    if (tipo === "simples") {
      juros = c * i * t;
      total = c + juros;
    } else {
      total = c * Math.pow(1 + i, t);
      juros = total - c;
    }

    setResult({ total, juros });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-yellow-600" />
          Calculadora de Juros
        </h2>

        <div className="space-y-4">
          {/* Tipo */}
          <div>
            <label className="block text-sm mb-2 text-gray-700">Tipo de Juros</label>
            <div className="flex gap-4">
              <button
                onClick={() => setTipo("simples")}
                className={`flex-1 py-3 rounded-lg border-2 ${
                  tipo === "simples"
                    ? "border-yellow-600 bg-yellow-50 text-yellow-700"
                    : "border-gray-300"
                }`}
              >
                Simples
              </button>
              <button
                onClick={() => setTipo("composto")}
                className={`flex-1 py-3 rounded-lg border-2 ${
                  tipo === "composto"
                    ? "border-yellow-600 bg-yellow-50 text-yellow-700"
                    : "border-gray-300"
                }`}
              >
                Composto
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div>
            <label className="block text-sm mb-2">Capital (R$)</label>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              placeholder="Ex: 1000"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Taxa (%)</label>
            <input
              type="number"
              value={taxa}
              onChange={(e) => setTaxa(e.target.value)}
              placeholder="Ex: 5"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Tempo</label>
            <input
              type="number"
              value={tempo}
              onChange={(e) => setTempo(e.target.value)}
              placeholder="Ex: 12"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <button
          onClick={calcular}
          className="mt-6 w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-3 rounded-lg"
        >
          Calcular
        </button>
      </div>

      {/* Resultado */}
      {result && (
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign />
            <h3 className="text-xl">Resultado</h3>
          </div>

          <p className="text-lg">
            Total: <strong>R$ {result.total.toFixed(2)}</strong>
          </p>
          <p>
            Juros: <strong>R$ {result.juros.toFixed(2)}</strong>
          </p>

          <div className="mt-4 text-sm bg-white/10 p-3 rounded-lg">
            {tipo === "simples"
              ? "Juros simples: crescimento linear ao longo do tempo."
              : "Juros compostos: crescimento exponencial (juros sobre juros)."}
          </div>
        </div>
      )}
    </div>
  );
}