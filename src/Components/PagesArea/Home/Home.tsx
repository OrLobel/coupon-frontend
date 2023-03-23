import Login from "../../AuthArea/Login/Login";
import CustomerItem from "../../CustomerArea/CustomerItem/CustomerList";
import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home flex-center-col">
			<h1>Coupon System</h1>
            <img src="https://media.giphy.com/media/3oEdv1vkhqxcynkB5C/giphy.gif" alt="TaaS"/>
            <div>CustomerItem</div>
            {/* <CustomerItem/>  */}
            {/* <Login/> */}
        </div>
    );
}

export default Home;
