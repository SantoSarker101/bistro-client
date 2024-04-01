import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
	const [disabled, setDesabled] = useState(true);
	const {signIn} = useContext(AuthContext);

	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	useEffect(() => {
		loadCaptchaEnginge(6);
	},[])

	const handleLogin = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		const captcha = form.captcha.value;
		console.log(email,password,captcha);

		signIn(email,password)
		.then(result => {
			const user = result.user;
			console.log(user);
			Swal.fire({
				title: "User Login Successful",
				showClass: {
				popup: `
					animate__animated
					animate__fadeInUp
					animate__faster
				  `
				},
				hideClass: {
				popup: `
					animate__animated
					animate__fadeOutDown
					animate__faster
				  `
				}
			});

			navigate(from, {replace: true});
		})


	}

	const handleValidateCaptcha = (e) => {
		const user_captcha_value = e.target.value;
		console.log(user_captcha_value);
		if(validateCaptcha(user_captcha_value)){
			setDesabled(false)
		}
		else{
			setDesabled(true)
		}
	}

	return (
		<>

		<Helmet>

		<title>Bistro | Login</title>

		</Helmet>


<div className="hero min-h-screen bg-base-200">

<div className="hero-content flex-col md:flex-row md:w-1/2">

	<div className="text-center lg:text-left">

	<h1 className="text-5xl font-bold">Login now!</h1>

	<p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
	</div>



	<div className="card shrink-0 w-full md:w-1/2 max-w-sm shadow-2xl bg-base-100">


	<form onSubmit={handleLogin} className="card-body">

		<div className="form-control">

		<label className="label">
			<span className="label-text">Email</span>
		</label>

		<input type="email"
		name="email" placeholder="email" className="input input-bordered" />

		</div>

		<div className="form-control">

		<label className="label">
			<span className="label-text">Password</span>
		</label>

		<input type="password"
		name='password' placeholder="password" className="input input-bordered" />

		<label className="label">
			<a href="#" className="label-text-alt link link-hover">Forgot password?</a>
		</label>

		</div>



		<div className="form-control">

		<label className="label">
			<LoadCanvasTemplate />
		</label>

		<input onBlur={handleValidateCaptcha} type="text"
		name='captcha' placeholder="Type The Captcha Above" className="input input-bordered" required />



		</div>

		{/* TODO: Make button desabled for captcha */}
		<div className="form-control mt-6">

		<input disabled={false} className="btn btn-primary font-extrabold" type="submit" value='Login' />
		</div>

	</form>

	<p><small>New Here? <Link to='/signup'>Create an Account</Link></small></p>

	<SocialLogin></SocialLogin>


	</div>


</div>
</div>

		</>
	);
};

export default Login;