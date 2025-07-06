import React, { useState } from 'react';

const OrderFilters = ({ onFilter }) => {
  const [filter, setFilter] = useState({
    orderId: '',
    customer: '',
    orderItem: '',
    startDate: '',
    endDate: '',
    minPrice: '',
    maxPrice: '',
    status: ''
  });

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      filter.minPrice &&
      filter.maxPrice &&
      parseFloat(filter.minPrice) > parseFloat(filter.maxPrice)
    ) {
      alert("Min Price cannot be greater than Max Price");
      return;
    }
     if (
    filter.startDate &&
    filter.endDate &&
    new Date(filter.startDate) > new Date(filter.endDate)
  ) {
    alert("Start Date cannot be after End Date");
    return;
  }

    const cleanedFilter = {};
    Object.entries(filter).forEach(([key, value]) => {
      cleanedFilter[key] = value === '' ? null : value;
    });

    onFilter(cleanedFilter);
  };

  const handleClear = () => {
    const reset = {
      orderId: '',
      customer: '',
      orderItem: '',
      startDate: '',
      endDate: '',
      minPrice: '',
      maxPrice: '',
      status: ''
    };
    setFilter(reset);
    onFilter({});
  };

  return (
    <div className="filter-box mb-4">
      <form onSubmit={handleSubmit}>
        <div className="row g-2">
          {[
            { name: 'orderId', label: 'Order ID', type: 'text' },
            { name: 'customer', label: 'Customer', type: 'text' },
            { name: 'orderItem', label: 'Item', type: 'text' },
            { name: 'startDate', label: 'Start Date', type: 'date' },
            { name: 'endDate', label: 'End Date', type: 'date' },
            { name: 'minPrice', label: 'Min Price', type: 'number', min: 0 },
            { name: 'maxPrice', label: 'Max Price', type: 'number', min: 0 }
          ].map(({ name, label, type, min }) => (
            <div className="col-md" key={name}>
              <div className="form-floating">
                <input
                  type={type}
                  name={name}
                  value={filter[name]}
                  onChange={handleChange}
                  className="form-control"
                  id={name}
                  placeholder={label}
                  min={min}
                />
                <label htmlFor={name}>{label}</label>
              </div>
            </div>
          ))}

          <div className="col-md-auto d-flex align-items-end">
            <button type="submit" className="btn btn-success me-2">Filter</button>
            <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderFilters;
