import React from 'react';
import { logout } from "../../services/api";

function LogOutBt({then}){
    
    function execute(e){
        logout(e);
        then();
    }
    
    return(<button onClick={execute}>log out</button>);
}
export default LogOutBt;