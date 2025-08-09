import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, User, LogOut, Home, Goal } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/espace-entreprise', icon: Home },
    { name: 'Réservations', href: '/reservations', icon: Calendar },
  ];

  const isActive = (path: string) => location.pathname === path;

 

  return (
    <nav className="bg-white dark:bg-black border-b border-stone-200 dark:border-stone-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Goal className="w-8 h-8 text-amber-600" />
              <span className="text-xl font-bold text-stone-800 dark:text-stone-200">
                Gestion des Réservations
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive(item.href)
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            

            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2">
                  <User className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                  <span className="text-md text-stone-100 ">
                    Bienvenue, {user.name} 
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-stone-600 dark:text-stone-400"
                  onClick={() => {
                    logout();
                    navigate('/connexion'); // Rediriger vers la page de connexion
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Déconnexion</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;