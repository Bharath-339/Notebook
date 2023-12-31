import React ,{useEffect} from "react";
import {Link, useLocation} from "react-router-dom"



export default function Navbar() {
      let location = useLocation();
      
      useEffect(() => {
        return () => {
        // console.log(location.pathname)
        }
      }, [location])

  return (
    <div>
        <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
            <Link className="navbar-brand " to="/">INotebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname ==='/' ? 'active' : "" }`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname ==='/about' ? 'active' : "" }`} to="/about">About</Link>
                </li>
            </ul>

            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
        </nav>
    </div>
  );
}
