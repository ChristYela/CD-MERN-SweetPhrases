import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className="container w-75 mx-auto ">
            <h1 className="text-danger text-center" id="titlerr">ERROR!</h1>
            <h2 className="text-danger text-center" id="subtitlerr"> We haven't found the post you've been looking for </h2>
            <img src={require("../components/img/heartbeat.gif")} alt="heartbeat" id="heartbeat" style={{ height: "300px" }} />
            <img src={require("../components/img/heartbeat.gif")} alt="heartbeat" id="heartbeat1" style={{ height: "300px" }} />
            <Link className="btn btn-outline-danger" id="btnerr" to="/"> Go Back to Home </Link>
        </div>
    )
}

export default Error;
