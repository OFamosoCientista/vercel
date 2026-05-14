import { useState } from "react";
import { DollarSign, Calendar } from "lucide-react";
import Input from "@mui/material/Input";

export default function ValoresAtrasados() {
  const [benefitValue, setBenefitValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [correctionRate, setCorrectionRate] = useState("5");
  const [result, setResult] = useState<{
    months: number;
    totalWithoutCorrection: number;
    correction: number;
    totalWithCorrection: number;
  } | null>(null);

  const calculate = () => {
    if (!benefitValue || !startDate || !endDate) return;

    const value = parseFloat(benefitValue);
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calcular meses entre as datas
    const diffTime = end.getTime() - start.getTime();
    const months = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

    if (months <= 0) {
      alert("A data final deve ser posterior à data inicial");
      return;
    }

    const totalWithoutCorrection = value * months;
    const rate = parseFloat(correctionRate) / 100;
    
    // Correção simplificada (juros compostos)
    const correction = totalWithoutCorrection * Math.pow(1 + rate / 12, months) - totalWithoutCorrection;
    const totalWithCorrection = totalWithoutCorrection + correction;

    setResult({
      months,
      totalWithoutCorrection,
      correction,
      totalWithCorrection
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-red-600" />
          Dados para Cálculo
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Valor Mensal do Benefício (R$)</label>
            <input
              type="number"
              step="0.01"
              value={benefitValue}
              onChange={(e) => setBenefitValue(e.target.value)}
              placeholder="Ex: 2000.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Data Inicial (DIB)</label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Data de Início do Benefício</p>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Data Final (Implantação)</label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Data em que o benefício foi efetivamente pago</p>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Taxa de Correção Anual (%)</label>
            <input
              type="number"
              step="0.1"
              value={correctionRate}
              onChange={(e) => setCorrectionRate(e.target.value)}
              placeholder="Ex: 5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Taxa IPCA/SELIC para correção monetária</p>
          </div>
        </div>

        <button
          onClick={calculate}
          className="mt-6 w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg hover:shadow-lg transition-all"
        >
          Calcular Valores Atrasados
        </button>
      </div>

      {result && (
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8" />
            <h3 className="text-2xl">Resultado do Cálculo</h3>
          </div>

          <div className="space-y-3">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm text-red-100 mb-1">Período de atraso</p>
              <p className="text-2xl">{result.months} meses</p>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm text-red-100 mb-1">Total sem correção</p>
              <p className="text-2xl">
                R$ {result.totalWithoutCorrection.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm text-red-100 mb-1">Valor da correção monetária</p>
              <p className="text-2xl">
                R$ {result.correction.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="bg-white/20 rounded-lg p-4 border-2 border-white/40">
              <p className="text-sm text-red-100 mb-1">Total com correção</p>
              <p className="text-3xl">
                R$ {result.totalWithCorrection.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/10 rounded-lg text-sm">
            <p><strong>Importante:</strong> Este cálculo é uma estimativa. Os valores reais 
            dependem dos índices oficiais de correção (IPCA-E, INPC, SELIC) aplicados mês a mês. 
            Consulte um advogado para cálculo preciso.</p>
          </div>
        </div>
      )}
    </div>
  );
}
