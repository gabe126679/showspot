import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState, useEffect, useTransition } from 'react'
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { updateCart } from '../../store/actions/authActions';


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#000",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

const Items = (props) => {

    const { shows, users, auth } = props;

    const [success, setSuccess ] = useState(false)
    const [items, setItems ] = useState([]);
    const [songs, setSongs ] = useState([]);
    const [total, setTotal ] = useState(0);
    const [songTotal, setSongTotal] = useState(0);

    let counter = 0;
    let songCounter = 0;

    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        if (users) {
            
            users.map((user) => {
                if (user.id === auth.uid) {
                    user.cartItems.map((item) => {
                        
                        if (shows) {
                            const newItems = [];
                            shows.map((show) => {
                                if (item === show.id && show.ticketPrice) {
                                    const newPrice = show.ticketPrice.split("$").join("").split(".00").join("");
                                    const newTotal = parseInt(newPrice)
                                    counter += newTotal;
                                    setTotal(counter);
                                    const newArtists = [];
                                    show.artists.map((artist) => {
                                        const newArtist = {
                                            firstName: artist.firstName,
                                            lastName: artist.lastName
                                        }
                                        newArtists.push(newArtist)
                                    })
    
                                    const newShow = 
                                    {
                                        id: show.id,
                                        artists: newArtists, 
                                        venue: show.venueName,
                                        createdAt: show.createdAt,
                                        price: show.ticketPrice,
                                        count: 1
                                    } 
                                    // setItems(items => ([...items, newShow]));
                                    if (!newItems.includes(newShow)) {
                                        newItems.push(newShow);
                                        setItems(newItems);
                                    }
                                    
                                    
                                }
                            })
                        }
                    })
                }
            })
        }
    }, [])

    useEffect(() => {
        if (users) {
            
            users.map((user) => {
                 
                if (user.id === auth.uid) {  
                           
                    user.cartItems.map((item) => { 
                        const newSongs = [];
                        users.map((secondUser) => {
                            if (secondUser.songs) {
                                
                                secondUser.songs.map((track) => {
                                    if (item === track.song) {
                                        
                                        const newPrice = track.price.split("$").join("");
                                        const newTotal = parseInt(newPrice)
                                        songCounter += newTotal;
                                        setSongTotal(songCounter);
                                        
                                        
                                        const newSong = 
                                        {
                                            artistId: user.id,
                                            artist: user.firstName + " " + user.lastName,
                                            title: track.title, 
                                            url: track.song,
                                            price: track.price,
                                            count: 1
                                        } 
                                        
                                        
                                        if (!newSongs.includes(newSong.song)) {
                                            newSongs.push(newSong.song);
                                            setSongs(newSongs);
                                        }
                                        
                                    }
                                })
                            }
                        })        
                    })
                    
                }
            })
            
        }
    }, [])


    

    const handleSubmit = async (e) => {
        e.preventDefault()



        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })



        if(!error) {
            try {
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: total,
                    id
                })

                if(response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true)
                }

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }

    }


    const handleIncrease = (e) => {
        e.preventDefault()
        items.map((item) => {
            if (item.id === e.target.id ) {
                const newPrice = item.price.split("$").join("").split(".00").join("");

                const newTotal = parseInt(newPrice)
                setTotal(total + newTotal);
                item.count += 1;
            }
        })
        songs.map((song) => {
            if (song.artistId === e.target.id && songTotal >= 0) {
                const newPrice = song.price.split("$").join("");

                const newTotal = parseInt(newPrice)
                setSongTotal(songTotal + newTotal);
                song.count += 1;
            }
        })
        console.log(songs);
    }

    const handleDecrease = (e) => {
        e.preventDefault()
        items.map((item) => {
            const newPrice = item.price.split("$").join("").split(".00").join("");
            if (item.id === e.target.id && total >= newPrice) {

                const newTotal = parseInt(newPrice)
                counter -= newTotal;
                setTotal(total - newTotal);
                item.count -= 1;
            }
        })
        songs.map((song) => {
            const newPrice = song.price.split("$").join("");
            if (song.artistId === e.target.id && songTotal >= newPrice) {

                const newTotal = parseInt(newPrice)
                songCounter -= newTotal;
                setSongTotal(songTotal - newTotal);
                song.count -= 1;
            }
        })
    }

    const handleDelete = (e) => {
        e.preventDefault();

        items.map((item) => {
            if (item.id === e.target.id) {
                props.updateCart(item.id, item.ticketPrice);
            }
        })

        const newItems = items.filter((item) => {
            if (item.id === e.target.id) {
                const newPrice = item.ticketPrice.split("$").join("").split(".").join("");
                const newTotal = parseInt(newPrice)
                setTotal(total - newTotal);

            }
            return item.id !== e.target.id;
        })
        setItems(newItems);
        songs.map((song) => {
            if (song.artistId === e.target.id) {
                props.updateCart(song.song, song.price);
            }
        })

        const newSongs = songs.filter((song) => {
            if (song.artistId === e.target.id) {
                const newPrice = song.price.split("$").join("");
                const newTotal = parseInt(newPrice)
                setSongTotal(songTotal - newTotal);

            }
            return song.artistId !== e.target.id;
        })
        setSongs(newSongs);
    }

    const clientString = "$" + total + ".00";
    const clientSong = "$" + songTotal + ".00";
    const grandTotal = total + songTotal

    if (items) {
    return (
        <>
        {!success ? 
        <div className="container">
            <br/>
            <div className="center">
                <div className="container border bg-light">
                    <div className="category-tag container center">
                        <h4 className="category-text black-text"> Shows: </h4>
                    </div>
                        {items && items.map((item) => {
                            return <div className="container">
                            <div className="card black z-depth-0 project-sumarry">
                                <div className="card-content white-text text-darken-3">
                                <span className="card-title">{item.id}</span>
                                <br/>
                                <br/>
                                {item.artists.map((artist) => {
                                    return (
                                        <div>
                                            <p className="text-center">{artist.firstName} {artist.lastName}</p>
                                            
                                        </div>
                                    )

                                })}

                                <p> @: {item.venue}</p>
                                <br/>
                                </div>
                            </div>           
                            
                            <button className="btn btn-two" id={item.id} onClick={handleIncrease}>increase quantity</button>
                            <button className="btn btn-two" id={item.id} onClick={handleDecrease}>decrease quantity</button>
                            <button className="btn btn-three" id={item.id} onClick={handleDelete}>X</button>
                            <p>{item.count}</p>
                            <br/>
                            <br/>
                            <div className="category-tag container text-center">
                                <h4 className="category-text black-text"> Total: {clientString}</h4>
                            </div>
                            </div>
                            
                        })}
                    </div>
                    <br/>
                    <div className="container border bg-light">
                    <div className="category-tag container center">
                        <h4 className="category-text black-text"> Songs: </h4>
                    </div>
                        {songs && songs.map((song) => {
                            return <div className="container">
                            <div className="card black z-depth-0 project-sumarry">
                                <div className="card-content white-text text-darken-3">
                                <span className="card-title">{song.artistId}</span>
                                <br/>                                <br/>

                                <div>
                                    <p className="text-center">{song.artist}</p>
                                    
                                </div>

                                <p> {song.title}</p>

                                <div>
                                    <p className="text-center">{song.price}</p>
                                    
                                </div>
                                <br/>
                                </div>
                            </div>           
                            
                            <button className="btn btn-two" id={song.artistId} onClick={handleIncrease}>increase quantity</button>
                            <button className="btn btn-two" id={song.artistId} onClick={handleDecrease}>decrease quantity</button>
                            <button className="btn btn-three" id={song.artistId} onClick={handleDelete}>X</button>
                            <p>{song.count}</p>
                            <br/>
                            <br/>
                            <div className="category-tag container text-center">
                                <h4 className="category-text black-text"> Total: {clientSong}</h4>
                            </div>
                            </div>
                            
                        })}
                    </div>
                    <br/>
                    <div className="category-tag container text-center">
                        <h4 className="category-text black-text"> Grand Total: ${grandTotal}.00</h4>
                    </div>
                    <br/>
                </div>
                
                {/* <button onClick={handleClick}>hello</button> */}
            <form onSubmit={handleSubmit}>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <p>First Name:</p>
                        <input type="text" />
                    </div>
                    <br/>
                    <div className="FormRow">
                        <p>Last Name:</p>
                        <input type="text" />
                    </div>
                    <div className="FormRow">
                        <p>Email:</p>
                        <input type="text" />
                    </div>
                    <br/>
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS}/>
                        <br/>
                    </div>
                </fieldset>
                <button >Pay</button>
            </form>
        </div>
        :
       <div>
           <h2>Your Purchase Was Successful</h2>
       </div> 
        }

        </>
    )
    }
}

const mapStateToProps = (state) => {

    return {
        shows: state.firestore.ordered.shows,
        auth: state.firebase.auth,
        users: state.firestore.ordered.users,
    }
    
}

const mapDispatchToProps = dispatch => {

    return {
        updateCart: (item, price) => dispatch(updateCart(item, price))
    }
}
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
    { collection: 'shows'},
    { collection: 'users'}
    ])
)(Items);