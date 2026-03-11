import React, { useState, useEffect } from 'react';
import { 
  Search, 
  User, 
  Phone, 
  CreditCard, 
  Calculator, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  ArrowRight,
  History,
  Info,
  X,
  Plus,
  Trash2,
  Save,
  Send,
  ArrowLeft,
  Receipt,
  UserSearch,
  BarChart3,
  ListTodo,
  CloudUpload,
  FileDown,
  Verified,
  Archive,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TinhToanGachNoProps {
  onBack?: () => void;
}

export const TinhToanGachNo: React.FC<TinhToanGachNoProps> = ({ onBack }) => {
  const [customerSearch, setCustomerSearch] = useState('902999999');
  const [isCalculated, setIsCalculated] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [isWarning, setIsWarning] = useState(false);
  const [debtType, setDebtType] = useState<'start' | 'current'>('start');
  const [adjustment, setAdjustment] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [transaction, setTransaction] = useState<any>(null);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const txRes = await fetch('/api/transactions');
        const txData = await txRes.json();
        if (txData.length > 0) {
          const tx = txData[0];
          setTransaction({
            ref: tx.ref,
            date: tx.date,
            amount: tx.amount, // Keep as number
            desc: tx.description,
            bank: tx.bank,
            acc: tx.account,
            name: tx.name
          });
        }

        const subRes = await fetch('/api/subscribers/KH-992031');
        const subData = await subRes.json();
        setSubscribers(subData.map((s: any, index: number) => ({
          id: (index + 1).toString().padStart(2, '0'),
          subId: s.phone_number,
          cusId: s.customer_id,
          name: s.customer_name,
          debtStart: s.debt_start,
          debtCurrent: s.debt_current,
          selected: true
        })));
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProcessClick = () => {
    if (!transaction) return;
    const targetDebt = debtType === 'start' ? totalDebtStart : totalDebtCurrent;
    const diff = totalPayment - targetDebt;
    
    if (diff === 0) {
      const subIds = selectedSubs.map(s => s.subId).join(', ');
      setConfirmMessage(`Bạn đang thực hiện gạch nợ với số Tiền ${totalPayment.toLocaleString()} cho ${totalSTB} thuê bao: ${subIds}`);
      setIsWarning(false);
    } else {
      setConfirmMessage(`"Số tiền giao dịch" và "Tổng nợ cước đã chọn" không khớp. Bạn có muốn tiếp tục Gạch nợ?`);
      setIsWarning(true);
    }
    setShowConfirmPopup(true);
  };

  const handleConfirmProcess = async () => {
    setShowConfirmPopup(false);
    await executeProcess();
  };

  const executeProcess = async () => {
    if (!transaction) return;
    
    try {
      const res = await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionRef: transaction.ref,
          subscriberIds: subscribers.filter(s => s.selected).map(s => s.subId),
          amount: totalPayment,
          note: paymentNote
        })
      });

      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  const toggleSubscriber = (id: string) => {
    setSubscribers(prev => prev.map(s => 
      s.id === id ? { ...s, selected: !s.selected } : s
    ));
  };

  const toggleAllSubscribers = () => {
    const allSelected = subscribers.every(s => s.selected);
    setSubscribers(prev => prev.map(s => ({ ...s, selected: !allSelected })));
  };

  const selectedSubs = subscribers.filter(s => s.selected);
  const totalSTB = selectedSubs.length;
  const totalDebtStart = selectedSubs.reduce((acc, sub) => acc + (sub.debtStart || 0), 0);
  const totalDebtCurrent = selectedSubs.reduce((acc, sub) => acc + (sub.debtCurrent || 0), 0);

  const transactionAmount = transaction ? transaction.amount : 0;
  const adjustmentAmount = parseInt(adjustment) || 0;
  const totalPayment = transactionAmount + adjustmentAmount;

  if (loading || !transaction) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#19355c]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
        >
          <ArrowLeft size={16} />
          Quay lại
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* KHỐI 1: THÔNG TIN GIAO DỊCH */}
        <section className="lg:col-span-12">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Receipt className="text-[#19355c]" size={20} />
              <h3 className="font-bold text-[#19355c] uppercase tracking-wider text-sm">Khối 1: Thông tin giao dịch TRÊN SỔ PHỤ NGÂN HÀNG</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-8">
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Số tham chiếu</p>
                <p className="font-bold text-slate-900">{transaction.ref}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Ngày giao dịch</p>
                <p className="font-medium">{transaction.date}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Phát sinh có</p>
                <p className="font-bold text-emerald-600 text-lg">{transaction.amount.toLocaleString()} VND</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Ngân hàng đối ứng</p>
                <p className="font-medium">{transaction.bank}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Tài khoản đối ứng</p>
                <p className="font-medium">{transaction.acc}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Tên đối ứng</p>
                <p className="font-medium uppercase">{transaction.name}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Diễn giải</p>
                <p className="text-sm italic text-slate-600">"{transaction.desc}"</p>
              </div>
            </div>
          </div>
        </section>

        {/* KHỐI 2: NHẬN DIỆN KHÁCH HÀNG */}
        <section className="lg:col-span-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tiêu chí 1: Nhận diện qua Số TB/MST */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-[#19355c] rounded-full"></div>
                  <h3 className="text-lg font-bold text-[#19355c]">Tiêu chí 1: Nhận diện qua Số TB/MST</h3>
                </div>
                <button className="flex items-center gap-1 text-[#19355c] hover:underline text-sm font-bold">
                  <CloudUpload size={16} />
                  Import danh sách
                </button>
              </div>

              <div className="flex items-center gap-6 p-3 bg-slate-50 rounded-lg border border-slate-100 mb-6 flex-wrap">
                <div className="w-full mb-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tìm kiếm theo:</span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input defaultChecked className="w-4 h-4 text-[#19355c] rounded border-slate-300 focus:ring-[#19355c]" type="checkbox" />
                  <span className="text-sm font-bold text-slate-700">Số TB</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="w-4 h-4 text-[#19355c] rounded border-slate-300 focus:ring-[#19355c]" type="checkbox" />
                  <span className="text-sm font-bold text-slate-700">Mã số thuế</span>
                </label>
              </div>

              <div className="space-y-4 flex-1">
                {/* STB Row */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">STB</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#19355c] focus:border-transparent outline-none text-sm font-medium" 
                        placeholder="Nhập số thuê bao..." 
                        type="text" 
                      />
                    </div>
                    <button className="px-4 py-2 border-2 border-[#19355c] text-[#19355c] font-bold rounded-lg hover:bg-[#19355c]/5 flex items-center gap-2 whitespace-nowrap min-w-[120px] justify-center transition-colors">
                      <Plus size={18} />
                      Thêm
                    </button>
                  </div>
                </div>

                {/* MST Row */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">MST</label>
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#19355c] focus:border-transparent outline-none text-sm font-medium" 
                      placeholder="Nhập mã số thuế..." 
                      type="text" 
                      defaultValue="0102030405"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button className="w-full py-2.5 bg-[#19355c] text-white font-bold rounded-lg hover:bg-[#19355c]/90 flex items-center gap-2 justify-center transition-all shadow-md">
                    <CheckCircle2 size={18} />
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>

            {/* Tiêu chí 2: Thông tin ngân hàng hệ thống */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-1 bg-[#19355c] rounded-full"></div>
                <h3 className="text-lg font-bold text-[#19355c]">Tiêu chí 2: Thông tin ngân hàng hệ thống</h3>
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Thông tin đối ứng</th>
                      <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ngân hàng</th>
                      <th className="pb-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr>
                      <td className="py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">CTCP CÔNG NGHỆ X</span>
                          <span className="text-xs text-slate-500 font-medium">TK: 19034567891012</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-[#19355c]">
                            <CreditCard size={16} />
                          </div>
                          <span className="text-xs font-bold text-slate-700">Techcombank - Hà Nội</span>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-100 uppercase">
                          Đã nhận diện
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Thanh toán gần nhất</span>
                    <span className="text-sm font-bold text-slate-700">25/09/2023 - 45M VND</span>
                  </div>
                  <button className="text-[#19355c] text-xs font-bold flex items-center gap-1 hover:underline">
                    Lịch sử <ChevronRight size={14} />
                  </button>
                </div>
                <button className="w-full py-2.5 bg-[#19355c] text-white font-bold rounded-lg hover:bg-[#19355c]/90 flex items-center justify-center gap-2 transition-all shadow-md">
                  <CheckCircle2 size={18} />
                  Xác nhận thông tin
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* KHỐI 3: THÔNG TIN NỢ & ĐỐI SOÁT */}
        <section className="lg:col-span-12">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="text-[#19355c]" size={20} />
            <h3 className="font-bold text-[#19355c] uppercase tracking-wider text-sm">Khối 3: Thông tin nợ & Đối soát</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {/* Số tiền thanh toán */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col">
              <p className="text-slate-500 text-sm font-medium mb-1">Số tiền thanh toán</p>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-2xl font-black text-slate-900">{totalPayment.toLocaleString()} <span className="text-lg font-bold">VND</span></h4>
                {adjustmentAmount !== 0 && (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                    = {transaction.amount.toLocaleString()} {adjustmentAmount > 0 ? '+' : '-'} {Math.abs(adjustmentAmount).toLocaleString()}
                  </span>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 flex-1">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Điều chỉnh (+/-)</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-sm font-bold focus:ring-2 focus:ring-[#19355c] outline-none transition-all"
                    placeholder="0"
                    value={adjustment}
                    onChange={(e) => setAdjustment(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Ghi chú điều chỉnh</label>
                  <textarea 
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs focus:ring-2 focus:ring-[#19355c] outline-none h-20 resize-none transition-all"
                    placeholder="Nhập ghi chú..."
                    value={paymentNote}
                    onChange={(e) => setPaymentNote(e.target.value)}
                  />
                </div>
              </div>
              
              <p className="text-xs text-slate-400 mt-4 italic">Số tiền từ giao dịch sổ phụ</p>
            </div>
            {/* Nợ đầu kỳ */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <p className="text-slate-500 text-sm font-medium mb-1">Nợ đầu kỳ</p>
              <h4 className="text-2xl font-black text-slate-900">{totalDebtStart.toLocaleString()} <span className="text-lg font-bold">VND</span></h4>
              <div className="mt-2 flex items-center gap-1">
                <AlertCircle size={14} className={totalPayment - totalDebtStart === 0 ? "text-emerald-600" : "text-red-600"} />
                <p className={`text-xs font-bold ${totalPayment - totalDebtStart === 0 ? "text-emerald-600" : "text-red-600"}`}>
                  Chênh lệch: {(totalPayment - totalDebtStart).toLocaleString()} VND
                </p>
              </div>
            </div>
            {/* Nợ hiện tại */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
              <p className="text-slate-500 text-sm font-medium mb-1">Nợ hiện tại</p>
              <h4 className="text-2xl font-black text-slate-900">{totalDebtCurrent.toLocaleString()} <span className="text-lg font-bold">VND</span></h4>
              <div className="mt-2 flex items-center gap-1">
                <AlertCircle size={14} className={totalPayment - totalDebtCurrent === 0 ? "text-emerald-600" : "text-red-600"} />
                <p className={`text-xs font-bold ${totalPayment - totalDebtCurrent === 0 ? "text-emerald-600" : "text-red-600"}`}>
                  Chênh lệch: {(totalPayment - totalDebtCurrent).toLocaleString()} VND
                </p>
              </div>
            </div>
          </div>
          {/* Cảnh báo */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-amber-600" size={20} />
            <div>
              <p className="text-amber-800 text-sm font-bold">Cảnh báo: Khách hàng có nhiều thuê bao</p>
              <p className="text-amber-700 text-xs">Hệ thống phát hiện tài khoản này đang đứng tên cho 05 thuê bao khác nhau. Vui lòng kiểm tra kỹ danh sách trước khi thực hiện gạch nợ.</p>
            </div>
          </div>
        </section>

        {/* KHỐI 4: DANH SÁCH THUÊ BAO */}
        <section className="lg:col-span-12">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <ListTodo className="text-[#19355c]" size={20} />
                <h3 className="font-bold text-[#19355c] uppercase tracking-wider text-sm">KHỐI 4: DANH SÁCH THUÊ BAO VÀ LỰA CHỌN GẠCH NỢ</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded text-xs font-medium text-slate-600 hover:bg-slate-50">
                    <FileDown size={14} /> Export
                  </button>
                </div>
                  <button 
                    onClick={toggleAllSubscribers}
                    className="text-[#19355c] text-sm font-bold hover:underline"
                  >
                    {subscribers.every(s => s.selected) ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                  </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                    <th className="px-6 py-3 border-b border-slate-200">STT</th>
                    <th className="px-6 py-3 border-b border-slate-200">STB</th>
                    <th className="px-6 py-3 border-b border-slate-200">Cus_ID</th>
                    <th className="px-6 py-3 border-b border-slate-200">Họ khách hàng</th>
                    <th className="px-6 py-3 border-b border-slate-200 text-right">Nợ đầu kỳ</th>
                    <th className="px-6 py-3 border-b border-slate-200 text-right">Nợ hiện tại</th>
                    <th className="px-6 py-3 border-b border-slate-200 text-center">Chọn gạch</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-200">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">{sub.id}</td>
                      <td className="px-6 py-4 font-bold text-[#19355c]">{sub.subId}</td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{sub.cusId}</td>
                      <td className="px-6 py-4 font-bold">{sub.name}</td>
                      <td className="px-6 py-4 text-right">{sub.debtStart?.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">{sub.debtCurrent?.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center">
                        <input 
                          checked={sub.selected} 
                          onChange={() => toggleSubscriber(sub.id)}
                          className="rounded border-slate-300 text-[#19355c] focus:ring-[#19355c] h-4 w-4 cursor-pointer" 
                          type="checkbox" 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 font-bold text-slate-900">
                    <td className="px-6 py-6 text-left uppercase text-xs font-bold text-[#19355c]">TỔNG CỘNG:</td>
                    <td className="px-6 py-6 text-left text-lg font-bold text-[#19355c]">{totalSTB}</td>
                    <td className="px-6 py-6"></td>
                    <td className="px-6 py-6"></td>
                    <td className="px-6 py-6 text-right text-xl font-bold text-[#19355c]">{totalDebtStart.toLocaleString()}</td>
                    <td className="px-6 py-6 text-right text-xl font-bold text-[#19355c]">{totalDebtCurrent.toLocaleString()}</td>
                    <td className=""></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        {/* FOOTER ACTIONS */}
        <div className="lg:col-span-12 space-y-6">
          <div className="flex gap-4">
            <label className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold shadow-sm cursor-pointer">
              <input 
                type="radio"
                name="debtType"
                checked={debtType === 'start'}
                onChange={() => setDebtType('start')}
                className="rounded-full border-slate-300 text-[#19355c] focus:ring-[#19355c] h-4 w-4" 
              />
              Gạch nợ theo Nợ đầu kỳ
            </label>
            <label className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold shadow-sm cursor-pointer">
              <input 
                type="radio"
                name="debtType"
                checked={debtType === 'current'}
                onChange={() => setDebtType('current')}
                className="rounded-full border-slate-300 text-[#19355c] focus:ring-[#19355c] h-4 w-4" 
              />
              Gạch nợ theo Nợ hiện tại
            </label>
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold shadow-sm hover:bg-slate-50 transition-all">
              <CloudUpload size={16} className="text-[#19355c]" />
              Import Gạch nợ theo danh sách
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">GHI CHÚ NGHIỆP VỤ</h4>
              <textarea className="w-full rounded-lg border-slate-200 bg-slate-50 text-sm p-4 h-32" placeholder="Nhập lý do hoặc các lưu ý đặc biệt cho giao dịch này..."></textarea>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="p-6 space-y-4">
                <h4 className="font-bold text-slate-800 uppercase text-sm">TỔNG HỢP GẠCH NỢ</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Số tiền thanh toán</span>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-slate-900">{totalPayment.toLocaleString()}</span>
                      {adjustmentAmount !== 0 && (
                        <span className="text-[10px] text-slate-400">
                          ({transaction.amount.toLocaleString()} {adjustmentAmount > 0 ? '+' : '-'} {Math.abs(adjustmentAmount).toLocaleString()})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tổng nợ đã chọn</span>
                    <span className="font-bold text-[#19355c]">
                      {(debtType === 'start' ? totalDebtStart : totalDebtCurrent).toLocaleString()}
                    </span>
                  </div>
                  <hr className="border-slate-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-bold">Chênh lệch</span>
                    <span className={`font-bold text-lg ${Math.abs(totalPayment - (debtType === 'start' ? totalDebtStart : totalDebtCurrent)) === 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {(totalPayment - (debtType === 'start' ? totalDebtStart : totalDebtCurrent)).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="pt-4 space-y-3">
                  <button 
                    onClick={handleProcessClick}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#19355c] text-white rounded-lg font-bold shadow-lg hover:bg-[#19355c]/90 transition-all"
                  >
                    <Verified size={20} /> Xác nhận gạch nợ
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#ff8a43] text-white rounded-lg font-bold shadow-lg hover:bg-[#ff8a43]/90 transition-all">
                    <Archive size={20} /> Treo giao dịch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 size={20} />
            <span className="font-bold text-sm">Gạch nợ thành công! Giao dịch đã được cập nhật trạng thái.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Popup */}
      <AnimatePresence>
        {showConfirmPopup && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmPopup(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className={`p-6 ${isWarning ? 'bg-amber-50' : 'bg-emerald-50'} flex items-center gap-4 border-b border-slate-100`}>
                <div className={`p-3 rounded-full ${isWarning ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {isWarning ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${isWarning ? 'text-amber-900' : 'text-emerald-900'}`}>
                    {isWarning ? 'Cảnh báo không khớp' : 'Xác nhận gạch nợ'}
                  </h3>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Yêu cầu xác nhận nghiệp vụ</p>
                </div>
              </div>
              <div className="p-8">
                <p className="text-slate-700 leading-relaxed font-medium text-center">
                  {confirmMessage}
                </p>
              </div>
              <div className="p-6 bg-slate-50 flex gap-3">
                <button 
                  onClick={() => setShowConfirmPopup(false)}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-all"
                >
                  Hủy bỏ
                </button>
                <button 
                  onClick={handleConfirmProcess}
                  className={`flex-1 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${isWarning ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200' : 'bg-[#19355c] hover:bg-[#19355c]/90 shadow-slate-200'}`}
                >
                  Xác nhận
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
