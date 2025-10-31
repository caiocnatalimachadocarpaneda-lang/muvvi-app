import React, { useState, useEffect, useRef } from 'react';
// REMOVIDO: A biblioteca @react-google-maps/api não é suportada neste ambiente de preview.
// Vamos reverter para o <iframe> para fazer o código compilar aqui.
// import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, Autocomplete } from '@react-google-maps/api'; 
import {
    Home, Briefcase, Menu, Bell, ArrowLeft, X, CreditCard, Leaf, HelpCircle, Settings, LogOut,
    ChevronRight, Check, Search, Phone, MessageSquare, Shield,
    User, Mail, Smartphone, Edit2, Plus, Lock, Sun, Moon, Laptop,
    Users, Bike, Car, CheckCircle2, Share2,
    Trash2, Dot,
    Circle,
    Banknote,
    MapPin, Clock
} from 'lucide-react';

// --- Constantes e Dados ---

const formatBRL = (cents) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);

const rideOptionsData = [
    { id: 'go', name: 'Muvvi Go', priceCents: 1850, time: '4 min', icon: () => <Car size={32} /> },
    { id: 'comfort', name: 'Muvvi Comfort', priceCents: 2400, time: '5 min', icon: () => <Car size={32} /> },
    { id: 'green', name: 'Muvvi Green', priceCents: 2350, time: '6 min', icon: () => <Leaf size={32} className="text-green-400" /> },
    { id: 'moto', name: 'Muvvi Moto', priceCents: 1200, time: '2 min', icon: () => <Bike size={32} /> },
    { id: 'share', name: 'Muvvi Share', priceCents: 1400, time: '7 min', icon: () => <Users size={32} /> }
];

const MuvviTheme = {
    blue: '#007AFF',
    dark: '#1E1E1E',
};

// --- Configuração do Google Maps ---
// REVERTIDO PARA O MÉTODO <iframe>
const mapCenter = { lat: -20.3155, lng: -40.3128 }; // Centro de Vitória, ES

// REMOVIDO: apiKey, libraries, mapStyles, passengerPosition, driverPosition


