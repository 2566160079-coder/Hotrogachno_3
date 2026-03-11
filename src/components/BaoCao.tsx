import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Download,
  Filter,
  Calendar,
  Search,
  User,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  FileText
} from 'lucide-react';

const lineData = [
  { name: '01/10', value: 200 },
  { name: '04/10', value: 180 },
  { name: '07/10', value: 220 },
  { name: '10/10', value: 150 },
  { name: '14/10', value: 100 },
  { name: '18/10', value: 150 },
  { name: '21/10', value: 120 },
  { name: 'Hôm nay', value: 50 },
];

const miniBarData = [
  { name: 'T2', value: 40 },
  { name: 'T3', value: 60 },
  { name: 'T4', value: 45 },
  { name: 'T5', value: 80 },
  { name: 'T6', value: 95 },
  { name: 'T7', value: 70 },
  { name: 'CN', value: 55 },
];

const employeeData = [
  { id: 'NL', name: 'Nguyễn Văn Linh', total: 156, completed: 144, pending: 12, amount: '450,200,000 đ' },
  { id: 'TH', name: 'Trần Thị Hoa', total: 203, completed: 203, pending: 0, amount: '580,000,000 đ' },
  { id: 'LM', name: 'Lê Minh', total: 89, completed: 84, pending: 5, amount: '220,500,000 đ' },
];

const pieData = [
  { name: 'Hoàn thành', value: 850, color: '#10b981' },
  { name: 'Đang xử lý', value: 150, color: '#19355c' },
  { name: 'Chưa xử lý', value: 100, color: '#f59e0b' },
  { name: 'Đang treo', value: 150, color: '#ef4444' },
];

const dailyData = [
  { date: '24/10', total: 448, completed: 431, pending: 17, amount: '1,250,800,000 đ' },
  { date: '23/10', total: 512, completed: 502, pending: 10, amount: '1,410,200,000 đ' },
  { date: '22/10', total: 390, completed: 382, pending: 8, amount: '985,400,000 đ' },
];

