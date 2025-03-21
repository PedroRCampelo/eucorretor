import React, { useEffect, useState } from 'react';
import api from '../api/api';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
      setFilteredCustomers(response.data);
    } catch (err) {
      console.error('Erro ao carregar clientes.', err);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    let sortedCustomers = [...customers];

    if (value === 'birthday') {
      sortedCustomers.sort((a, b) => new Date(a.birthday) - new Date(b.birthday));
    } else if (value === 'validity') {
      sortedCustomers.sort((a, b) => new Date(a.validity) - new Date(b.validity));
    } else if (value === 'alphabetical') {
      sortedCustomers.sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredCustomers(sortedCustomers);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Lista de Clientes</h1>
      <label className="mr-2">Filtrar por:</label>
      <select value={filter} onChange={handleFilterChange} className="p-2 border rounded">
        <option value="">Selecione</option>
        <option value="birthday">Aniversário</option>
        <option value="validity">Vigência</option>
        <option value="alphabetical">Ordem Alfabética</option>
      </select>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nome</th>
            <th className="p-2">Aniversário</th>
            <th className="p-2">Vigência</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{customer.name}</td>
              <td className="border border-gray-300 p-2">{new Date(customer.birthday).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2">{new Date(customer.validity).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
