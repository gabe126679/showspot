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
                    <th>Band</th>
                    <th>Members</th>
                    <th>Creator</th>
                </tr>
                </thead>
          {bands && bands.map((band) => {
              if (
                  band.firstId === auth.uid ||
                  band.secondId === auth.uid ||
                  band.thirdId === auth.uid ||
                  band.fourthId === auth.uid ||
                  band.fifthId === auth.uid
                ) 
                {
                return (

                      <tbody>
                        <tr>
                            <td>{band.bandName}</td>
                            <td>                      
                            <Dropdown >
                                <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                >
                                {band.first}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">                           
                                    <Link to={"/artist/" + band.firstId}>
                                        {band.first}
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                    <Link to={"/artist/" + band.secondId}>
                                        {band.second}
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2">
                                    <Link to={"/artist/" + band.thirdId}>
                                        {band.third}
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-1">    
                                    <Link to={"/artist/" + band.fourthId}>
                                        {band.fourth}
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3">
                                    <Link to={"/artist/" + band.fifthId}>
                                        {band.fifth}
                                    </Link>
                                </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </td>
                            <td>{band.first}</td>
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