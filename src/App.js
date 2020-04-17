import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    async function getRepositories(){
      const {data} = await api.get('repositories');
      setRepositories(data);
    }
    getRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Novo Repositorio',
      url: 'http://localhost:8080/newRepository',
      techs: ['tech 1', 'tech 2', 'tech3']
    });
    
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const list = repositories.filter(rep => rep.id !==id);

    setRepositories([...list]);    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(rep => (
            <li key={rep.id}>
              {rep.title}
              <button onClick={() => handleRemoveRepository(rep.id)}>
                Remover
              </button>
            </li>
          ))
        }
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
