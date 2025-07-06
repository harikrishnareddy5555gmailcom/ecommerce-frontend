import React from 'react';
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const getStatusColor = (status) => {
  switch (status) {
    case 'COMPLETED': return 'success';
    case 'CANCELED': return 'danger';
    case 'CONTINUING': return 'primary';
    case 'RESTITUTE': return 'warning';
    default: return 'secondary';
  }
};
const getStatusIcon = (status) => {
  switch (status) {
    case 'COMPLETED': return '✅';
    case 'CANCELED': return '❌';
    case 'CONTINUING': return '🔄';
    case 'RESTITUTE': return '⚠️';
    default: return '❔';
  }
};



const OrderTable = ({ orders }) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Item</th>
          <th>Delivery Date</th>
          <th>Pricing</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.orderId}</td>
            <td>{order.customer}</td>
            <td>{order.orderItem}</td>
            <td>{formatDate(order.deliveryDate)}</td>
            <td>{order.deliveryPricing}</td>
            <td>
              <div className="status-cell">
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
            </td>


          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default OrderTable;
