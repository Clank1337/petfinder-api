import { useParams, useLocation } from "react-router-dom";
import { Container } from "reactstrap";
import AnimalDetail from "../components/animal/AnimalDetail";

const AnimalDetailPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const animal = location.state?.animal;
    console.log("Animal ID:", id);
    return (
        <Container>
            {animal ? (
                <AnimalDetail animal={animal} />
            ) : (
                <p>Loading animal #{id}...</p>
            )}
        </Container>
    );
}

export default AnimalDetailPage