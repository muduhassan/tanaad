import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthProvider } from './stores/authStore';
import { LedgerProvider } from './stores/ledgerStore';
import { UIProvider } from './stores/uiStore';
import Login from './components/Auth/Login';
import PinEntry from './components/Auth/PinEntry';
import Dashboard from './components/AdminDashboard/Dashboard';
import Settings from './components/AdminDashboard/Settings';
import NeighborInventory from './components/Ledgers/NeighborInventory';
import NeighborCash from './components/Ledgers/NeighborCash';
import CustomerVault from './components/Ledgers/CustomerVault';
import ShopOperations from './components/Ledgers/ShopOperations';
import DailyPreset from './components/Ledgers/DailyPreset';
import Bubble from './components/Bubble/Bubble';

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Load the user's preferred language from local storage
    const lang = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(lang);
  }, [i18n]);

  return (
    <AuthProvider>
      <LedgerProvider>
        <UIProvider>
          <Router>
            <Bubble />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/pin" component={PinEntry} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/settings" component={Settings} />
              <Route path="/ledgers/inventory" component={NeighborInventory} />
              <Route path="/ledgers/cash" component={NeighborCash} />
              <Route path="/ledgers/vault" component={CustomerVault} />
              <Route path="/ledgers/operations" component={ShopOperations} />
              <Route path="/ledgers/preset" component={DailyPreset} />
              <Route path="/" exact component={Login} />
            </Switch>
          </Router>
        </UIProvider>
      </LedgerProvider>
    </AuthProvider>
  );
};

export default App;