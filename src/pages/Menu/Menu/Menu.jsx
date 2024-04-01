import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/menu-bg.png'
import dessertImg from '../../../assets/menu/dessert-bg.png'
import pizzaImg from '../../../assets/menu/pizza-bg.png'
import saladImg from '../../../assets/menu/salad-bg.png'
import soupImg from '../../../assets/menu/soup-bg.png'
import PopularMenu from '../../Home/PopularMenu/PopularMenu';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
	const [menu] = useMenu();
	const desserts = menu.filter(item => item.category === 'dessert')
	const soup = menu.filter(item => item.category === 'soup')
	const salad = menu.filter(item => item.category === 'salad')
	const pizza = menu.filter(item => item.category === 'pizza')
	const offered = menu.filter(item => item.category === 'offered')
	return (
		<div>

		<Helmet>

			<title>Bistro | Menu</title>

		</Helmet>

		{/* Main cover */}
		<Cover img={menuImg} title='Our Menu'></Cover>

		<SectionTitle subHeading='---Dont miss---' heading='TODAYS OFFER'></SectionTitle>

		{/* Offered menu items */}
		<MenuCategory items={offered}></MenuCategory>

		<MenuCategory items={desserts} title='dessert' img={dessertImg}></MenuCategory>

		<MenuCategory items={pizza} title='pizza' img={pizzaImg}></MenuCategory>

		<MenuCategory items={salad} title='salad' img={saladImg}></MenuCategory>

		<MenuCategory items={soup} title='soup' img={soupImg}></MenuCategory>


		</div>
	);
};

export default Menu;