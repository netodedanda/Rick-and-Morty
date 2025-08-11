// Arquivo: src/pages/CharacterDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import EpisodeList from '../components/episode/EpisodeList';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: {
    name: string;
  };
}

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Erro ao buscar personagem:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='container'>
        <BackButton />
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Espécie: {character.species}</p>
      <p>Última localização conhecida: {character.location.name}</p>
      
      <EpisodeList characterId={character.id} /> {/* Lista de episódios em que o personagem aparece */}
      
    </div>
  );
};

export default CharacterDetailPage;
