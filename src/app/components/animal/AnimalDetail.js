import { Card, CardImg, CardTitle, CardText, CardBody, Col, Row, Container} from 'reactstrap';

const AnimalDetail = ({ animal }) => {
    const { name,
        type,
        breeds,
        age,
        contact,
        gender,
        status,
        description,
        distance,
        attributes: { spayed_neutered: neutered } = {},
        photos = [] } = animal;
    return (
        <Container fluid>
            <Row>
                <Col className='m-3'>
                    <Card>
                        <CardImg
                            top
                            src={photos[0]?.large || `${process.env.PUBLIC_URL}/assets/img/p.png`}
                            alt={name}
                            style={{ maxHeight: '600px', objectFit: 'contain' }}
                        />
                        <CardBody>
                            <CardTitle tag='h3'>{name}</CardTitle>
                            <CardText className='text-muted'>
                                {contact?.address?.city}, {contact?.address?.state}
                            </CardText>
                            {description && <CardText>{description}</CardText>}
                        </CardBody>
                    </Card>
                </Col>
                <Col className='m-3'>
                    <Card>
                        <CardBody>
                            <CardTitle className='fs-3 text-bold'>Information</CardTitle>
                            <hr/>
                            <CardText>
                                Breed: {breeds?.primary} {breeds?.secondary ? `, ${breeds.secondary}` : ''}
                            </CardText>
                            <CardText>
                                Gender: {gender}
                            </CardText>
                            <CardText>
                                Age: {age}
                            </CardText>
                            <CardText>
                                Status: {status}
                            </CardText>
                            <CardText>
                                Spayed/Neutered: {neutered ? 'Yes' : 'No'}
                            </CardText>
                            <CardText>
                                Distance: {Math.round(distance)} miles
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
           
        </Container>
        
    )
}

export default AnimalDetail