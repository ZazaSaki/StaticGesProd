import { useState } from 'react';
import api from '../../services/api';

function Item({id, value, remove, ignore, initIgnore}) {

    const [ignored, setIgnored] = useState(initIgnore);

    function selfRemove(e){
        e.preventDefault();
        api.put('/userDeleteItem',{day : id, production : value, ignore : ignored}, {params:{
            email : "test@email.com",
            id : 1,
        }});
        

        remove(id);
    }

    

    function selfIgnore(e) {
        e.preventDefault();

        ignore(id, !ignored);
        

        api.put('/userItem',{day : id, production : value, ignore : !ignored}, {params:{
            email : "test@email.com",
            id : 1,
        }});

        setIgnored(!ignored);

        
    }
    function tag(){if (ignored) {return "ingored";} return "";}

    

    return(
        <div>
            <li>Dia {id} : {value}
            <button id={"ignore_" + id} onClick = {selfIgnore}>ignore</button> 
            <button id={"delete_" + id} onClick = {selfRemove}>delete</button>
            {tag()}
            </li>
        </div>
    );
}

export default Item;