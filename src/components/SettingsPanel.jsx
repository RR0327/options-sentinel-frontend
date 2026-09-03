import { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Save, 
  RefreshCw, 
  Cpu, 
  ShieldAlert, 
  Key, 
  Wallet,
  Check,
  Bell,
  Sliders
} from 'lucide-react';

const Toggle = ({ enabled, onChange }) => (
  <div 
    onClick={() => onChange(!enabled)}
    className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors ${enabled ? 'bg-blue' : 'bg-gray-700'}`}
    style={{backgroundColor: enabled ? 'var(--color-blue)' : 'var(--border-color)'}}
  >
    <div 
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
    />
  </div>
);

const InputField = ({ label, description, defaultValue, type = "text", icon: Icon }) => (
  <div className="flex flex-col mb-4">
    <label className="text-sm font-semibold mb-1">{label}</label>
    {description && <span className="text-xs text-secondary mb-2">{description}</span>}
    <div className="relative">
      {Icon && <div className="absolute left-3 top-2.5 text-secondary"><Icon size={16} /></div>}
      <input 
        type={type} 
        defaultValue={defaultValue} 
        className={`w-full bg-main border p-2 rounded text-white focus:outline-none focus:border-blue-500 transition-colors ${Icon ? 'pl-9' : ''}`} 
        style={{borderColor: 'var(--border-color)'}} 
      />
    </div>
  </div>
);

export const SettingsPanel = ({ isFullPage }) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('trading');
  
  // Settings State
  const [autoTrade, setAutoTrade] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const tabs = [
    { id: 'trading', label: 'Trading', icon: Wallet },
    { id: 'ai', label: 'AI Configuration', icon: Cpu },
    { id: 'risk', label: 'Risk Limits', icon: ShieldAlert },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className={`panel ${isFullPage ? 'flex-1' : 'col-span-12'}`} style={{ padding: 0 }}>
      <div className="flex flex-col md:flex-row h-full">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 border-r p-6 flex flex-col gap-2" style={{borderColor: 'var(--border-color)'}}>
          <h2 className="text-lg font-bold flex items-center gap-2 mb-6 text-white"><SettingsIcon size={20} /> Preferences</h2>
          
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${activeTab === tab.id ? 'bg-blue bg-opacity-10 text-blue' : 'text-secondary hover:bg-main'}`}
              style={{
                backgroundColor: activeTab === tab.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: activeTab === tab.id ? 'var(--color-blue)' : ''
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-8 flex flex-col overflow-y-auto">
          <div className="max-w-2xl w-full flex-1">
            
            {activeTab === 'trading' && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-bold mb-6 border-b pb-4" style={{borderColor: 'var(--border-color)'}}>Trading Execution</h3>
                
                <div className="flex items-center justify-between mb-8 p-4 border rounded-lg bg-main" style={{borderColor: 'var(--border-color)'}}>
                  <div>
                    <h4 className="font-bold text-white">Autonomous Execution</h4>
                    <p className="text-xs text-secondary mt-1">Allow AI agents to place trades without human approval.</p>
                  </div>
                  <Toggle enabled={autoTrade} onChange={setAutoTrade} />
                </div>

                <InputField label="Default Order Type" description="Standard order type used by the execution agent." defaultValue="Market" icon={Sliders} />
                <InputField label="Max Slippage (%)" description="Maximum allowed slippage for market orders." defaultValue="1.5" type="number" />
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-bold mb-6 border-b pb-4" style={{borderColor: 'var(--border-color)'}}>AI Configuration</h3>
                
                <div className="flex flex-col mb-6">
                  <label className="text-sm font-semibold mb-1">Primary LLM Model</label>
                  <span className="text-xs text-secondary mb-2">The core reasoning model for Bulls & Bears.</span>
                  <select className="w-full bg-main border p-2 rounded text-white focus:outline-none" style={{borderColor: 'var(--border-color)'}}>
                    <option>gemini-2.5-pro</option>
                    <option>gemini-2.5-flash</option>
                  </select>
                </div>

                <InputField label="Minimum Confidence Threshold (%)" description="Minimum confidence required for a consensus to be reached." defaultValue="75" type="number" />
                <InputField label="Max Debate Rounds" description="How many turns the agents should debate before failing." defaultValue="3" type="number" />
              </div>
            )}

            {activeTab === 'risk' && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-bold mb-6 border-b pb-4" style={{borderColor: 'var(--border-color)'}}>Risk Management Limits</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <InputField label="Max Position Size (%)" defaultValue="5" type="number" />
                  <InputField label="Max Portfolio Exposure (%)" defaultValue="30" type="number" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Default Stop Loss (%)" defaultValue="2.5" type="number" />
                  <InputField label="Default Take Profit (%)" defaultValue="6.0" type="number" />
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-bold mb-6 border-b pb-4" style={{borderColor: 'var(--border-color)'}}>Broker API Integration</h3>
                
                <InputField label="Alpaca API Key" type="password" defaultValue="************************" icon={Key} />
                <InputField label="Alpaca Secret Key" type="password" defaultValue="************************" icon={Key} />
                
                <div className="mt-4 p-3 border rounded border-green-500 bg-green-500 bg-opacity-10 text-green-400 text-sm flex items-center gap-2" style={{borderColor: 'var(--color-green)', color: 'var(--color-green)'}}>
                  <Check size={16} /> API Keys Validated Successfully
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-bold mb-6 border-b pb-4" style={{borderColor: 'var(--border-color)'}}>Alerts & Notifications</h3>
                
                <div className="flex items-center justify-between mb-4 p-4 border rounded-lg bg-main" style={{borderColor: 'var(--border-color)'}}>
                  <div>
                    <h4 className="font-bold text-white">Email Trade Alerts</h4>
                    <p className="text-xs text-secondary mt-1">Receive an email whenever a trade is executed.</p>
                  </div>
                  <Toggle enabled={emailAlerts} onChange={setEmailAlerts} />
                </div>
              </div>
            )}
            
          </div>

          {/* Action Bar */}
          <div className="mt-auto pt-6 border-t flex justify-end gap-4" style={{borderColor: 'var(--border-color)'}}>
            <button className="px-4 py-2 text-sm rounded border text-secondary hover:bg-main transition-colors" style={{borderColor: 'var(--border-color)'}}>
              Discard Changes
            </button>
            <button onClick={handleSave} className="px-4 py-2 text-sm font-semibold rounded text-white flex items-center gap-2 transition-all hover:opacity-90" style={{backgroundColor: 'var(--color-blue)'}}>
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
