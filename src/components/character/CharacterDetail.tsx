import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spinner, Alert, Card, Badge } from 'react-bootstrap';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
}

const getStatusVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'alive':
      return 'success';
    case 'dead':
      return 'danger';
    default:
      return 'secondary';
  }
};

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);
      } catch (err) {
        setError('Erro ao buscar detalhes do personagem. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4 text-center">
        {error}
      </Alert>
    );
  }

  if (!character) {
    return <p className="text-center mt-4">Personagem não encontrado.</p>;
  }

  return (
    <Card className="mx-auto my-4 p-3" style={{ maxWidth: '600px' }}>
      <div className="d-flex flex-column flex-md-row align-items-center">
        <img
          src={character.image}
          alt={character.name}
          className="img-fluid rounded mb-3 mb-md-0 me-md-4"
          style={{ maxWidth: '200px' }}
        />
        <div>
          <Card.Title className="mb-3">{character.name}</Card.Title>
          <Badge bg={getStatusVariant(character.status)} className="mb-3 fs-6 px-3 py-2">
            {character.status}
          </Badge>
          <Card.Text><strong>Espécie:</strong> {character.species}</Card.Text>
          <Card.Text><strong>Gênero:</strong> {character.gender}</Card.Text>
          <Card.Text><strong>Origem:</strong> {character.origin.name}</Card.Text>
          <Card.Text><strong>Localização:</strong> {character.location.name}</Card.Text>
        </div>
      </div>
    </Card>
  );
};

export default CharacterDetail;
