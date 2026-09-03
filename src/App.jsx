import React, { useState, useEffect } from 'react'
import { DashboardLayout } from './components/DashboardLayout'
import { 
  MarketOverview, 
  AIAgentDebate, 
  RiskSummary, 
  OpenPosition, 
  PerformanceChart, 
  PayoffDiagram, 
  RecentActivity, 
  TradeJournal 
} from './components/DashboardComponents'
import { SettingsPanel } from './components/SettingsPanel'

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const [history, setHistory] = useState({ trades: [], decisions: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
        const [dashboardRes, tradesRes, decisionsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/dashboard`),
          fetch(`${API_BASE_URL}/api/trades`),
          fetch(`${API_BASE_URL}/api/decisions`)
        ]);
        
        if (!dashboardRes.ok) throw new Error('Backend not available');
        
        const dashboardJson = await dashboardRes.json();
        setData(dashboardJson);
        
        if (tradesRes.ok && decisionsRes.ok) {
          const tradesJson = await tradesRes.json();
          const decisionsJson = await decisionsRes.json();
          setHistory({ trades: tradesJson, decisions: decisionsJson });
        }
        
        setError(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    if (activeTab === 'Dashboard') {
      return (
        <>
          {/* Row 1 */}
          <MarketOverview marketData={data?.market} />
          <AIAgentDebate agentsData={data?.agents} tradeData={data?.trade} decisionData={data?.decision} />
          <RiskSummary />

          {/* Row 2 */}
          <OpenPosition positions={data?.positions} />
          <PerformanceChart />
          <PayoffDiagram />

          {/* Row 3 */}
          <RecentActivity decisions={data?.decision ? [data.decision] : []} />
          <TradeJournal tradeData={data?.trade} />
        </>
      );
    }
    
    // Full Page Renders
    if (activeTab === 'Market Overview') return (
      <div className="col-span-12 h-full min-h-[500px] flex flex-col">
        <MarketOverview marketData={data?.market} />
      </div>
    );
    if (activeTab === 'AI Agents') return (
      <div className="col-span-12 h-full min-h-[500px] flex flex-col">
        <AIAgentDebate agentsData={data?.agents} tradeData={data?.trade} decisionData={data?.decision} history={history.decisions} isFullPage={true} />
      </div>
    );
    if (activeTab === 'Trade Journal') return (
      <div className="col-span-12 h-full min-h-500 flex flex-col">
        <TradeJournal tradeData={data?.trade} history={history.trades} isFullPage={true} />
      </div>
    );
    if (activeTab === 'Positions') return (
      <div className="col-span-12 h-full min-h-500 flex flex-col">
        <OpenPosition positions={data?.positions} isFullPage={true} />
      </div>
    );
    if (activeTab === 'Risk Management') return (
      <div className="col-span-12 h-full min-h-500 flex flex-col">
        <RiskSummary isFullPage={true} />
      </div>
    );
    if (activeTab === 'Performance') return (
      <div className="col-span-12 h-full min-h-500 flex flex-col">
        <PerformanceChart isFullPage={true} />
      </div>
    );
    if (activeTab === 'Alerts') return (
      <div className="col-span-12 h-full min-h-500 flex flex-col">
        <RecentActivity decisions={history.decisions} isFullPage={true} />
      </div>
    );
    
    if (activeTab === 'Settings') return (
      <div className="col-span-12 h-full min-h-500 flex flex-col">
        <SettingsPanel isFullPage={true} />
      </div>
    );
    
    return (
      <div className="col-span-12 flex flex-col items-center justify-center h-64 text-secondary">
        <h2 className="text-2xl font-bold mb-2">{activeTab}</h2>
        <p>This module is currently under construction.</p>
      </div>
    );
  };

  return (
    <DashboardLayout error={error} loading={loading} accountData={data?.account} activeTab={activeTab} setActiveTab={setActiveTab}>
      <main className="main-content relative">
        {loading && !data && (
          <div className="absolute inset-0 bg-main bg-opacity-50 z-50 flex items-center justify-center rounded-lg" style={{backgroundColor: 'rgba(11, 15, 25, 0.7)'}}>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" style={{borderColor: 'var(--color-blue)', borderTopColor: 'transparent'}}></div>
              <div className="mt-4 text-secondary font-medium">Fetching secure data...</div>
            </div>
          </div>
        )}
        
        {renderContent()}
      </main>
    </DashboardLayout>
  )
}

export default App
