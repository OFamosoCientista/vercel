import { Link } from "react-router";
import { Calculator, Clock, TrendingUp, FileText, DollarSign, Award, BadgeDollarSign, Table } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "../contexts/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

interface CalculationCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const categories: CalculationCategory[] = [
  {
    id: "tempo-contribuicao",
    title: "Tempo de Contribuição",
    description: "Calcule o tempo total de contribuição ao INSS",
    icon: <Clock className="w-8 h-8" />,
    color: "from-purple-500 to-purple-700"
  },
  {
    id: "aposentadoria-idade",
    title: "Aposentadoria por Idade",
    description: "Simule sua aposentadoria por idade",
    icon: <Award className="w-8 h-8" />,
    color: "from-blue-500 to-blue-700"
  },
  {
    id: "aposentadoria-contribuicao",
    title: "Aposentadoria por Tempo de Contribuição",
    description: "Verifique se você já pode se aposentar",
    icon: <Calculator className="w-8 h-8" />,
    color: "from-green-500 to-green-700"
  },
  {
    id: "revisao-vida-toda",
    title: "Revisão da Vida Toda",
    description: "Calcule o valor da revisão da vida toda",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "from-orange-500 to-orange-700"
  },
  {
    id: "valores-atrasados",
    title: "Valores Atrasados",
    description: "Calcule valores atrasados de benefícios",
    icon: <DollarSign className="w-8 h-8" />,
    color: "from-red-500 to-red-700"
  },
  {
    id: "rmi",
    title: "Renda Mensal Inicial (RMI)",
    description: "Calcule a renda mensal inicial do benefício",
    icon: <FileText className="w-8 h-8" />,
    color: "from-pink-500 to-pink-700"
  },
  {
    id: "juros",
    title: "Juros Simples e Compostos",
    description: "Calcule o valor final e os juros de um investimento ao longo do tempo",
    icon: <BadgeDollarSign className="w-8 h-8" />,
    color: "from-yellow-500 to-yellow-700"
  },
  {
    id: "amortizacao",
    title: "Amortização (PRICE e SAC)",
    description: "Simule financiamentos com tabela de amortização detalhada",
    icon: <Table className="w-8 h-8" />,
    color: "from-amber-400 to-amber-600"
  },
  {
    id: "regras-transicao",
    title: "Regras de Transição",
    description: "Calcule as regras de transição para aposentadoria conforme as leis vigentes",
    icon: <FileText className="w-8 h-8" />,
    color: "from-teal-500 to-teal-700"
  }
];

export default function Home() {
  useEffect(() => {
    document.title = "Cálculos Previdenciários Gratuitos | CalcPrev - INSS Online";
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl mb-6">
            Cálculos Previdenciários
          </h1>
          <p className="text-xl md:text-2xl text-blue-50 mb-4">
            Plataforma gratuita e acessível para profissionais do direito
          </p>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Ferramentas precisas e intuitivas para cálculos do INSS, 
            desenvolvidas pensando em advogados, estudantes e pequenos escritórios
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4 text-gray-800">
            Escolha o tipo de cálculo
          </h2>
          <p className="text-xl text-gray-600">
            Selecione uma das opções abaixo para realizar seu cálculo
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/calculo/${category.id}`}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full transform group-hover:scale-105">
                <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    {category.icon}
                    <div className="bg-white/20 rounded-full p-2">
                      <Calculator className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl">
                    {category.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-lg">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-indigo-600 group-hover:text-indigo-700">
                    <span className="mr-2">Calcular agora</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h3 className="text-3xl text-center mb-8 text-gray-800">
            Por que usar nossa plataforma?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl mb-2 text-gray-800">100% Gratuito</h4>
              <p className="text-gray-600">
                Todos os cálculos disponíveis sem necessidade de assinatura ou pagamento
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl mb-2 text-gray-800">Simples e Intuitivo</h4>
              <p className="text-gray-600">
                Interface limpa e fácil de usar, ideal para todos os níveis de experiência
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl mb-2 text-gray-800">Sempre Atualizado</h4>
              <p className="text-gray-600">
                Cálculos baseados nas regras previdenciárias mais recentes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}