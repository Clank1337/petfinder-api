import { Card, CardImg, CardTitle, CardText, CardBody, Col,  } from 'reactstrap';

const AnimalDetail = ({ animal }) => {
    const { name,
        type,
        breeds,
        age,
        contact,
        description,
        photos = [] } = animal;
    return (

        <Col md='8' className='m-3'>
            <Card>
                <CardImg top src={photos[0]?.large || '../assets/img/p.png'} alt={name} style={{maxHeight: '600px', objectFit: 'contain'}}/>
                <CardBody>
                    <CardTitle tag='h3'>{name}</CardTitle>
                    <CardText>
                        {breeds?.primary} | {type} | {age}
                    </CardText>
                    <CardText className='text-muted'>
                        {contact?.address?.city}, {contact?.address?.state}
                    </CardText>
                    {description && <CardText>{description}</CardText>}
                </CardBody>
            </Card>
        </Col>
    )
}

export default AnimalDetail