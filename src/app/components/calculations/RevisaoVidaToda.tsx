import { useState } from "react";
import { TrendingUp, Calculator, AlertCircle } from "lucide-react";

export default function RevisaoVidaToda() {
  const [currentBenefit, setCurrentBenefit] = useState("");
  const [contributionsBefore1994, setContributionsBefore1994] = useState("");
  const [contributionsAfter1994, setContributionsAfter1994] = useState("");
  const [result, setResult] = useState<{
    currentValue: number;
    estimatedNewValue: number;
    difference: number;
    percentageIncrease: number;
    worthwhile: boolean;
  } | null>(null);

  const calculate = () => {
    if (!currentBenefit || !contributionsBefore1994 || !contributionsAfter1994) return;

    const current = parseFloat(currentBenefit);
    const before94 = parseFloat(contributionsBefore1994);
    const after94 = parseFloat(contributionsAfter1994);

    // Cálculo simplificado da média
    const totalContributions = before94 + after94;
    const averageWithAllContributions = totalContributions / 2;

    // Estimativa: se contribuições antes de 1994 são maiores, pode haver ganho
    const estimatedIncrease = before94 > after94 ? 1.15 : 1.05;
    const estimatedNewValue = (current / after94) * averageWithAllContributions * estimatedIncrease;

    const difference = estimatedNewValue - current;
    const percentageIncrease = ((estimatedNewValue - current) / current) * 100;
    const worthwhile = difference > 0;

    setResult({
      currentValue: current,
      estimatedNewValue,
      difference,
      percentageIncrease,
      worthwhile
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-orange-600" />
          Dados do Benefício
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Valor Atual do Benefício (R$)</label>
            <input
              type="number"
              step="0.01"
              value={currentBenefit}
              onChange={(e) => setCurrentBenefit(e.target.value)}
              placeholder="Ex: 2500.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Média das Contribuições ANTES de julho/1994 (R$)
            </label>
            <input
              type="number"
              step="0.01"
              value={contributionsBefore1994}
              onChange={(e) => setContributionsBefore1994(e.target.value)}
              placeholder="Ex: 3000.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Média das Contribuições APÓS julho/1994 (R$)
            </label>
            <input
              type="number"
              step="0.01"
              value={contributionsAfter1994}
              onChange={(e) => setContributionsAfter1994(e.target.value)}
              placeholder="Ex: 2000.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-4 p-4 bg-amber-50 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            A Revisão da Vida Toda permite incluir todas as contribuições, inclusive as anteriores 
            a julho de 1994, no cálculo do benefício. Pode ser vantajosa se suas contribuições 
            antes de 1994 eram maiores.
          </p>
        </div>

        <button
          onClick={calculate}
          className="mt-6 w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 rounded-lg hover:shadow-lg transition-all"
        >
          Calcular Revisão
        </button>
      </div>

      {result && (
        <div className={`rounded-2xl shadow-lg p-6 md:p-8 ${
          result.worthwhile 
            ? "bg-gradient-to-r from-green-600 to-green-700" 
            : "bg-gradient-to-r from-gray-600 to-gray-700"
        } text-white`}>
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8" />
            <h3 className="text-2xl">Resultado da Simulação</h3>
          </div>

          {result.worthwhile ? (
            <div>
              <p className="text-xl mb-4">
                ✅ A revisão pode ser vantajosa!
              </p>
              <div className="bg-white/10 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Valor atual do benefício:</span>
                  <strong className="text-xl">
                    R$ {result.currentValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </strong>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span>Valor estimado com revisão:</span>
                  <strong className="text-xl">
                    R$ {result.estimatedNewValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ganho estimado mensal:</span>
                  <strong className="text-2xl text-green-200">
                    + R$ {result.difference.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </strong>
                </div>
                <div className="flex justify-between items-center">
                  <span>Aumento percentual:</span>
                  <strong className="text-xl text-green-200">
                    +{result.percentageIncrease.toFixed(2)}%
                  </strong>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xl mb-4">
                ⚠️ A revisão pode não ser vantajosa
              </p>
              <div className="bg-white/10 rounded-lg p-4 space-y-2">
                <p>Valor atual: R$ {result.currentValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                <p>Valor estimado com revisão: R$ {result.estimatedNewValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                <p className="mt-2 text-sm">
                  Com base nos dados informados, a revisão pode não resultar em aumento significativo.
                </p>
              </div>
            </div>
          )}

          <div className="mt-4 p-3 bg-white/10 rounded-lg text-sm">
            <p><strong>Importante:</strong> Esta é uma simulação simplificada. O cálculo real 
            envolve análise detalhada do histórico contributivo. Consulte um advogado previdenciário 
            para uma avaliação precisa do seu caso.</p>
          </div>
        </div>
      )}
    </div>
  );
}
