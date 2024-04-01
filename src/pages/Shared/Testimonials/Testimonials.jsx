import SectionTitle from "../../../components/SectionTitle/SectionTitle";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'


const Testimonials = () => {
	const [reviews, setReviews] = useState([]);

	useEffect(() =>{
		fetch('http://localhost:5000/reviews')
		.then(res => res.json())
		.then(data => {
			setReviews(data);
		})
	},[])
	return (
		<section className="my-20">

		<SectionTitle subHeading='---What Our Clients Say---' heading='TESTIMONIALS'></SectionTitle>


		<Swiper  navigation={true} modules={[Navigation]} className="mySwiper">

		{
			reviews.map(review => <SwiperSlide key={review._id} >
				<div className="my-4 md:my-12 mx-16 flex flex-col items-center text-justify">
					<p>{review.details}</p>
					<h3 className="text-2xl text-orange-500 py-4 md:py-8">{review.name}</h3>

					<Rating
					style={{ maxWidth: 180 }}
					value={review.rating}
					readOnly
					/>
				</div>
			</SwiperSlide>)
		}

      </Swiper>

		</section>
	);
};

export default Testimonials;