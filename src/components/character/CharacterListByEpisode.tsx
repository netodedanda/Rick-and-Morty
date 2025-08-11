// Arquivo: src/components/CharacterListByEpisode.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Character {
  id: number;
  name: string;
}

interface CharacterListByEpisodeProps {
  episodeId: number;
}

const CharacterListByEpisode: React.FC<CharacterListByEpisodeProps> = ({ episodeId }) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`);
        const characterURLs: string[] = response.data.characters;

        const characterIds = characterURLs.map((url: string) => {
          const parts = url.split('/');
          return parseInt(parts[parts.length - 1]);
        });

        const charactersData = await Promise.all(
          characterIds.map((id: number) => axios.get(`https://rickandmortyapi.com/api/character/${id}`))
        );

        const charactersInfo = charactersData.map((character: any) => character.data);

        setCharacters(charactersInfo);
      } catch (error) {
        console.error('Erro ao buscar personagens do episódio:', error);
      }
    };

    fetchCharacters();
  }, [episodeId]);

  return (
    <div>
      <h2>Personagens do Episódio</h2>
      {characters.length > 0 ? (
        <ul>
          {characters.map((character) => (
            <li key={character.id}>
              <Link to={`/character/${character.id}`}>{character.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum personagem encontrado para este episódio.</p>
      )}
    </div>
  );
};

export default CharacterListByEpisode;
