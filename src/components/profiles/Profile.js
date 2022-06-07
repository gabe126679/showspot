import React, { useEffect } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

function Profile(props) {

    const { auth, users } = props;

    let navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        users.map((user) => {
            // if (user.email === auth.email) {
            //     console.log(user.email);
            // }
            console.log(user);
        })

    }
  

    useEffect(() => {
      if (!auth.uid) {
          navigate("/");
      }
    }, []);



  return (
      <div>
      <br/>
      <br/>
      <br/>
      <br/>
      {users && users.map((user) => {
          if (user.id === auth.uid) {
            return (
              <div className="profile-border">
                <Table  hover>
                  <thead >
                    <tr>
                      <th>User Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{user.userName}</td>
                      <td>{auth.email}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
          ) 
          }
        })}
      </div>
  )
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
      collection: 'users'
    }])
  )(Profile);