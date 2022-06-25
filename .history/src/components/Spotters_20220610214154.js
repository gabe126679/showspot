import React, { useEffect } from 'react'
import { Table, Dropdown, Col } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';

function Spotters(props) {
  const { auth, shows } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    console.log(shows);
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
                        <td><button className="btn btn-primary">+</button></td>
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
  }
}

// const mapDispatchToProps = (state) => {
//   console.log(state.firestore)
//   return {
//     auth: state.firebase.auth
//   }
// }

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'shows'
  }])
)(Spotters);