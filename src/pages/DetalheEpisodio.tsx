// Arquivo: src/pages/EpisodeDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CharacterListByEpisode from '../components/character/CharacterListByEpisode';
import BackButton from '../components/BackButton';

interface Episode {
  id: number;
  name: string;
}

const EpisodeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<any>(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
        setEpisode(response.data);
      } catch (error) {
        console.error('Erro ao buscar episódio:', error);
      }
    };

    fetchEpisode();
  }, [id]);

  if (!episode) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='container'>
       <BackButton /> 
      <h1>{episode.name}</h1>
      <p>Ar: {episode.air_date}</p>
      <p>Episódio: {episode.episode}</p>
      
      <CharacterListByEpisode episodeId={episode.id} /> {/* Passa o ID do episódio */}
    </div>
  );
};

export default EpisodeDetailPage;
