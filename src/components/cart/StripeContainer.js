import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import Items from "./Items"

const PUBLIC_KEY = "pk_test_51KKltgFxVZy3GzJLkD3qdblg4JHaGYedZsHq7KNCctRB04mWxJVi5ZrRKmu0ShXe2cIcA6NTtIOE51ht6V974QIZ00H1hiCCUS"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

function StripeContainer() {
	return (
		<div className="container white">
			<Elements stripe={stripeTestPromise}>
				<Items />
			</Elements>
		</div>
	)
}

export default StripeContainer;