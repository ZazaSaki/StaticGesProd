import { React, useState } from "react";
import Item from "../../components/Item";



function List(props, {add}) {
    //var temp = [];
    const [Items, setItems] = useState([]);
    const [day, setDay] = useState(0);
    const [production, setProduction] = useState(0);
    const [Item, setItem] = useState();


    
    function returnItem(){
        return add(day, production);
    }
    
    return(
		<div>
            <div aria-orientation="horizontal">
                <input type="number" id="Day" value={day} onChange = {e => setDay(e.target.value)} />
                <input type="number" id = "Production" value = {production}  onChange = {e => setProduction(e.target.value)} />
                <button onClick={add}>add item</button>
                {props.id}
                
            </div>
            
        </div>
    );
}

export default List;