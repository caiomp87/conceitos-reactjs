import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';
import Header from './components/Header';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Desafio VueJS',
      url: 'https://github.com/caiomp87/be-the-hero',
      techs: ['NodeJS', 'VueJS']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div className="repository-container">
      <Header title="Repositórios" />

      <ul data-testid="repository-list">
        {repositories.map(repo =>
          <>
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
            </li>
          </>
        )}
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
