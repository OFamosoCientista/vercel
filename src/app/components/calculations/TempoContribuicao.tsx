import { useEffect, useState } from "react";
import { Plus, Trash2, Calendar } from "lucide-react";
import { Button } from "react-day-picker";
import Input from "@mui/material/Input";

interface Period {
  id: string;
  startDate: string;
  endDate: string;
}

const STORAGE_KEY = "calcprev-tempo-contribuicao";

export default function TempoContribuicao() {
  const [periods, setPeriods] = useState<Period[]>([
    { id: "1", startDate: "", endDate: "" }
  ]);
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as { periods?: Period[]; result?: { years: number; months: number; days: number } };
      if (parsed.periods && parsed.periods.length > 0) {
        setPeriods(parsed.periods);
      }
      if (parsed.result) {
        setResult(parsed.result);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do LocalStorage", error);
    }
  }, []);

  const saveToStorage = (updatedPeriods: Period[], calculationResult: { years: number; months: number; days: number } | null) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ periods: updatedPeriods, result: calculationResult }));
  };

  const addPeriod = () => {
    setPeriods([...periods, { id: Date.now().toString(), startDate: "", endDate: "" }]);
  };

  const removePeriod = (id: string) => {
    if (periods.length > 1) {
      setPeriods(periods.filter(p => p.id !== id));
    }
  };

  const updatePeriod = (id: string, field: "startDate" | "endDate", value: string) => {
    setPeriods(periods.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const calculateTime = () => {
    let totalDays = 0;

    periods.forEach(period => {
      if (period.startDate && period.endDate) {
        const start = new Date(period.startDate);
        const end = new Date(period.endDate);
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 0) {
          totalDays += diffDays;
        }
      }
    });

    const years = Math.floor(totalDays / 365);
    const remainingDays = totalDays % 365;
    const months = Math.floor(remainingDays / 30);
    const days = remainingDays % 30;

    const newResult = { years, months, days };
    setResult(newResult);
    saveToStorage(periods, newResult);
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPeriods([{ id: "1", startDate: "", endDate: "" }]);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-purple-600" />
          Períodos de Contribuição
        </h2>

        <div className="space-y-4">
          {periods.map((period, index) => (
            <div key={period.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Período {index + 1}</span>
                {periods.length > 1 && (
                  <Button
                    onClick={() => removePeriod(period.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Data Inicial</label>
                  <Input
                    type="date"
                    value={period.startDate}
                    onChange={(e) => updatePeriod(period.id, "startDate", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-700">Data Final</label>
                  <Input
                    type="date"
                    value={period.endDate}
                    onChange={(e) => updatePeriod(period.id, "endDate", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addPeriod}
          className="mt-4 flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Adicionar período</span>
        </button>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <button
            onClick={calculateTime}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Calcular Tempo Total
          </button>
          <button
            type="button"
            onClick={clearHistory}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-all"
          >
            Limpar histórico salvo
          </button>
        </div>

        <p className="mt-3 text-sm text-gray-500">
          Seus períodos e último resultado ficam salvos no navegador via LocalStorage.
        </p>
      </div>

      {result !== null && (
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="text-2xl mb-4">Resultado do Cálculo</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-4xl mb-2">{result.years}</div>
              <div className="text-sm text-purple-100">Anos</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-4xl mb-2">{result.months}</div>
              <div className="text-sm text-purple-100">Meses</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-4xl mb-2">{result.days}</div>
              <div className="text-sm text-purple-100">Dias</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-purple-100">
            Tempo total de contribuição calculado com base nos períodos informados
          </p>
        </div>
      )}
    </div>
  );
}
