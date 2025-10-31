import React, { useState, useEffect } from 'react';
// Usaremos lucide-react para ícones, que é padrão no React
// No React Native, você usaria uma biblioteca como react-native-vector-icons
import {
    Home, Briefcase, Menu, Bell, ArrowLeft, X, CreditCard, Leaf, HelpCircle, Settings, LogOut,
    ChevronRight, Check, Search, Phone, MessageSquare, Shield,
    User, Mail, Smartphone, Edit2, Plus, Lock, Sun, Moon, Laptop,
    Users, Bike, Car, CheckCircle2, Share2,
    Trash2, Dot
} from 'lucide-react';

// --- Constantes e Dados ---

const rideCategories = [
    { id: 'go', name: 'Muvvi Go', price: '18,50', time: '5 min', icon: <Car size={32} /> },
    { id: 'comfort', name: 'Muvvi Comfort', price: '25,00', time: '5 min', icon: <Car size={32} /> }, // Corrigido de CarFront
    { id: 'green', name: 'Muvvi Green', price: '22,00', time: '7 min', icon: <Leaf size={32} /> },
    { id: 'moto', name: 'Muvvi Moto', price: '10,50', time: '3 min', icon: <Bike size={32} /> },
    { id: 'share', name: 'Muvvi Share', price: '14,00', time: '7 min', icon: <Users size={32} /> }
];

const paymentMethods = [
    { id: 'pix', name: 'Pix', details: 'Terminado em •••• 1234' },
    { id: 'credit', name: 'Cartão de Crédito', details: 'Mastercard •••• 5678' }
];

// --- Componentes de Tela ---

// 1. Splash Screen
const SplashScreen = () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-muvvi-dark animate-fadeOut">
        <h1 className="text-6xl font-bold text-muvvi-blue mb-4">MUVVI</h1>
        <p className="text-lg text-gray-300">Seu caminho, sua escolha.</p>
    </div>
);

// 2. Login Screen
const LoginScreen = ({ setScreen }) => (
    <div className="w-full h-full flex flex-col justify-center p-6 animate-fadeIn">
        <h1 className="text-4xl font-bold text-white mb-4">Bem-vindo</h1>
        <p className="text-lg text-gray-400 mb-10">Faça login para continuar</p>
        
        <form className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                    type="email" 
                    id="email"
                    placeholder="voce@email.com"
                    className="w-full p-4 bg-muvvi-dark-gray rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">Senha</label>
                <input 
                    type="password" 
                    id="password"
                    placeholder="••••••••"
                    className="w-full p-4 bg-muvvi-dark-gray rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                />
            </div>

            <div className="pt-4">
                <button 
                    type="button" 
                    onClick={() => setScreen('home')} // Simula login
                    className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                >
                    Entrar
                </button>
            </div>
        </form>

        <div className="text-center mt-8">
            <p className="text-gray-400">
                Não tem uma conta? 
                <button 
                    onClick={() => setScreen('register')}
                    className="font-semibold text-muvvi-blue ml-1 hover:underline"
                >
                    Crie uma aqui
                </button>
            </p>
        </div>
    </div>
);

// 3. Register Screen
const RegisterScreen = ({ setScreen }) => (
    <div className="w-full h-full flex flex-col justify-center p-6 animate-fadeIn">
        <h1 className="text-4xl font-bold text-white mb-4">Criar Conta</h1>
        <p className="text-lg text-gray-400 mb-10">Comece sua jornada Muvvi</p>
        
        <form className="space-y-6">
            <div>
                <label htmlFor="name-reg" className="block text-sm font-medium text-gray-400 mb-2">Nome Completo</label>
                <input 
                    type="text" 
                    id="name-reg"
                    placeholder="Seu nome completo"
                    className="w-full p-4 bg-muvvi-dark-gray rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                />
            </div>
            <div>
                <label htmlFor="email-reg" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                    type="email" 
                    id="email-reg"
                    placeholder="voce@email.com"
                    className="w-full p-4 bg-muvvi-dark-gray rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                />
            </div>
            <div>
                <label htmlFor="password-reg" className="block text-sm font-medium text-gray-400 mb-2">Senha</label>
                <input 
                    type="password" 
                    id="password-reg"
                    placeholder="••••••••"
                    className="w-full p-4 bg-muvvi-dark-gray rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                />
            </div>

            <div className="pt-4">
                <button 
                    type="button" 
                    onClick={() => setScreen('home')} // Simula registro e login
                    className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                >
                    Criar Conta
                </button>
            </div>
        </form>

        <div className="text-center mt-8">
            <p className="text-gray-400">
                Já tem uma conta? 
                <button 
                    onClick={() => setScreen('login')}
                    className="font-semibold text-muvvi-blue ml-1 hover:underline"
                >
                    Faça login
                </button>
            </p>
        </div>
    </div>
);

