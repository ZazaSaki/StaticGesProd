import { React, useState } from "react";
import styles from './style.module.css';
import Item from "../../components/Item";
import Header from "../Header";

import api from "../../services/api";



function List({ItemList, setItemList}) {
    //var temp = [];
    const [day, setDay] = useState(0);
    const [production, setProduction] = useState(0);

    const [txt,setTxt] = useState("title");

    
    
    function removeItem(rd){
        //filter items diferente than remove
        setItemList(ItemList.filter((e)=>(e.day!=rd)));
    }

    function ignoreItem(id, val){
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
        
        
        //checking existing users
        if (ItemList.map((item) => (item.day==day)).includes(true)) {
            return;
        }
        
        //Loading user in the server
        api.put('/userItem',{
            day : parseInt(day),
            production : parseFloat(production),
            ignore : false
        },
            {params:{
                email:'test@email.com',
                id : 1
            },
            withCredentials:true,
        });
        
        //setting list with sorted values
        setItemList(([...ItemList, {day : parseFloat(day),production : parseFloat(production), ignore:false}]).sort((a,b)=>(a.day-b.day)));

        setDay(parseFloat(day) + 1);
        console.log(ItemList);        
    }
    
    return(
		<div>
            <div aria-orientation="horizontal">
                <table>
                    <tr>
                        <td>Dia </td>
                        <td><input type="number" id="Day" value={day} onChange = {e => setDay(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Produção </td>
                        <td><input type="number" id = "Production" value = {production}  onChange = {e => setProduction(e.target.value)} /></td>
                    </tr>
                </table>
                <button onClick={addItem}>add item</button>
                
                
            </div>
            <table id="dynamic-list" className={styles.table}>
                <tr className={styles.title}>
                    <th>Dia</th>
                    <th>Produção</th>
                    <th>Ações</th>
                    <th>Status</th>
                </tr>
                {ItemList.map((item) => (<Item key={item.day} id={item.day} value={item.production} remove={removeItem} ignore={ignoreItem} initIgnore={item.ignore} ></Item>))}

            </table>
		</div>
    );
}

export default List;