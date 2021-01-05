import { useState } from 'react';
import api from '../../services/api';

function Item({id, value, remove, ignore}) {

    const [ignored, setIgnored] = useState(false);

    function selfRemove(e){
        e.preventDefault();
        api.put('/userDeleteItem',{day : id, production : value}, {params:{
            email : "test@email.com",
            id : 1,
        }});
        

        remove(id);
    }

    function selfIgnore(e) {
        e.preventDefault();

        ignore(id, !ignored);
        setIgnored(!ignored);
    }
    

    

    return(
        <div>
            <li>Dia {id} : {value}
            <button id={"ignore_" + id} onClick = {selfIgnore}>ignore</button>
            <button id={"delete_" + id} onClick = {selfRemove}>delete</button>
            </li>
        </div>
    );
}

export default Item;