// 4. Home Screen
const HomeScreen = ({ setScreen }) => (
    <div className="w-full h-full flex flex-col relative">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
            <button onClick={() => setScreen('menu')} className="bg-muvvi-dark/70 p-3 rounded-full backdrop-blur-sm">
                <Menu size={24} />
            </button>
            <button onClick={() => setScreen('notifications')} className="bg-muvvi-dark/70 p-3 rounded-full backdrop-blur-sm">
                <Bell size={24} />
            </button>
        </div>

        {/* Mapa Falso */}
        <div className="flex-grow bg-gray-700 flex items-center justify-center text-gray-400 text-2xl">
            (Simulação de Mapa)
        </div>

        {/* Card "Para onde?" */}
        <div className="absolute bottom-0 left-0 right-0 bg-muvvi-dark p-6 rounded-t-3xl shadow-2xl animate-slideUp">
            <button onClick={() => setScreen('search')} className="w-full bg-muvvi-dark-gray p-4 rounded-lg text-left mb-4">
                <p className="text-lg font-semibold text-white">Para onde vamos?</p>
                <p className="text-sm text-gray-400">Escolha seu destino</p>
            </button>
            <div className="flex space-x-4">
                <button 
                    onClick={() => setScreen('select-ride')}
                    className="flex-1 bg-muvvi-dark-gray p-4 rounded-lg flex items-center space-x-3"
                >
                    <div className="bg-muvvi-blue/20 p-2 rounded-full">
                        <Home size={20} className="text-muvvi-blue" />
                    </div>
                    <div>
                        <p className="font-semibold text-white">Casa</p>
                        <p className="text-xs text-gray-400">Seu endereço</p>
                    </div>
                </button>
                <button 
                    onClick={() => setScreen('select-ride')}
                    className="flex-1 bg-muvvi-dark-gray p-4 rounded-lg flex items-center space-x-3"
                >
                    <div className="bg-gray-700 p-2 rounded-full">
                        <Briefcase size={20} className="text-gray-300" />
                    </div>
                    <div>
                        <p className="font-semibold text-white">Trabalho</p>
                        <p className="text-xs text-gray-400">Seu endereço</p>
                    </div>
                </button>
            </div>
        </div>
    </div>
);

// 5. Search Destination Screen
const SearchScreen = ({ setScreen }) => (
    <div className="w-full h-full flex flex-col">
        <div className="p-4 bg-muvvi-dark shadow-lg">
            <div className="flex items-center space-x-2">
                <button onClick={() => setScreen('home')} className="text-white">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex-grow relative">
                    <input 
                        type="text" 
                        placeholder="Para onde vamos?"
                        className="w-full p-3 pl-10 bg-muvvi-dark-gray rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={20} />
                    </div>
                </div>
            </div>
        </div>
        
        {/* Mapa Falso */}
        <div className="flex-grow bg-gray-700 flex items-center justify-center text-gray-400 text-2xl relative">
            (Simulação de Mapa - Busca)
            <button 
                onClick={() => setScreen('home')}
                className="absolute top-4 left-4 text-white bg-muvvi-dark/70 p-3 rounded-full backdrop-blur-sm"
            >
                <ArrowLeft size={24} />
            </button>
        </div>

        {/* Resultados Falsos */}
        <div className="bg-muvvi-dark p-4 rounded-t-2xl shadow-2xl animate-slideUp">
            <h3 className="font-semibold mb-4">Destinos recentes</h3>
            <button 
                onClick={() => setScreen('select-ride')}
                className="w-full text-left p-3 hover:bg-muvvi-dark-gray rounded-lg"
            >
                <p className="font-semibold">Shopping Vitória</p>
                <p className="text-sm text-gray-400">Av. Américo Buaiz, 200</p>
            </button>
            <button 
                onClick={() => setScreen('select-ride')}
                className="w-full text-left p-3 hover:bg-muvvi-dark-gray rounded-lg"
            >
                <p className="font-semibold">Aeroporto de Vitória</p>
                <p className="text-sm text-gray-400">Av. Roza Helena Schorling, 510</p>
            </button>
        </div>
    </div>
);

