import React from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate, Link  } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";

function BandProfile(props) {

    const { auth, bands } = props;

    let navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        console.log("hello")
    }

    const pushBands = () => {
        navigate('/bands');
    }

    const pushFormBand = () => {
        navigate('/formBand');
    }
  

    if (!auth.uid) return navigate('/artistSignup');

    if (bands) {
      return (
          <div>
          <br/>
          <br/>
          <br/>
          <div className="profile-border">
            <br/>
                <div>
                    <button className="btn btn-primary" onClick={pushBands}>
                        Bands
                    </button>
                    <button className="btn btn-warning float-end" onClick={pushFormBand}>
                        Form a Band
                    </button>
                </div>
                <br/>
                <br/>
                <p className="text-center border bg-dark text-white">my bands:</p>
                
            <br/>
            <Table  hover>
                <thead >
                <tr>
                    <th >Band</th>
                    <th>Members</th>
                    <th>Creator</th>
                </tr>
                </thead>
          {bands && bands.map((band) => {
              if (band.ids.includes(auth.uid)) {
                return (
                    <tbody>
                    <tr>
                        <td onClick={handleClick}>{band.bandName}</td>
                        <td>                      
                        <Dropdown >
                            <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                            >
                            {band.members[0].firstName} {band.members[0].lastName}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                            {band.members.map((artist) => {
                                return (
                                    <Dropdown.Item href="#/action-1">                           
                                        <Link to={"/artist/" + artist.id}>
                                            {artist.firstName} {artist.lastName}
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
          </div>
      )
    }

}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      bands: state.firestore.ordered.bands
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'bands'}
    ])
  )(BandProfile);