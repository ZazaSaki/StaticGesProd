import useState from "react";
import api from '../../services/api';
import {removeDay, addDayIgnore, RemoveDayIgnore} from "../../utils/Med";

function Item(props) {

    function selfRemove(){
        
    }
    

    

    return(
        <div>
            <li>Dia {props.id} : {props.value}
            <button id={"ignore_" + props.id}>ignore</button>
            <button id={"delete_" + props.id} onClick = {selfRemove}>delete</button></li>
        </div>
    );
}

export default Item;