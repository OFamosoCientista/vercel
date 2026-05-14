import { useState } from "react";
import { Clock, User, CheckCircle } from "lucide-react";

export default function AposentadoriaContribuicao() {
  const [gender, setGender] = useState<"masculino" | "feminino">("masculino");
  const [contributionYears, setContributionYears] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState<{
    canRetire: boolean;
    rule: string;
    points: number;
    requiredPoints: number;
    missingYears: number;
  } | null>(null);

  const calculate = () => {
    if (!contributionYears || !age) return;

    const yearsNum = parseFloat(contributionYears);
    const ageNum = parseFloat(age);

    // Regra de pontos (2026)
    const requiredPoints = gender === "masculino" ? 103 : 93;
    const minContribution = gender === "masculino" ? 35 : 30;

    const currentPoints = ageNum + yearsNum;
    const canRetire = currentPoints >= requiredPoints && yearsNum >= minContribution;
    const missingYears = Math.max(0, minContribution - yearsNum);

    let rule = "Regra de Pontos";
    if (yearsNum >= minContribution && currentPoints < requiredPoints) {
      rule = "Tempo mínimo atingido, mas faltam pontos";
    } else if (yearsNum < minContribution) {
      rule = "Tempo mínimo de contribuição não atingido";
    }

    setResult({
      canRetire,
      rule,
      points: currentPoints,
      requiredPoints,
      missingYears
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-2">
          <Clock className="w-6 h-6 text-green-600" />
          Dados para Cálculo
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Sexo</label>
            <div className="flex gap-4">
              <button
                onClick={() => setGender("masculino")}
                className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                  gender === "masculino"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-300 hover:border-green-300"
                }`}
              >
                Masculino
              </button>
              <button
                onClick={() => setGender("feminino")}
                className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                  gender === "feminino"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-300 hover:border-green-300"
                }`}
              >
                Feminino
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Idade Atual (anos)</label>
            <input
              type="number"
              step="0.1"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Ex: 58"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Tempo de Contribuição (anos)</label>
            <input
              type="number"
              step="0.1"
              value={contributionYears}
              onChange={(e) => setContributionYears(e.target.value)}
              placeholder="Ex: 35"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Requisitos:</strong> {gender === "masculino" ? "35" : "30"} anos de contribuição 
            e {gender === "masculino" ? "100" : "90"} pontos (idade + tempo de contribuição)
          </p>
        </div>

        <button
          onClick={calculate}
          className="mt-6 w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg hover:shadow-lg transition-all"
        >
          Verificar Aposentadoria
        </button>
      </div>

      {result && (
        <div className={`rounded-2xl shadow-lg p-6 md:p-8 ${
          result.canRetire 
            ? "bg-gradient-to-r from-green-600 to-green-700" 
            : "bg-gradient-to-r from-orange-600 to-orange-700"
        } text-white`}>
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8" />
            <h3 className="text-2xl">Resultado</h3>
          </div>

          {result.canRetire ? (
            <div>
              <p className="text-xl mb-4">
                🎉 Você já pode se aposentar por tempo de contribuição!
              </p>
              <div className="bg-white/10 rounded-lg p-4 space-y-2">
                <p>Pontuação atual: <strong>{result.points} pontos</strong></p>
                <p>Pontuação necessária: <strong>{result.requiredPoints} pontos</strong></p>
                <p>Tempo de contribuição: <strong>{contributionYears} anos</strong></p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xl mb-4">
                Você ainda não pode se aposentar
              </p>
              <div className="bg-white/10 rounded-lg p-4 space-y-2">
                <p>Pontuação atual: <strong>{result.points} pontos</strong></p>
                <p>Pontuação necessária: <strong>{result.requiredPoints} pontos</strong></p>
                <p>Faltam: <strong>{result.requiredPoints - result.points} pontos</strong></p>
                {result.missingYears > 0 && (
                  <p>Tempo mínimo de contribuição faltante: <strong>{result.missingYears} anos</strong></p>
                )}
                <p className="mt-2 text-sm">Situação: <strong>{result.rule}</strong></p>
              </div>
            </div>
          )}

          <div className="mt-4 p-3 bg-white/10 rounded-lg text-sm">
            <p><strong>Importante:</strong> Este cálculo considera a regra de pontos. 
            Outras regras de transição podem ser mais vantajosas. Consulte um advogado previdenciário.</p>
          </div>
        </div>
      )}
    </div>
  );
}
