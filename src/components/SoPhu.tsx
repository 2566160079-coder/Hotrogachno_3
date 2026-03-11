import React from 'react';
import { 
  Search, 
  RefreshCcw, 
  FileDown, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Bot,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  UploadCloud,
  X,
  FileText,
  Loader2,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SoPhu: React.FC = () => {
  const [showImportModal, setShowImportModal] = React.useState(false);
  const [importStep, setImportStep] = React.useState(1);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [transactions, setTransactions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('/api/transactions');
        const data = await res.json();
        setTransactions(data.map((tx: any) => ({
          date: tx.date,
          amount: tx.amount.toLocaleString(),
          desc: tx.description,
          acc: tx.account,
          name: tx.name,
          bank: tx.bank,
          ref: tx.ref,
          status: tx.status === 'PENDING' ? 'Chưa xử lý' : 
                  tx.status === 'PROCESSING' ? 'Đang xử lý' :
                  tx.status === 'PROCESSED' ? 'Hoàn thành' :
                  tx.status === 'ON_HOLD' ? 'Treo' : 'Chưa xử lý',
          importTime: `10:05:30 ${tx.date}`,
          user: tx.status === 'PENDING' ? 'Chưa xử lý' : 'System',
          isBot: tx.status !== 'PENDING',
          note: tx.note
        })));
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

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
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Quản lý sổ phụ</h1>
          <p className="text-sm text-slate-500 font-normal">Theo dõi và xử lý các giao dịch import từ ngân hàng liên kết.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-all shadow-md"
          >
            <UploadCloud size={16} /> Import File thủ công
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm">
            <RefreshCcw size={16} /> Làm mới dữ liệu
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm">
            <FileDown size={16} /> Xuất Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#19355c] rounded-lg hover:bg-[#19355c]/90 transition-all shadow-md">
            <Filter size={16} /> Bộ lọc nâng cao
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Khoảng ngày giao dịch</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                value="01/10/2023 - 31/10/2023" 
                className="w-full h-10 pl-9 pr-4 rounded-lg border-slate-200 text-sm focus:border-[#19355c] focus:ring-[#19355c]" 
                readOnly
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Trạng thái</label>
            <select className="w-full h-10 rounded-lg border-slate-200 text-sm focus:border-[#19355c] focus:ring-[#19355c]">
              <option>Tất cả</option>
              <option>Chưa xử lý</option>
              <option>Đang xử lý</option>
              <option>Hoàn thành</option>
              <option>Treo</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Người xử lý</label>
            <select className="w-full h-10 rounded-lg border-slate-200 text-sm focus:border-[#19355c] focus:ring-[#19355c]">
              <option>Tất cả người xử lý</option>
              <option>System</option>
              <option>Nguyễn Văn A</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">Tìm kiếm nhanh</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Số tham chiếu, tài khoản..." 
                className="w-full h-10 pl-9 pr-4 rounded-lg border-slate-200 text-sm focus:border-[#19355c] focus:ring-[#19355c]" 
              />
            </div>
          </div>
          <div>
            <button className="w-full h-10 flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#19355c] rounded-lg hover:bg-[#19355c]/90 transition-all shadow-md">
              <Search size={16} /> Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Giao dịch mới import từ sổ phụ ngân hàng</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 tracking-wider border-b border-slate-200">
                <th className="px-6 py-4">Ngày giao dịch</th>
                <th className="px-6 py-4 text-right">Phát sinh có (VND)</th>
                <th className="px-6 py-4">Diễn giải</th>
                <th className="px-6 py-4">Tài khoản đối ứng</th>
                <th className="px-6 py-4">Tên đối ứng</th>
                <th className="px-6 py-4">Ngân hàng đối ứng</th>
                <th className="px-6 py-4">Số tham chiếu</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Thời gian import</th>
                <th className="px-6 py-4">Ghi chú</th>
                <th className="px-6 py-4">Người import</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={11} className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin mx-auto text-[#19355c]" size={32} />
                    <p className="mt-2 text-sm text-slate-500">Đang tải dữ liệu...</p>
                  </td>
                </tr>
              ) : transactions.map((row, i) => (
                <tr key={i} className={`hover:bg-slate-50 transition-colors group cursor-pointer ${row.isError ? 'bg-red-50/30' : ''}`}>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">{row.date}</td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-[#19355c]">{row.amount}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 truncate max-w-[200px]">{row.desc}</td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-500">{row.acc}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-700">{row.name}</td>
                  <td className="px-6 py-4 text-[10px] text-slate-500 font-bold uppercase tracking-tight">{row.bank}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-mono bg-slate-50 text-slate-500 py-1 px-2 rounded-md border border-slate-100 ${row.isError ? 'italic' : ''}`}>{row.ref}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      row.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' : 
                      row.status === 'Treo' ? 'bg-red-100 text-red-700' :
                      row.status === 'Đang xử lý' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {row.status === 'Hoàn thành' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{row.importTime}</td>
                  <td className={`px-6 py-4 text-xs ${row.isError ? 'text-red-600 font-medium' : 'text-slate-400'}`}>{row.note || '—'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {row.isBot ? <Bot size={16} className="text-slate-400" /> : <div className="size-5 rounded-full bg-slate-200" />}
                      <span className="text-xs font-bold text-slate-600">{row.user}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-slate-500 italic">Hiển thị 1 - {transactions.length} trong tổng số {transactions.length} giao dịch</p>
          <div className="flex items-center gap-2">
            <button className="h-8 w-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-400 hover:text-[#19355c] disabled:opacity-50" disabled>
              <ChevronsLeft size={16} />
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-400 hover:text-[#19355c]" disabled>
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1">
              <button className="h-8 w-8 flex items-center justify-center rounded bg-[#19355c] text-white text-xs font-bold">1</button>
              <button className="h-8 w-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 text-xs font-bold hover:bg-slate-50">2</button>
              <button className="h-8 w-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 text-xs font-bold hover:bg-slate-50">3</button>
              <span className="px-1 text-slate-400">...</span>
              <button className="h-8 w-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 text-xs font-bold hover:bg-slate-50">312</button>
            </div>
            <button className="h-8 w-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:text-[#19355c]">
              <ChevronRight size={16} />
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-600 hover:text-[#19355c]">
              <ChevronsRight size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Hiển thị</span>
            <select className="h-8 text-xs font-bold rounded border-slate-200 py-0 focus:ring-[#19355c]">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
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
                <h3 className="text-lg font-bold text-slate-900">Import sổ phụ thủ công</h3>
                <button onClick={resetImport} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8">
                {importStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <p className="text-sm text-slate-600">Tải lên file sổ phụ ngân hàng (Excel/CSV) để hệ thống thực hiện đối soát và gạch nợ.</p>
                      <button className="text-xs font-bold text-[#19355c] hover:underline flex items-center justify-center gap-1 mx-auto">
                        <Download size={14} /> Tải file mẫu (.xlsx)
                      </button>
                    </div>

                    <div 
                      className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer ${
                        selectedFile ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-[#19355c] bg-slate-50'
                      }`}
                      onClick={() => document.getElementById('file-upload-manual')?.click()}
                    >
                      <input type="file" id="file-upload-manual" className="hidden" onChange={handleFileChange} />
                      <div className={`size-16 rounded-full flex items-center justify-center ${selectedFile ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-400 shadow-sm'}`}>
                        <UploadCloud size={32} />
                      </div>
                      <div className="text-center px-4">
                        <p className="text-sm font-bold text-slate-700 break-all">
                          {selectedFile ? selectedFile.name : 'Kéo thả file hoặc click để chọn'}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Hỗ trợ định dạng .xlsx, .xls, .csv (Tối đa 20MB)</p>
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
                        Bắt đầu Import
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
                      <h4 className="text-lg font-bold text-slate-900">Đang xử lý file...</h4>
                      <p className="text-sm text-slate-500">Hệ thống đang phân tích dữ liệu và đối soát giao dịch.</p>
                    </div>
                  </div>
                )}

                {importStep === 3 && (
                  <div className="py-8 flex flex-col items-center justify-center space-y-6">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="size-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
                    >
                      <CheckCircle2 size={48} />
                    </motion.div>
                    <div className="text-center space-y-2">
                      <h4 className="text-xl font-extrabold text-slate-900">Import thành công!</h4>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 min-w-[300px]">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Tổng số giao dịch:</span>
                          <span className="font-bold">1,248</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Hợp lệ:</span>
                          <span className="font-bold text-emerald-600">1,245</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Lỗi dữ liệu:</span>
                          <span className="font-bold text-red-600">3</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={resetImport}
                      className="w-full py-3 text-sm font-bold text-white bg-[#19355c] rounded-xl hover:bg-[#19355c]/90 transition-all shadow-lg"
                    >
                      Xem danh sách giao dịch
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
