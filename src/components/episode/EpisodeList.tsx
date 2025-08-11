import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { FaCalendarAlt } from '@react-icons/all-files/fa/FaCalendarAlt';
import { FaTv } from '@react-icons/all-files/fa/FaTv';

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

interface EpisodeListProps {
  characterId: number;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ characterId }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      setError(null);

      try {
        const characterResponse = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
        const episodeUrls: string[] = characterResponse.data.episode;
        const episodeIds = episodeUrls.map(url => url.split('/').pop()).join(',');
        const episodesResponse = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeIds}`);
        const episodesData = Array.isArray(episodesResponse.data) ? episodesResponse.data : [episodesResponse.data];
        setEpisodes(episodesData);
      } catch {
        setError('Erro ao buscar episódios. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [characterId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Carregando episódios...</span>
        </Spinner>
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

  if (episodes.length === 0) {
    return <p className="text-center my-4">Nenhum episódio encontrado.</p>;
  }

  return (
    <div className="my-4">
      <h2 className="mb-4 text-center fw-bold">Episódios</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {episodes.map((episode) => (
          <Col key={episode.id}>
            <Card className="h-100 episode-card shadow-sm border-0 rounded-4">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>
                  <Link to={`/episode/${episode.id}`} className="text-decoration-none text-primary fw-semibold fs-5">
                    {episode.name}
                  </Link>
                </Card.Title>
                <Card.Text className="d-flex align-items-center text-muted mb-2">
                  <FaCalendarAlt className="me-2" />
                  {episode.air_date}
                </Card.Text>
                <Card.Text className="d-flex align-items-center text-muted">
                  <FaTv className="me-2" />
                  {episode.episode}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <style>{`
        .episode-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .episode-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        a.text-primary:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default EpisodeList;
