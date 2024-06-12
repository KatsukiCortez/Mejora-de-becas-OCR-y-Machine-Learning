import React, { useState } from 'react';
import Sidebar from './Components/Sidebar Section/Sidebar';
import Body from './Components/Body Section/Body';

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState('GestionBecas'); // Establecer pantalla inicial

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="dashboard flex">
      <div className="dashboardContainer flex">
        <Sidebar onMenuItemClick={handleMenuItemClick} />
        <Body selectedItem={selectedItem} />
      </div>
    </div>
  );
}

export default Dashboard;
