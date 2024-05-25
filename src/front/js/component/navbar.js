import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const Navbar = () => {
	const navigate = useNavigate()
	const token = localStorage.getItem("access-token")

	const handleLogOut = () => {
		localStorage.removeItem("access-token")
		navigate("/")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto d-flex">
					<Link className="me-3" to="/profile">
						<button className="btn btn-success">Profile</button>
					</Link>
					{!token ? 
					<div>
						<Link to="/login">
							<button className="btn btn-primary me-2">Login</button>
						</Link> 
						<Link to="/register">
							<button className="btn btn-primary">Register</button>
						</Link>
					</div>
					: <button onClick={() => handleLogOut()} className="btn btn-primary">LogOut</button>}
				</div>
			</div>
		</nav>
	);
};
