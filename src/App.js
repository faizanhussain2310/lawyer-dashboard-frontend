import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import {
  Home,
  Orders,
  Calendar,
  Lawyers,
  UTPCases,
  Kanban,
} from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Login from './components/Login';
import BailGrantedCases from './pages/BailGrantedCases';
import SolvedCases from './pages/SolvedCases';
import StateWiseCases from './pages/StateWiseCases';
import RecentCases from './pages/RecentCases';

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="Top">
              {/* <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button> */}
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {/* {themeSettings && <ThemeSettings />} */}

              <Routes>
                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* dashboard  */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />

                {/* pages  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/lawyers" element={<Lawyers />} />
                <Route path="/UTP%20Cases" element={<UTPCases />} />
                <Route path="/bail%20granted%20Cases" element={<BailGrantedCases />} />
                <Route path="/solved%20Cases" element={<SolvedCases />} />
                <Route path="/state%20wise%20Cases" element={<StateWiseCases />} />
                <Route path="/recent%20Cases" element={<RecentCases />} />

                {/* apps  */}
                <Route path="/To-do%20List" element={<Kanban />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
