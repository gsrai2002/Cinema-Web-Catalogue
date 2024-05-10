import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({setActualSearchTerm}) => {

    const [searchTerm, setSearchTerm] = useState('');
    let navigate=useNavigate();

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(searchTerm.length<=0){
            navigate("/");
        }else{
            setSearchTerm('');
            setActualSearchTerm(searchTerm);
            navigate(`/search`);
        }
    }
    
    return (
        <div>
            <nav className=" navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link to='/'><img className="navbar-brand" src={require("../images/cinema (2).png")} alt="logo" height="60px" /></Link>
                    <Link className="navbar-brand brand-text brand-text-animation" to="/">Cinema</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link text-animation" aria-current="page" to="/trending">Trending</Link>
                        </li>
                        <li className="nav-item dropdown text-animation">
                        <Link className="nav-link dropdown-toggle" to="/movies/popular" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Movies
                        </Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" to="/movies/popular">Popular</Link></li>
                            <li><Link className="dropdown-item" to="/movies/toprated">Top Rated</Link></li>
                            <li><Link className="dropdown-item" to="/movies/nowplaying">Now Playing</Link></li>
                            <li><Link className="dropdown-item" to="/movies/upcoming">Upcoming</Link></li>
                        </ul>
                        </li>
                        <li className="nav-item dropdown text-animation">
                        <Link className="nav-link dropdown-toggle" to="/tv/popular" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            TV Series
                        </Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" to="/tv/popular">Popular</Link></li>
                            <li><Link className="dropdown-item" to="/tv/toprated">Top Rated</Link></li>
                            <li><Link className="dropdown-item" to="/tv/currentlyonair">Currently On Air</Link></li>
                            <li><Link className="dropdown-item" to="/tv/airingtoday">Airing Today</Link></li>
                        </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" onSubmit={handleOnSubmit}>
                        <input className="form-control me-2" value={searchTerm} onChange={handleOnChange} type="search" placeholder="Search..." aria-label="Search"/>
                        <button disabled={searchTerm.length<=0} className="btn btn-primary" type="submit">Search</button>
                    </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar