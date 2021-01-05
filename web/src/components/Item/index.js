import api from '../../services/api';

function Item({id, value, remove}) {

    function selfRemove(e){
        e.preventDefault();
        api.put('/userDeleteItem',{day : id, production : value}, {params:{
            email : "test@email.com",
            id : 1,
        }});
        

        remove(id);
    }
    

    

    return(
        <div>
            <li>Dia {id} : {value}
            <button id={"ignore_" + id}>ignore</button>
            <button id={"delete_" + id} onClick = {selfRemove}>delete</button></li>
        </div>
    );
}

export default Item;