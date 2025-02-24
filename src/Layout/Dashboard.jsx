import { NavLink, Outlet } from 'react-router-dom';
import { FaBook, FaShoppingCart } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import useCart from '../hooks/useCart';
import { FaUtensils } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
	const [cart] = useCart();

	// TODO: load data from the server to have dynamic is Admin Based in Data
	// const isAdmin = true;
	const [isAdmin,isAdminLoading] = useAdmin();
	console.log(isAdmin);
	return (
		<div className="drawer lg:drawer-open">

		<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

		<div className="drawer-content flex flex-col items-center justify-center ">


			<Outlet></Outlet>


			<label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

		</div>

		<div className="drawer-side bg-[#D1A054]">

			<label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

			<ul className="menu p-4 w-80 min-h-full">
			{/* Sidebar content here */}

			{
				isAdmin ? <>

			<li><NavLink to='/dashboard/adminhome'><FaHome /> Admin Home</NavLink></li>
			<li><NavLink to='/dashboard/addItem'><FaUtensils /> Add an Item</NavLink></li>
			<li><NavLink to='/dashboard/manageitems'><FaWallet /> Manage Items</NavLink></li>
			<li><NavLink to='/dashboard/history'><FaBook /> Manage Bookings</NavLink></li>
			<li><NavLink to='/dashboard/allusers'><FaUsers /> All Users</NavLink></li>


				</> : <>
					<li><NavLink to='/dashboard/userhome'><FaHome /> User Home</NavLink></li>
					<li><NavLink to='/dashboard/reservations'><FaCalendarAlt /> Reservations</NavLink></li>
					<li><NavLink to='/dashboard/payment'><FaWallet /> Payment History</NavLink></li>
					<li><NavLink to='/dashboard/mycart'><FaShoppingCart /> My Cart <span className="badge badge-secondary">+{cart?.length || 0}</span></NavLink></li>
				</>
			}

			<div className="divider"></div>

			<li><NavLink to='/'><FaHome />Home</NavLink></li>
			<li><NavLink to='/menu'>Our Menu</NavLink></li>
			<li><NavLink to='/order/salad'>Order Food</NavLink></li>

			</ul>

		</div>


		</div>
	);
};

export default Dashboard;