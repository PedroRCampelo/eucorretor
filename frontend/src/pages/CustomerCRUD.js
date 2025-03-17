import React, { useEffect, useState } from 'react';
import api from '../api/api';

const CustomerCRUD = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar todos os clientes
  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar clientes.'); 
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Atualizar o estado do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Criar ou atualizar cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/customers/${editingId}`, formData);
        setEditingId(null);
      } else {
        await api.post('/customers', formData);
      }
      setFormData({ name: '', email: '', phone: '' });
      fetchCustomers();
    } catch (err) {
      setError('Erro ao salvar cliente.');
    }
  };

  // Iniciar edição
  const handleEdit = (customer) => {
    setFormData({ name: customer.name, email: customer.email, phone: customer.phone });
    setEditingId(customer.id);
  };

  // Excluir cliente
  const handleDelete = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      console.log(id)
      console.log(err);
      setError('Erro ao excluir cliente.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gerenciamento de Clientes</h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome"
          required
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Telefone"
          required
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '5px 10px' }}>
          {editingId ? 'Atualizar' : 'Adicionar'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setFormData({ name: '', email: '', phone: '' });
              setEditingId(null);
            }}
            style={{ padding: '5px 10px', marginLeft: '10px' }}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Alerts */}
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Clients list */}
      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nome</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Telefone</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.phone}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button onClick={() => handleEdit(customer)} style={{ marginRight: '10px' }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(customer.id)} style={{ color: 'red' }}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerCRUD;