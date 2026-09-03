import React, { useState } from 'react';
import { LayoutDashboard, TrendingUp, Cpu, BookOpen, Layers, ShieldCheck, Activity, Bell, Settings, Send, AlertTriangle, Menu, X } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-md px-lg py-sm cursor-pointer ${active ? 'text-white border-l-2 border-blue' : 'text-secondary hover:text-white'}`} style={{ paddingLeft: active ? '22px' : '24px' }}>
    <Icon size={20} className={active ? 'text-blue' : ''} />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export const DashboardLayout = ({ children, error, loading, accountData, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const statusColor = error ? 'var(--color-red)' : 'var(--color-green)';
  const statusText = error ? 'DISCONNECTED' : 'OPERATIONAL';
  const connectionText = error ? 'OFFLINE' : 'CONNECTED';

  const formatCurrency = (val) => {
    if (val === undefined || val === null) return "$0.00";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="absolute inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between p-lg">
          <div 
            className="flex items-center gap-sm cursor-pointer"
            onClick={() => setActiveTab('Dashboard')}
          >
            <img src="/banner.png" alt="Options Sentinel Logo" style={{ height: '48px' }} className="object-contain" />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">OPTIONS SENTINEL</span>
              <span className="text-xs text-secondary mt-1">Autonomous AI Options Trading System</span>
            </div>
          </div>
          <button className="md:hidden text-secondary" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col mt-4 flex-1 overflow-y-auto">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
          <SidebarItem icon={TrendingUp} label="Market Overview" active={activeTab === 'Market Overview'} onClick={() => setActiveTab('Market Overview')} />
          <SidebarItem icon={Cpu} label="AI Agents" active={activeTab === 'AI Agents'} onClick={() => setActiveTab('AI Agents')} />
          <SidebarItem icon={BookOpen} label="Trade Journal" active={activeTab === 'Trade Journal'} onClick={() => setActiveTab('Trade Journal')} />
          <SidebarItem icon={Layers} label="Positions" active={activeTab === 'Positions'} onClick={() => setActiveTab('Positions')} />
          <SidebarItem icon={ShieldCheck} label="Risk Management" active={activeTab === 'Risk Management'} onClick={() => setActiveTab('Risk Management')} />
          <SidebarItem icon={Activity} label="Performance" active={activeTab === 'Performance'} onClick={() => setActiveTab('Performance')} />
          <SidebarItem icon={Bell} label="Alerts" active={activeTab === 'Alerts'} onClick={() => setActiveTab('Alerts')} />
          <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
        </div>

        <div className="p-lg mt-auto border-t border-color flex-shrink-0" style={{ borderColor: 'var(--border-color)' }}>
          <div className="text-xs text-secondary mb-2 uppercase tracking-wider">System Mode</div>
          <div className="flex items-center gap-sm text-green mb-6">
            <Send size={16} />
            <span className="text-sm font-bold">{accountData?.status === 'DISCONNECTED' ? 'OFFLINE' : 'PAPER TRADING'}</span>
          </div>
          
          <div className="text-xs text-secondary mb-1 uppercase tracking-wider">Account Equity</div>
          <div className="text-2xl font-bold mb-4">{formatCurrency(accountData?.cash)}</div>
          
          <div className="text-xs text-secondary mb-1 uppercase tracking-wider">Buying Power</div>
          <div className="text-blue font-bold flex items-center gap-2">
            {formatCurrency(accountData?.buying_power)}
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="main-content-wrapper">
        {/* Topbar */}
        <header className="topbar flex-shrink-0">
          <div className="flex items-center gap-lg">
            <button className="md:hidden text-secondary hover:text-white mr-2" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <span className="text-xs text-secondary uppercase tracking-wider">System Status</span>
              <div className="flex items-center gap-2 text-sm font-semibold" style={{color: statusColor}}>
                {error ? <AlertTriangle size={12}/> : <div className="w-2 h-2 rounded-full" style={{backgroundColor: statusColor}}></div>}
                {loading ? 'CONNECTING...' : statusText}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-secondary uppercase tracking-wider">MCP Server</span>
              <div className="flex items-center gap-2 text-sm font-semibold" style={{color: statusColor}}>
                {error ? <AlertTriangle size={12}/> : <div className="w-2 h-2 rounded-full" style={{backgroundColor: statusColor}}></div>}
                {loading ? 'CONNECTING...' : connectionText}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-secondary uppercase tracking-wider">Alpaca Account</span>
              <div className="flex items-center gap-2 text-sm font-semibold" style={{color: statusColor}}>
                {error ? <AlertTriangle size={12}/> : <div className="w-2 h-2 rounded-full" style={{backgroundColor: statusColor}}></div>}
                {loading ? 'CONNECTING...' : (error ? 'OFFLINE' : 'PAPER TRADING')}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-md">
            <div className="flex flex-col text-right">
              <span className="text-xs text-secondary uppercase tracking-wider">Current Time</span>
              <span className="text-sm font-medium">{new Date().toLocaleString('en-US', { hour12: false }).replace(',', '')}</span>
            </div>
            <div className="p-2 bg-panel-hover rounded cursor-pointer ml-4">
               <Settings size={20} className="text-secondary"/>
            </div>
          </div>
        </header>
        
        {children}
      </div>
    </div>
  );
};
