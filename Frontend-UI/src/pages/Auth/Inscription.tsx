import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Input from '../../components/ui/Input';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export default function Inscription() {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        role: 'EMPLOYEE',
        department: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        
        if (!formData.email) newErrors.email = 'Email requis';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
        
        if (!formData.password) newErrors.password = 'Mot de passe requis';
        else if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';
        
        if (!formData.name) newErrors.name = 'Nom requis';
        if (!formData.role) newErrors.role = 'Rôle requis';
        if (!formData.department) newErrors.department = 'Département requis';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            await register(formData);
            await login({ email: formData.email, password: formData.password });
            toast.success('Inscription réussie ! Bienvenue.');
            navigate('/espace-entreprise');
        } catch (error) {
            toast.error("Erreur lors de l'inscription.");
            console.error('Inscription error:', error);
        } 
        finally {
            setLoading(false);
            }
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-100 dark:from-stone-900 dark:to-stone-800 px-4">
            <div className="max-w-3xl w-full">
                <div className="bg-white dark:bg-stone-800 rounded-xl shadow-xl p-8 flex flex-col md:flex-row gap-8">
                    {/* Partie gauche */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="text-center md:text-left mb-8">
                            <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-200 mb-2">
                                Inscription
                            </h1>
                            <p className="text-stone-600 dark:text-stone-400">
                                Bienvenue ! Veuillez remplir les informations ci-dessous pour créer votre compte.
                            </p>
                        </div>
                        <form className="space-y-6">
                            <div className="relative">
                                <Input
                                    type="text"
                                    name="name"
                                    label="Nom"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Votre nom"
                                    error={errors.name}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-9 w-5 h-5 text-stone-400" />
                                <Input
                                    type="email"
                                    name="email"
                                    label="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="votre@email.com"
                                    error={errors.email}
                                    className="pl-10"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-9 w-5 h-5 text-stone-400" />
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    label="Mot de passe"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    error={errors.password}
                                    className="pl-10 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-9 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    {/* Partie droite */}
                    <div className="flex-1 flex flex-col justify-center">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <label className="block text-sm font-medium text-stone-100 dark:text-stone-200 mb-1">
                                    Rôle
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-stone-300 dark:border-stone-100 bg-white dark:bg-stone-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                    <option value="">Sélectionnez un rôle</option>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="MANAGER">MANAGER</option>
                                    <option value="EMPLOYEE">EMPLOYEE</option>
                                </select>
                                {errors.role && <span className="text-red-500 text-xs">{errors.role}</span>}
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1">
                                    Département
                                </label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                    <option value="">Sélectionnez un département</option>
                                    <option value="Secretariat">Secrétariat</option>
                                    <option value="Comptabilite">Comptabilité</option>
                                    <option value="Ressources Humaines">Ressources Humaines</option>
                                    <option value="IT">IT</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                                {errors.department && <span className="text-red-500 text-xs">{errors.department}</span>}
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                loading={loading}
                                disabled={loading}
                            >
                                S'inscrire
                            </Button>
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-stone-600 dark:text-stone-400">
                                J'ai déjà un compte ?{' '}
                                <Link
                                    to="/connexion"
                                    className="text-amber-600 hover:text-amber-700 font-medium"
                                >
                                    Se Connecter
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}