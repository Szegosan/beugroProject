import { Link } from "react-router";
import Logo from "../assets/pictures/Telekom.png"

const NotFound = () => {
	return (
		<div
			style={{
				display: "Flex",
				flexDirection: "column",
				alignItems: "center",
				minHeight: "calc(100vh - 110px - 25px)"
			}}
		>
			<h1 style={{ fontSize: "15em", color: "#e20074", padding: 0, margin: 0 }}>Oops!</h1>
			<h2>404 - Page Not Found</h2>
			<p>The page you are looking might have been removed, had it's name changed or is temporarily unavailable</p>
			<Link to="/">Go back to Homepage</Link>
			<hr />
			<img src={Logo} alt="Telekom logo" style={{ width: "300px", margin: "20px 0", background: "white" }} />
		</div>
	);
};

export default NotFound;
