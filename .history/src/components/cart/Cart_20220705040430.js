import React from 'react';
import StripeContainer from "./StripeContainer";
import Footer from "../layout/Footer";
import { useParams } from 'react-router-dom';



function Cart() {

  const {id} = useParams();

  return (
    <div>
      <br/>
      <br/> 
      <br/> 
      <br/> 
      <StripeContainer user={id} />
      <br/>
      <br/>
      <br/>    
      <Footer />
    </div>

  )
}

export default Cart;