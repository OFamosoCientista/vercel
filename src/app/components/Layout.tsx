import { Outlet, Link } from "react-router";
import { Scale, Home, Menu, LogIn, UserPlus, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "../contexts/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("Saiu da conta");
      })
      .catch(console.error);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Scale className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-800 group-hover:text-purple-600 transition-colors">
                  CalcPrev
                </h1>
                <p className="text-xs text-gray-500">Cálculos Previdenciários</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Início</span>
              </Link>
              <a
                href="https://trello.com/b/bgDyuAh0/desenvolvido-web"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Sobre o Projeto
              </a>

              {user ? (
                <>
                  <div className="flex items-center gap-2 text-gray-700 px-3 py-2 bg-gray-100 rounded-lg">
                    <Link
                      to="/perfil"
                      className="text-gray-700 text-sm hover:text-purple-600 transition"
                    >
                    <User className="w-5 h-5" />
                    <span className="font-medium">
                      {user?.displayName || user?.email}
                    </span>
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sair</span>
                  </button>
                </>             
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Entrar</span>
                  </Link>
                  <Link
                    to="/cadastro"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Cadastrar</span>
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              title={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t flex flex-col gap-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors py-2"
              >
                <Home className="w-5 h-5" />
                <span>Início</span>
              </Link>
              <a
                href="https://trello.com/b/bgDyuAh0/desenvolvido-web"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all text-center"
              >
                Sobre o Projeto
              </a>

              {user ? (
                <>
                  <div className="flex items-center gap-2 text-gray-700 px-4 py-2 bg-gray-100 rounded-lg">
                    <User className="w-5 h-5" />
                    <span className="font-medium">
                      {user?.displayName || user?.email}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors py-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sair</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors py-2"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Entrar</span>
                  </Link>
                  <Link
                    to="/cadastro"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all text-center"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Cadastrar</span>
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-6 h-6 text-purple-400" />
                <span className="text-xl">CalcPrev</span>
              </div>
              <p className="text-gray-400">
                Plataforma gratuita para cálculos previdenciários, desenvolvida para 
                facilitar o trabalho de profissionais do direito.
              </p>
            </div>
            <div>
              <h3 className="text-lg mb-4">Sobre</h3>
              <p className="text-gray-400">
                Projeto acadêmico desenvolvido em 2026 com foco em acessibilidade 
                e simplicidade para cálculos do INSS.
              </p>
            </div>
            <div>
              <h3 className="text-lg mb-4">Importante</h3>
              <p className="text-gray-400 text-sm">
                Esta ferramenta é fornecida gratuitamente para fins educacionais. 
                Os resultados são estimativas e devem ser verificados por profissionais qualificados.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; 2026 CalcPrev. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
