import React, { useState } from 'react';
import { Layout, Screen } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { SoPhu } from './components/SoPhu';
import { RoLuuTru } from './components/RoLuuTru';
import { TinhToanGachNo } from './components/TinhToanGachNo';
import { GiaoDichTreo } from './components/GiaoDichTreo';
import { CauHinhNgoaiLe } from './components/CauHinhNgoaiLe';
import { BaoCao } from './components/BaoCao';
import { Login } from './components/Login';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.DASHBOARD);
  const [previousScreen, setPreviousScreen] = useState<Screen>(Screen.DASHBOARD);

  const navigateTo = (screen: Screen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setCurrentScreen(Screen.DASHBOARD);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen(Screen.DASHBOARD);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.DASHBOARD:
        return <Dashboard />;
      case Screen.SO_PHU:
        return <SoPhu />;
      case Screen.RO_LUU_TRU:
        return <RoLuuTru onSelectProcess={() => navigateTo(Screen.TINH_TOAN_GACH_NO)} />;
      case Screen.TINH_TOAN_GACH_NO:
        return <TinhToanGachNo onBack={() => setCurrentScreen(previousScreen)} />;
      case Screen.GIAO_DICH_TREO:
        return <GiaoDichTreo onSelectProcess={() => navigateTo(Screen.TINH_TOAN_GACH_NO)} />;
      case Screen.CAU_HINH_NGOAI_LE:
        return <CauHinhNgoaiLe />;
      case Screen.BAO_CAO:
        return <BaoCao />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout currentScreen={currentScreen} setScreen={navigateTo} onLogout={handleLogout}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
