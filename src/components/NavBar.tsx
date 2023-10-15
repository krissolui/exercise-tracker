import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav className="bg-gray-800 text-white">
			<Link to="/" className="">
				Exercise Tracker
			</Link>
			<div className="collapse"></div>
			<ul className="">
				<li key="exercises" className="">
					<Link to="/" className="">
						Exercises
					</Link>
				</li>
				<li key="create" className="">
					<Link to="/create" className="">
						Create Exercise
					</Link>
				</li>
				<li key="user" className="">
					<Link to="/user" className="">
						Create User
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
