import React from "react";
import Tlogo from "../assets/pictures/T_Logo.png";
import { Link } from "react-router";
import { Button } from "@mui/material";

const Header: React.FC = () => {
    return (
        <header>
            <div 
                style={{
                    display: "flex", 
                    flexDirection: "column", 
                    height: "110px",
                    padding: 0,
                    alignItems: "center",
                }}
            >
                <div style={{
                    display: "flex", 
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}>
                    <div style={{ 
                        position: "absolute", 
                        left: "10px", 
                        display: "flex", 
                        alignItems: "center" 
                    }}>
                        <img src={Tlogo} alt="Logo" style={{ height: "60px"}} />
                    </div>
                    <h1 
                        style={{ 
                            fontSize: "3em", 
                            margin: 0, 
                        }}
                    >
                        Valerian
                    </h1>
                </div>

                <nav style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "10px",
                    flexWrap: "wrap",
                    width: "100%",
                    maxWidth: "600px"
                }}>
                    <Button component={Link} to="/Premium_Customers" variant="outlined" color="secondary">
                        Premium Customers
                    </Button>
                    <Button component={Link} to="/Tools" variant="outlined" color="secondary">
                        Tools
                    </Button>
                    <Button component={Link} to="/Service_Class" variant="outlined" color="secondary">
                        Service Class
                    </Button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
