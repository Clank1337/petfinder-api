import { Card, CardBody, CardText, CardImg, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

const AnimalCard = ({ animal }) => {
    const { id, name, type, breed, location, distance, photos } = animal;
    return (
        <Link to={`/animals/${id}`}
            state={{ animal }}>
            <Card className='h-100'>
                <CardImg src={photos[0]?.large || '../assets/img/p.png'} alt={name} className='img-fluid w-100' style={{ height: "350px", objectFit: "contain", backgroundColor: "#f8f9fa" }} />
                <CardBody>
                    <CardTitle className='h5 mb-1'>{name}</CardTitle>
                    <CardText className="text-muted small mb-2">
                        {breed} {type ? `• ${type}` : ''} {location ? `• ${location}` : ''}
                        {distance != null ? ` • ${Math.round(distance)} mi` : ''}
                    </CardText>
                </CardBody>
            </Card>
        </Link>
    )
}

export default AnimalCard