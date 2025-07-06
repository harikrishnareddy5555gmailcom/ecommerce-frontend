import React, { useEffect, useState } from 'react';
import Tabs from './components/Tabs';
import OrderFilters from './components/OrderFilters';
import OrderTable from './components/OrderTable';
import { getOrders, filterOrders } from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('ALL');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [darkMode, setDarkMode] = useState(false); // 👈 toggle theme

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  const fetchOrders = async () => {
    const response = await getOrders(page, 10, status === 'ALL' ? '' : status);
    setOrders(response.data.content);
    setTotalPages(response.data.totalPages);
  };

  const handleFilter = async (filterData) => {
    setPage(0); // ✅ reset page

    const isClear = Object.values(filterData).every(val => val === null || val === '');
    if (isClear) {
      setStatus('ALL');
      fetchOrders();
      return;
    }

    const response = await filterOrders(filterData, 0, 10);
    setOrders(response.data.content);
    setTotalPages(response.data.totalPages);
  };

  return (
    <div className={`body-wrapper ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="content-wrapper container mt-4">
        {/* Toggle Button */}
        <div className="text-end mb-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`btn btn-sm ${darkMode ? 'btn-light' : 'btn-dark'}`}>
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <h3>Order Tracker</h3>

        {/* Tabs for Status */}
        <Tabs
          selectedStatus={status}
          onChange={(newStatus) => {
            setStatus(newStatus);
            setPage(0);
          }}
        />

        {/* Filter Form */}
        <OrderFilters onFilter={handleFilter} />

        {/* Orders Table */}
        <OrderTable orders={orders} />

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center my-3">
          <button
            className="btn btn-outline-primary me-2"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span className="align-self-center">
            Page {page + 1} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary ms-2"
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
