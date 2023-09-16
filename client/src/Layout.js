import { Outlet } from "react-router-dom"
import "./App.css"
import Header from "./Header"

export default function Layout()
{
    return(
        <div className="App">
            <Header />
            <Outlet />
        </div>
    );
};