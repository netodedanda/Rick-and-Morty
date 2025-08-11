import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Spinner, Container, Alert } from 'react-bootstrap';

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

const EpisodeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
        setEpisode(response.data);
      } catch (error) {
        setError('Erro ao buscar detalhes do episódio.');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" role="status" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-4 text-center">
        {error}
      </Alert>
    );
  }

  if (!episode) {
    return <p className="text-center my-4">Episódio não encontrado.</p>;
  }

  return (
    <Container className="my-5">
      <Card className="mx-auto shadow-lg rounded-4" style={{ maxWidth: '600px' }}>
        <Card.Header className="bg-primary text-white text-center fs-4 fw-bold">
          Detalhes do Episódio
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-center mb-4">{episode.name}</Card.Title>
          <Card.Text>
            <strong>Episódio:</strong> {episode.episode}
          </Card.Text>
          <Card.Text>
            <strong>Data de lançamento:</strong> {episode.air_date}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EpisodeDetail;
