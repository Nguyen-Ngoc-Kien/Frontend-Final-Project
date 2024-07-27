import { useEffect } from "react";
import { Route } from "react-router-dom";

const PrivateRoute = (props) => {
    return(
        <div>
            <Route path={props.path} element={props.component}></Route>
        </div>
    )
}

export default PrivateRoute 