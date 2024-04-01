import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import './CheckoutForm.css';

const CheckoutForm = ({ cart, price }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [cardError, setCardError] = useState("");
	const [axiosSecure] = useAxiosSecure();
	const [clientSecret, setClientSecret] = useState("");
	const { user } = useAuth();
	const [processing, setProcessing] = useState(false);
	const [transactionId, setTransactionId] = useState("");

	useEffect(() => {
		if(price > 0){
			axiosSecure.post("/create-payment-intent", { price }).then((res) => {
				console.log(res.data.clientSecret);
				setClientSecret(res.data.clientSecret);
			});
		}
	}, [price, axiosSecure]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);
		if (card === null) {
			return;
		}
		// console.log('card',card);
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			console.log("error", error);
			setCardError(error.message);
		} else {
			setCardError("");
			// console.log("Payment Method", paymentMethod);
		}

		setProcessing(true);

		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						name: user?.displayName || "Anonymous",
						email: user?.email || "UnKnown",
					},
				},
			});

		if (confirmError) {
			console.log(confirmError);
		}

		console.log("Payment Intent", paymentIntent);

		setProcessing(false);

		if (paymentIntent.status === "succeeded") {
			setTransactionId(paymentIntent.id);

			// save payment information to the server
			const payment = {
				email: user?.email,
				transactionId: paymentIntent.id,
				price,
				date: new Date(),
				quantity: cart.length,
				cartItems: cart.map((item) => item._id),
				menuItems: cart.map(item => item.menuItemId),
				status: 'Service Pending',
				itemNames: cart.map((item) => item?.name),
			};

			axiosSecure.post("/payments", payment).then((res) => {
				console.log(res.data);
				if (res.data.insertedId) {
					Swal.fire({
						title: "Payment Successfull",
						width: 600,
						padding: "3em",
						color: "#716add",
						background: "#fff url(/images/trees.png)",
						backdrop: `
							  rgba(0,0,123,0.4)
							  url("/images/nyan-cat.gif")
							  left top
							  no-repeat
							`,
					});
				}
			});
		}

		// .then(function (result) {
		// 	// Handle result.error or result.paymentIntent
		// });
	};

	return (
		<>
			<form className="w-2/3 m-8" onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: "16px",
								color: "#424770",
								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#9e2146",
							},
						},
					}}
				/>

				<button
					type="submit"
					disabled={!stripe || !clientSecret || processing}
					className="btn mt-4 btn-primary btn-sm"
				>
					Pay
				</button>
			</form>

			{cardError && <p className="text-red-600 ml-8">{cardError}</p>}

			{transactionId && (
				<p className="text-green-600 font-bold ml-8">
					Transaction complete with TransactionId: {transactionId}
				</p>
			)}
		</>
	);
};

export default CheckoutForm;
