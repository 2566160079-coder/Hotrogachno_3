import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  AlertCircle,
  Loader2,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const TO_THU_OPTIONS = [
  "Tổ thu Quận 1",
  "Tổ thu Quận 3",
  "Tổ thu Doanh nghiệp",
  "Tổ thu Online"
];

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [toThu, setToThu] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isToThuOpen, setIsToThuOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToThuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!toThu || !username || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        onLogin(username);
      } else {
        setError('Thông tin đăng nhập không chính xác');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-16 bg-[#19355c] rounded-2xl shadow-lg mb-4 text-white">
            <Building2 size={32} />
          </div>
          <h1 className="text-2xl font-bold text-[#19355c]">Đăng nhập hệ thống</h1>
          <p className="text-slate-500 text-sm mt-1">Vui lòng nhập thông tin đăng nhập để tiếp tục.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium overflow-hidden"
                >
                  <AlertCircle size={18} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tổ thu - Combobox */}
            <div className="space-y-1.5" ref={dropdownRef}>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tổ thu</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Building2 size={18} />
                </div>
                <input 
                  type="text"
                  value={toThu}
                  onChange={(e) => {
                    setToThu(e.target.value);
                    setIsToThuOpen(true);
                  }}
                  onFocus={() => setIsToThuOpen(true)}
                  placeholder="Chọn hoặc nhập tổ thu"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#19355c]/20 focus:border-[#19355c] outline-none transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setIsToThuOpen(!isToThuOpen)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <ChevronDown size={18} className={`transition-transform duration-200 ${isToThuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {isToThuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden"
                    >
                      {TO_THU_OPTIONS.filter(opt => opt.toLowerCase().includes(toThu.toLowerCase())).map((option, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setToThu(option);
                            setIsToThuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors text-slate-700 font-medium"
                        >
                          {option}
                        </button>
                      ))}
                      {TO_THU_OPTIONS.filter(opt => opt.toLowerCase().includes(toThu.toLowerCase())).length === 0 && (
                        <div className="px-4 py-2.5 text-sm text-slate-400 italic">Không tìm thấy kết quả</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tên đăng nhập</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <User size={18} />
                </div>
                <input 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#19355c]/20 focus:border-[#19355c] outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Mật khẩu</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu."
                  className="w-full pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#19355c]/20 focus:border-[#19355c] outline-none transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-4 rounded border-slate-300 text-[#19355c] focus:ring-[#19355c]" 
                />
                <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900 transition-colors">Ghi nhớ đăng nhập</span>
              </label>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#19355c] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#19355c]/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                'Đăng nhập'
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center mt-8 text-slate-400 text-xs font-medium uppercase tracking-widest">
          Hệ thống hỗ trợ gạch nợ v1.0
        </p>
      </motion.div>
    </div>
  );
};