export const BaoCao: React.FC = () => {
  const [exportTypeEmp, setExportTypeEmp] = React.useState<'summary' | 'detail'>('summary');
  const [exportTypeDay, setExportTypeDay] = React.useState<'summary' | 'detail'>('summary');

  const parseAmount = (amountStr: string) => parseInt(amountStr.replace(/[^\d]/g, '') || '0');
  const formatAmount = (amount: number) => new Intl.NumberFormat('vi-VN').format(amount) + ' đ';

  const employeeTotals = employeeData.reduce((acc, row) => ({
    total: acc.total + row.total,
    completed: acc.completed + row.completed,
    pending: acc.pending + row.pending,
    amount: acc.amount + parseAmount(row.amount)
  }), { total: 0, completed: 0, pending: 0, amount: 0 });

  const dailyTotals = dailyData.reduce((acc, row) => ({
    total: acc.total + row.total,
    completed: acc.completed + row.completed,
    pending: acc.pending + row.pending,
    amount: acc.amount + parseAmount(row.amount)
  }), { total: 0, completed: 0, pending: 0, amount: 0 });

  return (
    <div className="space-y-8 pb-10">
      {/* Stats and Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Highlights */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-slate-500 text-sm font-medium">Tổng doanh thu xử lý</h3>
              <div className="flex items-center gap-1">
                <User size={12} className="text-slate-400" />
                <select className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:ring-[#19355c] focus:border-[#19355c] outline-none cursor-pointer">
                  <option>Tất cả</option>
                  <option>Nguyễn Văn Linh</option>
                  <option>Trần Thị Hoa</option>
                  <option>Lê Minh</option>
                </select>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#19355c]">1,250M</span>
              <span className="text-sm font-medium text-emerald-600 flex items-center gap-0.5">
                <TrendingUp size={14} /> 12.5%
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">So với 7 ngày trước</p>
            
            <div className="mt-6 h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={miniBarData}>
                  <Bar 
                    dataKey="value" 
                    fill="#19355c" 
                    radius={[2, 2, 0, 0]} 
                  >
                    {miniBarData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill="#19355c"
                        fillOpacity={entry.value === 95 ? 1 : 0.2}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400">
              {miniBarData.map(d => <span key={d.name}>{d.name}</span>)}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-sm font-medium mb-4">Trạng thái giao dịch</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-2 mt-4">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-bold">{((item.value / 1250) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Line Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Xu hướng giao dịch theo ngày</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="size-2 bg-[#19355c] rounded-full"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Giao dịch</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#19355c" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#19355c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide={true} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#19355c" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Employee Report Section */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-[#19355c]">Báo cáo theo nhân viên</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button 
                onClick={() => setExportTypeEmp('summary')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  exportTypeEmp === 'summary' 
                    ? 'bg-white text-[#19355c] shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Tổng hợp
              </button>
              <button 
                onClick={() => setExportTypeEmp('detail')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  exportTypeEmp === 'detail' 
                    ? 'bg-white text-[#19355c] shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Chi tiết
              </button>
            </div>

            <button className="flex items-center gap-2 bg-[#19355c] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md whitespace-nowrap">
              <Download size={18} />
              Xuất báo cáo
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tùy chọn</label>
            <div className="flex items-center gap-3 h-9">
              <label className="flex items-center gap-1.5 cursor-pointer group">
                <input type="radio" name="report_type_emp" defaultChecked className="w-3.5 h-3.5 text-[#19355c] border-slate-300 focus:ring-[#19355c]" />
                <span className="text-[11px] font-medium text-slate-600 group-hover:text-[#19355c]">Theo sổ phụ</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer group">
                <input type="radio" name="report_type_emp" className="w-3.5 h-3.5 text-[#19355c] border-slate-300 focus:ring-[#19355c]" />
                <span className="text-[11px] font-medium text-slate-600 group-hover:text-[#19355c]">Theo ngày gạch nợ</span>
              </label>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Từ ngày</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="date" className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-[#19355c] focus:border-[#19355c]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Đến ngày</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="date" className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-[#19355c] focus:border-[#19355c]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Trạng thái</label>
            <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-[#19355c] focus:border-[#19355c]">
              <option>Tất cả</option>
              <option>Hoàn thành</option>
              <option>Treo</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Người xử lý</label>
            <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-[#19355c] focus:border-[#19355c]">
              <option>Tất cả nhân viên</option>
              <option>Nguyễn Văn Linh</option>
              <option>Trần Thị Hoa</option>
              <option>Lê Minh</option>
            </select>
          </div>
          <button className="bg-[#19355c] text-white h-9 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
            <Filter size={14} />
            Lọc dữ liệu
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-[#19355c] text-[10px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Nhân viên</th>
                  <th className="px-6 py-4">Tổng giao dịch</th>
                  <th className="px-6 py-4">Hoàn thành</th>
                  <th className="px-6 py-4">Treo</th>
                  <th className="px-6 py-4">Tổng tiền đã gạch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {employeeData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-3">
                        <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          i === 1 ? 'bg-indigo-100 text-indigo-700' : 'bg-[#19355c]/10 text-[#19355c]'
                        }`}>
                          {row.id}
                        </div>
                        {row.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-700">{row.total}</td>
                    <td className="px-6 py-4 text-emerald-600 font-bold">{row.completed}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        row.pending > 0 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {row.pending} GD
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#19355c]">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                <tr className="text-sm font-bold text-[#19355c]">
                  <td className="px-6 py-4">TỔNG CỘNG</td>
                  <td className="px-6 py-4">{employeeTotals.total}</td>
                  <td className="px-6 py-4 text-emerald-600">{employeeTotals.completed}</td>
                  <td className="px-6 py-4 text-amber-600">{employeeTotals.pending} GD</td>
                  <td className="px-6 py-4">{formatAmount(employeeTotals.amount)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* Daily Report Section */}
      <div className="space-y-4 pt-8 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-[#19355c]">Báo cáo theo ngày</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button 
                onClick={() => setExportTypeDay('summary')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  exportTypeDay === 'summary' 
                    ? 'bg-white text-[#19355c] shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Tổng hợp
              </button>
              <button 
                onClick={() => setExportTypeDay('detail')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  exportTypeDay === 'detail' 
                    ? 'bg-white text-[#19355c] shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Chi tiết
              </button>
            </div>

            <button className="flex items-center gap-2 bg-[#19355c] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-md whitespace-nowrap">
              <Download size={18} />
              Xuất báo cáo
            </button>
          </div>
        </div>

        {/* Filters (Reused) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tùy chọn</label>
            <div className="flex items-center gap-3 h-9">
              <label className="flex items-center gap-1.5 cursor-pointer group">
                <input type="radio" name="report_type_day" defaultChecked className="w-3.5 h-3.5 text-[#19355c] border-slate-300 focus:ring-[#19355c]" />
                <span className="text-[11px] font-medium text-slate-600 group-hover:text-[#19355c]">Theo sổ phụ</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer group">
                <input type="radio" name="report_type_day" className="w-3.5 h-3.5 text-[#19355c] border-slate-300 focus:ring-[#19355c]" />
                <span className="text-[11px] font-medium text-slate-600 group-hover:text-[#19355c]">Theo ngày gạch nợ</span>
              </label>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Từ ngày</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="date" className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-[#19355c] focus:border-[#19355c]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Đến ngày</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input type="date" className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-[#19355c] focus:border-[#19355c]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Trạng thái</label>
            <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-[#19355c] focus:border-[#19355c]">
              <option>Tất cả</option>
              <option>Hoàn thành</option>
              <option>Treo</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Người xử lý</label>
            <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-[#19355c] focus:border-[#19355c]">
              <option>Tất cả nhân viên</option>
              <option>Nguyễn Văn Linh</option>
              <option>Trần Thị Hoa</option>
              <option>Lê Minh</option>
            </select>
          </div>
          <button className="bg-[#19355c] text-white h-9 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
            <Filter size={14} />
            Lọc dữ liệu
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-[#19355c] text-[10px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Ngày</th>
                  <th className="px-6 py-4">Tổng giao dịch</th>
                  <th className="px-6 py-4">Hoàn thành</th>
                  <th className="px-6 py-4">Treo</th>
                  <th className="px-6 py-4">Tổng tiền đã gạch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {dailyData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-700">{row.date}</td>
                    <td className="px-6 py-4 font-semibold text-slate-600">{row.total}</td>
                    <td className="px-6 py-4 text-emerald-600 font-bold">{row.completed}</td>
                    <td className="px-6 py-4 text-amber-600 font-bold">{row.pending}</td>
                    <td className="px-6 py-4 font-bold text-[#19355c]">{row.amount}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                <tr className="text-sm font-bold text-[#19355c]">
                  <td className="px-6 py-4">TỔNG CỘNG</td>
                  <td className="px-6 py-4">{dailyTotals.total}</td>
                  <td className="px-6 py-4 text-emerald-600">{dailyTotals.completed}</td>
                  <td className="px-6 py-4 text-amber-600">{dailyTotals.pending}</td>
                  <td className="px-6 py-4">{formatAmount(dailyTotals.amount)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