// --- Componente de Mapa Reutilizável (Versão <iframe>) ---
const MapComponent = () => {
    // URL de embed do Google Maps. Usamos o centro de Vitória.
    const mapEmbedSrc = `https://maps.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

    return (
        <iframe
            src={mapEmbedSrc}
            width="100%"
            height="100%"
            // Adiciona um filtro CSS para simular o modo escuro
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Muvvi Map"
        ></iframe>
    );
};


// --- Componentes de Tela ---

// 1. Splash Screen
const SplashScreen = () => {
    // Definindo a animação e o logo aqui para podermos reutilizar no Login
    const pulseKeyframes = `@keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.05); }
    }`;
    
    const MuvviLogo = () => (
        <svg className="w-24 h-24 text-muvvi-blue" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 6l9 12 9-12"></path>
            <path d="M3 18l9-12 9 12"></path>
        </svg>
    );

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-muvvi-dark animate-fadeOut">
            <style>{pulseKeyframes}</style> {/* Garantindo que a animação está no escopo */}
            <MuvviLogo />
            <h1 className="text-6xl font-bold text-white mb-4">MUVVI</h1>
            <p className="text-lg text-gray-300">Seu caminho, sua escolha.</p>
        </div>
    );
};

// 2. Login Screen
const LoginScreen = ({ setScreen, users, setCurrentUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // --- REVERSÃO DA INTRODUÇÃO ---
    // Copiamos o logo e animação da SplashScreen para cá
    const pulseKeyframes = `@keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.05); }
    }`;
    
    const MuvviLogo = () => (
        <svg className="w-20 h-20 text-muvvi-blue" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 6l9 12 9-12"></path>
            <path d="M3 18l9-12 9 12"></path>
        </svg>
    );
    // --- FIM DA REVERSÃO ---

    const handleLogin = () => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            setScreen('home');
            setError('');
        } else {
            setError('Email ou senha inválidos.');
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center p-6 animate-fadeIn">
            
            {/* --- INTRODUÇÃO REVERTIDA --- */}
            <style>{pulseKeyframes}</style>
            <div className="flex flex-col items-center mb-10">
                <MuvviLogo />
                <h1 className="text-3xl font-bold text-white mt-4">MUVVI</h1>
            </div>
            {/* --- FIM DA INTRODUÇÃO --- */}
            
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-6 text-center">
                    {error}
                </div>
            )}

            <form className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="voce@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 bg-muvvi-dark-gray rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">Senha</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 bg-muvvi-dark-gray rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                    />
                </div>

                <div className="pt-4">
                    <button 
                        type="button" 
                        onClick={handleLogin} // Lógica de login real
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
};

// 3. Register Screen
const RegisterScreen = ({ setScreen, users, setUsers, setCurrentUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        if (!name || !email || !password) {
            setError('Todos os campos são obrigatórios.');
            return;
        }
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            setError('Este email já está cadastrado.');
        } else {
            const newUser = { id: Date.now(), name, email, password, phone: '', paymentMethods: [] };
            setUsers([...users, newUser]);
            setCurrentUser(newUser);
            setScreen('home');
            setError('');
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center p-6 animate-fadeIn">
            <h1 className="text-4xl font-bold text-white mb-4">Criar Conta</h1>
            <p className="text-lg text-gray-400 mb-10">Comece sua jornada Muvvi</p>
            
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-6 text-center">
                    {error}
                </div>
            )}

            <form className="space-y-6">
                <div>
                    <label htmlFor="name-reg" className="block text-sm font-medium text-gray-400 mb-2">Nome Completo</label>
                    <input 
                        type="text" 
                        id="name-reg"
                        placeholder="Seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-4 bg-muvvi-dark-gray rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                    />
                </div>
                <div>
                    <label htmlFor="email-reg" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input 
                        type="email" 
                        id="email-reg"
                        placeholder="voce@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 bg-muvvi-dark-gray rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                    />
                </div>
                <div>
                    <label htmlFor="password-reg" className="block text-sm font-medium text-gray-400 mb-2">Senha</label>
                    <input 
                        type="password" 
                        id="password-reg"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-4 bg-muvvi-dark-gray rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                    />
                </div>

                <div className="pt-4">
                    <button 
                        type="button" 
                        onClick={handleRegister} // Lógica de cadastro real
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
};

// 4. Home Screen
const HomeScreen = ({ setScreen }) => (
    <div className="w-full h-full flex flex-col">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
            <button onClick={() => setScreen('menu')} className="bg-muvvi-dark p-3 rounded-full shadow-lg">
                <Menu size={24} />
            </button>
            <button onClick={() => setScreen('notifications')} className="bg-muvvi-dark p-3 rounded-full shadow-lg">
                <Bell size={24} />
            </button>
        </header>
        
        {/* === MAPA (iFrame) === */}
        <div className="flex-grow bg-gray-700">
            <MapComponent />
        </div>
        {/* === FIM MAPA === */}

        {/* Painel Inferior */}
        <div className="bg-muvvi-dark p-6 rounded-t-2xl shadow-lg relative -mt-4 z-10">
            <h2 className="text-2xl font-bold mb-4">Onde vamos?</h2>
            
            <button onClick={() => setScreen('search')} className="w-full bg-muvvi-dark-gray p-4 rounded-lg flex items-center space-x-3 mb-4">
                <Search size={20} className="text-gray-400" />
                <span className="text-gray-400">Digite seu destino...</span>
            </button>
            
            <div className="flex space-x-4">
                <button 
                    onClick={() => {
                        const routeData = {
                            origin: "Minha Localização",
                            destination: "Shopping Vitória",
                        };
                        setScreen('select-ride', routeData);
                    }}
                    className="flex-1 bg-muvvi-dark-gray p-4 rounded-lg flex items-center space-x-3"
                >
                    <Home size={20} />
                    <span>Casa</span>
                </button>
                <button 
                    onClick={() => {
                        const routeData = {
                            origin: "Minha Localização",
                            destination: "Aeroporto de Vitória (VIX)",
                        };
                        setScreen('select-ride', routeData);
                    }}
                    className="flex-1 bg-muvvi-dark-gray p-4 rounded-lg flex items-center space-x-3"
                >
                    <Briefcase size={20} />
                    <span>Trabalho</span>
                </button>
            </div>
        </div>
    </div>
);

// 5. Search Destination Screen (REVERTIDA PARA VERSÃO SIMPLES)
const SearchScreen = ({ setScreen }) => {
    
    // REVERTIDO: Removemos a lógica de Autocomplete e cálculo de rotas
    // para fazer o preview funcionar.

    // Locais recentes (Simulados)
    const recentPlaces = [
        { name: 'Shopping Vitória', address: 'Av. Américo Buaiz, 200 - Enseada do Suá' },
        { name: 'Aeroporto de Vitória (VIX)', address: 'Av. Roza Helena Schorling Albuquerque' },
    ];
    
    // Simula a escolha de um destino e avança
    const handleSelectDestination = (destinationName) => {
        const routeData = {
            origin: "Minha Localização",
            destination: destinationName,
        };
        setScreen('select-ride', routeData);
    };

    return (
        <div className="w-full h-full flex flex-col bg-muvvi-dark">
            {/* Header com os campos de Partida e Destino */}
            <header className="p-4 bg-muvvi-dark z-10 shadow-lg">
                <div className="flex items-center space-x-3">
                    <button onClick={() => setScreen('home')} className="text-white">
                        <ArrowLeft size={24} />
                    </button>
                    {/* Campos de Partida e Destino (Simulados) */}
                    <div className="flex-grow space-y-3">
                        {/* Campo de Partida */}
                        <div className="relative flex items-center w-full">
                            <MapPin size={18} className="text-muvvi-blue absolute left-3" />
                            <input 
                                type="text" 
                                placeholder="Local de Partida" 
                                defaultValue="Minha Localização"
                                className="w-full p-3 pl-10 bg-muvvi-dark-gray rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue" 
                            />
                        </div>
                        
                        {/* Campo de Destino */}
                         <div className="relative flex items-center w-full">
                            <MapPin size={18} className="text-red-500 absolute left-3" />
                            <input 
                                type="text" 
                                placeholder="Para onde vamos?" 
                                className="w-full p-3 pl-10 bg-muvvi-dark-gray rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue" 
                                autoFocus
                            />
                        </div>
                    </div>
                </div>
            </header>
            
            {/* === MAPA (iFrame) === */}
            <div className="flex-grow bg-gray-700">
                 <MapComponent />
            </div>
            {/* === FIM MAPA === */}

            {/* Lista de Recentes */}
            <div className="bg-muvvi-dark p-4 z-10 shadow-lg">
                <h3 className="text-sm font-semibold text-gray-400 mb-3 ml-2">Locais Recentes</h3>
                <div className="space-y-2 mb-4">
                    {recentPlaces.map((place, index) => (
                         <button 
                            key={index}
                            onClick={() => handleSelectDestination(place.name)}
                            className="w-full flex items-center space-x-3 text-left p-3 hover:bg-muvvi-dark-gray rounded-lg"
                        >
                            <Clock size={20} className="text-gray-500" />
                            <div>
                                <h3 className="font-semibold">{place.name}</h3>
                                <p className="text-sm text-gray-400">{place.address}</p>
                            </div>
                        </button>
                    ))}
                </div>
                {/* Botão de confirmar removido, pois a seleção é instantânea */}
            </div>
        </div>
    );
};

// 6. Select Ride Screen (REVERTIDA)
const SelectRideScreen = ({ setScreen, routePayload }) => {
    const [selectedId, setSelectedId] = useState('go');
    const destinationName = routePayload?.destination || "seu destino";

    // REMOVIDO: useEffect para calcular rotas.

    return (
        <div className="w-full h-full flex flex-col bg-muvvi-dark-gray">
            {/* === MAPA (iFrame) === */}
            <div className="h-1/3 bg-gray-700 relative">
                 <MapComponent />
                <button onClick={() => setScreen('search')} className="absolute top-4 left-4 p-2 bg-muvvi-dark rounded-full">
                    <ArrowLeft size={24} />
                </button>
            </div>
            {/* === FIM MAPA === */}
            
            {/* Painel de Seleção */}
            <div className="flex-grow bg-muvvi-dark p-6 rounded-t-2xl shadow-lg relative -mt-4 z-10 animate-slideUp">
                <h2 className="text-xl font-bold mb-6 text-center">Viagem para {destinationName}</h2>
                
                <div className="space-y-4 mb-6">
                    {rideOptionsData.map((ride) => {
                        const RideIcon = ride.icon;
                        const isSelected = ride.id === selectedId;
                        return (
                            <button 
                                key={ride.id}
                                onClick={() => setSelectedId(ride.id)}
                                className={`w-full flex items-center space-x-4 p-4 rounded-lg border-2 ${isSelected ? 'border-muvvi-blue bg-muvvi-blue-20' : 'border-muvvi-dark-gray bg-muvvi-dark-gray'}`}
                            >
                                <RideIcon />
                                <div className="flex-grow text-left">
                                    <h3 className="text-lg font-semibold">{ride.name}</h3>
                                    <p className="text-sm text-gray-400">{ride.time}</p>
                                </div>
                                <div className="text-lg font-bold">
                                    {formatBRL(ride.priceCents)}
                                </div>
                            </button>
                        );
                    })}
                </div>
                
                <button 
                    onClick={() => setScreen('finding', routePayload)} // Passa a rota para a próxima tela
                    className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                >
                    Confirmar Muvvi {rideOptionsData.find(r => r.id === selectedId)?.name.split(' ')[1]}
                </button>
            </div>
        </div>
    );
};

// 7. Finding Ride Screen
const FindingScreen = ({ setScreen }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setScreen('trip');
        }, 5000); // Simula 5s de busca
        return () => clearTimeout(timer);
    }, [setScreen]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-muvvi-dark p-8 text-center">
            <h1 className="text-3xl font-bold mb-6">Procurando motorista...</h1>
            
            {/* Animação de Radar (Simulada) */}
            <div className="relative w-64 h-64 flex items-center justify-center">
                <Circle size={256} className="text-muvvi-blue/10 absolute animate-ping" />
                <Circle size={192} className="text-muvvi-blue/20 absolute animate-ping" style={{ animationDelay: '0.5s' }} />
                <Circle size={128} className="text-muvvi-blue/30 absolute animate-ping" style={{ animationDelay: '1s' }} />
                <Car size={48} className="text-muvvi-blue" />
            </div>

            <p className="text-lg text-gray-400 mt-8">Aguarde, estamos conectando você ao motorista mais próximo.</p>
            
            <button 
                onClick={() => setScreen('select-ride')}
                className="mt-12 bg-muvvi-dark-gray text-white font-semibold py-3 px-6 rounded-lg"
            >
                Cancelar
            </button>
        </div>
    );
};

// 8. Trip in Progress Screen
const TripScreen = ({ setScreen, routePayload }) => {
    const [toastMessage, setToastMessage] = useState('');
    
    // REMOVIDO: Lógica de direções

    const showToast = (message, isError = false) => {
        setToastMessage({ text: message, error: isError });
        setTimeout(() => setToastMessage(''), 3000); // O toast desaparece após 3s
    };
    
    // REMOVIDO: useEffect para calcular rota
    
    return (
        <div className="w-full h-full flex flex-col bg-muvvi-dark-gray">
            {/* Toast/Notificação */}
            {toastMessage && (
                <div className={`absolute top-10 left-1/2 -translate-x-1/2 z-30 p-4 rounded-lg shadow-lg animate-fadeIn ${toastMessage.error ? 'bg-red-600' : 'bg-green-600'} text-white`}>
                    {toastMessage.text}
                </div>
            )}
            
            {/* === MAPA (iFrame) === */}
            <div className="h-2/3 bg-gray-700 relative">
                <MapComponent />
                <button onClick={() => setScreen('home')} className="absolute top-4 left-4 p-2 bg-muvvi-dark rounded-full">
                    <ArrowLeft size={24} />
                </button>
            </div>
            {/* === FIM MAPA === */}
            
            {/* Painel Inferior */}
            <div className="flex-grow bg-muvvi-dark p-6 rounded-t-2xl shadow-lg relative -mt-4 z-10 animate-slideUp">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Motorista a caminho</h2>
                    <p className="text-lg font-bold text-muvvi-blue">3 min</p>
                </div>
                
                {/* Info do Motorista */}
                <div className="flex items-center space-x-4 mb-6 p-4 bg-muvvi-dark-gray rounded-lg">
                    <img 
                        src="https://placehold.co/60x60/334155/FFFFFF?text=CS" 
                        alt="Carlos S."
                        className="w-14 h-14 rounded-full"
                    />
                    <div className="flex-grow">
                        <h3 className="text-lg font-semibold">Carlos S.</h3>
                        <p className="text-sm text-gray-400">Toyota Corolla Prata - ABC-1234</p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <CheckCircle2 size={16} className="text-yellow-400" />
                        <span className="font-semibold">4.9</span>
                    </div>
                </div>
                
                {/* Botões de Ação */}
                <div className="grid grid-cols-4 gap-4">
                    <button 
                        onClick={() => showToast('Simulando ligação para Carlos S...')}
                        className="flex flex-col items-center justify-center p-3 bg-muvvi-dark-gray rounded-lg space-y-1 hover:bg-gray-600"
                    >
                        <Phone size={24} />
                        <span className="text-xs">Ligar</span>
                    </button>
                    <button 
                        onClick={() => showToast('Abrindo chat com Carlos S...')}
                        className="flex flex-col items-center justify-center p-3 bg-muvvi-dark-gray rounded-lg space-y-1 hover:bg-gray-600"
                    >
                        <MessageSquare size={24} />
                        <span className="text-xs">Chat</span>
                    </button>
                    <button 
                        onClick={() => showToast('Viagem compartilhada!')}
                        className="flex flex-col items-center justify-center p-3 bg-muvvi-dark-gray rounded-lg space-y-1 hover:bg-gray-600"
                    >
                        <Share2 size={24} />
                        <span className="text-xs">Compart.</span>
                    </button>
                    <button 
                        onClick={() => showToast('SOS ACIONADO! Entrando em contato com autoridades...', true)}
                        className="flex flex-col items-center justify-center p-3 bg-red-500/30 text-red-400 rounded-lg space-y-1 hover:bg-red-500/50"
                    >
                        <Shield size={24} />
                        <span className="text-xs">SOS</span>
                    </button>
                </div>
            </div>
        </div>
    );
};


// 9. Notifications Screen
const NotificationsScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('home')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Notificações</h2>
        </div>
        
        {/* Lista de Notificações */}
        <div className="space-y-4">
            <div className="bg-muvvi-dark p-4 rounded-lg flex space-x-4">
                <div className="p-2 bg-muvvi-blue-20 rounded-full h-fit">
                    <CheckCircle2 size={20} className="text-muvvi-blue" />
                </div>
                <div>
                    <p className="font-semibold">Viagem Concluída!</p>
                    <p className="text-sm text-gray-400">Sua viagem para Casa foi concluída. Total: R$ 18,50.</p>
                    <p className="text-xs text-gray-500 mt-1">20 min atrás</p>
                </div>
            </div>
            
            <div className="bg-muvvi-dark p-4 rounded-lg flex space-x-4">
                <div className="p-2 bg-green-500/20 rounded-full h-fit">
                    <Leaf size={20} className="text-green-500" />
                </div>
                <div>
                    <p className="font-semibold">Você é um Muvver Green!</p>
                    <p className="text-sm text-gray-400">Obrigado por completar 10 viagens com o Muvvi Green.</p>
                    <p className="text-xs text-gray-500 mt-1">Ontem</p>
                </div>
            </div>
        </div>
    </div>
);

// 10. Menu Screen
const MenuScreen = ({ setScreen, currentUser, setCurrentUser }) => (
    <div className="w-full h-full bg-muvvi-dark flex flex-col p-6 animate-slideInLeft">
        <div className="flex justify-end mb-6">
            <button onClick={() => setScreen('home')} className="text-gray-400">
                <X size={28} />
            </button>
        </div>
        
        {/* Perfil */}
        <div className="flex items-center space-x-4 mb-10">
            <img 
                src={`https://placehold.co/80x80/334155/FFFFFF?text=${currentUser?.name?.[0] || 'U'}`} 
                alt={currentUser?.name}
                className="w-20 h-20 rounded-full border-2 border-muvvi-blue"
            />
            <div>
                <p className="text-2xl font-bold">{currentUser?.name}</p> {/* <-- Nome dinâmico */}
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
                onClick={() => {
                    setCurrentUser(null); // <-- Limpa o usuário
                    setScreen('login'); // <-- Volta para o login
                }}
                className="w-full flex items-center space-x-4 p-4 rounded-lg hover:bg-red-500/20"
            >
                <LogOut size={24} className="text-red-500" />
                <span className="text-lg text-red-500">Sair</span>
            </button>
        </div>
    </div>
);