// 6. Select Ride Screen
const SelectRideScreen = ({ setScreen }) => {
    const [selectedRide, setSelectedRide] = useState('go');

    return (
        <div className="w-full h-full flex flex-col">
            {/* Mapa Falso */}
            <div className="flex-grow bg-gray-700 flex items-center justify-center text-gray-400 text-2xl relative">
                (Simulação de Mapa - Rota)
                <button 
                    onClick={() => setScreen('search')}
                    className="absolute top-4 left-4 text-white bg-muvvi-dark/70 p-3 rounded-full backdrop-blur-sm z-10"
                >
                    <ArrowLeft size={24} />
                </button>
            </div>
            
            {/* Opções de Corrida */}
            <div className="bg-muvvi-dark p-6 rounded-t-3xl shadow-2xl animate-slideUp">
                <h2 className="text-2xl font-bold text-center mb-6">Escolha sua viagem</h2>
                
                <div className="space-y-3 mb-6">
                    {rideCategories.map(ride => (
                        <button 
                            key={ride.id}
                            onClick={() => setSelectedRide(ride.id)}
                            className={`w-full p-4 rounded-lg flex items-center space-x-4 transition-all ${
                                selectedRide === ride.id ? 'bg-muvvi-blue/20 ring-2 ring-muvvi-blue' : 'bg-muvvi-dark-gray hover:bg-gray-700'
                            }`}
                        >
                            <div className={selectedRide === ride.id ? 'text-muvvi-blue' : 'text-gray-300'}>
                                {ride.icon}
                            </div>
                            <div className="flex-grow text-left">
                                <p className="text-lg font-semibold text-white">{ride.name}</p>
                                <p className="text-sm text-gray-400">{ride.time}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-semibold text-white">R$ {ride.price}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <button 
                    onClick={() => setScreen('finding')}
                    className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                >
                    Confirmar Muvvi
                </button>
            </div>
        </div>
    );
};

// 7. Finding Ride Screen
const FindingScreen = ({ setScreen }) => {
    // Simula a busca por um motorista
    useEffect(() => {
        const timer = setTimeout(() => {
            setScreen('trip');
        }, 4000); // 4 segundos de busca
        return () => clearTimeout(timer);
    }, [setScreen]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-muvvi-dark p-6 text-center animate-fadeIn">
            <div className="relative mb-8">
                <Circle size={150} className="text-muvvi-blue animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Search size={60} className="text-muvvi-blue" />
                </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Procurando motorista...</h2>
            <p className="text-lg text-gray-400">Estamos conectando você ao motorista mais próximo.</p>
            
            <button 
                onClick={() => setScreen('home')}
                className="mt-12 bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg"
            >
                Cancelar
            </button>
        </div>
    );
};

// 8. Trip in Progress Screen
const TripScreen = ({ setScreen }) => {
    // Estados para controlar o modal de compartilhamento e a confirmação
    const [showShareModal, setShowShareModal] = useState(false);
    const [showShareConfirmation, setShowShareConfirmation] = useState('');

    // Lista de contatos (simulada, viria do backend)
    const trustedContacts = [
        { name: 'Mãe', phone: '+55 27 *****-**01' },
        { name: 'Carlos (Casa)', phone: '+55 27 *****-**02' }
    ];

    // Função para simular o compartilhamento
    const handleShare = (contactName) => {
        setShowShareModal(false);
        // Simula a partilha e mostra a confirmação
        setShowShareConfirmation(`Viagem compartilhada com ${contactName} via WhatsApp!`);
        
        // Esconde a confirmação após 3 segundos
        setTimeout(() => {
            setShowShareConfirmation('');
        }, 3000);
    };

    return (
        <div className="w-full h-full flex flex-col relative"> {/* Adicionado 'relative' */}
            
            {/* Modal de Compartilhamento (escondido por padrão) */}
            {showShareModal && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
                    <div className="bg-muvvi-dark p-6 rounded-lg w-11/12 max-w-sm mx-auto">
                        <h3 className="text-xl font-semibold mb-4">Compartilhar com...</h3>
                        <div className="space-y-3">
                            {trustedContacts.map(contact => (
                                <button 
                                    key={contact.name}
                                    className="w-full bg-gray-800 p-4 rounded-lg text-left hover:bg-gray-700"
                                    onClick={() => handleShare(contact.name)}
                                >
                                    <p className="font-semibold">{contact.name}</p>
                                    <p className="text-sm text-gray-400">{contact.phone}</p>
                                </button>
                            ))}
                        </div>
                        <button 
                            className="w-full bg-gray-700 text-white font-semibold py-3 rounded-lg mt-6"
                            onClick={() => setShowShareModal(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Confirmação "Toast" (escondida por padrão) */}
            {showShareConfirmation && (
                <div className="absolute bottom-40 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-30">
                    {showShareConfirmation}
                </div>
            )}

            {/* Conteúdo da tela */}
            <div className="flex-grow bg-gray-700 flex items-center justify-center text-gray-400 text-2xl relative">
                <button 
                    onClick={() => setScreen('home')}
                    className="absolute top-4 left-4 text-white bg-muvvi-dark/70 p-3 rounded-full backdrop-blur-sm z-10"
                >
                    <ArrowLeft size={24} />
                </button>
                (Simulação de Mapa - Viagem)
            </div>
            <div className="bg-muvvi-dark p-4 rounded-t-2xl shadow-2xl animate-slideUp z-10"> {/* Adicionado z-10 */}
                <h3 className="text-lg font-semibold text-center">A caminho do seu destino</h3>
                <p className="text-center text-gray-400 mb-4">Chegada estimada: 10 min</p>
                
                {/* Info Motorista */}
                <div className="bg-muvvi-dark-gray p-4 rounded-lg flex items-center space-x-4 mb-4">
                    <img 
                        src="https://placehold.co/60x60/334155/FFFFFF?text=M" 
                        alt="Motorista"
                        className="w-14 h-14 rounded-full"
                    />
                    <div className="flex-grow">
                        <p className="text-lg font-semibold text-white">Carlos S.</p>
                        <p className="text-sm text-gray-300">Toyota Corolla Prata</p>
                        <p className="text-sm text-gray-400 font-mono">ABC-1234</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold text-white">4.9 ★</p>
                    </div>
                </div>
                
                <div className="flex space-x-2">
                    <button className="flex-1 bg-gray-700 text-white font-semibold py-3 px-2 rounded-lg flex items-center justify-center space-x-1 text-sm">
                        <Phone size={16} /> <span>Ligar</span>
                    </button>
                    <button className="flex-1 bg-gray-700 text-white font-semibold py-3 px-2 rounded-lg flex items-center justify-center space-x-1 text-sm">
                        <MessageSquare size={16} /> <span>Chat</span>
                    </button>
                    <button className="flex-1 bg-gray-700 text-white font-semibold py-3 px-2 rounded-lg flex items-center justify-center space-x-1 text-sm" onClick={() => setShowShareModal(true)}>
                        <Share2 size={16} /> <span>Compartilhar</span>
                    </button>
                    <button className="flex-1 bg-red-500/20 text-red-400 font-semibold py-3 px-2 rounded-lg flex items-center justify-center space-x-1 text-sm">
                        <Shield size={16} /> <span>SOS</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// 9. Notifications Screen
const NotificationsScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('home')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Notificações</h2>
        </div>
        
        <div className="space-y-4">
            <div className="bg-muvvi-dark p-4 rounded-lg">
                <p className="font-semibold mb-1">Cupom de 20% OFF!</p>
                <p className="text-sm text-gray-400">Use o código MUVVI20 na sua próxima corrida. Válido até 30/11.</p>
            </div>
            <div className="bg-muvvi-dark p-4 rounded-lg">
                <p className="font-semibold mb-1">Muvvi Green disponível!</p>
                <p className="text-sm text-gray-400">Agora você pode pedir carros elétricos na sua região.</p>
            </div>
            <div className="bg-muvvi-dark p-4 rounded-lg opacity-60">
                <p className="font-semibold mb-1">Sua corrida foi finalizada</p>
                <p className="text-sm text-gray-400">Obrigado por viajar com a Muvvi. (Ontem)</p>
            </div>
        </div>
    </div>
);

// 10. Menu Screen
const MenuScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark flex flex-col p-6 animate-slideInLeft">
        <div className="flex justify-end mb-6">
            <button onClick={() => setScreen('home')} className="text-gray-400">
                <X size={28} />
            </button>
        </div>
        
        {/* Perfil */}
        <div className="flex items-center space-x-4 mb-10">
            <img 
                src="https://placehold.co/80x80/334155/FFFFFF?text=C" 
                alt="Caio"
                className="w-20 h-20 rounded-full border-2 border-muvvi-blue"
            />
            <div>
                <p className="text-2xl font-bold">Caio</p>
                <button 
                    onClick={() => setScreen('profile')}
                    className="text-sm text-muvvi-blue hover:underline"
                >
                    Ver Perfil
                </button>
            </div>
        </div>

        {/* Opções de Navegação */}
        <nav className="flex-grow space-y-2">
            <button 
                onClick={() => setScreen('payment')}
                className="w-full flex items-center space-x-4 p-4 rounded-lg hover:bg-muvvi-dark-gray"
            >
                <CreditCard size={24} className="text-muvvi-blue" />
                <span className="text-lg">Pagamento</span>
            </button>
            <button 
                onClick={() => setScreen('green')}
                className="w-full flex items-center space-x-4 p-4 rounded-lg hover:bg-muvvi-dark-gray"
            >
                <Leaf size={24} className="text-green-500" />
                <span className="text-lg">Muvvi Green</span>
            </button>
            <button 
                onClick={() => setScreen('help')}
                className="w-full flex items-center space-x-4 p-4 rounded-lg hover:bg-muvvi-dark-gray"
            >
                <HelpCircle size={24} className="text-yellow-500" />
                <span className="text-lg">Ajuda e Suporte</span>
            </button>
            <button 
                onClick={() => setScreen('settings')}
                className="w-full flex items-center space-x-4 p-4 rounded-lg hover:bg-muvvi-dark-gray"
            >
                <Settings size={24} className="text-gray-400" />
                <span className="text-lg">Configurações</span>
            </button>
        </nav>

        {/* Sair */}
        <div className="mt-10">
            <button 
                onClick={() => setScreen('login')}
                className="w-full flex items-center space-x-4 p-4 rounded-lg hover:bg-red-500/20"
            >
                <LogOut size={24} className="text-red-500" />
                <span className="text-lg text-red-500">Sair</span>
            </button>
        </div>
    </div>
);

// 11. Profile Screen
const ProfileScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('menu')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Perfil</h2>
        </div>

        <div className="flex flex-col items-center mb-8">
            <img 
                src="https://placehold.co/100x100/334155/FFFFFF?text=C" 
                alt="Caio"
                className="w-24 h-24 rounded-full border-4 border-muvvi-blue mb-4"
            />
            <h3 className="text-2xl font-bold">Caio</h3>
            <p className="text-gray-400">Membro desde 2024</p>
        </div>

        <div className="space-y-4 mb-8">
            <div className="bg-muvvi-dark p-4 rounded-lg">
                <p className="text-sm text-gray-400">Nome Completo</p>
                <p className="text-lg">Caio</p>
            </div>
            <div className="bg-muvvi-dark p-4 rounded-lg">
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-lg">caio@email.com</p>
            </div>
            <div className="bg-muvvi-dark p-4 rounded-lg">
                <p className="text-sm text-gray-400">Telefone</p>
                <p className="text-lg">+55 27 9****-**00</p>
            </div>
        </div>

        <button 
            onClick={() => setScreen('edit-profile')}
            className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        >
            Editar Perfil
        </button>
    </div>
);

// 12. Edit Profile Screen
const EditProfileScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('profile')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Editar Perfil</h2>
        </div>

        <form className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Nome Completo</label>
                <input 
                    type="text" 
                    id="name"
                    defaultValue="Caio"
                    className="w-full p-3 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                />
            </div>
            <div>
                <label htmlFor="email-edit" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                    type="email" 
                    id="email-edit"
                    defaultValue="caio@email.com"
                    className="w-full p-3 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Telefone</label>
                <input 
                    type="tel" 
                    id="phone"
                    defaultValue="+55 27 9****-**00"
                    className="w-full p-3 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                />
            </div>

            <div className="pt-4">
                <button 
                    type="button" 
                    onClick={() => setScreen('profile')} // Simula salvamento
                    className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                >
                    Salvar Alterações
                </button>
            </div>
        </form>
    </div>
);

// 13. Payment Screen
const PaymentScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('menu')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Pagamento</h2>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Meus Métodos</h3>
        <div className="space-y-4 mb-8">
            {paymentMethods.map(method => (
                <div key={method.id} className="bg-muvvi-dark p-4 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="font-semibold">{method.name}</p>
                        <p className="text-sm text-gray-400">{method.details}</p>
                    </div>
                    <button className="text-muvvi-blue text-sm font-semibold">
                        <Trash2 size={20} className="text-red-400 hover:text-red-300" />
                    </button>
                </div>
            ))}
        </div>

        <button 
            onClick={() => setScreen('add-payment')}
            className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        >
            Adicionar Novo Método
        </button>
    </div>
);

// 14. Add Payment Screen
const AddPaymentScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('payment')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Adicionar Pagamento</h2>
        </div>
        
        <div className="space-y-4">
            <button 
                // onClick={() => setScreen('add-card')} // Próximo passo
                className="w-full p-4 bg-muvvi-dark rounded-lg flex items-center justify-between hover:bg-gray-700"
            >
                <div className="flex items-center space-x-4">
                    <CreditCard size={24} className="text-muvvi-blue" />
                    <span className="font-semibold">Cartão de Crédito/Débito</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
            </button>
            <button 
                // onClick={() => setScreen('add-pix')} // Próximo passo
                className="w-full p-4 bg-muvvi-dark rounded-lg flex items-center justify-between hover:bg-gray-700"
            >
                <div className="flex items-center space-x-4">
                    <Dot size={24} className="text-green-500" />
                    <span className="font-semibold">Cadastrar Chave Pix</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
            </button>
        </div>
    </div>
);

// 15. Muvvi Green Screen
const MuvviGreenScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('menu')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Muvvi Green</h2>
        </div>
        
        <div className="text-center mb-8">
            <Leaf size={60} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">Viaje com zero emissões</h3>
            <p className="text-gray-400 mt-2">Nossa frota de carros elétricos e híbridos.</p>
        </div>

        <div className="bg-muvvi-dark p-6 rounded-lg">
            <p className="text-gray-300">Ao escolher o Muvvi Green, você contribui para um ar mais limpo na sua cidade. Nossos motoristas Green são parceiros com veículos de baixa ou zero emissão de carbono.</p>
            <button 
                onClick={() => setScreen('home')}
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg mt-6 hover:bg-green-700"
            >
                Pedir um Muvvi Green
            </button>
        </div>
    </div>
);

// 16. Help Screen
const HelpScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('menu')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Ajuda e Suporte</h2>
        </div>
        
        <div className="relative mb-6">
            <input 
                type="text" 
                placeholder="Como podemos ajudar?"
                className="w-full p-3 pl-10 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={20} />
            </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-300 mb-4">Tópicos Comuns</h3>
        <div className="space-y-2">
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg hover:bg-gray-700">Problemas com pagamento</button>
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg hover:bg-gray-700">Reportar um incidente</button>
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg hover:bg-gray-700">Perdi um objeto</button>
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg hover:bg-gray-700">Como funciona o Muvvi Share?</button>
        </div>
    </div>
);

// 17. Settings Screen
const SettingsScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('menu')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Configurações</h2>
        </div>

        <div className="space-y-2">
            <button 
                onClick={() => setScreen('dark-mode')}
                className="w-full p-4 bg-muvvi-dark rounded-lg flex items-center justify-between hover:bg-gray-700"
            >
                <div className="flex items-center space-x-4">
                    <Moon size={20} className="text-gray-400" />
                    <span className="font-semibold">Modo Escuro</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Automático</span>
                    <ChevronRight size={20} className="text-gray-400" />
                </div>
            </button>
            <button 
                onClick={() => setScreen('notifications-settings')}
                className="w-full p-4 bg-muvvi-dark rounded-lg flex items-center justify-between hover:bg-gray-700"
            >
                <div className="flex items-center space-x-4">
                    <Bell size={20} className="text-gray-400" />
                    <span className="font-semibold">Notificações</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
            </button>
            <button 
                onClick={() => setScreen('trusted-contacts')}
                className="w-full p-4 bg-muvvi-dark rounded-lg flex items-center justify-between hover:bg-gray-700"
            >
                <div className="flex items-center space-x-4">
                    <Users size={20} className="text-gray-400" />
                    <span className="font-semibold">Contatos de Confiança</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
            </button>
            <button 
                onClick={() => setScreen('privacy')}
                className="w-full p-4 bg-muvvi-dark rounded-lg flex items-center justify-between hover:bg-gray-700"
            >
                <div className="flex items-center space-x-4">
                    <Lock size={20} className="text-gray-400" />
                    <span className="font-semibold">Privacidade e Dados</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
            </button>
        </div>
    </div>
);

