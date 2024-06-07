import { Link, useNavigate } from "react-router-dom";
import LinkComponent from "./Link";
import Logo from '../logo.png'
const NavBar = () => {
  const auth = localStorage.getItem('user')
  const navigate = useNavigate()
  const logout = ()=>{
      localStorage.clear();
      navigate('/login');
  }
    return ( 
    <>
   <nav id="nav"  className="navbar navbar-expand-lg navbar-light ">
  <div className="container-fluid">
    <img className="image" src={Logo} alt="" />
    <Link style={{color:"white"}} className="navbar-brand" to="/">E-comm</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span style={{backgroundColor:"white"}} className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {auth?
        <>
        <LinkComponent to="/" name="Products" />
        <LinkComponent to="/add" name="Add products" />
        
        <LinkComponent to="/profile" name="Profile" />
        <LinkComponent onClick={logout} to="/login" name="logout" />
        </>:
        <>
        <LinkComponent to="/register" name="Register" />
        <LinkComponent to="/login" name="login" />
        </>
      }
      </ul>
    </div>
  </div>
</nav>
    </> );
}
 
export default NavBar;