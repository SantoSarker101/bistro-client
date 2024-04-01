import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../../assets/home/featured.jpg'
import './Featured.css';

const Featured = () => {
	return (
		<div className="featured-item bg-fixed py-8 my-20">
			<SectionTitle subHeading='---Check it out---' heading='FROM OUR MENU'></SectionTitle>

			<div className="md:flex justify-center items-center py-9 px-16 bg-slate-500 bg-opacity-40">
				<div>
					<img src={featuredImg} alt="" />
				</div>

				<div className="md:ml-10 text-white">

					<p>March 20, 2023</p>

					<p>WHERE CAN I GET SOME?</p>

					<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis commodi magni eveniet adipisci modi sunt laudantium, blanditiis officia cupiditate obcaecati aliquam nesciunt nisi ratione sint incidunt eius distinctio, dolor rerum dolore voluptates nam sequi! Debitis eligendi quidem molestiae quam exercitationem minus eos voluptatum ex totam, sunt quos quod tempore voluptates.</p>

					<button className="btn btn-outline border-0 border-b-4 mt-4 text-white">Read more</button>

				</div>
			</div>

		</div>

	);
};

export default Featured;