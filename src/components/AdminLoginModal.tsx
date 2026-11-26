import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, KeyRound, AlertCircle, X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, resetPasswordToDefault } = useAdmin();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResetNotice, setShowResetNotice] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!password.trim()) {
      setError('Please enter your admin password.');
      return;
    }

    const success = login(password.trim());
    if (success) {
      setPassword('');
      setError(null);
      onSuccess();
    } else {
      setError('Incorrect password. Default is "admin123" or your custom password.');
    }
  };

  const handleReset = () => {
    resetPasswordToDefault();
    setPassword('admin123');
    setShowResetNotice(true);
    setError(null);
    setTimeout(() => setShowResetNotice(false), 5000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1A1D27] rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-2xl border border-[#E8EAF0] dark:border-[#2D3748] space-y-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Icon & Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-[#FF8500] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-xl text-[#171923] dark:text-white">
            Admin Panel Login
          </h3>
          <p className="text-xs text-[#606575] dark:text-[#9EA3B0] leading-relaxed">
            Only you can log in to edit website photos, text, and settings.
          </p>
        </div>

        {/* Default Password Tip */}
        <div className="p-3 rounded-xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-500/20 text-xs text-[#606575] dark:text-[#9EA3B0] flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-[#FF8500] shrink-0" />
          <span>Default password: <strong className="font-mono text-[#FF8500]">admin123</strong></span>
        </div>

        {/* Reset Notice */}
        {showResetNotice && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-xs text-emerald-800 dark:text-emerald-200">
            Password has been reset to <strong>admin123</strong>!
          </div>
        )}

        {/* Error Notice */}
        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-300 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#171923] dark:text-white">
              Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#FF8500] to-[#FFAB45] hover:from-[#FF7700] hover:to-[#FF9E30] shadow-md shadow-orange-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Login to Admin Panel</span>
          </button>
        </form>

        {/* Footer links */}
        <div className="pt-2 border-t border-[#E8EAF0] dark:border-[#2D3748] flex items-center justify-between text-[11px] text-[#606575] dark:text-[#9EA3B0]">
          <button
            type="button"
            onClick={handleReset}
            className="hover:text-[#FF8500] transition-colors cursor-pointer"
          >
            Forgot password?
          </button>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
