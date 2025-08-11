import React from 'react';
import CharacterList from '../components/character/CharacterList';


const CharactersPage: React.FC = () => {
  return (
    <div className='container'>
      <h1>Página de Personagens</h1>
      <CharacterList />
    </div>
  );
};

export default CharactersPage;


