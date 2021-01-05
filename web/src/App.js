import React,{ useState, useEffect } from "react";
import ReactDOM from "react";
import Item from './components/Item';
import Header from './components/Header/';
import api from './services/api';
import { render } from "react-dom";



function App(){
    const [ItemList, setItemList] = useState([]);
    const [day, setDay] = useState(0);
    const [production, setProduction] = useState(0);
    const [id, setId] = useState(1);


    //load List
     useEffect(()=>{
        
        async function getList() {
            const res = await api.get('/search',{params:{email : 'test@email.com'}});
            
            const {List} = res.data[0].dayList.find(e => e.id==id);

            console.log(List); 

            setItemList(List);
        }

        getList();
        
        //setItemList(dayList[id]);
    },[]);

    async function update(ttt) {
        console.log(ttt);


        const res = await api.get('/search',{params:{email : 'test@email.com'}});
            
        const {List} = res.data[0].dayList.find(e => e.id==id);

        console.log(List);

        setItemList(List);
    }

    async function removeItem(rd){
        //filter items diferente than remove
        setItemList(ItemList.filter((e)=>(e.day!=rd)));
    }

    
    async function addItem(e){
        e.preventDefault();
        
        //checking existing users
        if (ItemList.map((item) => (item.day==day)).includes(true)) {
            return;
        }
        
        //Loading user in the server
        const res = await api.put('/userItem',{
            day,
            production},
            {params:{
                email:'test@email.com',
                id : 1
            }});
        
        //setting list with sorted values
        setItemList(([...ItemList, {day,production}]).sort((a,b)=>(a.day-b.day)));

        console.log(res);

        console.log(ItemList);        
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
                
                {ItemList.map((item) => (<Item key = {item.day} id = {item.day} value = {item.production} remove = {removeItem} ></Item>))}

            </ul>
		</div>
		
    );
}

export default App;