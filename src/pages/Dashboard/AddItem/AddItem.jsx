import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token

const AddItem = () => {

	const [axiosSecure] = useAxiosSecure();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

	const onSubmit = (data) => {
		// console.log(data);
		const formData = new FormData();
		formData.append('image', data.image[0])

		fetch(img_hosting_url,{
			method: "POST",
			body: formData
		})
		.then(res => res.json())
		.then(imgResponse => {
			console.log(imgResponse);
			if(imgResponse.success){
				const imgURL = imgResponse.data.display_url
				console.log(data, imgURL);
				const {name,price,category,recipe} = data;
				const newItem = {name,price: parseFloat(price),category,recipe, image: imgURL};
				console.log(newItem);

				axiosSecure.post('/menu', newItem)
				.then(data => {
					console.log('after posting new menu Item', data.data);
					if(data.data.insertedId){
						Swal.fire({
							position: "top-end",
							icon: "success",
							title: "Item Added Successfully",
							showConfirmButton: false,
							timer: 1500
						});
					}
				})
			}
		})
	};
	console.log(errors);
	console.log(img_hosting_token);


	return (
		<div className="w-full px-10">
			<Helmet>
				<title>Bistro | Add Item</title>
			</Helmet>

			<SectionTitle
				subHeading="---Whats New---"
				heading="Add an Item"
			></SectionTitle>

			<form onSubmit={handleSubmit(onSubmit)}>
				<label className="form-control w-full ">
					<div className="label">
						<span className="label-text font-semibold">
							Recipe Name *
						</span>
					</div>

					<input
						type="text"
						placeholder="Write Recipe Name"
						{...register("name", { required: true, maxLength: 90 })}
						className="input input-bordered w-full "
					/>
				</label>

				<div className="flex my-4">
					<label className="form-control w-full ">
						<div className="label">
							<span className="label-text">Category *</span>
						</div>

						<select defaultValue='Pick One'
							{...register("category", { required: true })}
							className="select select-bordered"
						>
							<option disabled selected>
								Pick One
							</option>
							<option value='Pizza'>Pizza</option>
							<option value='Soup'>Soup</option>
							<option value='Salad'>Salad</option>
							<option value='Drinks'>Drinks</option>
							<option value='Dessert'>Dessert</option>
						</select>
					</label>

					<label className="form-control w-full ml-4">
						<div className="label">
							<span className="label-text font-semibold">
								Price *
							</span>
						</div>

						<input
							type="number"
							placeholder="Price"
							{...register("price", { required: true })}
							className="input input-bordered w-full "
						/>
					</label>
				</div>

				<label className="form-control">
					<div className="label">
						<span className="label-text">Recipe Details</span>
					</div>
					<textarea
						className="textarea textarea-bordered h-24"
						placeholder="Write Your Recipe Details"
						{...register("recipe", { required: true })}
					></textarea>
				</label>

				<label className="form-control w-full my-4">
					<div className="label">
						<span className="label-text">Item Image*</span>
					</div>

					<input
						type="file"
						{...register("image", { required: true })}
						className="file-input file-input-bordered w-full "
					/>
				</label>

				<input
					className="btn btn-sm my-4 bg-sky-900 text-white"
					type="submit"
					value="Add Item"
				/>
			</form>
		</div>
	);
};

export default AddItem;
