import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { TrendingUp, Cpu, Activity, CircleCheck, Layers, BookOpen } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler);

// 1. Market Overview
export const MarketOverview = ({ marketData }) => {
  const data = {
    labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    datasets: [{
      label: 'SPY Price',
      data: [518, 519, 520, 519.5, 521, 522.18],
      borderColor: '#22C55E',
      tension: 0.1,
      borderWidth: 2,
      pointRadius: 0
    }]
  };
  const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } };

  const regimeColor = marketData?.regime === 'BULLISH' ? 'text-green' : (marketData?.regime === 'BEARISH' ? 'text-orange' : 'text-secondary');

  return (
    <div className="panel col-span-4" style={{ gridColumn: 'span 4' }}>
      <div className="panel-header">MARKET OVERVIEW</div>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-xl font-bold">{marketData?.symbol || 'SPY'}</h2>
          <div className="text-xs text-secondary">REGIME DETECTION</div>
        </div>
        <div className="badge badge-outline">{marketData?.regime || 'UNKNOWN'}</div>
      </div>
      <div className="mb-4">
        <div className="text-3xl font-bold">{(marketData?.confidence * 100).toFixed(1) || '0.0'}%</div>
        <div className={`text-sm flex items-center gap-1 ${regimeColor}`}><TrendingUp size={14}/> Agent Confidence</div>
      </div>
      <div className="h-32 mb-4">
        <Line data={data} options={options} />
      </div>
      <div className="flex justify-between text-xs mt-auto">
        <div><div className="text-secondary mb-1">High</div><div className="font-semibold">524.31</div></div>
        <div><div className="text-secondary mb-1">Low</div><div className="font-semibold">518.74</div></div>
        <div><div className="text-secondary mb-1">Volume</div><div className="font-semibold">68.42M</div></div>
        <div><div className="text-secondary mb-1">IV (30D)</div><div className="font-semibold">14.62%</div></div>
      </div>
    </div>
  );
};

