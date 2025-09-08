
import {
    Button,
    Label,
    Form,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { fetchAnimals } from "../animal/animalsSlice";

function LandingPageHeader() {
    const dispatch = useDispatch();

    async function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);

        const params = {
            type: fd.get('type'),
            location: fd.get('zip'),
            breed: (fd.get('breed') || '').trim(),
            distance: Number(fd.get('distance')),
            page: 1,
        };

        console.log(params)

        dispatch(fetchAnimals(params));
    }

    return (
        <>
            <div className="page-header clear-filter" filter-color="blue">
                <div
                    className="page-header-image"
                    style={{ backgroundImage: "url('../assets/img/header.jpg')" }}
                />
                <Container>
                    <div className="content-center brand">
                        <h1 className="h1-seo">Find your next best friend.</h1>

                        <Form className="header-search" onSubmit={handleSubmit}>
                            <Row className="g-2 align-items-end">
                                <Col md="3" sm="6" xs="12">
                                    <Label className="form-label">Breed (optional)</Label>
                                    <Input name="breed" placeholder="e.g. Beagle" />
                                </Col>

                                <Col md="3" sm="6" xs="12">
                                    <Label className="form-label">Type</Label>
                                    <Input type="select" name="type" defaultValue="dog">
                                        <option value="dog">Dog</option>
                                        <option value="cat">Cat</option>
                                        <option value="rabbit">Rabbit</option>
                                    </Input>
                                </Col>

                                <Col md="2" sm="6" xs="12">
                                    <Label className="form-label">Zip code *</Label>
                                    <Input
                                        name="zip"
                                        placeholder="ZIP"
                                        required
                                        pattern="\d{5}"
                                        title="5-digit ZIP code"
                                        inputMode="numeric"
                                    />
                                </Col>

                                <Col md="2" sm="6" xs="12">
                                    <Label className="form-label">Distance</Label>
                                    <Input type="select" name="distance" defaultValue="25">
                                        <option value="10">10 miles</option>
                                        <option value="25">25 miles</option>
                                        <option value="50">50 miles</option>
                                        <option value="100">100 miles</option>
                                    </Input>
                                </Col>

                                <Col md="2" xs="12">
                                    <Button color="primary" className="w-100 btn-round" type="submit">
                                        Search
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Container>
            </div>
            <div className="space-70" />
        </>
    );
}

export default LandingPageHeader;