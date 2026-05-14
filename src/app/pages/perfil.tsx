import { useEffect, useState } from "react";
import { auth, db } from "../contexts/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import emailjs from "emailjs-com";


export default function Perfil() {
    const [user, setUser] = useState<any>(null);
    const [dados, setDados] = useState<any>(null);
    const navigate = useNavigate();
    const [mensagem, setMensagem] = useState('');
    const [assunto, setAssunto] = useState('');
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (!currentUser) {
            navigate("/login");
            return;
        }

        setUser(currentUser);

        // 🔥 busca dados do Firestore
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setDados(docSnap.data());
        }
        });

        return () => unsubscribe();
    }, []);

    function fazerLogout() {
        signOut(auth)
        .then(() => {
            console.log("Você saiu da conta");
            navigate("/login");
        })
        .catch(console.error);
    }
    

    function enviarEmail(e: any) {
        e.preventDefault();

        const templateParams = {
            from_name: dados?.name || user.displayName || user.email,
            message: mensagem,
            subject: assunto,
            title: assunto,
            email: user.email
        };

        emailjs.send(
                "service_w4tucj6",
                "template_c8ar99p",
                templateParams,
                "CTVZxh3Ph68Jl-eyu"
        )
        .then(() => {
            console.log("Email enviado com sucesso!");
            setMensagem('');
            setAssunto('');
        })
        .catch((err) => {
            console.error(err);
            console.log("Erro ao enviar email");
        });
    }
    
     if (!user) {
        return (
        <div className="p-6 text-center text-gray-600">
            Carregando...
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
            <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Perfil do Usuário
                </h1>

                <div className="space-y-4">

                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Nome</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {dados?.name || user.displayName || "Não informado"}
                    </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {user.email}
                    </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">ID do Usuário</p>
                    <p className="text-sm text-gray-700 break-all">
                    {user.uid}
                    </p>
                </div>

                </div>

                <form onSubmit={enviarEmail} className="mt-8 space-y-4">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Enviar mensagem
                    </h2>

                    <input
                        type="text"
                        placeholder="Assunto"
                        value={assunto}
                        onChange={(e) => setAssunto(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />

                    <textarea
                        placeholder="Digite sua mensagem..."
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg h-32"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Enviar Email
                    </button>

                </form>

                <div className="mt-8 flex justify-between items-center">
                    <button
                        onClick={() => navigate("/")}
                        className="text-gray-600 hover:text-gray-800 transition"
                    >
                        ← Voltar
                    </button>

                    <button
                        onClick={fazerLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
}