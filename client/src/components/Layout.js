import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

export default function Layout(){



    return(
        <section className="layout">
            <Sidebar/>
            <Navbar />
            <Outlet/>
           
        </section>
    )


}



