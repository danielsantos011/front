import './style.css';
import Trash from '../../assets/trash.svg';
import Pencil from '../../assets/pencil.svg';
import api from '../../services/api';
import { useEffect, useState, useRef } from 'react';

function Home() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios');
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    clearForm();
    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  async function updateUser() {
    if (!editingId) return;

    await api.put(`/usuarios/${editingId}`, {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    clearForm();
    setEditingId(null);
    getUsers();
  }

  function putUsers(user) {
    inputName.current.value = user.name;
    inputAge.current.value = user.age;
    inputEmail.current.value = user.email;
    setEditingId(user.id);
  }

  function clearForm() {
    inputName.current.value = '';
    inputAge.current.value = '';
    inputEmail.current.value = '';
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName} />
        <input placeholder='Idade' name='idade' type='number' ref={inputAge} />
        <input placeholder='E-mail' name='email' type='email' ref={inputEmail} />
        
        {editingId ? (
          <button type='button' onClick={updateUser}>Atualizar</button>
        ) : (
          <button type='button' onClick={createUsers}>Cadastrar</button>
        )}
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} width="24" height="24" alt="Excluir" />
          </button>
          <button onClick={() => putUsers(user)}>
            <img src={Pencil} width="24" height="24" alt="Editar" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
