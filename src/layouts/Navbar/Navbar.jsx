import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavScrollExample({ textRef, handleClick, handleLocSavedClick, handleMainClick, handleRemoteSavedClick }) {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href='#' onClick={e => handleMainClick()}>Giphy Lite</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={e => handleLocSavedClick()}>Local Saved</Nav.Link>
                        <Nav.Link onClick={e => handleRemoteSavedClick()}>Remote Saved</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            ref={textRef}
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success" 
                                onClick={handleClick} 
                        >
                            Search
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;