
import React, { useState } from 'react';
const Form = () => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [editId, setEditId] = useState(null);
  
    const submitHandler = (e) => {
      e.preventDefault();
      if (editId) {
        const newTransactions = transactions.map((t) => (
          t.id === editId ? { id: editId, description, amount } : t
        ));
        setTransactions(newTransactions);
        setEditId(null);
      } else {
        setTransactions([...transactions, { id: Date.now(), description, amount }]);
      }
      setDescription('');
      setAmount('');
    };
  
    const handleEdit = (t) => {
      setEditId(t.id);
      setDescription(t.description);
      setAmount(t.amount);
    };
  
    const handleDelete = (id) => {
      const newTransactions = transactions.filter((t) => t.id !== id);
      setTransactions(newTransactions);
    };
  return (
    <div className='bg-gray-200 min-h-screen flex flex-col justify-center items-center'>
    <h1 className='text-3xl font-bold text-center pt-12'>Personal Finance Tracker</h1>

    {/* Add Your Transaction */}
    <div className='bg-white rounded-lg shadow-lg p-5 md:p-8 mt-8 w-full max-w-md'>
      <h2 className='text-xl font-bold mb-4 text-center'>Add Your Transaction</h2>
      <form onSubmit={submitHandler}>
        <div className='mb-4'>
          <input
            type='text'
            className='border-2 border-gray-300 p-2 rounded-md w-full focus:outline-none'
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>
        <div className='mb-4'>
          <input
            type='number'
            className='border-2 border-gray-300 p-2 rounded-md w-full focus:outline-none'
            placeholder='Amount'
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
          />
        </div>
        <div className='flex justify-center'>
          <button
            className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none'
            type='submit'
          >
            {editId ? 'Update Transaction' : 'Add Transaction'}
          </button>
        </div>
      </form>
    </div>

    {/* Display Transaction List */}
    <div className='bg-white rounded-lg shadow-lg p-5 md:p-8 mt-8 w-full max-w-2xl'>
      <h2 className='text-xl font-bold mb-4 text-center'>Transaction List</h2>
      <table className='min-w-full bg-white'>
        <thead>
          <tr>
            <th className='py-2'>Description</th>
            <th className='py-2'>Amount</th>
            <th className='py-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td className='border px-4 py-2'>{t.description}</td>
              <td className='border px-4 py-2'>{t.amount}</td>
              <td className='border px-4 py-2'>
                <button
                  className='bg-yellow-500 px-4 py-2 text-white hover:text-blue-700 mr-2'
                  onClick={() => handleEdit(t)}
                >
                  Edit
                </button>
                <button
                  className='bg-red-500 px-4 py-2 text-white hover:text-blue-700'
                  onClick={() => handleDelete(t.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  )
}

export default Form
