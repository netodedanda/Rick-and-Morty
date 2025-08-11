import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Container } from 'react-bootstrap';

interface Location {
  id: number;
  name: string;
}

interface LocationListProps {
  locations: Location[];
}

const LocationList: React.FC<LocationListProps> = ({ locations }) => {
  if (locations.length === 0) {
    return <p className="text-center my-4">Nenhuma localização encontrada.</p>;
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 fw-bold">Lista de Localizações</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {locations.map((location) => (
          <Col key={location.id}>
            <Card className="h-100 shadow-sm border-0 rounded-4 location-card">
              <Card.Body className="d-flex align-items-center justify-content-center">
                <Link
                  to={`/location/${location.id}`}
                  className="text-decoration-none fw-semibold fs-5 text-primary"
                >
                  {location.name}
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <style>{`
        .location-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .location-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        a.text-primary:hover {
          text-decoration: underline;
        }
      `}</style>
    </Container>
  );
};

export default LocationList;
