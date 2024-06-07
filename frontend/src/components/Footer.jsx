import { Fragment } from "react";

const Footer = () => {
    const year = new Date().getFullYear()
    return ( 
        <Fragment>
            <footer>
                <div className="container-fluid bg-green">
                <p> &copy;{year} Umar Ssekalala </p>
                </div>
            </footer>
        </Fragment>
     );
}
 
export default Footer;