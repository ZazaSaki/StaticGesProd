import React, { useState } from "react";
import Item from './components/Item';
import List from './components/List/';
import Header from './components/Header/';

function App(){
    const [ItemList, setItemList] = useState([]);
    const [day, setDay] = useState(0);
    const [production, setProduction] = useState(0);

    function increment(){
        if (ItemList.map((item) => (item[0]==day)).includes(true)) {
            return;
        }
        
        setItemList([...ItemList, [day, production]].sort((a,b)=>(a[0]-b[0])));
        
        //setItemList([...ItemList, {"day" : day, "production" : production}])
        
    }

    return(
        <div>Hello sweet Home
           
            <div aria-orientation="horizontal">
                <input type="number" id="Day" value={day} onChange = {e => setDay(e.target.value)} />
                <input type="number" id = "Production" value = {production}  onChange = {e => setProduction(e.target.value)} />
                <button onClick={increment}>add item</button>
                da
                
                
            </div>
            <ul id="dynamic-list">
                <Header title = "header1"></Header>
                
                {ItemList.map((item) => (<Item key = {item[0]} id = {item[0]} value = {item[1]}></Item>))}

            </ul>
		</div>
		
    );
}

export default App;