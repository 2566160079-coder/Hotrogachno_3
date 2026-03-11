import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  AlertCircle, 
  Clock, 
  FileUp, 
  CheckCircle2, 
  X, 
  ChevronRight,
  ArrowRight,
  Download,
  UploadCloud,
  Loader2,
  FileText,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GiaoDichTreoProps {
  onSelectProcess: () => void;
}

export const GiaoDichTreo: React.FC<GiaoDichTreoProps> = ({ onSelectProcess }) => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [importStep, setImportStep] = useState(1); 
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const transactions = [
    { 
      id: 1, 
      ref: 'FT2301045582', 
      date: '15/10/2023', 
      amount: '50.000.000', 
      account: '0011004321987',
      name: 'NGUYEN VAN A',
      bank: 'Vietcombank', 
      description: 'Chuyển tiền thanh toán hóa đơn dịch vụ tháng 10 cho đối tác vận chuyển',
      time: '10:30:15',
      user: 'Tran Thi B',
      status: 'Chờ xử lý',
      hangNote: 'Lỗi timeout kết nối',
      processNote: 'Đang kiểm tra'
    },
    { 
      id: 2, 
      ref: 'FT2301045583', 
      date: '15/10/2023', 
      amount: '125.500.000', 
      account: '0451000123456',
      name: 'CONG TY TNHH ABC',
      bank: 'BIDV', 
      description: 'Thanh toán hợp đồng kinh tế số 123/HDKT/2023 về việc cung cấp thiết bị văn phòng',
      time: '11:15:20',
      user: 'Le Van C',
      status: 'Chờ xử lý',
      hangNote: 'Sai số tài khoản đích',
      processNote: 'Chờ xác nhận'
    },
    { 
      id: 3, 
      ref: 'FT2301045584', 
      date: '15/10/2023', 
      amount: '1.200.000', 
      account: '1903345566778',
      name: 'PHAM THI D',
      bank: 'Techcombank', 
      description: 'Chuyển khoản nội bộ cá nhân phục vụ chi tiêu cá nhân cuối tuần',
      time: '14:45:00',
      user: 'Tran Thi B',
      status: 'Đang xử lý',
      hangNote: 'Hệ thống bảo trì',
      processNote: 'Chưa xử lý'
    },
    { 
      id: 4, 
      ref: 'FT2301045595', 
      date: '16/10/2023', 
      amount: '340.000.000', 
      account: '0121000654321',
      name: 'TẬP ĐOÀN VIỄN THÔNG A',
      bank: 'VietinBank', 
      description: 'Quyết toán kinh phí dự án hạ tầng mạng quý 3/2023 chi tiết theo phụ lục 01',
      time: '08:20:05',
      user: 'Nguyen Van D',
      status: 'Đang xử lý',
      hangNote: 'Trùng số tham chiếu',
      processNote: 'Đang đối soát'
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleConfirmImport = () => {
    setImportStep(2);
    setTimeout(() => {
      setImportStep(3);
    }, 2000);
  };

  const resetImport = () => {
    setShowImportModal(false);
    setImportStep(1);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Giao dịch treo hệ thống</h3>
        <p className="text-slate-500">Quản lý và phê duyệt các giao dịch đang tạm dừng trong hệ thống thanh toán liên ngân hàng.</p>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tài khoản đối ứng</label>
            <input className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19355c]/50 focus:border-[#19355c]" placeholder="Nhập số tài khoản..." type="text"/>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tên đối ứng</label>
            <input className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19355c]/50 focus:border-[#19355c]" placeholder="Nhập tên đối ứng..." type="text"/>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Người xử lý</label>
            <input className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19355c]/50 focus:border-[#19355c]" placeholder="Nhập tên người xử lý..." type="text"/>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ghi chú Treo</label>
            <input className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19355c]/50 focus:border-[#19355c]" placeholder="Nhập ghi chú..." type="text"/>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phát sinh có</label>
            <div className="flex items-center gap-2">
              <input className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19355c]/50 focus:border-[#19355c]" placeholder="Từ" type="number"/>
              <span className="text-slate-400">-</span>
              <input className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#19355c]/50 focus:border-[#19355c]" placeholder="Đến" type="number"/>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
            <FileText size={18} />
            Xuất Excel
          </button>
          <button 
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#19355c] hover:bg-[#19355c]/90 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
          >
            <UploadCloud size={18} />
            Import file cập nhật trạng thái
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-[#19355c] text-white text-sm font-bold rounded-lg hover:bg-[#19355c]/90 transition-colors shadow-sm">
            <Filter size={18} />
            Lọc kết quả
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1600px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">STT</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Số tham chiếu</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Ngày giao dịch</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap text-right">Phát sinh có (VND)</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Tài khoản đối ứng</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Tên đối ứng</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Ngân hàng đối ứng</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap w-64">Diễn giải</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Thời gian</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Trạng thái</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Người xử lý</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Ghi chú treo</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Ghi chú xử lý</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap text-center sticky right-0 bg-slate-50 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.1)]">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {transactions.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-slate-500">{i + 1}</td>
                  <td className="px-4 py-4 text-sm font-mono font-medium text-[#19355c]">{row.ref}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{row.date}</td>
                  <td className="px-4 py-4 text-sm font-bold text-slate-900 text-right">{row.amount}</td>
                  <td className="px-4 py-4 text-sm font-mono text-slate-600">{row.account}</td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-700">{row.name}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{row.bank}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">
                    <div className="line-clamp-2 min-h-[40px] w-64">{row.description}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">{row.time}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                      row.status === 'Chờ xử lý' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">{row.user}</td>
                  <td className="px-4 py-4 text-sm text-red-500 font-medium">{row.hangNote}</td>
                  <td className="px-4 py-4 text-sm text-slate-500 italic">{row.processNote}</td>
                  <td className="px-4 py-4 text-center sticky right-0 bg-white shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.1)]">
                    {row.status === 'Chờ xử lý' ? (
                      <button 
                        onClick={onSelectProcess}
                        className="inline-flex items-center px-4 py-2 bg-[#19355c] hover:bg-[#19355c]/90 text-white text-xs font-bold rounded transition-colors whitespace-nowrap"
                      >
                        Chọn giao dịch xử lý
                      </button>
                    ) : (
                      <span className="text-slate-400 text-xs italic">Đang xử lý...</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Hiển thị <span className="font-medium text-slate-700">1 - 4</span> trên <span className="font-medium text-slate-700">24</span> kết quả
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 hover:text-[#19355c] transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-[#19355c] bg-[#19355c] text-white font-bold text-xs">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 font-medium text-xs">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 font-medium text-xs">3</button>
            <span className="px-2 text-slate-400 text-xs">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 font-medium text-xs">6</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 bg-white text-slate-400 hover:text-[#19355c] transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      <AnimatePresence>
        {showImportModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Import cập nhật trạng thái</h3>
                <button onClick={resetImport} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8">
                {importStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <p className="text-sm text-slate-600">Sử dụng file Excel mẫu để cập nhật trạng thái hàng loạt cho các giao dịch đang treo.</p>
                      <button className="text-xs font-bold text-[#19355c] hover:underline flex items-center justify-center gap-1 mx-auto">
                        <Download size={14} /> Tải file mẫu (.xlsx)
                      </button>
                    </div>

                    <div 
                      className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer ${
                        selectedFile ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-[#19355c] bg-slate-50'
                      }`}
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
                      <div className={`size-16 rounded-full flex items-center justify-center ${selectedFile ? 'bg-green-100 text-green-600' : 'bg-white text-slate-400 shadow-sm'}`}>
                        <UploadCloud size={32} />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-slate-700">
                          {selectedFile ? selectedFile.name : 'Kéo thả file hoặc click để chọn'}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Hỗ trợ định dạng .xlsx, .xls (Tối đa 10MB)</p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button onClick={resetImport} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">Hủy bỏ</button>
                      <button 
                        disabled={!selectedFile}
                        onClick={handleConfirmImport}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all shadow-lg ${
                          selectedFile ? 'bg-[#19355c] text-white hover:bg-[#19355c]/90' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Xác nhận cập nhật
                      </button>
                    </div>
                  </div>
                )}

                {importStep === 2 && (
                  <div className="py-12 flex flex-col items-center justify-center space-y-6">
                    <div className="relative">
                      <div className="size-24 rounded-full border-4 border-slate-100"></div>
                      <div className="absolute inset-0 size-24 rounded-full border-4 border-[#19355c] border-t-transparent animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-[#19355c]">
                        <Loader2 size={32} className="animate-pulse" />
                      </div>
                    </div>
                    <div className="text-center space-y-1">
                      <h4 className="text-lg font-bold text-slate-900">Đang xử lý dữ liệu...</h4>
                      <p className="text-sm text-slate-500">Hệ thống đang kiểm tra và cập nhật trạng thái giao dịch.</p>
                    </div>
                  </div>
                )}

                {importStep === 3 && (
                  <div className="py-8 flex flex-col items-center justify-center space-y-6">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="size-24 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                    <div className="text-center space-y-2">
                      <h4 className="text-xl font-extrabold text-slate-900">Cập nhật thành công!</h4>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 min-w-[300px]">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Tổng số bản ghi:</span>
                          <span className="font-bold">150</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Thành công:</span>
                          <span className="font-bold text-green-600">148</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Thất bại:</span>
                          <span className="font-bold text-red-600">2</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={resetImport}
                      className="w-full py-3 text-sm font-bold text-white bg-[#19355c] rounded-xl hover:bg-[#19355c]/90 transition-all shadow-lg"
                    >
                      Hoàn tất
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
