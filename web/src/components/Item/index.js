import { React, useState } from 'react';
import api from '../../services/api';
import styles from './style.module.css';

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
       
                <tr className = {styles.item}>

                    <td>
                        Dia {id} :
                    </td>
                    <td>
                        {value}
                    </td>
                    <td>
                        <button className={styles.button} id={"ignore_" + id} onClick = {selfIgnore}>ignore</button> 
                        <button className={styles.button} id={"delete_" + id} onClick = {selfRemove}>delete</button>
                    </td>
                    <td className={styles.alertinfo}>
                        {tag()}
                    </td>
                </tr>

        
    );
}

export default Item;