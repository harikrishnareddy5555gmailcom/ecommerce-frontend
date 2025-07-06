import React from 'react';

const Tabs = ({ selectedStatus, onChange }) => {
  const tabs = ['ALL', 'COMPLETED', 'CONTINUING', 'RESTITUTE', 'CANCELED'];

  return (
    <div className="tab-bar" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`btn tab-button ${selectedStatus === tab ? 'active' : ''}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
