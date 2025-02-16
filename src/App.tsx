import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Home from "./pages/Home";
import PremiumCustomers from "./pages/PremiumCustomers/PremiumCustomers";
import Tools from "./pages/ToolAdd/Tools";
import ServiceClass from "./pages/ServiceClass/ServiceClass";
import NotFound from "./pages/NotFound";


const App: React.FC = () => {
	return (
		<Router>
			<div style={{ 
				background: "linear-gradient(to bottom, #ffffff, #e20074)",
    			fontFamily: "Roboto, sans-serif",
   				minHeight: "100vh",
    			overflow: "hidden", }}>
				<Header />
				<div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Premium_Customers" element={<PremiumCustomers />} />
						<Route path="/Tools" element={<Tools />} />
						<Route path="/Service_Class" element={<ServiceClass />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
