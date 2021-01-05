import React,{ useState, useEffect } from "react";

import List from "./components/List";

import api from './services/api';




function App(){
    const [ItemList, setItemList] = useState([]);
    const [id, setId] = useState(1);


    //load List
     useEffect(()=>{
        
        async function getList() {
            const res = await api.get('/search',{params:{email : 'test@email.com'}});
            
            const {List: ListRes} = res.data[0].dayList.find(e => e.id==id);

            console.log(ListRes); 

            setItemList(ListRes);
        }

        getList();
        
        //setItemList(dayList[id]);
    },[]);
 

    return(
        <div>Hello sweet Home
            <List ItemList = {ItemList} setItemList = {setItemList}></List>
		</div>
		
    );
}

export default App;