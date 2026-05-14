import { useParams, Link } from "react-router";
import { ArrowLeft, Calculator, Download, Info } from "lucide-react";
import { useState } from "react";
import TempoContribuicao from "../components/calculations/TempoContribuicao";
import AposentadoriaIdade from "../components/calculations/AposentadoriaIdade";
import AposentadoriaContribuicao from "../components/calculations/AposentadoriaContribuicao";
import RevisaoVidaToda from "../components/calculations/RevisaoVidaToda";
import ValoresAtrasados from "../components/calculations/ValoresAtrasados";
import RMI from "../components/calculations/RMI";

const calculationInfo: Record<string, { title: string; description: string; color: string }> = {
  "tempo-contribuicao": {
    title: "Tempo de Contribuição",
    description: "Calcule o tempo total de contribuição ao INSS considerando todos os períodos trabalhados",
    color: "from-purple-500 to-purple-700"
  },
  "aposentadoria-idade": {
    title: "Aposentadoria por Idade",
    description: "Simule quando você poderá se aposentar por idade conforme as regras atuais",
    color: "from-blue-500 to-blue-700"
  },
  "aposentadoria-contribuicao": {
    title: "Aposentadoria por Tempo de Contribuição",
    description: "Verifique se você já possui tempo suficiente para aposentadoria",
    color: "from-green-500 to-green-700"
  },
  "revisao-vida-toda": {
    title: "Revisão da Vida Toda",
    description: "Calcule o valor potencial da revisão incluindo contribuições anteriores a 1994",
    color: "from-orange-500 to-orange-700"
  },
  "valores-atrasados": {
    title: "Valores Atrasados",
    description: "Calcule valores retroativos de benefícios previdenciários com correção",
    color: "from-red-500 to-red-700"
  },
  "rmi": {
    title: "Renda Mensal Inicial (RMI)",
    description: "Calcule a renda mensal inicial do seu benefício previdenciário",
    color: "from-pink-500 to-pink-700"
  }
};

export default function CalculationPage() {
  const { tipo } = useParams<{ tipo: string }>();
  const info = tipo ? calculationInfo[tipo] : null;

  if (!info || !tipo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl mb-4 text-gray-800">Cálculo não encontrado</h1>
          <Link to="/" className="text-purple-600 hover:text-purple-700">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  const renderCalculation = () => {
    switch (tipo) {
      case "tempo-contribuicao":
        return <TempoContribuicao />;
      case "aposentadoria-idade":
        return <AposentadoriaIdade />;
      case "aposentadoria-contribuicao":
        return <AposentadoriaContribuicao />;
      case "revisao-vida-toda":
        return <RevisaoVidaToda />;
      case "valores-atrasados":
        return <ValoresAtrasados />;
      case "rmi":
        return <RMI />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className={`bg-gradient-to-r ${info.color} text-white py-12 px-4`}>
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 mb-6 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <div className="flex items-start gap-4">
            <Calculator className="w-12 h-12 flex-shrink-0" />
            <div>
              <h1 className="text-4xl mb-3">{info.title}</h1>
              <p className="text-xl text-white/90">{info.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculation Form */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {renderCalculation()}
      </div>
    </div>
  );
}
