// import React, { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';
// import { firestoreConnect } from 'react-redux-firebase';
// import { connect } from 'react-redux';
// import { compose } from "redux";
// import { createShow } from '../../store/actions/showActions';
// import { useNavigate } from "react-router-dom";


// function Promote(props) {

//     const { auth, users } = props;

//     const navigate = useNavigate();

//     const [headliner, setHeadliner] = useState("");
//     const [fourth, setFourth] = useState("");
//     const [third, setThird] = useState("");
//     const [second, setSecond] = useState("");
//     const [opener, setOpener] = useState("");
//     const [venue, setVenue] = useState("");
//     const [headlinerId, setHeadlinerId] = useState("");
//     const [fourthId, setFourthId] = useState("");
//     const [thirdId, setThirdId] = useState("");
//     const [secondId, setSecondId] = useState("");
//     const [openerId, setOpenerId] = useState("");
//     const [venueId, setVenueId] = useState("");

//     const handleClick = () => {
//         console.log(headlinerId);

//     }

//     useEffect(() => {
//         const headlinerTest = headliner.split(" ");
//         const fourthTest = fourth.split(" ");
//         const thirdTest = third.split(" ");
//         const secondTest = second.split(" ");
//         const openerTest = opener.split(" ");
//         if (users) {
//             users.map((user) => {
//                 if (headlinerTest[0] === user.firstName && headlinerTest[1] === user.lastName) {
//                     setHeadlinerId(user.id);
//                 }
//                 if (fourthTest[0] === user.firstName && fourthTest[1] === user.lastName) {
//                     setFourthId(user.id);
//                 }
//                 if (thirdTest[0] === user.firstName && thirdTest[1] === user.lastName) {
//                     setThirdId(user.id);
//                 }
//                 if (secondTest[0] === user.firstName && secondTest[1] === user.lastName) {
//                     setSecondId(user.id);
//                 }
//                 if (openerTest[0] === user.firstName && openerTest[1] === user.lastName) {
//                     setOpenerId(user.id);
//                 }
//                 if (user.venueName === venue) {
//                     setVenueId(user.id);
//                     console.log("hello")
//                 }
//             })
//         }
//         console.log(venueId);
//     }, [headliner, fourth, third, second, opener, venue])

//     const handleChange = (e) => {
//         if (e.target.id === "headliner") {
//             setHeadliner(e.target.value);   
//         }
//         else if (e.target.id === "fourth") {
//             setFourth(e.target.value);   
//         }
//         else if (e.target.id === "third") {
//             setThird(e.target.value);   
//         }
//         else if (e.target.id === "second") {
//             setSecond(e.target.value);   
//         }
//         else if (e.target.id === "opener") {
//             setOpener(e.target.value);   
//         }
//         else if (e.target.id === "venue") {
//             setVenue(e.target.value);   
//         }

//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const stateObject = {
//             headliner,
//             fourth,
//             third,
//             second,
//             opener,
//             venue,
//             headlinerId,
//             fourthId,
//             thirdId,
//             secondId,
//             openerId,
//             venueId
//         }

//         if (
//             headliner !== "" &&
//             fourth !== "" &&
//             third !== "" &&
//             second !== "" &&
//             opener !== "" &&
//             venue !== ""
//         ) {
//             props.createShow(stateObject);
//         }

//         navigate('/spotters');
//     }

//     useEffect(() => {
//         if (!auth.uid) {
//             navigate("/spotterLogin");
//         }
//       }, []);

//     return (
//         <div>
//             <br/>
//             <br/>
//             <br/>
//             <br/>
//             <br/>
            
//             <div className="container">
//                 <p className="text-center">Promote a Show with up to 5 artists. You are now a ShowSpotter!</p>
//             </div>
//             {/* <button onClick={handleClick}>hi</button> */}
//             <div className="login-container container border">
//             <button onClick={handleClick}> hello </button>
//                 <br/>
//                 <br/>
//                 <Form onSubmit={handleSubmit}>
//                     <h1 className="text-center">Promote A Show</h1>
//                     <br/>
//                     <Form.Group className="mb-3" controlId="headliner" onChange={handleChange} >
//                         <Form.Label>headliner</Form.Label>
//                         <Form.Control type="text" placeholder="Enter headliner"
                        
//                         />

//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="fourth" onChange={handleChange}>
//                         <Form.Label>4th</Form.Label>
//                         <Form.Control type="text" placeholder="Enter 4th" 
                        
//                         />

//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="third" onChange={handleChange}>
//                         <Form.Label>3rd</Form.Label>
//                         <Form.Control type="text" placeholder="Enter 3rd" 
                        
//                         />

//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="second" onChange={handleChange}>
//                         <Form.Label>2nd</Form.Label>
//                         <Form.Control type="text" placeholder="Enter 2nd"
                         
//                         />

