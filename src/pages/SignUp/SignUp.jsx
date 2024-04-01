import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";


const SignUp = () => {
	const navigate = useNavigate();

	const { register,handleSubmit,reset,formState: { errors }} = useForm()

	const {createUser,updateUserProfile} = useContext(AuthContext)

	const onSubmit = (data) => {
		console.log(data)

		createUser(data.email, data.password)
		.then(result => {
			const loggedUser = result.user;
			console.log(loggedUser);

			updateUserProfile(data.name, data.photoURL)
			.then(() => {
				console.log('User Profile Info is Updated');

				const saveUser = {name: data.name, email: data.email}

				fetch('http://localhost:5000/users',{
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify(saveUser)
				})
				.then(res => res.json())
				.then(data => {
					if(data.insertedId){

					reset();

					Swal.fire({
					position: "top-end",
					icon: "success",
					title: "You have Created Account",
					showConfirmButton: false,
					timer: 1500
				});
				navigate('/');

					}
				})


			})
			.catch(error => console.log(error))
		})
	}
	// console.log(watch("example"))


	// const handleLogin = (event) => {
	// 	event.preventDefault();
	// 	const form = event.target;
	// 	const name = form.name.value;
	// 	const email = form.email.value;
	// 	const password = form.password.value;
	// 	const captcha = form.captcha.value;
	// 	console.log(name,email,password,captcha);

	// 	createUser(email,password)
	// 	.then(result => {
	// 		const user = result.user;
	// 		console.log(user);
	// 	})
	// }

	return (
		<>

		<Helmet>

		<title>Bistro | Sign Up</title>

		</Helmet>

<div className="hero min-h-screen bg-base-200">

<div className="hero-content flex-col md:flex-row md:w-1/2">

	<div className="text-center lg:text-left">

	<h1 className="text-5xl font-bold">Sign Up now!</h1>

	<p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
	</div>



	<div className="card shrink-0 w-full md:w-1/2 max-w-sm shadow-2xl bg-base-100">


	<form onSubmit={handleSubmit(onSubmit)} className="card-body">

		<div className="form-control">

		<label className="label">
			<span className="label-text">Name</span>
		</label>

		<input type="text" {...register("name",{ required: true })}
		name="name" placeholder="Name" className="input input-bordered" />

		{errors.name && <span className="text-red-500">Name is required</span>}

		</div>



		<div className="form-control">

		<label className="label">
			<span className="label-text">Photo URL</span>
		</label>

		<input type="text" {...register("photoURL",{ required: true })}
		placeholder="Photo URL" className="input input-bordered" />

		{errors.photoURL && <span className="text-red-500">photoURL is required</span>}

		</div>



		<div className="form-control">

		<label className="label">
			<span className="label-text">Email</span>
		</label>

		<input type="email"
		name="email" {...register("email",{ required: true })} placeholder="email" className="input input-bordered" />

		{errors.email && <span className="text-red-500">Email is required</span>}

		</div>

		<div className="form-control">

		<label className="label">
			<span className="label-text">Password</span>
		</label>

		<input type="password"
		name='password' {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /[A-Za-z0-9]/ })} placeholder="Password" className="input input-bordered" />

		{errors.password?.type === "minLength" && (
				<p className="text-red-500">Password must be 6 characters</p>
			)}
		{errors.password?.type === "maxLength" && (
				<p className="text-red-500">Password must be less than 20 characters</p>
			)}
		{errors.password?.type === "pattern" && (
				<p className="text-red-500">Password must have one upper case, one number and one lower case character</p>
			)}

		<label className="label">
			<a href="#" className="label-text-alt link link-hover">Forgot password?</a>
		</label>

		</div>



		{/* <div className="form-control">

		<label className="label">
			<LoadCanvasTemplate />
		</label>

		<input type="text"
		name='captcha' ref={captchaRef} placeholder="Type The Captcha Above" className="input input-bordered" required />

		<button onClick={handleValidateCaptcha} className="btn btn-outline btn-secondary btn-xs mt-2">Validate</button>


		</div> */}

		<div className="form-control mt-6">

		<input className="btn btn-primary font-extrabold" type="submit" value='Sign Up' />
		</div>

	</form>

	<p><small>Already have an Account? <Link to='/login'>Go to Login</Link></small></p>


	</div>


</div>
</div>

		</>
	);
};

export default SignUp;