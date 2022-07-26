import React, { useState, useEffect } from 'react'
import { Table, Dropdown } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { activateBand } from '../store/actions/showActions';

function Bands(props) {
    const { auth, bands, users } = props;
  
    const navigate = useNavigate();
  
    const [count, setCount] = useState(0);
    const [active, setActive] = useState(true);
    const [status, setStatus] = useState("");

    const handleClick = () => {
        console.log(bands);
    }

    const toggleStatus = (e) => {
        e.preventDefault();
        const activeButton = document.querySelector(".active");
        const pendingButton = document.querySelector(".pending");
        if (active === true) {
          pendingButton.classList.add("btn-primary");
          pendingButton.classList.remove("btn-warning");
          activeButton.classList.add("btn-warning");
          activeButton.classList.remove("btn-primary");
          setActive(false);
        } else {
          pendingButton.classList.add("btn-warning");
          pendingButton.classList.remove("btn-primary");
          activeButton.classList.add("btn-primary");
          activeButton.classList.remove("btn-warning");
          setActive(true);
        }
      }

    const pushArtists = () => {
        navigate('/artists');
    }

    const pushArtistSignup = () => {
        navigate('/artistSignup');
    }

    const pushBands = () => {
        navigate('/bandProfile');
    }

    const pushBand = (e) => {
        e.preventDefault();
        navigate('/band/' + e.target.id);
    }
  
    useEffect(() => {

      if (!auth.uid) {
          navigate("/spotterLogin");
      }
      


    });

    
    if (bands) {
        return (
            <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

            <div className="profile-border">
                    <br/>
                    {users && users.map((user) => {
                            if (user.id === auth.uid && user.isArtist === true) {
                                return (
                                    <div>
                                        <button className="btn btn-primary" onClick={pushArtists}>
                                            Artists
                                        </button>
                                        <button className="btn btn-warning float-end" onClick={pushBands}>
                                            My Bands
                                        </button>
                                    </div>
                                )
                            } else if (user.id === auth.uid) {
                                return (
                                    <button className="btn btn-primary" onClick={pushArtistSignup}>
                                        Become an Artist
                                    </button>
                                )
                            }
                        })}
                        <br/>
                        <div className="text-center">
                        {(() => {
                            if (active) {
                            return <h4>ACTIVE BANDS</h4>
                            } else {
                            return <h4>PENDING BANDS</h4>
                            }
                        })()}       
                        <br/>
                        <button className="active btn btn-primary" onClick={toggleStatus}>active</button>
                        <button className="pending btn btn-warning" onClick={toggleStatus}>pending</button>
                        
                        </div>
                        
                    <br/>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Members</th>
                            <th>Creator</th>
                        </tr>
                        </thead>
                        
                    {bands && bands.map((band) => {
                        
                        if (!band.activated && active === false) {

                                return (
                                        
                                    <tbody >
                                        
                                    <tr>
                                        <td id={band.id} onClick={pushBand}>{band.bandName}</td>
                                        
                                        <td>                      
                                        <Dropdown >
                                            <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                            >
                                            {band.members[0].firstName} {band.members[0].lastName}
                                            </Dropdown.Toggle> 

                                                    <Dropdown.Menu>
                                                        {band.members.map((member) => {
                                                        return (
                                                            <Dropdown.Item href="#/action-1">  
                                                        
                                                                <Link to={"/artist/" + member.id}>
                                                                    {member.firstName} {member.lastName}
                                                                </Link>
                                                            
                                                            </Dropdown.Item>
                                                            )
                                                        })}                                       
                                                    </Dropdown.Menu>  

                                        </Dropdown>
                                        </td>
                                        <td>{band.creatorUserName}</td>
                                    </tr>
                                        
                                    </tbody>
                                
                                )   
                            } else if (band.activated === true && active === true) {
                                
                                return (
                                        
                                    <tbody >
                                        
                                    <tr>
                                        <td id={band.id} onClick={pushBand}>{band.bandName}</td>
                                        
                                        <td>                      
                                        <Dropdown >
                                            <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                            >
                                            {band.members[0].firstName} {band.members[0].lastName}
                                            </Dropdown.Toggle> 

                                                    <Dropdown.Menu>
                                                        {band.members.map((member) => {
                                                        return (
                                                            <Dropdown.Item href="#/action-1">  
                                                        
                                                                <Link to={"/artist/" + member.id}>
                                                                    {member.firstName} {member.lastName}
                                                                </Link>
                                                            
                                                            </Dropdown.Item>
                                                            )
                                                        })}                                       
                                                    </Dropdown.Menu>  

                                        </Dropdown>
                                        </td>
                                        <td>{band.creatorUserName}</td>
                                    </tr>
                                        
                                    </tbody>
                                
                                ) 
                            }
                    })}
                    </Table>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            </div>
        )
    } else {
        return <div> 
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={handleClick}>hi</button>
            <br/>
            loading ... 
            </div>
    }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    bands: state.firestore.ordered.bands,
    users: state.firestore.ordered.users,
  }
}

const mapDispatchToProps = dispatch => {
    return {
        activateBand: (band, decision) => dispatch(activateBand(band, decision))
    }

}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'bands'},
    { collection: 'users'}
  ])
)(Bands);