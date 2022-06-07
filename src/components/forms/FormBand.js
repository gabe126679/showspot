import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from "redux";
import { createBand } from '../../store/actions/showActions';
import { useNavigate } from "react-router-dom";


function FormBand(props) {

    const { auth, users } = props;

    const navigate = useNavigate();

    const [first, setFirst] = useState("");
    const [fourth, setFourth] = useState("");
    const [third, setThird] = useState("");
    const [second, setSecond] = useState("");
    const [fifth, setFifth] = useState("");
    const [bandName, setBandName] = useState("");
    const [firstId, setFirstId] = useState("");
    const [fourthId, setFourthId] = useState("");
    const [thirdId, setThirdId] = useState("");
    const [secondId, setSecondId] = useState("");
    const [fifthId, setFifthId] = useState("");

    const handleClick = () => {
        console.log(firstId);
    }

    useEffect(() => {
        const fourthTest = fourth.split(" ");
        const thirdTest = third.split(" ");
        const secondTest = second.split(" ");
        const fifthTest = fifth.split(" ");
        if (users) {
            users.map((user) => {
                if (user.id === auth.uid) {
                    setFirst(user.firstName + " " + user.lastName);
                    setFirstId(user.id);
                }
                if (secondTest[0] === user.firstName && secondTest[1] === user.lastName) {
                    setSecondId(user.id);
                }
                if (thirdTest[0] === user.firstName && thirdTest[1] === user.lastName) {
                    setThirdId(user.id);
                }
                if (fourthTest[0] === user.firstName && fourthTest[1] === user.lastName) {
                    setFourthId(user.id);
                }
                if (fifthTest[0] === user.firstName && fifthTest[1] === user.lastName) {
                    setFifthId(user.id);
                }
            })
        }
    }, [first, fourth, third, second, fifth])

    const handleChange = (e) => {
        if (e.target.id === "second") {
            setSecond(e.target.value);   
        }
        else if (e.target.id === "third") {
            setThird(e.target.value);   
        }
        else if (e.target.id === "fourth") {
            setFourth(e.target.value);   
        }
        else if (e.target.id === "fifth") {
            setFifth(e.target.value);   
        }
        else if (e.target.id === "bandName") {
            setBandName(e.target.value);   
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const stateObject = {
            first,
            fourth,
            third,
            second,
            fifth,
            bandName,
            firstId,
            fourthId,
            thirdId,
            secondId,
            fifthId
        }

        if (
            second !== "" &&
            third !== "" &&
            fourth !== "" &&
            fifth !== "" &&
            bandName !== ""
        ) {
            props.createBand(stateObject);
        }

        navigate('/spotters');
    }

    useEffect(() => {
        if (!auth.uid) {
            navigate("/spotterLogin");
        }
      }, []);

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            
            <div className="container">
                <p className="text-center">Create a Band with up to 5 artists. Don't forget to Name your Band</p>
            </div>
            {/* <button onClick={handleClick}>hi</button> */}
            <div className="login-container container border">
                <br/>
                <br/>
                <Form onSubmit={handleSubmit}>
                    <h1 className="text-center">Form a Band</h1>
                    <br/>
                    {users && users.map((user) => {
                        if (user.id === auth.uid) {
                            return (
                                <div>
                                    <Form.Label>1st</Form.Label>
                                    <div className="mb-3 p-2 border">
                                        {user.firstName} {user.lastName}
                                    </div>
                                </div>
                            )
                        }
                    })}
                    <Form.Group className="mb-3" controlId="second" onChange={handleChange}>
                        <Form.Label>2nd</Form.Label>
                        <Form.Control type="text" placeholder="Enter 2nd Member"
                         
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="third" onChange={handleChange}>
                        <Form.Label>3rd</Form.Label>
                        <Form.Control type="text" placeholder="Enter 3rd Member" 
                        
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fourth" onChange={handleChange}>
                        <Form.Label>4th</Form.Label>
                        <Form.Control type="text" placeholder="Enter 4th Member" 
                        
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fifth" onChange={handleChange}>
                        <Form.Label>5th</Form.Label>
                        <Form.Control type="text" placeholder="Enter 5th Member" 
                       
                        />
                    </Form.Group>
                    <br/>
                    <br/>
                    <Form.Group className="mb-3" controlId="bandName" onChange={handleChange}>
                        <Form.Label>Band Name</Form.Label>
                        <Form.Control type="bandName" placeholder="Enter Band Name" 
                        
                        />
                    </Form.Group>

                    <br/>
                    <br/>
                    <div className="col text-center">
                        <Button className="align-center" variant="primary" type="submit">
                            Create
                        </Button>
                    </div>
                    <br/>
                </Form>
                <br/>
            </div> 
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
 
        </div>
    )
}

const mapStateToProps = (state) => {

    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
      createBand: (band) => dispatch(createBand(band))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'users'
    }])
  )(FormBand);