// 2. AI Agent Debate
export const AIAgentDebate = ({ agentsData, tradeData, decisionData, history, isFullPage }) => {
  if (isFullPage) {
    const dataToRender = history && history.length > 0 ? history : (decisionData ? [decisionData] : []);
    return (
      <div className="panel flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-6 border-b pb-4" style={{borderColor: 'var(--border-color)'}}>
          <h2 className="text-xl font-bold">Historical AI Debates</h2>
          <div className="badge badge-outline">{dataToRender.length} SESSIONS</div>
        </div>
        
        {dataToRender.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-secondary">
            <Cpu size={48} className="mb-4 opacity-50" />
            <p className="text-lg">No historical debates logged in database yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b" style={{borderColor: 'var(--border-color)', color: 'var(--text-secondary)'}}>
                  <th className="p-3 text-sm font-semibold uppercase tracking-wider">Date & Time</th>
                  <th className="p-3 text-sm font-semibold uppercase tracking-wider text-green">Bull Signal</th>
                  <th className="p-3 text-sm font-semibold uppercase tracking-wider text-red">Bear Signal</th>
                  <th className="p-3 text-sm font-semibold uppercase tracking-wider text-orange">Risk</th>
                  <th className="p-3 text-sm font-semibold uppercase tracking-wider text-blue">Consensus</th>
                </tr>
              </thead>
              <tbody>
                {dataToRender.map((dec, idx) => (
                  <tr key={idx} className="border-b hover:bg-opacity-50 transition-colors" style={{borderColor: 'var(--border-color)', ':hover': {backgroundColor: 'var(--bg-panel-hover)'}}}>
                    <td className="p-3 font-mono text-sm text-secondary">{new Date(dec.time).toLocaleString()}</td>
                    <td className="p-3">
                      <span className="font-bold">{dec.bull_signal}</span>
                      <div className="text-xs text-secondary mt-1">{(dec.bull_confidence * 100).toFixed(0)}%</div>
                    </td>
                    <td className="p-3">
                      <span className="font-bold">{dec.bear_signal}</span>
                      <div className="text-xs text-secondary mt-1">{(dec.bear_confidence * 100).toFixed(0)}%</div>
                    </td>
                    <td className="p-3">
                      <span className={`badge ${dec.risk_approved ? 'badge-green' : 'badge-outline'}`}>{dec.risk_approved ? 'APPROVED' : 'REJECTED'}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-blue">{dec.final_decision}</span>
                      <div className="text-xs text-secondary mt-1">{dec.strategy}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  // Dashboard View (original behavior)
  const bullConfidence = decisionData?.bull?.confidence ? decisionData.bull.confidence * 100 : 0;
  const bearConfidence = decisionData?.bear?.confidence ? decisionData.bear.confidence * 100 : 0;
  const riskApproved = decisionData?.risk?.approved;
  const riskConfidence = riskApproved ? 100 : (decisionData?.risk ? 0 : 0);

  return (
    <div className="panel col-span-5" style={{ gridColumn: 'span 5' }}>
      <div className="panel-header">AI AGENT DEBATE</div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-md w-1/2">
          <div className="text-green"><Cpu size={24}/></div>
          <div>
            <div className="font-bold text-sm">BULL AGENT</div>
            <div className="text-xs text-secondary">Signal: <span className="text-green font-bold">{agentsData?.bull || 'PENDING'}</span></div>
          </div>
        </div>
        <div className="w-1/2 flex items-center gap-md">
          <div className="text-xs text-secondary w-16">Confidence</div>
          <div className="progress-bar-container flex-1"><div className="progress-bar green" style={{width: `${bullConfidence}%`}}></div></div>
          <div className="text-green font-bold text-sm w-8 text-right">{bullConfidence}%</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-md w-1/2">
          <div className="text-red"><Cpu size={24}/></div>
          <div>
            <div className="font-bold text-sm">BEAR AGENT</div>
            <div className="text-xs text-secondary">Signal: <span className="text-orange font-bold">{agentsData?.bear || 'PENDING'}</span></div>
          </div>
        </div>
        <div className="w-1/2 flex items-center gap-md">
          <div className="text-xs text-secondary w-16">Confidence</div>
          <div className="progress-bar-container flex-1"><div className="progress-bar orange" style={{width: `${bearConfidence}%`}}></div></div>
          <div className="text-orange font-bold text-sm w-8 text-right">{bearConfidence}%</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-md w-1/2">
          <div className="text-blue"><CircleCheck size={24}/></div>
          <div>
            <div className="font-bold text-sm">RISK AGENT</div>
            <div className="text-xs text-secondary">Signal: <span className="text-green font-bold">{agentsData?.risk || 'PENDING'}</span></div>
          </div>
        </div>
        <div className="w-1/2 flex items-center gap-md">
          <div className="text-xs text-secondary w-16">Confidence</div>
          <div className="progress-bar-container flex-1"><div className="progress-bar green" style={{width: `${riskConfidence}%`}}></div></div>
          <div className="text-green font-bold text-sm w-8 text-right">{riskConfidence}%</div>
        </div>
      </div>

      <div className="mt-auto p-3 bg-opacity-20 bg-blue-900 border border-blue-800 rounded flex items-center gap-3" style={{backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'var(--border-color)'}}>
        <Activity size={20} className="text-blue"/>
        <div>
           <div className="text-xs font-bold">DECISION AGENT</div>
           <div className="text-sm">Final Decision: <span className="text-green font-bold">{decisionData?.decision || 'PENDING'}</span></div>
           <div className="text-xs text-secondary">Strategy: <span className="text-blue font-bold">{decisionData?.strategy || 'N/A'}</span></div>
        </div>
      </div>
    </div>
  );
};

// 3. Risk Summary
export const RiskSummary = ({ isFullPage }) => {
  const data = {
    labels: ['Used', 'Available'],
    datasets: [{ data: [12, 88], backgroundColor: ['#3B82F6', '#1E293B'], borderWidth: 0, cutout: '80%' }]
  };
  const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } };

  return (
    <div className={`panel ${isFullPage ? 'flex-1 items-center justify-center' : 'col-span-2'}`} style={!isFullPage ? { gridColumn: 'span 2' } : {}}>
      <div className="panel-header w-full text-center">RISK UTILIZATION</div>
      <div className={`relative ${isFullPage ? 'h-64 w-64' : 'h-32 w-full'} flex items-center justify-center mt-6`}>
        <Doughnut data={data} options={options} />
        <div className="absolute flex flex-col items-center">
          <span className={`${isFullPage ? 'text-4xl' : 'text-xl'} font-bold`}>12%</span>
        </div>
      </div>
      <div className={`flex justify-between text-xs mt-8 ${isFullPage ? 'w-64' : 'w-full'}`}>
        <span className="text-secondary text-lg">Exposure</span>
        <span className="font-bold text-blue text-lg">$12,450</span>
      </div>
    </div>
  );
};

// 4. Open Position
export const OpenPosition = ({ positions, isFullPage }) => {
  if (!positions || positions.length === 0) {
    return (
      <div className={`panel ${isFullPage ? 'flex-1' : 'col-span-4'}`} style={!isFullPage ? { gridColumn: 'span 4' } : {}}>
        <div className="flex justify-between items-center mb-4">
          <div className="panel-header mb-0">OPEN POSITION</div>
          <div className="badge badge-outline text-xs">NONE</div>
        </div>
        <div className="flex flex-col items-center justify-center h-full text-secondary">
          <Layers size={32} className="mb-2 opacity-50" />
          <p>No open positions in Alpaca</p>
        </div>
      </div>
    );
  }

  const p = positions[0]; // Display the first open position

  return (
    <div className={`panel ${isFullPage ? 'flex-1' : 'col-span-4'}`} style={!isFullPage ? { gridColumn: 'span 4' } : {}}>
      <div className="flex justify-between items-center mb-4">
        <div className="panel-header mb-0">OPEN POSITION</div>
        <div className="badge badge-green text-xs">OPEN</div>
      </div>
      <h3 className="font-bold text-lg mb-2">{p.symbol}</h3>
      <div className="flex gap-2 mb-6">
        <span className="badge badge-outline">Qty: {p.quantity}</span>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div><div className="text-xs text-secondary mb-1">P&L</div><div className={`font-bold ${parseFloat(p.profit) >= 0 ? 'text-green' : 'text-red'}`}>${parseFloat(p.profit).toFixed(2)}</div></div>
      </div>
    </div>
  );
};

// 5. Performance
export const PerformanceChart = ({ isFullPage }) => {
  const data = {
    labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
    datasets: [{
      label: 'Performance',
      data: [0, 50, -20, 100, 150, 200],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.2,
      borderWidth: 2,
      pointRadius: 0
    }]
  };
  const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: '#1E293B' } }, y: { grid: { color: '#1E293B' }, ticks: { callback: (val) => '$' + val/1000 + 'K' } } } };

  return (
    <div className={`panel ${isFullPage ? 'flex-1' : 'col-span-4'}`} style={!isFullPage ? { gridColumn: 'span 4' } : {}}>
      <div className="flex justify-between items-center mb-4">
        <div className="panel-header mb-0">PERFORMANCE (EQUITY CURVE)</div>
        <div className="badge badge-outline">1M</div>
      </div>
      <div className="h-48 w-full mt-auto">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

// 6. Payoff Diagram
export const PayoffDiagram = () => {
  const data = {
    labels: ['500', '510', '520', '530', '540', '550'],
    datasets: [
      {
        label: 'At Expiry',
        data: [-135, -135, -135, 200, 200, 200],
        borderColor: '#22C55E',
        tension: 0,
        borderWidth: 2,
      },
      {
        label: 'Current',
        data: [-120, -110, -50, 150, 180, 190],
        borderColor: '#3B82F6',
        borderDash: [5, 5],
        tension: 0.4,
        borderWidth: 1.5,
      }
    ]
  };
  const options = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { color: '#1E293B' } }, y: { grid: { color: '#1E293B' }, title: { display: true, text: 'Profit / Loss ($)', color: '#94A3B8', font: {size: 10} } } } };

  return (
    <div className="panel col-span-4" style={{ gridColumn: 'span 4' }}>
      <div className="flex justify-between items-center mb-4">
        <div className="panel-header mb-0">PAYOFF DIAGRAM</div>
        <div className="badge badge-outline">Bull Call Spread</div>
      </div>
      <div className="flex gap-4 justify-center text-xs mb-2 text-secondary">
        <div className="flex items-center gap-1"><div className="w-4 h-1 bg-green-500" style={{backgroundColor: '#22C55E'}}></div> At Expiry</div>
        <div className="flex items-center gap-1"><div className="w-4 h-1 border-t-2 border-dashed border-blue-500" style={{borderColor: '#3B82F6'}}></div> Current</div>
      </div>
      <div className="h-40 w-full mt-auto">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

// 7. Recent Activity
export const RecentActivity = ({ decisions, isFullPage }) => {
  let activities = [];
  if (!decisions || decisions.length === 0) {
    activities = [
      { time: 'N/A', event: 'System Waiting', details: 'Awaiting autonomous trading loop', status: 'PENDING', color: 'orange' }
    ];
  } else {
    activities = decisions.map((d, i) => ({
      time: new Date(d.time || Date.now()).toLocaleString(),
      event: 'Decision Agent',
      details: `Action: ${d.final_decision} | Strategy: ${d.strategy} | Risk: ${d.risk_approved ? 'APPROVED' : 'REJECTED'}`,
      status: d.final_decision === 'WAIT' ? 'INFO' : 'SUCCESS',
      color: d.final_decision === 'WAIT' ? 'blue' : 'green'
    }));
  }

  return (
    <div className={`panel ${isFullPage ? 'flex-1' : 'col-span-5'}`} style={!isFullPage ? { gridColumn: 'span 5' } : {}}>
      <div className="panel-header mb-4">RECENT ACTIVITY</div>
      
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-secondary">
          <Activity size={32} className="mb-2 opacity-50" />
          <p>No activity logged yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 overflow-y-auto">
          {activities.map((activity, i) => (
            <div key={i} className="flex gap-sm items-start">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.color === 'blue' ? 'bg-blue bg-opacity-20 text-blue' : (activity.color === 'green' ? 'bg-green bg-opacity-20 text-green' : 'bg-red bg-opacity-20 text-red')}`}>
                <Activity size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">{activity.event} - <span className={`text-${activity.color}`}>{activity.status}</span></span>
                <span className="text-xs text-secondary mt-1">{activity.details}</span>
                <span className="text-xs text-secondary mt-1">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 8. Trade Journal
export const TradeJournal = ({ tradeData, history, isFullPage }) => {
  if (isFullPage) {
    const dataToRender = history && history.length > 0 ? history : (tradeData ? [tradeData] : []);
    return (
      <div className="panel flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-6 border-b pb-4" style={{borderColor: 'var(--border-color)'}}>
          <h2 className="text-xl font-bold">Historical Trade Journal</h2>
          <div className="badge badge-outline">{dataToRender.length} TRADES</div>
        </div>
        
        {dataToRender.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-secondary">
            <BookOpen size={48} className="mb-4 opacity-50" />
            <p className="text-lg">No historical trades logged in database yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b" style={{borderColor: 'var(--border-color)', color: 'var(--text-secondary)'}}>
                  <th className="p-3 text-sm font-semibold uppercase tracking-wider">Date & Time</th>
                  <th className="p-3 text-sm font-semibold uppercase tracking-wider">Symbol</th>
                  <th className="p-3 text-sm font-semibold uppercase tracking-wider">Strategy</th>
                  <th className="p-3 text-sm font-semibold uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {dataToRender.map((trade, idx) => (
                  <tr key={idx} className="border-b hover:bg-opacity-50 transition-colors" style={{borderColor: 'var(--border-color)', ':hover': {backgroundColor: 'var(--bg-panel-hover)'}}}>
                    <td className="p-3 font-mono text-sm text-secondary">{new Date(trade.time).toLocaleString()}</td>
                    <td className="p-3 font-bold">{trade.symbol}</td>
                    <td className="p-3 text-blue font-medium">{trade.strategy}</td>
                    <td className="p-3">
                      <span className={`badge ${trade.status === 'FILLED' ? 'badge-green' : 'badge-outline'}`}>{trade.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  if (!tradeData) {
    return (
      <div className="panel col-span-7" style={{ gridColumn: 'span 7' }}>
        <div className="panel-header">TRADE JOURNAL (LAST TRADE)</div>
        <div className="flex flex-col items-center justify-center h-full text-secondary">
          <BookOpen size={32} className="mb-2 opacity-50" />
          <p>No trades logged in database yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panel col-span-7" style={{ gridColumn: 'span 7' }}>
      <div className="flex justify-between items-center mb-4">
        <div className="panel-header mb-0">TRADE JOURNAL (LAST TRADE)</div>
        <div className="text-xs font-mono text-secondary">{new Date(tradeData.time).toLocaleString()}</div>
      </div>
      
      <div className="flex items-center justify-between p-md rounded-md bg-main border" style={{borderColor: 'var(--border-color)'}}>
        <div className="flex items-center gap-md">
          <div className="w-10 h-10 rounded-full bg-blue bg-opacity-20 flex items-center justify-center text-blue font-bold">
            {tradeData.symbol}
          </div>
          <div className="flex flex-col">
            <span className="font-bold">{tradeData.strategy}</span>
            <span className="text-xs text-secondary mt-1">Automated Execution</span>
          </div>
        </div>
        
        <div className="flex items-center gap-md">
          <div className="flex flex-col text-right">
            <span className="text-xs text-secondary uppercase">Status</span>
            <span className="font-bold text-green">{tradeData.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
