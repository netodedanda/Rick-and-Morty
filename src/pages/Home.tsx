import React from 'react';
import CharactersPage from './CharactersPerson';

const HomePage: React.FC = () => {
  return (
    <div className='container'>
      <CharactersPage />
      <h1 className='text-center mt-4'>Rick and Morty Characters</h1>
      <p className='text-center'>Explore the universe of Rick and Morty characters!</p>
      <div className='text-center'>
        <img
          src='https://rickandmortyapi.com/api/character/avatar/1.jpeg'
          alt='Rick Sanchez'
          className='img-fluid rounded-circle'
        />
      </div>
      <div className='text-center mt-4'>
        <a
          href='https://rickandmortyapi.com/'
          target='_blank'
          rel='noopener noreferrer'
          className='btn btn-primary'
        >
          Visit API
        </a>
      </div>
    </div>
  );
};

export default HomePage;
