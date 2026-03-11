import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Archive, 
  Clock, 
  Settings, 
  BarChart3, 
  Bell, 
  LogOut, 
  User,
  Search,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Screen Enum
export enum Screen {
  DASHBOARD = 'DASHBOARD',
  SO_PHU = 'SO_PHU',
  RO_LUU_TRU = 'RO_LUU_TRU',
  TINH_TOAN_GACH_NO = 'TINH_TOAN_GACH_NO',
  GIAO_DICH_TREO = 'GIAO_DICH_TREO',
  CAU_HINH_NGOAI_LE = 'CAU_HINH_NGOAI_LE',
  BAO_CAO = 'BAO_CAO'
}

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentScreen, setScreen, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { id: Screen.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: Screen.SO_PHU, label: 'Quản lý sổ phụ', icon: FileText },
    { id: Screen.RO_LUU_TRU, label: 'Rổ lưu trữ giao dịch', icon: Archive },
    { id: Screen.GIAO_DICH_TREO, label: 'Giao dịch treo', icon: Clock },
    { id: Screen.CAU_HINH_NGOAI_LE, label: 'Cấu hình ngoại lệ', icon: Settings },
    { id: Screen.BAO_CAO, label: 'Báo cáo', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-[#f6f7f8] text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out z-30`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 h-16 shrink-0">
          <div className="size-10 bg-[#19355c] rounded-lg flex items-center justify-center text-white shrink-0">
            <LayoutDashboard size={24} />
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-[#19355c] text-sm font-bold leading-tight uppercase tracking-wider truncate">MOBIFONE</h1>
              <p className="text-slate-500 text-[10px] font-medium truncate">CN TP. HCM</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                currentScreen === item.id 
                  ? 'bg-[#19355c] text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <item.icon size={20} className="shrink-0" />
              {isSidebarOpen && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className={`flex items-center gap-3 p-2 bg-slate-50 rounded-lg ${!isSidebarOpen && 'justify-center'}`}>
            <div className="size-9 bg-[#19355c]/10 rounded-full flex items-center justify-center text-[#19355c] shrink-0">
              <User size={18} />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-slate-900 truncate">Nguyễn Văn A</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-tighter truncate">Quản trị hệ thống</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                <button onClick={() => setScreen(Screen.DASHBOARD)} className="hover:text-[#19355c] transition-colors">Trang chủ</button>
                {currentScreen !== Screen.DASHBOARD && (
                  <>
                    <ChevronRight size={10} />
                    <span className="text-[#19355c]">
                      {currentScreen === Screen.SO_PHU && 'Quản lý sổ phụ'}
                      {currentScreen === Screen.RO_LUU_TRU && 'Rổ lưu trữ giao dịch'}
                      {currentScreen === Screen.TINH_TOAN_GACH_NO && 'Tính toán & Gạch nợ'}
                      {currentScreen === Screen.GIAO_DICH_TREO && 'Giao dịch treo'}
                      {currentScreen === Screen.CAU_HINH_NGOAI_LE && 'Cấu hình ngoại lệ'}
                      {currentScreen === Screen.BAO_CAO && 'Báo cáo'}
                    </span>
                  </>
                )}
              </div>
              <h2 className="text-slate-900 font-bold text-lg hidden md:block leading-tight">
                {currentScreen === Screen.DASHBOARD && 'Chương trình hỗ trợ gạch nợ cước từ sổ phụ ngân hàng'}
                {currentScreen === Screen.SO_PHU && 'Quản lý sổ phụ'}
                {currentScreen === Screen.RO_LUU_TRU && 'Rổ lưu trữ giao dịch'}
                {currentScreen === Screen.TINH_TOAN_GACH_NO && 'Tính toán & Gạch nợ'}
                {currentScreen === Screen.GIAO_DICH_TREO && 'Giao dịch treo hệ thống'}
                {currentScreen === Screen.CAU_HINH_NGOAI_LE && 'Cấu hình ngoại lệ'}
                {currentScreen === Screen.BAO_CAO && 'Báo cáo hệ thống'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Tìm kiếm nhanh..." 
                className="h-9 w-64 rounded-lg border-slate-200 bg-slate-50 pl-10 text-xs focus:border-[#19355c] focus:ring-1 focus:ring-[#19355c]"
              />
            </div>
            <div className="h-6 w-px bg-slate-200"></div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <div className="flex items-center gap-3 ml-2">
              <div className="flex flex-col text-right hidden sm:flex">
                <span className="text-sm font-semibold">Admin Dashboard</span>
                <span className="text-[10px] text-[#19355c] font-medium">Hệ thống gạch nợ</span>
              </div>
              <button 
                onClick={onLogout}
                className="flex items-center justify-center p-2 bg-slate-100 rounded-lg text-slate-600 hover:text-[#19355c] transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
};
