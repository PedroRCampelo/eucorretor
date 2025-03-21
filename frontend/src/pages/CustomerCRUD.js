import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';


const CustomerCRUD = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', birthday: '', 
    validity: '', veicPlate: '', veicModel: '', company: '', installment: '', award: '', endosso: '' });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewingCustomer, setViewingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/customers/${editingId}`, formData);
        setEditingId(null);
      } else {
        await api.post('/customers', formData);
      }
      setFormData({ name: '', email: '', phone: '', birthday: '',validity: '', veicPlate: '', veicModel: '', company: '', installment: '', award: '', endosso: '' });
      setShowForm(false);
      fetchCustomers();
    } catch (err) {
      setError('Erro ao salvar cliente.');
    }
  };

  const handleEdit = (customer) => {
    setFormData({ name: customer.name, email: customer.email, phone: customer.phone, birthday: customer.birthday, validity: customer.validity, 
      veicPlate: customer.veicPlate, veicModel: customer.veicModel, company: customer.company, installment: customer.installment, 
      award: customer.award, endosso: customer.endosso, active: customer.active});
    setEditingId(customer.id);
    setShowForm(true);
  };

  const handleView = (customer) => {
    setViewingCustomer(customer);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      setError('Erro ao excluir cliente.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Gerenciamento de Clientes</h1>

      <button onClick={() => setShowForm(true)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Adicionar Novo Cliente</button>
      <button onClick={() => navigate('/list')} className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Ver Clientes</button>
      
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-custom-01">
              <th className="bg-font-coluns-01 p-2">Nome</th>
              <th className="bg-font-coluns-01 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{customer.name}</td>
                <td className="border border-gray-300 p-2">
                  <button onClick={() => handleEdit(customer)} className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Editar</button>
                  <button onClick={() => handleView(customer)} className="mr-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Visualizar</button>
                  <button onClick={() => handleDelete(customer.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showForm && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-semibold mb-2">{editingId ? 'Editar Cliente' : 'Novo Cliente'}</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            Nome *
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="p-2 border rounded w-full" />
            <p></p>
            Email *
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="p-2 border rounded w-full" />
            <p></p>
            Telefone *
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="p-2 border rounded w-full" />
            <p></p>
            Aniverário
            <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} className="p-2 border rounded w-full" />
            <p></p>
            Vigência
            <input type="date" name="validity" value={formData.validity} onChange={handleChange} className="p-2 border rounded w-full" />
            <p></p>
            Placa
            <input type="text" name="veicPlate" value={formData.veicPlate} onChange={handleChange} className="p-2 border rounded w-full" />
            <p></p>
            Modelo
            <input type="text" name="veicModel" value={formData.veicModel} onChange={handleChange} className="p-2 border rounded w-full" />
            <p></p>
            Seguradora
            <input type="text" name="company" value={formData.company} onChange={handleChange} className="p-2 border rounded w-full" />
            <p></p>
            Parcelamento
            <input type="text" name="installment" value={formData.installment} onChange={handleChange} className="p-2 border rounded w-full" />
            <p></p>
            Prêmio
            <input type="number" name="award" value={formData.award} onChange={handleChange} className="p-2 border rounded w-full" />
            <p></p>
            Endosso
            <input type="date" name="endosso" value={formData.endosso} onChange={handleChange} className="p-2 border rounded w-full" />
            <p></p>
            Ativo
            <select type="boolean" name="active" value={formData.active} onChange={handleChange} className="p-2 border rounded w-full" >
            <option value="yes">Sim</option>
            <option value="no">Não</option>
            </select>

            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">{editingId ? 'Atualizar' : 'Adicionar'}</button>
            <button onClick={() => setShowForm(false)} type="button" className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Cancelar</button>
          </form>
        </div>
      )}
      {viewingCustomer && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-semibold">Detalhes do Cliente</h2>
          <p><strong>Nome:</strong> {viewingCustomer.name}</p>
          <p><strong>Email:</strong> {viewingCustomer.email}</p>
          <p><strong>Telefone:</strong> {viewingCustomer.phone}</p>
          <p><strong>Aniversário:</strong> {new Date(viewingCustomer.birthday).toLocaleDateString()}</p>
          <p><strong>Vigência:</strong> {viewingCustomer.validity}</p>
          <p><strong>Placa:</strong> {viewingCustomer.veicPlate}</p>
          <p><strong>Modelo:</strong> {viewingCustomer.veicModel}</p>
          <p><strong>Seguradora:</strong> {viewingCustomer.company}</p>
          <p><strong>Parcelamento:</strong> {viewingCustomer.installment}</p>
          <p><strong>Prêmio:</strong> {viewingCustomer.award}</p>
          <p><strong>Endosso:</strong> {viewingCustomer.endosso}</p>
          <p><strong>Ativo:</strong> {viewingCustomer.active}</p>
          <button onClick={() => setViewingCustomer(null)} className="mt-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Fechar</button>
        </div>
      )}
    </div>
  );
};

export default CustomerCRUD;