// 18. Dark Mode Settings Screen
const DarkModeScreen = ({ setScreen }) => {
    const [mode, setMode] = useState('auto'); // 'light', 'dark', 'auto'

    const OptionButton = ({ value, label, icon: Icon }) => (
        <button 
            onClick={() => setMode(value)}
            className={`flex-1 p-4 rounded-lg flex flex-col items-center justify-center space-y-2 transition-all ${
                mode === value ? 'bg-muvvi-blue/20 ring-2 ring-muvvi-blue text-muvvi-blue' : 'bg-muvvi-dark hover:bg-gray-700 text-gray-400'
            }`}
        >
            <Icon size={24} />
            <span className="font-semibold">{label}</span>
            {mode === value && <CheckCircle2 size={20} className="absolute -top-2 -right-2 text-muvvi-blue bg-muvvi-dark-gray rounded-full" />}
        </button>
    );

    return (
        <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
            <div className="flex items-center space-x-4 mb-8">
                <button onClick={() => setScreen('settings')} className="text-white">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-semibold">Modo Escuro</h2>
            </div>
            
            <div className="flex space-x-4">
                <OptionButton value="light" label="Claro" icon={Sun} />
                <OptionButton value="dark" label="Escuro" icon={Moon} />
                <OptionButton value="auto" label="Sistema" icon={Laptop} />
            </div>
        </div>
    );
};

// 19. Notifications Settings Screen
const NotificationsSettingsScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('settings')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Notificações</h2>
        </div>
        
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muvvi-dark rounded-lg">
                <span className="font-semibold">Promoções e Descontos</span>
                <button className="w-12 h-6 bg-green-500 rounded-full p-1 flex items-center">
                    <span className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-6"></span>
                </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-muvvi-dark rounded-lg">
                <span className="font-semibold">Atualizações da Viagem</span>
                <button className="w-12 h-6 bg-green-500 rounded-full p-1 flex items-center">
                    <span className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-6"></span>
                </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-muvvi-dark rounded-lg">
                <span className="font-semibold">Notícias e Novidades</span>
                <button className="w-12 h-6 bg-gray-600 rounded-full p-1 flex items-center">
                    <span className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-0"></span>
                </button>
            </div>
        </div>
    </div>
);

// 20. Trusted Contacts Screen
const TrustedContactsScreen = ({ setScreen }) => {
    // Mock data
    const [contacts, setContacts] = useState([
        { id: 1, name: 'Mãe', phone: '+55 27 *****-**01' },
        { id: 2, name: 'Carlos (Casa)', phone: '+55 27 *****-**02' }
    ]);

    const handleDelete = (id) => {
        // Simula a deleção
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    return (
        <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
            <div className="flex items-center space-x-4 mb-8">
                <button onClick={() => setScreen('settings')} className="text-white">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-semibold">Contatos de Confiança</h2>
            </div>
            
            <p className="text-sm text-gray-400 mb-6">Compartilhe suas viagens em tempo real.</p>

            {/* Lista de Contatos */}
            <div className="bg-muvvi-dark p-4 rounded-lg space-y-4 mb-6">
                {contacts.map(contact => (
                    <div key={contact.id} className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold">{contact.name}</p>
                            <p className="text-sm text-gray-400">{contact.phone}</p>
                        </div>
                        <button onClick={() => handleDelete(contact.id)} className="text-red-400 hover:text-red-300">
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
                {contacts.length === 0 && (
                    <p className="text-gray-500 text-center">Nenhum contato adicionado.</p>
                )}
            </div>

            {/* Botão Adicionar */}
            <div className="mt-auto">
                <button 
                    onClick={() => setScreen('add-contact')} // <-- AÇÃO ADICIONADA
                    className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                >
                    Adicionar Novo Contato
                </button>
            </div>
        </div>
    );
};

// 21. Add Contact Screen
const AddContactScreen = ({ setScreen }) => {
    return (
        <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
            <div className="flex items-center space-x-4 mb-8">
                <button onClick={() => setScreen('trusted-contacts')} className="text-white">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-semibold">Adicionar Contato</h2>
            </div>

            <form className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Nome</label>
                    <input 
                        type="text" 
                        id="name"
                        placeholder="Ex: Mãe"
                        className="w-full p-3 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                    />
                </div>
                <div>
                    <label htmlFor="phone-add" className="block text-sm font-medium text-gray-400 mb-2">Telefone (com DDD)</label>
                    <input 
                        type="tel" 
                        id="phone-add"
                        placeholder="Ex: +55 27 99999-9999"
                        className="w-full p-3 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                    />
                </div>

                <div className="pt-4">
                    <button 
                        type="button" 
                        onClick={() => setScreen('trusted-contacts')} // Simula o salvamento
                        className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                    >
                        Salvar Contato
                    </button>
                </div>
            </form>
        </div>
    );
};

// 22. Privacy Screen
const PrivacyScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('settings')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Privacidade e Dados</h2>
        </div>
        
        <div className="space-y-2">
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg hover:bg-gray-700">Gerenciar meus dados</button>
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg hover:bg-gray-700">Baixar meus dados</button>
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg hover:bg-gray-700">Política de Privacidade</button>
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg text-red-400 hover:bg-red-500/20">Excluir minha conta</button>
        </div>
    </div>
);


// --- Componente Principal ---

function App() {
    const [screen, setScreen] = useState('splash'); // 'splash', 'login', 'register', 'home', etc.

    // Simula a tela de splash
    useEffect(() => {
        if (screen === 'splash') {
            const timer = setTimeout(() => {
                setScreen('login'); // Manda para o login após 2s
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [screen]);

    const renderScreen = () => {
        switch (screen) {
            case 'splash':
                return <SplashScreen />;
            case 'login':
                return <LoginScreen setScreen={setScreen} />;
            case 'register':
                return <RegisterScreen setScreen={setScreen} />;
            case 'home':
                return <HomeScreen setScreen={setScreen} />;
            case 'search':
                return <SearchScreen setScreen={setScreen} />;
            case 'select-ride':
                return <SelectRideScreen setScreen={setScreen} />;
            case 'finding':
                return <FindingScreen setScreen={setScreen} />;
            case 'trip':
                return <TripScreen setScreen={setScreen} />;
            case 'notifications':
                return <NotificationsScreen setScreen={setScreen} />;
            case 'menu':
                return <MenuScreen setScreen={setScreen} />;
            case 'profile':
                return <ProfileScreen setScreen={setScreen} />;
            case 'edit-profile':
                return <EditProfileScreen setScreen={setScreen} />;
            case 'payment':
                return <PaymentScreen setScreen={setScreen} />;
            case 'add-payment':
                return <AddPaymentScreen setScreen={setScreen} />;
            case 'green':
                return <MuvviGreenScreen setScreen={setScreen} />;
            case 'help':
                return <HelpScreen setScreen={setScreen} />;
            case 'settings':
                return <SettingsScreen setScreen={setScreen} />;
            case 'dark-mode':
                return <DarkModeScreen setScreen={setScreen} />;
            case 'notifications-settings':
                return <NotificationsSettingsScreen setScreen={setScreen} />;
            case 'trusted-contacts':
                return <TrustedContactsScreen setScreen={setScreen} />;
            case 'add-contact': 
                return <AddContactScreen setScreen={setScreen} />;
            case 'privacy':
                return <PrivacyScreen setScreen={setScreen} />;
            default:
                return <HomeScreen setScreen={setScreen} />;
        }
    };

    return (
        <div className="h-full bg-muvvi-dark text-white font-inter">
            {renderScreen()}
        </div>
    );
}

// Configuração do Tailwind (para o protótipo funcionar)
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        
        body, #root, .h-full {
            height: 100vh;
            margin: 0;
            background-color: #0F172A; /* bg-slate-900 */
        }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .bg-muvvi-dark { background-color: #1E1E1E; }
        .bg-muvvi-dark-gray { background-color: #2D2D2D; }
        .text-muvvi-blue { color: #007AFF; }
        .bg-muvvi-blue { background-color: #007AFF; }
        .border-muvvi-blue { border-color: #007AFF; }
        .ring-muvvi-blue { --tw-ring-color: #007AFF; }
        .bg-muvvi-blue\\/20 { background-color: rgba(0, 122, 255, 0.2); }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        .animate-fadeOut { animation: fadeOut 0.5s ease-in 1.5s forwards; }

        @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }

        @keyframes slideInLeft {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
        }
        .animate-slideInLeft { animation: slideInLeft 0.3s ease-out; }
    `;
    document.head.appendChild(style);

    if (document.getElementById('tailwind-script') === null) {
        const script = document.createElement('script');
        script.id = 'tailwind-script';
        script.src = "https://cdn.tailwindcss.com";
        document.head.appendChild(script);
    }
}

export default App;
