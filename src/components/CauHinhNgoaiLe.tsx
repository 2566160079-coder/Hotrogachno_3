import React, { useState } from 'react';
import { 
  List, 
  Download, 
  Edit3, 
  FileText, 
  Calendar, 
  GitBranch, 
  GripVertical, 
  Trash2, 
  Zap, 
  Tag, 
  Calculator, 
  ShieldCheck, 
  Save, 
  PlusCircle,
  X,
  CheckCircle2,
  Info,
  RefreshCw,
  Search,
  Bell,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CauHinhNgoaiLe: React.FC = () => {
  const [selectedRuleId, setSelectedRuleId] = useState<number>(1);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("Hoàn thành");
  
  // Form state for exception configuration
  const [ruleName, setRuleName] = useState("");
  const [conditions, setConditions] = useState([
    { id: Date.now(), field: "Phát sinh Có", operator: "lớn hơn", value: "0", logic: null },
    { id: Date.now() + 1, field: "Diễn giải", operator: "chứa", value: "PHIDUYTRI", logic: "AND" }
  ]);

  const rules = [
    { id: 1, name: 'Ngoại lệ lọc phí ngân hàng', status: 'Hiệu lực', active: true },
    { id: 2, name: 'Ngoại lệ gạch nợ tiền thừa', status: 'Không hiệu lực', active: false },
  ];

  const handleReset = () => {
    setRuleName("");
    setConditions([
      { id: Date.now(), field: "Diễn giải", operator: "chứa", value: "", logic: null }
    ]);
    setSelectedStatus("Hoàn thành");
  };

  const handleSave = () => {
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleStatusUpdate = () => {
    setShowStatusModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-[1920px] mx-auto w-full pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cấu hình ngoại lệ</h1>
          <p className="text-slate-500 text-sm mt-1">Quản lý và thiết lập quy tắc tự động gạch nợ cho các trường hợp đặc biệt.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleReset}
            className="bg-[#3b82f6] hover:bg-blue-700 text-white px-5 py-2 rounded-md font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <PlusCircle size={18} />
            Tạo ngoại lệ mới
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Section 1: Danh sách ngoại lệ */}
        <section className="xl:col-span-3 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200 bg-white flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2 text-slate-700">
              <List size={18} className="text-[#3b82f6]" />
              Danh sách ngoại lệ
            </h3>
            <span className="bg-blue-50 text-[#3b82f6] text-[11px] px-2.5 py-1 rounded-full font-bold">12 Active</span>
          </div>
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-end">
            <button className="text-[11px] font-bold text-slate-600 hover:text-emerald-600 flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded bg-white transition-all shadow-sm">
              <Download size={16} />
              Xuất file Excel
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px]">
                <tr>
                  <th className="px-5 py-3">Thông tin ngoại lệ</th>
                  <th className="px-5 py-3 text-right">#</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rules.map((rule) => (
                  <tr 
                    key={rule.id}
                    onClick={() => setSelectedRuleId(rule.id)}
                    className={`${selectedRuleId === rule.id ? 'bg-blue-50/50 border-l-[3px] border-[#3b82f6]' : 'hover:bg-slate-50 border-l-[3px] border-transparent'} cursor-pointer transition-all`}
                  >
                    <td className="px-5 py-4">
                      <div className={`font-bold ${selectedRuleId === rule.id ? 'text-slate-900' : 'text-slate-600'}`}>{rule.name}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          rule.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {rule.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (rule.active) {
                            setShowStatusModal(true);
                          }
                        }}
                        disabled={!rule.active}
                        className={`${rule.active ? 'text-[#3b82f6] hover:bg-white' : 'text-slate-300 cursor-not-allowed'} p-1 rounded transition-colors`}
                        title={rule.active ? "Chỉnh sửa trạng thái" : "Không thể chỉnh sửa ngoại lệ không hiệu lực"}
                      >
                        <Edit3 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Thiết lập điều kiện ngoại lệ */}
        <section className="xl:col-span-9 bg-white rounded-xl border border-slate-200 flex flex-col shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200 bg-white flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2 text-slate-700">
              <GitBranch size={18} className="text-[#3b82f6]" />
              Thiết lập điều kiện ngoại lệ
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 italic">Kéo thả để thay đổi ưu tiên</span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col overflow-y-auto max-h-[750px]">
            {/* Tên ngoại lệ */}
            <div className="mb-8 space-y-1.5 max-w-2xl">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tên ngoại lệ</label>
              <input 
                className="w-full bg-slate-50 border-slate-200 rounded-md text-sm font-medium focus:ring-[#3b82f6] focus:border-[#3b82f6] px-4 py-2.5 transition-all" 
                type="text" 
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                placeholder="Nhập tên ngoại lệ (Ví dụ: Ngoại lệ lọc phí ngân hàng...)"
              />
            </div>

            <div className="relative pl-8 border-l-2 border-slate-200">
              <div className="absolute -left-[11px] top-0 size-5 bg-[#0f172a] rounded flex items-center justify-center text-[10px] text-white font-bold shadow-md">IF</div>
              <div className="space-y-4">
                {conditions.map((condition, index) => (
                  <div key={condition.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-3 group relative transition-all">
                    <div className="cursor-grab flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                      <GripVertical size={18} />
                    </div>
                    {condition.logic && (
                      <div className="w-20">
                        <select 
                          value={condition.logic} 
                          onChange={(e) => {
                            const newConditions = [...conditions];
                            newConditions[index].logic = e.target.value;
                            setConditions(newConditions);
                          }}
                          className="w-full bg-white border-slate-200 rounded text-[10px] font-bold py-1.5 px-1.5 text-[#3b82f6] focus:ring-[#3b82f6] focus:border-[#3b82f6]"
                        >
                          <option value="AND">AND</option>
                          <option value="OR">OR</option>
                        </select>
                      </div>
                    )}
                    <div className="flex-1 grid grid-cols-12 gap-3 items-end">
                      <div className="col-span-4 space-y-1">
                        {index === 0 && <p className="text-[9px] font-bold text-slate-400 uppercase ml-1">Trường dữ liệu</p>}
                        <select 
                          value={condition.field} 
                          onChange={(e) => {
                            const newConditions = [...conditions];
                            newConditions[index].field = e.target.value;
                            setConditions(newConditions);
                          }}
                          className="w-full bg-white border-slate-200 rounded text-xs py-1.5 px-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]"
                        >
                          <option>Diễn giải</option>
                          <option>Phát sinh Có</option>
                          <option>Tài khoản đối ứng</option>
                          <option>Tên đối ứng</option>
                          <option>Ngân hàng đối ứng</option>
                        </select>
                      </div>
                      <div className="col-span-3 space-y-1">
                        {index === 0 && <p className="text-[9px] font-bold text-slate-400 uppercase ml-1">Toán tử</p>}
                        <select 
                          value={condition.operator} 
                          onChange={(e) => {
                            const newConditions = [...conditions];
                            newConditions[index].operator = e.target.value;
                            setConditions(newConditions);
                          }}
                          className="w-full bg-white border-slate-200 rounded text-xs py-1.5 px-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]"
                        >
                          <option>chứa</option>
                          <option>bằng</option>
                          <option>khác</option>
                          <option>lớn hơn</option>
                          <option>nhỏ hơn</option>
                        </select>
                      </div>
                      <div className="col-span-5 space-y-1">
                        {index === 0 && <p className="text-[9px] font-bold text-slate-400 uppercase ml-1">Giá trị</p>}
                        <input 
                          className="w-full bg-white border-slate-200 rounded text-xs py-1.5 px-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]" 
                          type="text" 
                          value={condition.value}
                          onChange={(e) => {
                            const newConditions = [...conditions];
                            newConditions[index].value = e.target.value;
                            setConditions(newConditions);
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-9 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                      <button 
                        onClick={() => {
                          if (conditions.length > 1) {
                            const newConditions = conditions.filter((_, i) => i !== index);
                            if (newConditions.length > 0) newConditions[0].logic = null;
                            setConditions(newConditions);
                          }
                        }}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-start pt-2">
                  <button 
                    onClick={() => setConditions([...conditions, { id: Date.now(), field: "Diễn giải", operator: "chứa", value: "", logic: "AND" }])}
                    className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-bold px-4 py-2 rounded flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <PlusCircle size={16} /> Thêm điều kiện
                  </button>
                </div>
              </div>
            </div>

            <div className="relative pl-8 pb-6 border-l-2 border-slate-200 mt-8">
              <div className="absolute -left-[11px] top-0 size-5 bg-emerald-500 rounded flex items-center justify-center text-[10px] text-white font-bold shadow-md">THEN</div>
              <div className="bg-emerald-50/40 p-5 rounded-xl border border-emerald-100 space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-100/50 pb-2 mb-2">
                  <label className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
                    <Zap size={18} /> Hành động thực thi
                  </label>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-3 p-3 rounded-lg bg-white border border-slate-200 shadow-sm relative overflow-hidden group max-w-md">
                    <div className="absolute top-0 right-0 p-2">
                      <input defaultChecked className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500" name="action_type" type="radio"/>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag size={18} className="text-[#3b82f6]" />
                      <p className="text-xs font-bold text-slate-700">Phân loại trạng thái</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 font-medium ml-1">Trạng thái áp dụng</p>
                      <select 
                        value={selectedStatus} 
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full bg-slate-50 border-slate-200 rounded text-sm py-2 px-3 focus:ring-[#3b82f6] focus:border-[#3b82f6]"
                      >
                        <option value="Hoàn thành">Hoàn thành</option>
                        <option value="Treo">Treo</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-100">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck size={18} className="text-[#3b82f6]" />
                  <span className="text-[11px] font-bold text-slate-600 uppercase">Mô phỏng logic</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "Nếu {conditions.map((c, i) => (
                    <React.Fragment key={c.id}>
                      {i > 0 && <span className="font-bold text-[#3b82f6]"> {c.logic} </span>}
                      <span className="font-bold text-[#3b82f6]">{c.field}</span> {c.operator} <span className="font-bold text-[#3b82f6]">"{c.value || '...'}"</span>
                    </React.Fragment>
                  ))} thì hệ thống sẽ tự động <span className="font-bold text-emerald-600 uppercase">Phân loại trạng thái: {selectedStatus}</span>."
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <button 
                  onClick={handleReset}
                  className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-bold py-3 rounded-md transition-all flex items-center justify-center gap-2"
                >
                  Hủy
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-[2] bg-[#3b82f6] hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <Save size={18} />
                  Lưu cấu hình ngoại lệ
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Confirmation Modal (6.1) */}
      <AnimatePresence>
        {showStatusModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <RefreshCw size={18} className="text-[#3b82f6]" />
                  Xác nhận Thay đổi Trạng thái
                </h4>
                <button 
                  onClick={() => setShowStatusModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tên Ngoại lệ</label>
                  <p className="text-sm font-semibold text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-100">
                    Ngoại lệ lọc phí ngân hàng
                  </p>
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Trạng thái mới</label>
                  <div className="flex w-full p-1 bg-slate-100 rounded-lg border border-slate-200">
                    <button className="flex-1 text-center py-2.5 text-xs font-bold rounded-md text-slate-500">Hiệu lực</button>
                    <button className="flex-1 text-center py-2.5 text-xs font-bold rounded-md bg-slate-400 text-white shadow-sm">Không hiệu lực</button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Mô phỏng Logic</label>
                  <div className="p-3 bg-slate-50 rounded-md border border-slate-100 italic text-xs text-slate-600 leading-relaxed">
                    "Nếu {conditions.map((c, i) => (
                      <React.Fragment key={c.id}>
                        {i > 0 && <span className="font-bold text-[#3b82f6]"> {c.logic} </span>}
                        <span className="font-bold text-[#3b82f6]">{c.field}</span> {c.operator} <span className="font-bold text-[#3b82f6]">"{c.value || '...'}"</span>
                      </React.Fragment>
                    ))} thì hệ thống sẽ tự động <span className="font-bold text-emerald-600 uppercase">Phân loại trạng thái: {selectedStatus}</span>."
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
                  <Info size={18} className="text-[#3b82f6] shrink-0" />
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Bạn có chắc chắn muốn thay đổi trạng thái của ngoại lệ này? <span className="font-medium">Thay đổi sẽ có hiệu lực ngay lập tức.</span>
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3 border-t border-slate-100">
                <button 
                  onClick={() => setShowStatusModal(false)}
                  className="px-5 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 rounded transition-all"
                >
                  Hủy
                </button>
                <button 
                  onClick={handleStatusUpdate}
                  className="px-7 py-2 text-xs font-bold text-white bg-[#3b82f6] hover:bg-blue-700 rounded shadow-sm shadow-blue-500/20 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  Xác nhận
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-6 right-6 z-[200] flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-5 py-4 rounded-lg shadow-xl"
          >
            <div className="size-6 bg-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={14} className="text-white" />
            </div>
            <p className="text-emerald-800 font-bold text-sm">Cập nhật thành công!</p>
            <button onClick={() => setShowSuccessToast(false)} className="ml-4 text-emerald-400 hover:text-emerald-600">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
