import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Tag, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RoLuuTruProps {
  onSelectProcess?: () => void;
}

export const RoLuuTru: React.FC<RoLuuTruProps> = ({ onSelectProcess }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const transactions = [
    { id: 1, ref: 'REF001', date: '20/10/2023', amount: '+10,000,000', acc: '123456789', name: 'Nguyễn Văn A', bank: 'Vietcombank', desc: 'Thanh toán cước viễn thông tháng 10/2023 cho các thuê bao gia đình khu vực Hà Nội', status: 'Chờ xử lý', user: 'Chưa phân công' },
    { id: 2, ref: 'REF002', date: '20/10/2023', amount: '+5,500,000', acc: '987654321', name: 'Trần Thị B', bank: 'Techcombank', desc: 'Thanh toán hóa đơn internet định kỳ tháng 10. Giao dịch qua cổng thanh toán NAPAS.', status: 'Đang xử lý', user: 'Lê Văn C' },
    { id: 3, ref: 'REF003', date: '19/10/2023', amount: '+2,000,000', acc: '456123789', name: 'Công ty X', bank: 'BIDV', desc: 'Chuyển tiền thanh toán hợp đồng cung cấp dịch vụ phần mềm quản lý doanh nghiệp ERP.', status: 'Chờ xử lý', user: 'Chưa phân công' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Rổ lưu trữ giao dịch</h1>
          <p className="text-sm text-slate-500 font-normal">Quản lý các giao dịch đang chờ xử lý gạch nợ.</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Từ ngày</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="DD/MM/YYYY" className="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-[#19355c]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Đến ngày</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="DD/MM/YYYY" className="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-[#19355c]" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng thái</label>
            <select className="w-full px-4 py-2 bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-[#19355c]">
              <option>Tất cả</option>
              <option>Chờ xử lý</option>
              <option>Đang xử lý</option>
              <option>Hoàn thành</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Người xử lý</label>
            <select className="w-full px-4 py-2 bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-[#19355c]">
              <option>Tất cả nhân viên</option>
              <option>Lê Văn C</option>
              <option>Trần Thị D</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Số tham chiếu</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="REFxxxxx" className="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-[#19355c]" />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-6 py-2 rounded-lg border border-slate-200 text-sm font-semibold hover:bg-slate-50 transition-colors">Đặt lại</button>
          <button className="px-6 py-2 rounded-lg bg-[#19355c] text-white text-sm font-semibold hover:bg-[#19355c]/90 transition-colors flex items-center gap-2">
            <Filter size={16} /> Lọc dữ liệu
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">STT</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Số tham chiếu</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngày giao dịch</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phát sinh có (VND)</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tài khoản đối ứng</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tên đối ứng</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngân hàng đối ứng</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Diễn giải</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Trạng thái</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Người xử lý</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">THAO TÁC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((row, i) => (
                <tr 
                  key={i} 
                  className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${row.status === 'Đang xử lý' ? 'bg-blue-50/30' : ''}`}
                  onClick={() => setSelectedTransaction(row)}
                >
                  <td className="px-4 py-4 text-sm text-slate-500">{i + 1}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-[#19355c]">{row.ref}</td>
                  <td className="px-4 py-4 text-sm">{row.date}</td>
                  <td className="px-4 py-4 text-sm font-bold text-green-600">{row.amount}</td>
                  <td className="px-4 py-4 text-sm font-mono">{row.acc}</td>
                  <td className="px-4 py-4 text-sm font-medium">{row.name}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{row.bank}</td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{row.desc}</p>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                      row.status === 'Chờ xử lý' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className={`px-4 py-4 text-sm ${row.user === 'Chưa phân công' ? 'text-slate-400 italic' : 'font-medium'}`}>
                    {row.user}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {row.status === 'Chờ xử lý' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProcess?.();
                        }}
                        className="px-4 py-2 bg-[#19355c] text-white text-xs font-bold rounded-lg hover:bg-[#19355c]/90 transition-colors"
                      >
                        Chọn giao dịch xử lý
                      </button>
                    )}
                    {row.status === 'Đang xử lý' && <span className="text-slate-400">-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-200">
          <p className="text-sm text-slate-500">Đang hiển thị <span className="font-medium text-slate-900">1 - 3</span> trên <span className="font-medium text-slate-900">45</span> giao dịch</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-white disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#19355c] text-white text-sm font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-sm font-medium">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-sm font-medium">3</button>
            <span className="px-1 text-slate-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-sm font-medium">10</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-white">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTransaction && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Chi tiết giao dịch rổ lưu trữ</h3>
                <button 
                  className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                  onClick={() => setSelectedTransaction(null)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#19355c] mb-4 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#19355c]"></span>
                    Thông tin chung
                  </h4>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Ngày giao dịch</p>
                      <p className="text-sm font-semibold text-slate-700">{selectedTransaction.date}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Số tham chiếu</p>
                      <p className="text-sm font-mono text-slate-700">{selectedTransaction.ref}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Trạng thái</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        selectedTransaction.status === 'Chờ xử lý' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        <Clock size={12} />
                        {selectedTransaction.status}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Người xử lý</p>
                      <p className={`text-sm ${selectedTransaction.user === 'Chưa phân công' ? 'italic text-slate-400' : 'font-semibold text-slate-700'}`}>
                        {selectedTransaction.user}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#19355c] mb-4 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#19355c]"></span>
                    Thông tin tài chính
                  </h4>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <div className="space-y-1 col-span-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Phát sinh có</p>
                      <p className="text-xl font-extrabold text-[#19355c]">{selectedTransaction.amount} <span className="text-sm font-bold">VND</span></p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Tài khoản đối ứng</p>
                      <p className="text-sm font-mono text-slate-700">{selectedTransaction.acc}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Tên đối ứng</p>
                      <p className="text-sm font-semibold text-slate-700">{selectedTransaction.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Ngân hàng đối ứng</p>
                      <p className="text-sm font-bold text-slate-700">{selectedTransaction.bank}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#19355c] mb-4 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[#19355c]"></span>
                    Nội dung chi tiết
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Diễn giải đầy đủ</p>
                      <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-700 leading-relaxed font-medium">
                        {selectedTransaction.desc}. Giao dịch được xác nhận bởi hệ thống ngân hàng liên kết.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                <button 
                  className="px-4 py-2 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"
                  onClick={() => setSelectedTransaction(null)}
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
