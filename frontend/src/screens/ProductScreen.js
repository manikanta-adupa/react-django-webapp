import React,{useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import Rating from '../components/Rating';
// import products from '../products';
import axios from 'axios'

function ProductScreen() {
    const { id } = useParams(); // Get the "id" parameter from the route
    const [product, setProduct] = useState({});

    useEffect(() => {
        async function fetchProduct() {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
            } catch (error) {
                // Handle error, e.g., product not found
                console.error('Error fetching product:', error);
            }
        }
        fetchProduct();
    }, [id]); // Include "id" as a dependency to re-fetch when it changes

    if (!product) {
        return <div><h1>Product not found!</h1></div>; // Handle case where product is not found
    }

    return (
        <div>
            <Link to={'/'} className='btn btn-light my-3'>Go back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} />
                </Col>

                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{product.countInStock > 0 ? "In stock" : "Out of Stock"}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Button className='btn-block' disabled={product.countInStock==0} type='button'>
                                        Add to cart
                                    </Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ProductScreen;
