import React from 'react';
import { 
  Download, 
  Hourglass, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard,
  TrendingUp,
  Filter,
  Search,
  RefreshCcw,
  FileDown,
  Bot
} from 'lucide-react';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Tổng giao dịch trong ngày', value: '1,250', trend: '+5.2%', icon: Download, color: 'blue' },
    { label: 'Chưa xử lý', value: '150', trend: '-2.1%', icon: Hourglass, color: 'orange' },
    { label: 'Đang xử lý', value: '85', trend: '+1.5%', icon: RefreshCw, color: 'indigo' },
    { label: 'Hoàn thành', value: '980', trend: '+8.4%', icon: CheckCircle2, color: 'green' },
    { label: 'Treo', value: '35', trend: '0.0%', icon: AlertCircle, color: 'red' },
    { label: 'Tổng tiền đã gạch nợ', value: '45.2 tỷ', trend: '+12.3%', icon: CreditCard, color: 'primary', dark: true },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`${stat.dark ? 'bg-[#19355c] text-white' : 'bg-white text-slate-900'} p-5 rounded-xl border border-slate-200 shadow-sm`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 ${stat.dark ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-600'} rounded-lg`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold ${stat.dark ? 'text-green-300' : stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend}
              </span>
            </div>
            <p className={`${stat.dark ? 'text-white/70' : 'text-slate-500'} text-xs font-medium uppercase tracking-wider mb-1`}>{stat.label}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-base font-bold text-slate-900">Xu hướng giao dịch theo ngày</h4>
              <p className="text-xs text-slate-500">Số lượng giao dịch trong 7 ngày gần nhất</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="text-xs font-medium border-slate-200 rounded-lg focus:ring-[#19355c]">
                <option>Tất cả</option>
                <option>Chưa xử lý</option>
                <option>Đang xử lý</option>
                <option>Hoàn thành</option>
                <option>Treo</option>
              </select>
              <select className="text-xs font-medium border-slate-200 rounded-lg focus:ring-[#19355c]">
                <option>7 ngày qua</option>
                <option>30 ngày qua</option>
              </select>
            </div>
          </div>
          <div className="h-64 relative flex items-end justify-between px-2 gap-1">
            <svg className="absolute inset-0 w-full h-full px-2 py-4" preserveAspectRatio="none" viewBox="0 0 700 200">
              <defs>
                <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#19355c" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#19355c" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,150 Q100,50 200,100 T400,80 T600,120 T700,40 V200 H0 Z" fill="url(#lineGrad)" />
              <path d="M0,150 Q100,50 200,100 T400,80 T600,120 T700,40" fill="none" stroke="#19355c" strokeLinecap="round" strokeWidth="3" />
            </svg>
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2 z-[1] w-full">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="mb-8">
            <h4 className="text-base font-bold text-slate-900">Tỷ lệ trạng thái</h4>
            <p className="text-xs text-slate-500">Phân bổ trạng thái giao dịch hiện tại</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative size-48 mb-6">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#f1f5f9" strokeWidth="3.5" />
                <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#10b981" strokeDasharray="65 100" strokeDashoffset="0" strokeWidth="3.5" />
                <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#19355c" strokeDasharray="15 100" strokeDashoffset="-65" strokeWidth="3.5" />
                <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#f59e0b" strokeDasharray="10 100" strokeDashoffset="-80" strokeWidth="3.5" />
                <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#ef4444" strokeDasharray="10 100" strokeDashoffset="-90" strokeWidth="3.5" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">100%</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Tổng cộng</span>
              </div>
            </div>
            <div className="w-full space-y-2">
              {[
                { label: 'Hoàn thành', value: '65%', color: 'bg-green-500' },
                { label: 'Đang xử lý', value: '15%', color: 'bg-[#19355c]' },
                { label: 'Chưa xử lý', value: '10%', color: 'bg-amber-500' },
                { label: 'Đang treo', value: '10%', color: 'bg-red-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${item.color}`}></div>
                    <span className="text-slate-600">{item.label}</span>
                  </div>
                  <span className="font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
