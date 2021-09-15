import React from 'react'
import {withRouter} from "react-router-dom";
import DriverList from "../../drivers/DriverList/DriverList";

const Drivers = () => {

    return (
        <DriverList/>
    )
}

export default withRouter(Drivers)