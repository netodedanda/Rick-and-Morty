import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, ListGroup, Spinner, Alert, Row, Col } from 'react-bootstrap';

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

interface Resident {
  id: number;
  name: string;
}

const LocationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
        setLocation(response.data);

        // Busca detalhes dos residentes, se houver
        if (response.data.residents.length > 0) {
          const promises = response.data.residents.map((url: string) => axios.get(url));
          const responses = await Promise.all(promises);
          setResidents(responses.map(res => res.data));
        } else {
          setResidents([]);
        }
      } catch (err) {
        setError('Erro ao carregar os detalhes da localização.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
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
      <Container className="my-5">
        <Alert variant="danger" className="text-center">{error}</Alert>
      </Container>
    );
  }

  if (!location) {
    return (
      <Container className="my-5">
        <Alert variant="warning" className="text-center">Localização não encontrada.</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="shadow-sm border-0 rounded-4 p-4">
        <Card.Title as="h2" className="mb-4 text-center">
          Detalhes da Localização
        </Card.Title>
        <Card.Body>
          <Row className="mb-4">
            <Col md={4}>
              <h3 className="fw-bold">{location.name}</h3>
            </Col>
            <Col md={4}>
              <p><strong>Tipo:</strong> {location.type || 'Desconhecido'}</p>
            </Col>
            <Col md={4}>
              <p><strong>Dimensão:</strong> {location.dimension || 'Desconhecida'}</p>
            </Col>
          </Row>

          <div>
            <h4 className="mb-3">Residentes</h4>
            {residents.length > 0 ? (
              <ListGroup variant="flush">
                {residents.map((resident) => (
                  <ListGroup.Item key={resident.id}>
                    <Link to={`/character/${resident.id}`} className="text-decoration-none">
                      {resident.name}
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p>Não há residentes nesta localização.</p>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LocationDetail;
