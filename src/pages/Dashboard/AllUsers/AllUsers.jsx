import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllUsers = () => {
	// const token = localStorage.getItem('access-token')
	const [axiosSecure] = useAxiosSecure();
	const {data: users = [], refetch} = useQuery({
		queryKey:['users'],
		queryFn: async() =>{
			const res = await axiosSecure('/users')

			return res.data;
		}
	})

	const handleMakeAdmin = user => {
		fetch(`http://localhost:5000/users/admin/${user._id}`,{
			method: 'PATCH'
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if(data.modifiedCount){
				refetch()
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: `${user.name} is Admin Now!`,
					showConfirmButton: false,
					timer: 1500
				});
			}
		})
	}

	const handleDelete = (user) => {
		console.log(user);
	}
	return (
		<div className="w-full">

		<Helmet>

		<title>Bistro | All Users</title>

		</Helmet>


		<h3 className="text-3xl font-semibold my-4">Total Users: {users.length}</h3>



		<div className="overflow-x-auto">
		<table className="table table-zebra">
			{/* head */}
			<thead>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Email</th>
				<th>Role</th>
				<th>Action</th>
			</tr>
			</thead>
			<tbody>

			{
				users.map((user,index) => <tr key={user._id}>
					<th>{index + 1}</th>
					<td>{user?.name}</td>
					<td>{user?.email}</td>
					<td>
					<button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-orange-400 text-white">{ user.role === 'admin' ? 'admin' : <FaUserShield />}</button>
					</td>
					<td><button onClick={() => handleDelete(user)} className="btn btn-ghost bg-red-600 text-white"><FaTrashAlt /></button></td>
				</tr>)
			}

			</tbody>
		</table>
		</div>

		</div>
	);
};

export default AllUsers;