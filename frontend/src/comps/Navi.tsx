import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppContext } from "../contexts/AppContext";

export default function Navi() {
    
    const { user, setUser, removeFromCart } = useAppContext();
    return <>
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/products">Listázás</a>
                        </li>
                        {!user && (
                            <>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Register</a>
                            </li>
                            </>
                        )}
                        
                        {user && (
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/profile">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/cart">Cart</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' role='button' onClick={() => {setUser(null), removeFromCart}} href='/login'>Logout</a>
                            </li>

                        </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    </>
}