//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="opener" onChange={handleChange}>
//                         <Form.Label>Opener</Form.Label>
//                         <Form.Control type="text" placeholder="Enter Opener" 
                       
//                         />
//                     </Form.Group>
//                     <br/>
//                     <br/>
//                     <Form.Group className="mb-3" controlId="venue" onChange={handleChange}>
//                         <Form.Label>Venue</Form.Label>
//                         <Form.Control type="text" placeholder="Enter Venue Name"                         
//                         />
//                     </Form.Group>

//                     <br/>
//                     <br/>
//                     <div className="col text-center">
//                         <Button className="align-center" variant="primary" type="submit">
//                             Promote
//                         </Button>
//                     </div>
//                     <br/>
//                 </Form>
//                 <br/>
//             </div> 
//             <br/>
//             <br/>
//             <br/>
//             <br/>
//             <br/>
 
//         </div>
//     )
// }

// const mapStateToProps = (state) => {

//     return {
//       auth: state.firebase.auth,
//       users: state.firestore.ordered.users
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//       createShow: (show) => dispatch(createShow(show))
//     }
// }

// export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     firestoreConnect([{
//       collection: 'users'
//     }])
//   )(Promote);



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

    const [artists, setArtists] = useState([]);
    const [next, setNext] = useState("");
    const [venue, setVenue] = useState("");
    const [ids, setIds] = useState([]);


    const handleClick = () => {
        console.log(next);
    }

    const handleChange = (e) => {

        users.map((user) => {
            if (user.isVenue && e.target.value === user.venueName && e.target.id === "venue") {
                setVenue({
                    name: e.target.value,
                    id: user.id
                })
            } else {
                setNext(e.target.value);
            }
        })
        console.log(artists);
        console.log(venue);
    }

    const handleAddArtist = (e) => {
        e.preventDefault();
        const newName = next.split(" ")

        users.map((user) => {  
            if (newName[0] === user.firstName && newName[1] === user.lastName) {
                const artistOne = {
                    id: user.id,
                    number: artists.length + 1,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                setArtists((artists) => [...artists, artistOne])
                setIds((ids) => [...ids, artistOne.id])
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newName = next.split(" ")

        users.map((user) => {  

            if (newName[0] === user.firstName && newName[1] === user.lastName) {
                const artistOne = {
                    id: user.id,
                    number: artists.length + 1,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                setArtists((artists) => [...artists, artistOne])
                setIds((ids) => [...ids, artistOne.id])
            }
        })
        props.createShow(artists, venue);
        navigate('/spotters');
    }

    

    useEffect(() => {
        if (!auth.uid) {
            navigate("/spotterLogin");
        }
      });

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            
            <div className="container">
                <p className="text-center">Promote a show with your favorite artists at a venue of your choice</p>
            </div>
            {/* <button onClick={handleClick}>hi</button> */}
            <div className="login-container container border">
                <br/>
                <br/>
                <Form onSubmit={handleAddArtist}>
                    <h1 className="text-center">Promote A Show</h1>
                    <br/>
                    {artists && artists.map((artist) => {
                         
                            return (
                                <div>
                                    <Form.Label>Artsit # {artist.number}</Form.Label>
                                    <div className="mb-3 p-2 border">
                                        {artist.firstName} {artist.lastName}
                                    </div>
                                </div>
                            ) 
                    })}
                    <Form.Group className="mb-3" controlId="second" onChange={handleChange}>
                        <Form.Label>Artsit # {artists.length + 1}</Form.Label>
                        <Form.Control type="text" placeholder="Enter next artist"
                         
                        />

                    </Form.Group>

                    <br/>
                    <br/>
                    <div className="col text-center">
                        <Button className="align-center" variant="primary" type="submit">
                            Add Artist
                        </Button>
                    </div>
                    <br/>
                </Form>
                <br/>
                <br/>
            </div> 
            <br/>
            <div className="login-container container border">
                <br/>
                <br/>
                <Form onSubmit={handleSubmit}>
                    <h1 className="text-center">Name Your Band</h1>
                    <br/>
                    {artists && artists.map((artist) => {
                        return (
                        <div className="container">
                            <p>{artist.number}: {artist.firstName} {artist.lastName}</p>
                            
                        </div>
                        )

                    })}
                    <Form.Group className="mb-3" controlId="venue" onChange={handleChange}>
                        <Form.Label>Venue</Form.Label>
                        <Form.Control type="text" placeholder="Enter Venue"
                         
                        />

                    </Form.Group>

                    <br/>
                    <br/>
                    <div className="col text-center">
                        <Button className="align-center" variant="primary" type="submit">
                            Create Band
                        </Button>
                    </div>
                    <br/>
                </Form>
                <br/>
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
      createShow: (show, venue) => dispatch(createShow(show, venue))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{
      collection: 'users'
    }])
  )(Promote);