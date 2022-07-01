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
    const [acceptedCount, setAcceptedCount] = useState([]);

    const handleClick = () => {
        console.log(bands);
    }

    const pushArtists = () => {
        navigate('/artists');
    }

    const pushBands = () => {
        navigate('/bandProfile');
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
                                    <button className="btn btn-primary" onClick={pushBands}>
                                        Become an Artist
                                    </button>
                                )
                            }
                        })}
                        <br/>
                        <br/>
                        <p className="text-center border bg-dark text-white">active bands:</p>
                        
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
                        {band.members.map((artist) => {  
                            if (artist.accepted === true && !acceptedCount.includes(artist.id)) {
                                setCount(count + 1);
                                setAcceptedCount([...acceptedCount, artist.id]);
                            } 
                            if (band.members.length === acceptedCount.length) {
                                props.activateBand(band, true);
                            } 
                            if (show.accepted) {
                                return (
                                    <tbody >
                                    <tr>
                                        <td>{band.bandName}</td>
                                        
                                        <td>                      
                                        <Dropdown >
                                            <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                            >
                                            {band.members[0].firstName} {band.members[0].lastName}
                                            </Dropdown.Toggle>  
                                                <Dropdown.Menu>

                                                        <Dropdown.Item href="#/action-1">  
                                                    
                                                            <Link to={"/artist/" + artist.id}>
                                                                {artist.firstName} {artist.lastName}
                                                            </Link>
                                                        
                                                        </Dropdown.Item>

                                                </Dropdown.Menu>  
                                        </Dropdown>
                                        </td>
                                        <td>{band.creatorUserName}</td>
                                    </tr>
                                    </tbody>

                                ) 
                        } else {
                            props.activateBand(band, false);
                        }
                    })}
                })}
                    </Table>
            </div>
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