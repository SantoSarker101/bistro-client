import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItems = () => {
	const [menu, , refetch] = useMenu();
	const [axiosSecure] = useAxiosSecure();

	const handleDelete = (item) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {

				axiosSecure.delete(`/menu/${item._id}`)
				.then(res => {
					console.log('Deleted Res', res.data);
					if (res.data.deletedCount > 0) {
						refetch();
						Swal.fire({
							title: "Deleted!",
							text: "Your Item has been deleted.",
							icon: "success",
						});
					}

				})

			}
		});
	};

	return (
		<div className="w-full">
			<Helmet>
				<title>Bistro | Manage All Items</title>
			</Helmet>

			<SectionTitle
				subHeading="---Hurry Up!---"
				heading="MANAGE ALL ITEMS"
			></SectionTitle>

			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th>#</th>
							<th>ITEM IMAGE</th>
							<th>ITEM NAME</th>
							<th>PRICE</th>
							<th>ACTION</th>
							<th>ACTION</th>
						</tr>
					</thead>

					<tbody>
						{menu.map((item, index) => (
							<tr key={item._id}>
								<td>{index + 1}</td>

								<td>
									<div className="flex items-center gap-3">
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<img
													src={item.image}
													alt="Avatar Tailwind CSS Component"
												/>
											</div>
										</div>
									</div>
								</td>

								<td>{item.name}</td>
								<td>${item.price}</td>

								<td>
									<button className="btn btn-ghost btn-xs">
										Update
									</button>
								</td>

								<td>
									<button
										onClick={() => handleDelete(item)}
										className="btn btn-ghost bg-red-600 text-white"
									>
										<FaTrashAlt />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManageItems;
