import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const MyCart = () => {
	const [cart, refetch] = useCart();
	console.log(cart);

	// How does reduce work!!!
	const total = cart.reduce((sum, item) => item.price + sum, 0)

	// const total = cart.reduce((sum, item) => {
	// 	return item.price + sum
	// }, 0)


	const handleDelete = item => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`http://localhost:5000/carts/${item._id}`,{
					method: 'DELETE'
				})
				.then(res => res.json())
				.then(data => {
					if(data.deletedCount > 0){
						refetch();
					Swal.fire({
						title: "Deleted!",
						text: "Your Item has been deleted.",
						icon: "success"
					});
					}
				})

		}
		});
	}

	return (
		<div className="w-full">
			<SectionTitle subHeading='---My Cart---' heading='WANNA ADD MORE?'></SectionTitle>

			<Helmet>

				<title>Bistro | My-Cart</title>

			</Helmet>


			<div className="uppercase flex justify-evenly h-12 font-semibold">
				<h3 className="text-2xl">Total Items: {cart.length}</h3>
				<h3 className="text-2xl">Total Price: $ {total}</h3>
				<Link to='/dashboard/payment'><button className="btn btn-xs btn-warning">Pay</button></Link>
			</div>




			<div className="overflow-x-auto">


			<table className="table">

				{/* head */}
				<thead>
				<tr>

					<th>
						#
					</th>
					<th>Item Image</th>
					<th>Item Name</th>
					<th>Price</th>
					<th>Action</th>
				</tr>

				</thead>


				<tbody>

				{
					cart.map((item,index) => <tr key={item._id}>

						<th>
							{1 + index}
						</th>
						<td>
							<div className="avatar">

							<div className="mask mask-squircle w-16 h-16">
								<img src={item.image} alt="Avatar Tailwind CSS Component" />
							</div>

							</div>
						</td>

						<td>
							{item.name}
						</td>

						<td className="text-end">$ {item.price}</td>

						<th>
						<button onClick={() => handleDelete(item)} className="btn btn-ghost bg-red-600 text-white"><FaTrashAlt /></button>
						</th>
					</tr>)
				}

				</tbody>

			</table>


			</div>

		</div>
	);
};

export default MyCart;