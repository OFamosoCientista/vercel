import { useState } from "react";
import { Calculator, Table } from "lucide-react";

export default function AmortizacaoCalculator() {
  const [valor, setValor] = useState("");
  const [juros, setJuros] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [tipo, setTipo] = useState<"price" | "sac">("price");

  const [resultado, setResultado] = useState<any[]>([]);

  const calcular = () => {
    if (!valor || !juros || !parcelas) return;

    const v = parseFloat(valor);
    const j = parseFloat(juros) / 100;
    const p = parseInt(parcelas);

    let saldo = v;
    let dados: any[] = [];

    if (tipo === "price") {
      let parcela;

      if (j === 0) {
        parcela = v / p;
      } else {
        parcela = v * (j * Math.pow(1 + j, p)) / (Math.pow(1 + j, p) - 1);
      }

      for (let i = 1; i <= p; i++) {
        const jurosParcela = saldo * j;
        const amortizacao = parcela - jurosParcela;
        saldo -= amortizacao;

        dados.push({
          parcela: i,
          juros: jurosParcela,
          amortizacao,
          total: parcela,
          saldo: saldo > 0 ? saldo : 0
        });
      }
    } else {
      const amortizacao = v / p;

      for (let i = 1; i <= p; i++) {
        const jurosParcela = saldo * j;
        const parcela = amortizacao + jurosParcela;
        saldo -= amortizacao;

        dados.push({
          parcela: i,
          juros: jurosParcela,
          amortizacao,
          total: parcela,
          saldo: saldo > 0 ? saldo : 0
        });
      }
    }

    setResultado(dados);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl mb-6 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-green-600" />
          Cálculo de Amortização
        </h2>

        <div className="space-y-4">
          {/* Tipo */}
          <div>
            <label className="block text-sm mb-2">Sistema</label>
            <div className="flex gap-4">
              <button
                onClick={() => setTipo("price")}
                className={`flex-1 py-3 rounded-lg border-2 ${
                  tipo === "price"
                    ? "border-yellow-600 bg-amber-50 text-amber-600"
                    : "border-gray-300"
                }`}
              >
                PRICE
              </button>
              <button
                onClick={() => setTipo("sac")}
                className={`flex-1 py-3 rounded-lg border-2 ${
                  tipo === "sac"
                    ? "border-yellow-600 bg-amber-50 text-amber-600"
                    : "border-gray-300"
                }`}
              >
                SAC
              </button>
            </div>
          </div>

          {/* Inputs */}
          <input
            type="number"
            placeholder="Valor (R$)"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="number"
            placeholder="Taxa (%)"
            value={juros}
            onChange={(e) => setJuros(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="number"
            placeholder="Parcelas"
            value={parcelas}
            onChange={(e) => setParcelas(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          onClick={calcular}
          className="mt-6 w-full bg-amber-600 text-white py-3 rounded-lg"
        >
          Calcular
        </button>
      </div>

      {/* Resultado */}
      {resultado.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
        <h3 className="text-xl mb-4 flex items-center gap-2">
            <Table className="w-5 h-5 text-amber-600" />
            Tabela de Amortização
        </h3>

        <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-amber-400 to-amber-600 text-white">
                <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-right">Juros</th>
                <th className="py-3 px-4 text-right">Amortização</th>
                <th className="py-3 px-4 text-right">Parcela</th>
                <th className="py-3 px-4 text-right">Saldo</th>
                </tr>
            </thead>

            <tbody>
                {resultado.map((item, i) => (
                <tr
                    key={i}
                    className={`transition hover:bg-amber-50 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                >
                    <td className="py-3 px-4 font-medium text-gray-700">
                    {item.parcela}
                    </td>

                    <td className="py-3 px-4 text-right text-gray-600">
                    R$ {item.juros.toFixed(2)}
                    </td>

                    <td className="py-3 px-4 text-right text-gray-600">
                    R$ {item.amortizacao.toFixed(2)}
                    </td>

                    <td className="py-3 px-4 text-right font-semibold text-gray-800">
                    R$ {item.total.toFixed(2)}
                    </td>

                    <td className="py-3 px-4 text-right font-medium text-green-600">
                    R$ {item.saldo.toFixed(2)}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
      )}
    </div>
  );
}