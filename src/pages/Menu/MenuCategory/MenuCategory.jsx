import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({items,title,img}) => {
	return (
		<div className="p-8">
			{ title && <Cover img={img} title={title}></Cover> }
			<div className="grid md:grid-cols-2 gap-12 my-16">
				{
					items.map(item=> <MenuItem key={item._id} item={item}></MenuItem>)
				}
			</div>

			{
				title && <Link to={`/order/${title}`}><button className="btn btn-outline border-0 border-b-4 mt-4 text-center mx-auto flex">ORDER YOUR FAVOURITE FOOD</button></Link>
			}

		</div>
	);
};

export default MenuCategory;