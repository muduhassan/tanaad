import React from 'react';
import './Panel.css';

const Panel = () => {
    return (
        <div className="floating-panel">
            <h2>Staff Actions</h2>
            <button>Add Entry</button>
            <button>View Ledger</button>
            <button>Check Alarms</button>
            <button>Settings</button>
        </div>
    );
};

export default Panel;