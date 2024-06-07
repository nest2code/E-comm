import { Fragment } from "react";
import { Link } from "react-router-dom";
const LinkComponent = (props) => {
    return ( 
        <Fragment>
            <li className="nav-item">
          <Link style={{color:"white"}} onClick={props.onClick} className="nav-link active" aria-current="page" to={props.to}>{props.name}</Link>
        </li>
        </Fragment>
     );
}
 
export default LinkComponent;