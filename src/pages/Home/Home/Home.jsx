import { Helmet } from "react-helmet-async";
import Testimonials from "../../Shared/Testimonials/Testimonials";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularMenu from "../PopularMenu/PopularMenu";
import Featured from "./Featured/Featured";

const Home = () => {
	return (
		<div>
			<Helmet>

			<title>Bistro | Home</title>

			</Helmet>

			<Banner></Banner>
			<Category></Category>
			<PopularMenu></PopularMenu>
			<Featured></Featured>
			<Testimonials></Testimonials>
		</div>
	);
};

export default Home;