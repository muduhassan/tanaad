import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import PinEntry from './components/Auth/PinEntry';
import Dashboard from './components/AdminDashboard/Dashboard';
import Settings from './components/AdminDashboard/Settings';
import NeighborInventory from './components/Ledgers/NeighborInventory';
import NeighborCash from './components/Ledgers/NeighborCash';
import CustomerVault from './components/Ledgers/CustomerVault';
import ShopOperations from './components/Ledgers/ShopOperations';
import DailyPreset from './components/Ledgers/DailyPreset';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/pin" component={PinEntry} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/settings" component={Settings} />
        <Route path="/ledgers/inventory" component={NeighborInventory} />
        <Route path="/ledgers/cash" component={NeighborCash} />
        <Route path="/ledgers/vault" component={CustomerVault} />
        <Route path="/ledgers/operations" component={ShopOperations} />
        <Route path="/ledgers/preset" component={DailyPreset} />
      </Switch>
    </Router>
  );
};

export default Routes;