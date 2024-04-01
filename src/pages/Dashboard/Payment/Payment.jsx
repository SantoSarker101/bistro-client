import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../../hooks/useCart";

// TODO: Provide publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
	const [cart] = useCart();
	const total = cart.reduce((sum, item) => sum + item.price, 0);
	const price = parseFloat(total.toFixed(2));
	return (
		<div className="w-full">
			<SectionTitle
				subHeading="---Please Process---"
				heading="Payment"
			></SectionTitle>

			<h2 className="text-3xl">Teka o Teka</h2>

			<Elements stripe={stripePromise}>
				<CheckoutForm price={price} cart={cart}></CheckoutForm>
			</Elements>
		</div>
	);
};

export default Payment;
