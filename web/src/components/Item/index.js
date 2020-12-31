import React from "react";

function Item(props) {
    
    return(
        <div>
            <li>Dia {props.id} : {props.value}<button id="ignore_1">ignore</button><button id="delete_1">delete</button></li>
        </div>
    );
}

export default Item;