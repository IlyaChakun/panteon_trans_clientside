import React from 'react'
import AddDriver from "../../../../transport/AddDriver/AddDriver"
import {withRouter} from "react-router-dom";

const Drivers = () => {

    return (
        <React.Fragment>
            <AddDriver/>
        </React.Fragment>
    )
}

export default withRouter(Drivers)