import { React, useState } from "react";

import Item from "../../components/Item";
import Header from "../Header";

import api from "../../services/api";



function List({ItemList, setItemList}) {
    //var temp = [];
    const [day, setDay] = useState(0);
    const [production, setProduction] = useState(0);

    const [txt,setTxt] = useState("title");


    
    async function removeItem(rd){
        //filter items diferente than remove
        setItemList(ItemList.filter((e)=>(e.day!=rd)));
    }

    async function ignoreItem(id, val){
        setItemList(ItemList.map(e =>{
                        if (e.day == id) {
                            e.ignore = val;
                        }
                        return e;
                    }));

        console.log(ItemList);
    }





    
    async function addItem(e){
        e.preventDefault();
        
        setTxt(day);

        //checking existing users
        if (ItemList.map((item) => (item.day==day)).includes(true)) {
            return;
        }
        
        //Loading user in the server
        const res = await api.put('/userItem',{
            day : parseInt(day),
            production : parseFloat(production),
            ignore : false},
            {params:{
                email:'test@email.com',
                id : 1
            }});
        
        //setting list with sorted values
        setItemList(([...ItemList, {day,production, ignore:false}]).sort((a,b)=>(a.day-b.day)));

        console.log(res);

        console.log(ItemList);        
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
                <Header title = {txt}></Header>
                
                {ItemList.map((item) => (<Item key = {item.day} id = {item.day} value = {item.production} remove = {removeItem} ignore={ignoreItem} ></Item>))}

            </ul>
		</div>
    );
}

export default List;