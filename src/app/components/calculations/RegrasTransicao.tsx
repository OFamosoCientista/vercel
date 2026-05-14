import { useState } from "react";
import { Clock, CheckCircle } from "lucide-react";

export default function RegrasTransicao() {
  const [gender, setGender] = useState<"masculino" | "feminino">("masculino");
  const [age, setAge] = useState("");
  const [contributionYears, setContributionYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!age || !contributionYears) return;

    const idade = parseFloat(age);
    const contrib = parseFloat(contributionYears);

    const minContrib = gender === "masculino" ? 35 : 30;

    // IDADE PROGRESSIVA 2026
    const idadeMinProg = gender === "masculino" ? 63 : 58;
    const podeProg = idade >= idadeMinProg && contrib >= minContrib;

    // PEDÁGIO 100%
    const idadeMin100 = gender === "masculino" ? 60 : 57;
    const faltaBase = Math.max(0, minContrib - contrib);
    const pedagio100 = faltaBase; // 100%
    const podePedagio100 =
      idade >= idadeMin100 && contrib >= minContrib + pedagio100;

    // PEDÁGIO 50% (simplificado)
    const pedagio50 = faltaBase * 0.5;
    const podePedagio50 = contrib >= minContrib + pedagio50;

    setResult({
      idade,
      contrib,
      regras: {
        progressiva: {
          pode: podeProg,
          faltaIdade: Math.max(0, idadeMinProg - idade),
          faltaContrib: Math.max(0, minContrib - contrib),
        },
        pedagio100: {
          pode: podePedagio100,
          pedagio: pedagio100,
          idadeMin: idadeMin100,
        },
        pedagio50: {
          pode: podePedagio50,
          pedagio: pedagio50,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-green-600" />
          Regras de Transição (2019)
        </h2>

        {/* Sexo */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setGender("masculino")}
            className={`flex-1 py-3 rounded-lg border-2 ${
              gender === "masculino"
                ? "border-green-600 bg-green-50"
                : "border-gray-300"
            }`}
          >
            Masculino
          </button>

          <button
            onClick={() => setGender("feminino")}
            className={`flex-1 py-3 rounded-lg border-2 ${
              gender === "feminino"
                ? "border-green-600 bg-green-50"
                : "border-gray-300"
            }`}
          >
            Feminino
          </button>
        </div>

        {/* Inputs */}
        <input
          type="number"
          placeholder="Idade"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Tempo de contribuição"
          value={contributionYears}
          onChange={(e) => setContributionYears(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          onClick={calculate}
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Calcular
        </button>
      </div>

      {/* RESULTADO */}
      {result && (
        <div className="bg-gray-900 text-white p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle />
            <h3 className="text-xl">Resultado</h3>
          </div>

          {/* Idade Progressiva */}
          <div className="bg-white/10 p-4 rounded">
            <h4 className="font-bold">Idade mínima progressiva</h4>
            {result.regras.progressiva.pode ? (
              <p>✅ Pode se aposentar</p>
            ) : (
              <>
                <p>❌ Não pode ainda</p>
                <p>Falta idade: {result.regras.progressiva.faltaIdade} anos</p>
                <p>Falta contribuição: {result.regras.progressiva.faltaContrib} anos</p>
              </>
            )}
          </div>

          {/* Pedágio 100 */}
          <div className="bg-white/10 p-4 rounded">
            <h4 className="font-bold">Pedágio 100%</h4>
            {result.regras.pedagio100.pode ? (
              <p>✅ Pode se aposentar</p>
            ) : (
              <>
                <p>❌ Não pode ainda</p>
                <p>Pedágio: {result.regras.pedagio100.pedagio.toFixed(1)} anos</p>
              </>
            )}
          </div>

          {/* Pedágio 50 */}
          <div className="bg-white/10 p-4 rounded">
            <h4 className="font-bold">Pedágio 50%</h4>
            {result.regras.pedagio50.pode ? (
              <p>✅ Pode se aposentar</p>
            ) : (
              <>
                <p>❌ Não pode ainda</p>
                <p>Pedágio: {result.regras.pedagio50.pedagio.toFixed(1)} anos</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}