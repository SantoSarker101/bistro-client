import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
	const { user, logOut } = useContext(AuthContext);
	const [cart] = useCart();
	const [isAdmin] = useAdmin();

	const handleLogOut = () => {
		logOut()
			.then(() => {})
			.catch((error) => console.log(error));
	};

	const navOptions = (
		<>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/menu">Our Menu</Link>
			</li>
			<li>
				<Link to="/order/salad">Order Food</Link>
			</li>

			<li>
				<Link to={ isAdmin ? '/dashboard/adminhome' : '/dashboard/userhome' }>Dashboard</Link>
			</li>

			<li>
				<Link to="/dashboard/mycart">
					<button className="btn">
						<FaShoppingCart />
						<div className="badge badge-secondary">
							+{cart?.length || 0}
						</div>
					</button>
				</Link>
			</li>

			{user ? (
				<>
					<li>{user?.displayName}</li>
					<li>
						<button
							onClick={handleLogOut}
							className="btn btn-ghost"
						>
							Logout
						</button>
					</li>
				</>
			) : (
				<>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/signup">Sign Up</Link>
					</li>
				</>
			)}
		</>
	);

	return (
		<div>
			<div className="navbar bg-black text-white max-w-screen-xl font-extrabold fixed z-10 opacity-30">
				<div className="navbar-start">
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost lg:hidden"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</div>

						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
						>
							{navOptions}
						</ul>
					</div>

					<Link to="/" className="btn btn-ghost text-xl">
						Bistro Boss
					</Link>
				</div>

				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-1">{navOptions}</ul>
				</div>

				<div className="navbar-end">
					<a className="btn">Button</a>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
