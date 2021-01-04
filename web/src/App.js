import React, { useState } from "react";
import Item from './components/Item';
import Header from './components/Header/';
import api from './services/api';


function App(){
    const [ItemList, setItemList] = useState([]);
    const [day, setDay] = useState(0);
    const [production, setProduction] = useState(0);

    function getJSON(ArrList) {
        return ArrList.map(element => ({
            day : element[0],
            production : element[1],
        }));
    }

    async function addItem(e){
        if (ItemList.map((item) => (item.day==day)).includes(true)) {
            return;
        }
        
        e.preventDefault();
        const res = await api.put('/userItem',{
            day,
            production},
            {params:{
                email:'test@email.com',
                id : 1
            }});

        setItemList([...ItemList, {day,production}]);

        console.log(res);

        
        console.log(ItemList);
        //setItemList([...ItemList, {"day" : day, "production" : production}])
        
    }

    function deleteItem() {
        console.log(Item.day);
        //ItemList.splice(ItemList.indexOf(it),1);
    }


    return(
        <div>Hello sweet Home
           
            <div aria-orientation="horizontal">
                <input type="number" id="Day" value={day} onChange = {e => setDay(e.target.value)} />
                <input type="number" id = "Production" value = {production}  onChange = {e => setProduction(e.target.value)} />
                <button onClick={addItem}>add item</button>
                da
                
                
            </div>
            <ul id="dynamic-list">
                <Header title = "header1"></Header>
                
                {ItemList.map((item) => (<Item key = {item.day} id = {item.day} value = {item.production} ></Item>))}

            </ul>
		</div>
		
    );
}

export default App;