import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import Navbar from '../Navbar/Navbar';
import './Reward.css';
import reward1 from '../../assets/reward1.jpeg'
import reward2 from '../../assets/reward2.jpeg'
import reward3 from '../../assets/reward3.jpeg'
import reward4 from '../../assets/reward4.jpeg'


const ManageRewards = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Smart contract logic
    };

    const rewards = [
        { title: 'OpenTenders T-Shirt', description: 'Exclusive cap for OpenTenders supporters.', tokens: 20, imageUrl: reward1 },
        { title: 'OpenTenders Bag', description: 'Stylish T-shirt for OpenTenders fans.', tokens: 30, imageUrl: reward2 },
        { title: 'OpenTenders Cap', description: 'Durable bag with the OpenTenders logo.', tokens: 30, imageUrl: reward3 },
        { title: 'OpenTenders Tumblr', description: 'Stylish and durable Tumblr.', tokens: 50, imageUrl: reward4 }
    ];

    return (
        <div>
            <Navbar />
            <section className="reward-section">
                <Container className="manage-rewards">
                    <Row>
                        {rewards.map((reward, index) => (
                            <Col md="6" key={index}> {/* Adjusted from md="4" to md="6" */}
                                <Card className="reward-card">
                                    <CardImg top width="100%" src={reward.imageUrl} alt={reward.title} className="reward-image" />
                                    <CardBody>
                                        <CardTitle tag="h4" className="text-center mb-3">{reward.title}</CardTitle>
                                        <CardText className="text-center mb-4">{reward.description}</CardText>
                                        <CardText className="text-center mb-4"><strong>{reward.tokens} BLCK Tokens</strong> required</CardText>
                                        <Form onSubmit={handleSubmit}>
                                            <Button color="primary" type="submit" disabled={isProcessing} block>
                                                {isProcessing ? 'Processing...' : 'Claim Reward'}
                                            </Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default ManageRewards;
