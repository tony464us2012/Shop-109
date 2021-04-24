import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Shop 109
                    </Col>
                    <Col className="text-center py-3">
                        <a href="/accessibility">Accessibility</a>
                    </Col>
                    <Col className="text-center py-3">
                        <a href="terms">Term and Conditions</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
