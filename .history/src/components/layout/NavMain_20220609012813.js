import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import { signOut } from '../../store/actions/authActions';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

function NavMain(props) {

  const { auth, users } = props;
  

  return (
    <div className="fixed-top">
        <Navbar className="navbar-collapse-overlap" bg="light" expand="lg">
            <Container > 
                <Navbar.Brand href="/" className="bg-warning text-white">ShowSpot</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"
                className="float-end" />
                <Navbar.Collapse id="basic-navbar-nav"
                >
                    <Navbar.Offcanvas className="test" >
                      
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/" onClick={props.signOut}>Logout</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Navbar.Offcanvas>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        {/* <div className=" button-container bg-primary">
            <Link to="/spotters" className="btn btn-primary button-container-elements basic-link">Spotters</Link>
            <Link to="/artists" className="btn btn-warning button-container-elements basic-link">Artists</Link>
            <Link to="/venues" className="btn btn-primary button-container-elements basic-link">Venues</Link>
        </div> */}

    </div>
    
  )
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users
    }
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => dispatch(signOut())
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'users'
    }])
  )(NavMain);