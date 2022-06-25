import React, { useEffect } from 'react'
import { Table, Dropdown, Col } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateBackline } from '../store/actions/showActions';

function Spotters(props) {
  const { auth, shows, users } = props;

  const navigate = useNavigate();

  const handleClick = (e) => {
    shows.map((show) => {
      if (show.id === e.target.id && !show.backlines.includes(auth.uid)) {
        users.map((user) => {
          if (user.id === auth.uid) {
            const backlineObject = {
              title: show.id,
              artist: auth.uid,
              firstName: user.firstName,
              lastName: user.lastName
            }
            props.updateBackline(backlineObject);
          }
        })
      }
    })
  }

  useEffect(() => {
    if (!auth.uid) {
        navigate("/spotterLogin");
    }
  }, []);

  if (shows) {
    return (
      <div>
        <br/>
        <br/>
        {/* <button onClick={handleClick}> hi </button> */}
        <div className="profile-border">
                <br/>
                  <p className="text-center text-white bg-warning rounded">Pending Shows:</p>
                <br/>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Artists</th>
                      <th>Venue</th>
                      <th>Promoter</th>
                      <th>Backlines</th>
                    </tr>
                  </thead>
                {shows && shows.map((show) => {
                  return (
                    <tbody >
                      <tr>
                        <td>
                          <Dropdown >
                            <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                            >
                            {show.headliner}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">                             <Link to={"/artist/" + show.headlinerId}>
                                    {show.headliner}
                                  </Link>
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-1">    <Link to={"/artist/" + show.fourthId}>
                                    {show.fourth}
                                  </Link>
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-2">{show.third}</Dropdown.Item>
                              <Dropdown.Item href="#/action-3">{show.second}</Dropdown.Item>
                              <Dropdown.Item href="#/action-3">{show.opener}</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>{show.venue}</td>
                        <td>{show.promoterUserName}</td>
                        <td className="backlines">
                          {show.backlines && show.backlines.map((backline) => {
                            return (
                              <Dropdown >
                                <Dropdown.Toggle className="dropdown-basic" variant="warning" id="dropdown-basic"
                                >
                                
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#/action-1">                             <Link to={"/artist/" + backline.artist}>
                                        {backline.firstName}
                                        {backline.lastName}
                                      </Link>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                              )
                            })}

                          <button className="btn btn-primary" id={show.id} onClick={handleClick}>+</button> 
                          
                        </td>
                      </tr>
                    </tbody>
                  ) 
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
    shows: state.firestore.ordered.shows,
    users: state.firestore.ordered.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateBackline: (backline) => dispatch(updateBackline(backline))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'shows'},
    {collection: 'users'}
  ])
)(Spotters);