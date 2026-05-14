import { useState } from "react";
import { User, Calendar, Award } from "lucide-react";
import Input from "@mui/material/Input";

export default function AposentadoriaIdade() {
  const [gender, setGender] = useState<"masculino" | "feminino">("masculino");
  const [birthDate, setBirthDate] = useState("");
  const [contributionYears, setContributionYears] = useState("");
  const [result, setResult] = useState<{
    canRetire: boolean;
    currentAge: number;
    requiredAge: number;
    missingYears: number;
    retirementDate: string;
  } | null>(null);

  const calculate = () => {
    if (!birthDate || !contributionYears) return;

    const birth = new Date(birthDate);
    const today = new Date();
    const currentAge = today.getFullYear() - birth.getFullYear();
    const contributionYearsNum = parseFloat(contributionYears);

    // Regras atualizadas (2019)
    const requiredAge = gender === "masculino" ? 65 : 62;
    const minContribution = 15;

    const canRetire = currentAge >= requiredAge && contributionYearsNum >= minContribution;
    const missingYears = Math.max(0, requiredAge - currentAge);

    let retirementDate = "";
    if (!canRetire && missingYears > 0) {
      const futureDate = new Date(today);
      futureDate.setFullYear(today.getFullYear() + missingYears);
      retirementDate = futureDate.toLocaleDateString("pt-BR");
    }

    setResult({
      canRetire,
      currentAge,
      requiredAge,
      missingYears,
      retirementDate
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl mb-6 text-gray-800 flex items-center gap-2">
          <User className="w-6 h-6 text-blue-600" />
          Dados para Simulação
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700">Sexo</label>
            <div className="flex gap-4">
              <button
                onClick={() => setGender("masculino")}
                className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                  gender === "masculino"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-blue-300"
                }`}
              >
                Masculino
              </button>
              <button
                onClick={() => setGender("feminino")}
                className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                  gender === "feminino"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-blue-300"
                }`}
              >
                Feminino
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Data de Nascimento</label>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">Anos de Contribuição</label>
            <input
              type="number"
              step="0.1"
              value={contributionYears}
              onChange={(e) => setContributionYears(e.target.value)}
              placeholder="Ex: 20"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:shadow-lg transition-all"
        >
          Simular Aposentadoria
        </button>
      </div>

      {result && (
        <div className={`rounded-2xl shadow-lg p-6 md:p-8 ${
          result.canRetire 
            ? "bg-gradient-to-r from-green-600 to-green-700" 
            : "bg-gradient-to-r from-orange-600 to-orange-700"
        } text-white`}>
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8" />
            <h3 className="text-2xl">Resultado da Simulação</h3>
          </div>

          {result.canRetire ? (
            <div>
              <p className="text-xl mb-4">
                🎉 Você já pode se aposentar por idade!
              </p>
              <div className="bg-white/10 rounded-lg p-4 space-y-2">
                <p>Idade atual: <strong>{result.currentAge} anos</strong></p>
                <p>Tempo de contribuição: <strong>{contributionYears} anos</strong></p>
                <p>Requisitos atendidos: Idade mínima de {result.requiredAge} anos e 15 anos de contribuição</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xl mb-4">
                Você ainda não pode se aposentar por idade
              </p>
              <div className="bg-white/10 rounded-lg p-4 space-y-2">
                <p>Idade atual: <strong>{result.currentAge} anos</strong></p>
                <p>Idade necessária: <strong>{result.requiredAge} anos</strong></p>
                <p>Faltam: <strong>{result.missingYears} anos</strong></p>
                {result.retirementDate && (
                  <p>Data estimada para aposentadoria: <strong>{result.retirementDate}</strong></p>
                )}
              </div>
            </div>
          )}

          <div className="mt-4 p-3 bg-white/10 rounded-lg text-sm">
            <p><strong>Importante:</strong> Esta é uma simulação baseada nas regras atuais. 
            Consulte sempre um advogado previdenciário para análise detalhada do seu caso.</p>
          </div>
        </div>
      )}
    </div>
  );
}
