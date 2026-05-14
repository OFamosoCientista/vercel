import { useState } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";
import { Button } from "react-day-picker";

interface Salary {
  id: string;
  value: string;
}

export default function RMI() {
  const [salaries, setSalaries] = useState<Salary[]>([
    { id: "1", value: "" },
    { id: "2", value: "" },
    { id: "3", value: "" }
  ]);
  const [coefficient, setCoefficient] = useState("100");
  const [result, setResult] = useState<{
    average: number;
    rmi: number;
    coefficient: number;
  } | null>(null);

  const addSalary = () => {
    setSalaries([...salaries, { id: Date.now().toString(), value: "" }]);
  };

  const removeSalary = (id: string) => {
    if (salaries.length > 1) {
      setSalaries(salaries.filter(s => s.id !== id));
    }
  };

  const updateSalary = (id: string, value: string) => {
    setSalaries(salaries.map(s => s.id === id ? { ...s, value } : s));
  };

  const calculate = () => {
    const validSalaries = salaries
      .filter(s => s.value && parseFloat(s.value) > 0)
      .map(s => parseFloat(s.value));

    if (validSalaries.length === 0) {
      alert("Adicione pelo menos um salário de contribuição");
      return;
    }

    const sum = validSalaries.reduce((acc, val) => acc + val, 0);
    const average = sum / validSalaries.length;
    const coeff = parseFloat(coefficient) / 100;
    const rmi = average * coeff;

    setResult({
      average,
      rmi,
      coefficient: parseFloat(coefficient)
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-2">
          <FileText className="w-6 h-6 text-pink-600" />
          Salários de Contribuição
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          Informe os salários de contribuição que serão utilizados no cálculo da média. 
          Normalmente são os 80% maiores salários desde julho/1994.
        </p>

        <div className="space-y-3">
          {salaries.map((salary, index) => (
            <div key={salary.id} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 w-16">#{index + 1}</span>
                  <input
                    type="number"
                    step="0.01"
                    value={salary.value}
                    onChange={(e) => updateSalary(salary.id, e.target.value)}
                    placeholder="R$ 0,00"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
              {salaries.length > 1 && (
                <Button
                  onClick={() => removeSalary(salary.id)}
                  className="text-red-500 hover:text-red-700 transition-colors p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addSalary}
          className="mt-4 flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Adicionar salário</span>
        </button>

        <div className="mt-6 pt-6 border-t">
          <label className="block text-sm mb-2 text-gray-700">
            Coeficiente de Cálculo (%)
          </label>
          <input
            type="number"
            step="1"
            value={coefficient}
            onChange={(e) => setCoefficient(e.target.value)}
            placeholder="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            100% para aposentadoria por idade com 15 anos de contribuição. 
            Para tempos maiores, acrescente 1% por ano adicional.
          </p>
        </div>

        <button
          onClick={calculate}
          className="mt-6 w-full bg-gradient-to-r from-pink-600 to-pink-700 text-white py-3 rounded-lg hover:shadow-lg transition-all"
        >
          Calcular RMI
        </button>
      </div>

      {result && (
        <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8" />
            <h3 className="text-2xl">Resultado do Cálculo</h3>
          </div>

          <div className="space-y-3">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm text-pink-100 mb-1">Média dos salários de contribuição</p>
              <p className="text-2xl">
                R$ {result.average.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm text-pink-100 mb-1">Coeficiente aplicado</p>
              <p className="text-2xl">{result.coefficient}%</p>
            </div>

            <div className="bg-white/20 rounded-lg p-4 border-2 border-white/40">
              <p className="text-sm text-pink-100 mb-1">Renda Mensal Inicial (RMI)</p>
              <p className="text-3xl">
                R$ {result.rmi.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/10 rounded-lg text-sm">
            <p><strong>Importante:</strong> Este é o cálculo básico da RMI. O valor final 
            do benefício pode sofrer ajustes conforme regras específicas e teto previdenciário. 
            Consulte um advogado para análise completa.</p>
          </div>
        </div>
      )}
    </div>
  );
}
