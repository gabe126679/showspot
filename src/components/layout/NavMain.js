import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import { signOut } from '../../store/actions/authActions';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

function NavMain(props) {

  const { auth, users } = props;

  const [spotters, setSpotters] = useState(false);
  const [artists, setArtists] = useState(true);
  const [venues, setVenues] = useState(false);
  
  const handleClick = (e) => {
    console.log(e.target.id)
    if (e.target.id === "spotters") {
      setSpotters(true);
      setArtists(false);
      setVenues(false);
    } else if (e.target.id === "artists") {
      setSpotters(false);
      setArtists(true);
      setVenues(false);
    } else if (e.target.id === "venues") {
      setSpotters(false);
      setArtists(false);
      setVenues(true);
    }
  }

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
                      
                        <Nav.Link href="/#/spotterProfile">Profile</Nav.Link>
                        <Nav.Link href="/#/cart">Cart</Nav.Link>
                        <Nav.Link href="/" onClick={props.signOut}>Logout</Nav.Link>
                    </Navbar.Offcanvas>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <div className=" button-container bg-primary">
            <Link to="/spotters" className="btn btn-primary button-container-elements basic-link" id="spotters" style={{
                backgroundColor: spotters ? '#202c3e' : '',
                color: spotters ? 'white' : '',
              }}
              onClick={handleClick}>
                Spotters
            </Link>
            <Link to="/artists" className="btn btn-primary button-container-elements basic-link" id="artists" style={{
                backgroundColor: artists ? '#202c3e' : '',
                color: artists ? 'white' : '',
              }}
              onClick={handleClick}>
                Artists
            </Link>
            <Link to="/venues" className="btn btn-primary button-container-elements basic-link" id="venues" style={{
                backgroundColor: venues ? '#202c3e' : '',
                color: venues ? 'white' : '',
              }}
              onClick={handleClick}>
                Venues
            </Link>
        </div>

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