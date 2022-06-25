import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from "redux";
import { createShow } from '../../store/actions/showActions';
import { useNavigate } from "react-router-dom";


function Promote(props) {

    const { auth, users } = props;

    const navigate = useNavigate();

    const [headliner, setHeadliner] = useState("");
    const [fourth, setFourth] = useState("");
    const [third, setThird] = useState("");
    const [second, setSecond] = useState("");
    const [opener, setOpener] = useState("");
    const [venue, setVenue] = useState("");
    const [headlinerId, setHeadlinerId] = useState("");
    const [fourthId, setFourthId] = useState("");
    const [thirdId, setThirdId] = useState("");
    const [secondId, setSecondId] = useState("");
    const [openerId, setOpenerId] = useState("");
    const [venueId, setVenueId] = useState("");

    const handleClick = () => {
        console.log(headlinerId);

    }

    useEffect(() => {
        const headlinerTest = headliner.split(" ");
        const fourthTest = fourth.split(" ");
        const thirdTest = third.split(" ");
        const secondTest = second.split(" ");
        const openerTest = opener.split(" ");
        if (users) {
            users.map((user) => {
                if (headlinerTest[0] === user.firstName && headlinerTest[1] === user.lastName) {
                    setHeadlinerId(user.id);
                }
                if (fourthTest[0] === user.firstName && fourthTest[1] === user.lastName) {
                    setFourthId(user.id);
                }
                if (thirdTest[0] === user.firstName && thirdTest[1] === user.lastName) {
                    setThirdId(user.id);
                }
                if (secondTest[0] === user.firstName && secondTest[1] === user.lastName) {
                    setSecondId(user.id);
                }
                if (openerTest[0] === user.firstName && openerTest[1] === user.lastName) {
                    setOpenerId(user.id);
                }
                if (user.venueName === venue) {
                    setVenueId(user.id);
                }
            })
        }
    }, [headliner, fourth, third, second, opener])

    const handleChange = (e) => {
        if (e.target.id === "headliner") {
            setHeadliner(e.target.value);   
        }
        else if (e.target.id === "fourth") {
            setFourth(e.target.value);   
        }
        else if (e.target.id === "third") {
            setThird(e.target.value);   
        }
        else if (e.target.id === "second") {
            setSecond(e.target.value);   
        }
        else if (e.target.id === "opener") {
            setOpener(e.target.value);   
        }
        else if (e.target.id === "venue") {
            setVenue(e.target.value);   
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const stateObject = {
            headliner,
            fourth,
            third,
            second,
            opener,
            venue,
            headlinerId,
            fourthId,
            thirdId,
            secondId,
            openerId,
            venueId
        }

        if (
            headliner !== "" &&
            fourth !== "" &&
            third !== "" &&
            second !== "" &&
            opener !== "" &&
            venue !== ""
        ) {
            props.createShow(stateObject);
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
            
            <div className="container">
                <p className="text-center">Promote a Show with up to 5 artists. You are now a ShowSpotter!</p>
            </div>
            {/* <button onClick={handleClick}>hi</button> */}
            <div className="login-container container border">
            <button onClick={handleClick}> hello </button>
                <br/>
                <br/>
                <Form onSubmit={handleSubmit}>
                    <h1 className="text-center">Promote A Show</h1>
                    <br/>
                    <Form.Group className="mb-3" controlId="headliner" onChange={handleChange} >
                        <Form.Label>headliner</Form.Label>
                        <Form.Control type="headliner" placeholder="Enter headliner"
                        
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fourth" onChange={handleChange}>
                        <Form.Label>4th</Form.Label>
                        <Form.Control type="4th" placeholder="Enter 4th" 
                        
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="third" onChange={handleChange}>
                        <Form.Label>3rd</Form.Label>
                        <Form.Control type="3rd" placeholder="Enter 3rd" 
                        
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="second" onChange={handleChange}>
                        <Form.Label>2nd</Form.Label>
                        <Form.Control type="2nd" placeholder="Enter 2nd"
                         
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="opener" onChange={handleChange}>
                        <Form.Label>Opener</Form.Label>
                        <Form.Control type="Opener" placeholder="Enter Opener" 
                       
                        />
                    </Form.Group>
                    <br/>
                    <br/>
                    <Form.Group className="mb-3" controlId="venue" onChange={handleChange}>
                        <Form.Label>Venue</Form.Label>
                        <Form.Control type="text" placeholder="Enter Venue Name"                         
                        />
                    </Form.Group>

                    <br/>
                    <br/>
                    <div className="col text-center">
                        <Button className="align-center" variant="primary" type="submit">
                            Promote
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
      createShow: (show) => dispatch(createShow(show))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'users'
    }])
  )(Promote);