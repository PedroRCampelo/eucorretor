import React, { useEffect, useState } from 'react';
import api from '../api/api'; // Certifique-se de que o caminho está correto

const CustomerCRUD = () => {
  const [customers, setCustomers] = useState([]); // Lista de clientes
  const [name, setName] = useState(''); // Campo do formulário para nome
  const [editingId, setEditingId] = useState(null); // ID do cliente sendo editado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar todos os clientes (READ)
  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers'); // Endpoint para listar clientes
      setCustomers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar os clientes.');
      setLoading(false);
    }
  };

  // Carrega os clientes ao montar o componente
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Função para criar ou atualizar um cliente (CREATE/UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Atualiza cliente existente (UPDATE)
        await api.put(`/customers/${editingId}`, { name });
        setEditingId(null);
      } else {
        // Cria novo cliente (CREATE)
        await api.post('/customers', { name });
      }
      setName(''); // Limpa o campo
      fetchCustomers(); // Atualiza a lista
    } catch (err) {
      setError('Erro ao salvar o cliente.');
    }
  };

  // Função para iniciar a edição de um cliente
  const handleEdit = (customer) => {
    setName(customer.name);
    setEditingId(customer.id);
  };

  // Função para excluir um cliente (DELETE)
  const handleDelete = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers(); // Atualiza a lista
    } catch (err) {
      setError('Erro ao excluir o cliente.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gerenciamento de Clientes</h1>

      {/* Formulário para adicionar/editar */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do cliente"
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
              setName('');
              setEditingId(null);
            }}
            style={{ padding: '5px 10px', marginLeft: '10px' }}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Mensagens de carregamento e erro */}
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Lista de clientes */}
      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nome</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{customer.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button
                    onClick={() => handleEdit(customer)}
                    style={{ marginRight: '10px' }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    style={{ color: 'red' }}
                  >
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