// 11. Profile Screen
const ProfileScreen = ({ setScreen, currentUser }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('menu')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Perfil</h2>
        </div>

        <div className="flex flex-col items-center mb-8">
            <img 
                src={`https://placehold.co/100x100/334155/FFFFFF?text=${currentUser?.name?.[0] || 'U'}`} 
                alt={currentUser?.name}
                className="w-24 h-24 rounded-full border-4 border-muvvi-blue mb-4"
            />
            <h3 className="text-2xl font-bold">{currentUser?.name}</h3> {/* <-- Nome dinâmico */}
            <p className="text-gray-400">Membro desde 2024</p>
        </div>

        <div className="space-y-4 mb-8">
            <div className="bg-muvvi-dark p-4 rounded-lg">
                <p className="text-sm text-gray-400">Nome Completo</p>
                <p className="text-lg">{currentUser?.name}</p> {/* <-- Nome dinâmico */}
            </div>
            <div className="bg-muvvi-dark p-4 rounded-lg">
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-lg">{currentUser?.email}</p> {/* <-- Email dinâmico */}
            </div>
            <div className="bg-muvvi-dark p-4 rounded-lg">
                <p className="text-sm text-gray-400">Telefone</p>
                <p className="text-lg">{currentUser?.phone || 'Não cadastrado'}</p> {/* <-- Telefone dinâmico */}
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
const EditProfileScreen = ({ setScreen, currentUser, setCurrentUser, users, setUsers }) => {
    const [name, setName] = useState(currentUser?.name || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [phone, setPhone] = useState(currentUser?.phone || '');

    const handleSave = () => {
        const updatedUser = { ...currentUser, name, email, phone };
        
        // Atualiza o usuário logado
        setCurrentUser(updatedUser);
        
        // Atualiza o "banco de dados" de usuários
        setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
        
        setScreen('profile'); // Simula salvamento
    };

    return (
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                    />
                </div>
                <div>
                    <label htmlFor="email-edit" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input 
                        type="email" 
                        id="email-edit"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Telefone</label>
                    <input 
                        type="tel" 
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+55 27 9****-**00"
                        className="w-full p-3 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                    />
                </div>

                <div className="pt-4">
                    <button 
                        type="button" 
                        onClick={handleSave} // Lógica de salvar real
                        className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                    >
                        Salvar Alterações
                    </button>
                </div>
            </form>
        </div>
    );
};

// 13. Payment Screen
const PaymentScreen = ({ setScreen, currentUser, setUsers }) => {
    
    // Deletar método de pagamento (simulado)
    const handleDeleteMethod = (methodId) => {
        // Esta é uma lógica complexa de estado, idealmente o backend faria isso
        // Por agora, vamos apenas simular a remoção
        console.log("Deletar método", methodId); 
    };

    return (
        <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
            <div className="flex items-center space-x-4 mb-8">
                <button onClick={() => setScreen('menu')} className="text-white">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-semibold">Pagamento</h2>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Meus Métodos</h3>
            <div className="space-y-4 mb-8">
                {(currentUser?.paymentMethods || []).map(method => (
                    <div key={method.id} className="bg-muvvi-dark p-4 rounded-lg flex items-center justify-between">
                        <div>
                            <p className="font-semibold">{method.name}</p>
                            <p className="text-sm text-gray-400">{method.details}</p>
                        </div>
                        <button onClick={() => handleDeleteMethod(method.id)} className="text-muvvi-blue text-sm font-semibold">
                            <Trash2 size={20} className="text-red-400 hover:text-red-300" />
                        </button>
                    </div>
                ))}
                {(!currentUser?.paymentMethods || currentUser.paymentMethods.length === 0) && (
                    <p className="text-gray-500 text-center py-4">Nenhum método de pagamento adicionado.</p>
                )}
            </div>

            <button 
                onClick={() => setScreen('add-payment')}
                className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
            >
                Adicionar Novo Método
            </button>
        </div>
    );
};

// 14. Add Payment Screen
const AddPaymentScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('payment')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Adicionar Método</h2>
        </div>
        
        <div className="space-y-4">
            <button 
                onClick={() => setScreen('add-card')}
                className="w-full flex items-center justify-between p-6 bg-muvvi-dark rounded-lg hover:bg-gray-700"
            >
                <div className="flex items-center space-x-4">
                    <CreditCard size={24} className="text-muvvi-blue" />
                    <span className="text-lg font-semibold">Cartão de Crédito/Débito</span>
                </div>
                <ChevronRight size={20} />
            </button>
            
            <button 
                onClick={() => setScreen('add-pix')}
                className="w-full flex items-center justify-between p-6 bg-muvvi-dark rounded-lg hover:bg-gray-700"
            >
                <div className="flex items-center space-x-4">
                    <Banknote size={24} className="text-green-500" />
                    <span className="text-lg font-semibold">Cadastrar Chave Pix</span>
                </div>
                <ChevronRight size={20} />
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
        
        <div className="flex flex-col items-center text-center p-6">
            <Leaf size={64} className="text-green-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Viagens mais sustentáveis</h3>
            <p className="text-gray-300">
                Com o Muvvi Green, você viaja em carros elétricos ou híbridos, 
                ajudando a reduzir a emissão de CO2. Nossas tarifas são 
                competitivas e você contribui para um futuro mais limpo.
            </p>
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
        
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Tópicos Comuns</h3>
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg hover:bg-gray-700">Problemas com pagamento</button>
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg hover:bg-gray-700">Como funciona o Muvvi Share</button>
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg hover:bg-gray-700">Objeto perdido</button>
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg hover:bg-gray-700">Fale Conosco (Chat 24h)</button>
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
        
        <div className="flex flex-col space-y-2">
            <button 
                onClick={() => setScreen('dark-mode')}
                className="w-full flex items-center justify-between p-5 bg-muvvi-dark rounded-lg hover:bg-gray-700"
            >
                <div className="flex items-center space-x-4">
                    <Sun size={22} />
                    <span className="text-lg">Modo Escuro</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Automático</span>
                    <ChevronRight size={20} />
                </div>
            </button>
            
            <button 
                onClick={() => setScreen('notifications-settings')}
                className="w-full flex items-center justify-between p-5 bg-muvvi-dark rounded-lg hover:bg-gray-700"
            >
                <div className="flex items-center space-x-4">
                    <Bell size={22} />
                    <span className="text-lg">Notificações</span>
                </div>
                <ChevronRight size={20} />
            </button>
            
            <button 
                onClick={() => setScreen('trusted-contacts')}
                className="w-full flex items-center justify-between p-5 bg-muvvi-dark rounded-lg hover:bg-gray-700"
            >
                <div className="flex items-center space-x-4">
                    <Users size={22} />
                    <span className="text-lg">Contatos de Confiança</span>
                </div>
                <ChevronRight size={20} />
            </button>
            
            <button 
                onClick={() => setScreen('privacy')}
                className="w-full flex items-center justify-between p-5 bg-muvvi-dark rounded-lg hover:bg-gray-700"
            >
                <div className="flex items-center space-x-4">
                    <Shield size={22} />
                    <span className="text-lg">Privacidade e Dados</span>
                </div>
                <ChevronRight size={20} />
            </button>
        </div>
    </div>
);

// 18. Dark Mode Screen
const DarkModeScreen = ({ setScreen }) => {
    const [mode, setMode] = useState('auto'); // 'light', 'dark', 'auto'

    const OptionButton = ({ value, label, icon: Icon }) => (
        <button 
            onClick={() => setMode(value)}
            className={`flex-1 flex flex-col items-center justify-center p-4 rounded-lg border-2 ${mode === value ? 'border-muvvi-blue bg-muvvi-blue-20' : 'border-muvvi-dark bg-muvvi-dark'}`}
        >
            <Icon size={24} className="mb-2" />
            <span className="font-semibold">{label}</span>
            {mode === value && (
                <CheckCircle2 size={20} className="text-muvvi-blue absolute -top-2 -right-2" />
            )}
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
const NotificationsSettingsScreen = ({ setScreen }) => {
    // Componente de toggle simulado
    const Toggle = () => {
        const [on, setOn] = useState(true);
        return (
            <button 
                onClick={() => setOn(!on)} 
                className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${on ? 'bg-muvvi-blue justify-end' : 'bg-gray-600 justify-start'}`}
            >
                <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
            </button>
        );
    };

    return (
        <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
            <div className="flex items-center space-x-4 mb-8">
                <button onClick={() => setScreen('settings')} className="text-white">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-semibold">Notificações</h2>
            </div>
            
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muvvi-dark rounded-lg">
                    <span className="text-lg">Promoções e Descontos</span>
                    <Toggle />
                </div>
                <div className="flex items-center justify-between p-4 bg-muvvi-dark rounded-lg">
                    <span className="text-lg">Atualizações de Viagem</span>
                    <Toggle />
                </div>
                <div className="flex items-center justify-between p-4 bg-muvvi-dark rounded-lg">
                    <span className="text-lg">Novidades do Muvvi</span>
                    <Toggle />
                </div>
            </div>
        </div>
    );
};

// 20. Trusted Contacts Screen
const TrustedContactsScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('settings')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Contatos de Confiança</h2>
        </div>
        
        <p className="text-gray-300 mb-6">Compartilhe suas viagens automaticamente com contatos de confiança.</p>

        <div className="space-y-4 mb-8">
            {/* Contato Simulado 1 */}
            <div className="bg-muvvi-dark p-4 rounded-lg flex items-center justify-between">
                <div>
                    <p className="font-semibold">Mãe</p>
                    <p className="text-sm text-gray-400">+55 27 9****-**01</p>
                </div>
                <button className="text-red-400 hover:text-red-300">
                    <Trash2 size={20} />
                </button>
            </div>
            {/* Contato Simulado 2 */}
            <div className="bg-muvvi-dark p-4 rounded-lg flex items-center justify-between">
                <div>
                    <p className="font-semibold">Carlos (Casa)</p>
                    <p className="text-sm text-gray-400">+55 27 9****-**02</p>
                </div>
                <button className="text-red-400 hover:text-red-300">
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
        
        <button 
            onClick={() => setScreen('add-contact')}
            className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        >
            Adicionar Novo Contato
        </button>
    </div>
);

// 21. Add Contact Screen
const AddContactScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('trusted-contacts')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Adicionar Contato</h2>
        </div>
        
        <form className="space-y-6">
            <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-400 mb-2">Nome</label>
                <input 
                    type="text" 
                    id="contact-name"
                    placeholder="Nome do contato"
                    className="w-full p-3 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                />
            </div>
            <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-400 mb-2">Telefone</label>
                <input 
                    type="tel" 
                    id="contact-phone"
                    placeholder="+55 (DDD) 9...."
                    className="w-full p-3 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                />
            </div>

            <div className="pt-4">
                <button 
                    type="button" 
                    onClick={() => setScreen('trusted-contacts')} // Simula salvamento
                    className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                >
                    Salvar Contato
                </button>
            </div>
        </form>
    </div>
);


// 22. Privacy Screen
const PrivacyScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('settings')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Privacidade e Dados</h2>
        </div>
        
        <div className="space-y-4">
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg hover:bg-gray-700">Gerenciar dados da conta</button>
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg hover:bg-gray-700">Termos de Serviço</button>
            <button className="w-full text-left p-4 bg-muvvi-dark rounded-lg hover:bg-gray-700">Política de Privacidade</button>
            <button className="w-full text-left p-4 text-red-400 bg-muvvi-dark rounded-lg hover:bg-gray-700">Excluir conta</button>
        </div>
    </div>
);

// 23. Add Card Screen
const AddCardScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('add-payment')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Adicionar Cartão</h2>
        </div>
        
        <form className="space-y-6">
            <div>
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-400 mb-2">Número do Cartão</label>
                <input 
                    type="text" 
                    id="card-number"
                    placeholder="**** **** **** ****"
                    className="w-full p-3 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                />
            </div>
            <div className="flex space-x-4">
                <div className="flex-1">
                    <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-400 mb-2">Validade</label>
                    <input 
                        type="text" 
                        id="card-expiry"
                        placeholder="MM/AA"
                        className="w-full p-3 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="card-cvv" className="block text-sm font-medium text-gray-400 mb-2">CVV</label>
                    <input 
                        type="text" 
                        id="card-cvv"
                        placeholder="***"
                        className="w-full p-3 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                    />
                </div>
            </div>
            <div className="pt-4">
                <button 
                    type="button" 
                    onClick={() => setScreen('payment')} // Simula salvamento
                    className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                >
                    Salvar Cartão
                </button>
            </div>
        </form>
    </div>
);

// 24. Add Pix Screen
const AddPixScreen = ({ setScreen }) => (
    <div className="w-full h-full bg-muvvi-dark-gray flex flex-col p-4 text-white">
        <div className="flex items-center space-x-4 mb-8">
            <button onClick={() => setScreen('add-payment')} className="text-white">
                <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold">Adicionar Chave Pix</h2>
        </div>
        
        <form className="space-y-6">
            <div>
                <label htmlFor="pix-key" className="block text-sm font-medium text-gray-400 mb-2">Chave Pix (Email, CPF ou Celular)</label>
                <input 
                    type="text" 
                    id="pix-key"
                    placeholder="Sua chave pix"
                    className="w-full p-3 bg-muvvi-dark rounded-lg border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-muvvi-blue"
                />
            </div>
            <div className="pt-4">
                <button 
                    type="button" 
                    onClick={() => setScreen('payment')} // Simula salvamento
                    className="w-full bg-muvvi-blue text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
                >
                    Salvar Chave Pix
                </button>
            </div>
        </form>
    </div>
);


// --- Componente Principal ---

function App() {
    const [screen, setScreen] = useState('splash'); // 'splash', 'login', 'register', 'home', etc.
    const [routePayload, setRoutePayload] = useState(null); // Armazena os detalhes da rota
    
    // --- ESTADO GLOBAL (Banco de dados e Autenticação simulados) ---
    const [users, setUsers] = useState([]); // Banco de dados de usuários
    const [currentUser, setCurrentUser] = useState(null); // Usuário logado
    const isAuthenticated = currentUser !== null;
    // --- FIM DO ESTADO GLOBAL ---

    // --- Carregador do Google Maps (REMOVIDO) ---
    // const { isLoaded, loadError } = useLoadScript({ ... });
    // --- FIM do Carregador ---
    
    // Função de navegação que permite passar dados
    const handleSetScreen = (screenName, payload = null) => {
        setRoutePayload(payload);
        setScreen(screenName);
    };


    // Simula a tela de splash
    useEffect(() => {
        if (screen === 'splash') {
            const timer = setTimeout(() => {
                setScreen('login'); // Sempre manda para o login após 2s (sem persistência)
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [screen]);

    const renderScreen = () => {

        // Telas que não dependem do mapa (Login, Splash)
        if (screen === 'splash') {
            return <SplashScreen />;
        }
        if (screen === 'login') {
            return <LoginScreen setScreen={handleSetScreen} users={users} setCurrentUser={setCurrentUser} />;
        }
        if (screen === 'register') {
            return <RegisterScreen setScreen={handleSetScreen} users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} />;
        }
        
        // --- Telas que DEPENDEM do mapa ---
        
        // REMOVIDO: Verificação de loadError e isLoaded
        // O iframe carrega sozinho.

        // Telas privadas (Exigem autenticação)
        if (isAuthenticated) { // REMOVIDO: && isLoaded
            switch (screen) {
                case 'home':
                    return <HomeScreen setScreen={handleSetScreen} />;
                case 'search':
                    return <SearchScreen setScreen={handleSetScreen} />; // Revertido para a versão simples
                case 'select-ride':
                    return <SelectRideScreen setScreen={handleSetScreen} routePayload={routePayload} />;
                case 'finding':
                    return <FindingScreen setScreen={handleSetScreen} />;
                case 'trip':
                    return <TripScreen setScreen={handleSetScreen} routePayload={routePayload} />;
                case 'notifications':
                    return <NotificationsScreen setScreen={handleSetScreen} />;
                case 'menu':
                    return <MenuScreen setScreen={handleSetScreen} currentUser={currentUser} setCurrentUser={setCurrentUser} />;
                case 'profile':
                    return <ProfileScreen setScreen={handleSetScreen} currentUser={currentUser} />;
                case 'edit-profile':
                    return <EditProfileScreen setScreen={handleSetScreen} currentUser={currentUser} setCurrentUser={setCurrentUser} users={users} setUsers={setUsers} />;
                case 'payment':
                    return <PaymentScreen setScreen={handleSetScreen} currentUser={currentUser} setUsers={setUsers} />;
                case 'add-payment':
                    return <AddPaymentScreen setScreen={handleSetScreen} />;
                case 'add-card': 
                    return <AddCardScreen setScreen={handleSetScreen} />;
                case 'add-pix':
                    return <AddPixScreen setScreen={handleSetScreen} />;
                case 'green':
                    return <MuvviGreenScreen setScreen={handleSetScreen} />;
                case 'help':
                    return <HelpScreen setScreen={handleSetScreen} />;
                case 'settings':
                    return <SettingsScreen setScreen={handleSetScreen} />;
                case 'dark-mode':
                    return <DarkModeScreen setScreen={handleSetScreen} />;
                case 'notifications-settings':
                    return <NotificationsSettingsScreen setScreen={handleSetScreen} />;
                case 'trusted-contacts':
                    return <TrustedContactsScreen setScreen={handleSetScreen} />;
                case 'add-contact': 
                    return <AddContactScreen setScreen={handleSetScreen} />;
                case 'privacy':
                    return <PrivacyScreen setScreen={handleSetScreen} />;
                default:
                    // Se uma tela privada não for encontrada, volta para home
                    return <HomeScreen setScreen={handleSetScreen} />;
            }
        } else {
            // Se não estiver autenticado, força o login
            return <LoginScreen setScreen={handleSetScreen} users={users} setCurrentUser={setCurrentUser} />;
        }
    };

    return (
        <div className="h-full bg-muvvi-dark text-white font-inter">
            {renderScreen()}
        </div>
    );
} // <-- FECHAMENTO DA FUNÇÃO APP

// Configuração do Tailwind (para o protótipo funcionar)
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        
        body, #root, .h-full {
            height: 100vh;
            margin: 0;
            background-color: #1E1E1E; /* REVERTIDO: bg-muvvi-dark (Grafite Escuro) */
        }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .bg-muvvi-dark { background-color: #1E1E1E; }
        .bg-muvvi-dark-gray { background-color: #374151; } /* REVERTIDO: bg-gray-700 (Melhor Contraste) */
        .text-muvvi-blue { color: #007AFF; }
        .bg-muvvi-blue { background-color: #007AFF; }
        .border-muvvi-blue { border-color: #007AFF; }
        .ring-muvvi-blue { --tw-ring-color: #007AFF; }
        
        /* CORREÇÃO DO ERRO DE REGEX: 
           Substituí 'bg-muvvi-blue\\/20' por 'bg-muvvi-blue-20' 
        */
        .bg-muvvi-blue-20 { background-color: rgba(0, 122, 255, 0.2); }

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

