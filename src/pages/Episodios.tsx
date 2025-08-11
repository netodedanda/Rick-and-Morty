import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

const EpisodesPage: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/episode');
        setEpisodes(response.data.results);
      } catch (err) {
        setError('Erro ao carregar os episódios.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" role="status" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Episódios</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {episodes.map(episode => (
          <Col key={episode.id}>
            <Card className="h-100 shadow-sm rounded-4 border-0">
              <Card.Body>
                <Card.Title>
                  <Link to={`/episode/${episode.id}`} className="text-decoration-none text-primary fw-semibold">
                    {episode.name}
                  </Link>
                </Card.Title>
                <Card.Text><strong>Data de Exibição:</strong> {episode.air_date}</Card.Text>
                <Card.Text><strong>Episódio:</strong> {episode.episode}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EpisodesPage;
