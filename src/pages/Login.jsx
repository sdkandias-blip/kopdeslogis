import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BorderGlow from '../components/ui/BorderGlow';
import FloatingLines from '../components/ui/FloatingLines';
import { CardContent } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e?.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const user = username.toLowerCase().trim();

      switch (user) {
        case 'admin':
          navigate('/admin');
          break;
        case 'prosumer':
        case 'petani':
          navigate('/prosumer');
          break;
        case 'dapur':
          navigate('/dapur');
          break;
        case 'supply':
          navigate('/supply-chain');
          break;
        case 'ops':
          navigate('/operations');
          break;
        case 'scanner':
          navigate('/scanner');
          break;
        default:
          setError('Username tidak ditemukan. Coba: admin, prosumer, dapur, supply, ops');
      }
    }, 800);
  };

  const quickLogin = (role) => {
    setUsername(role);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: '#050505', color: 'var(--text)' }}>
      {/* FloatingLines Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <FloatingLines 
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[8, 12, 16]}
          lineDistance={[10, 8, 6]}
          bendRadius={5.0}
          bendStrength={-0.8}
          interactive={true}
          parallax={true}
          animationSpeed={1.5}
          linesGradient={['#16a34a', '#22c55e', '#3b82f6', '#0ea5e9']}
        />
      </div>
      
      <div className="w-full max-w-md p-6 z-10 animate-fade-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20">
            <span className="material-symbols-outlined text-white text-3xl font-bold">hub</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold text-white tracking-tight mb-2">Kopdes<span className="text-green-400">Logis</span></h1>
          <p className="text-gray-400 text-sm">Sistem Manajemen Rantai Pasok Terpadu</p>
        </div>

        <BorderGlow color="rgba(34, 197, 94, 0.4)" innerClassName="bg-black/30 backdrop-blur-xl border-t border-white/5">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-2 block">Username</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">person</span>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-black/40 border border-gray-700/50 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 focus:bg-black/60 transition-colors backdrop-blur-md"
                    placeholder="Masukkan username peran"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-2 block">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">lock</span>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-gray-700/50 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 focus:bg-black/60 transition-colors backdrop-blur-md"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-medium animate-shake">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-white text-black hover:bg-gray-200 transition-all active:scale-95 flex justify-center items-center gap-2 mt-4"
              >
                {isLoading ? (
                  <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-sm">login</span>
                    Masuk ke Sistem
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 border-t border-gray-800 pt-6">
              <p className="text-xs text-center text-gray-500 mb-4 font-medium uppercase tracking-widest">Demo Quick Login</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['admin', 'prosumer', 'dapur', 'supply', 'ops'].map(role => (
                  <button 
                    key={role}
                    type="button"
                    onClick={() => quickLogin(role)}
                    className="px-3 py-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-300 transition-colors capitalize border border-gray-700 hover:border-gray-500"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </BorderGlow>
        
        <p className="text-center text-xs text-gray-600 mt-8">
          &copy; 2026 KopdesLogis Ekosistem. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
