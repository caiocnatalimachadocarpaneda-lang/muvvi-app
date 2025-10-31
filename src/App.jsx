import React, { useState, useEffect } from 'react';
import {
    Home, Briefcase, Menu, Bell, ArrowLeft, X, CreditCard, Leaf, HelpCircle, Settings, LogOut,
    ChevronRight, Check, Search, Phone, MessageSquare, Shield,
    Edit2, Sun, Moon, Laptop,
    Users, Bike, Car, CarFront, CheckCircle2, Share2
} from 'lucide-react';

const formatBRL = (cents) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);

const rideOptionsData = [
    { id: 'go', name: 'Muvvi Go', priceCents: 1850, time: '4 min', icon: () => <Car size={32} /> },
    { id: 'comfort', name: 'Muvvi Comfort', priceCents: 2400, time: '5 min', icon: () => <CarFront size={32} /> },
    { id: 'green', name: 'Muvvi Green', priceCents: 2350, time: '6 min', icon: () => <Leaf size={32} className="text-green-400" /> },
    { id: 'moto', name: 'Muvvi Moto', priceCents: 1200, time: '2 min', icon: () => <Bike size={32} /> },
    { id: 'share', name: 'Muvvi Share', priceCents: 1400, time: '7 min', icon: () => <Users size={32} /> }
];

const MuvviTheme = {
    blue: '#007AFF',
    dark: '#1E1E1E',
};

const SplashScreen = ({ setScreen }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setScreen('login');
        }, 2500);
        return () => clearTimeout(timer);
    }, [setScreen]);

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
        <div className="w-full h-full bg-muvvi-dark flex flex-col items-center justify-center text-center p-8">
            <style>{pulseKeyframes}</style>
            <MuvviLogo />
            <h1 className="text-4xl font-bold text-white mt-4">MUVVI</h1>
            <p className="text-gray-300 text-lg mt-2">Seu caminho, sua escolha.</p>
        </div>
    );
};

// ... (rest of the App.jsx code)