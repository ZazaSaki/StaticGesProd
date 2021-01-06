import React,{ useState, useEffect } from "react";

import List from "./components/List";
import StatsBar from "./components/StatsBar";

import api from './services/api';




function App(){
    const [ItemList, setItemList] = useState([]);
    const [id, setId] = useState(1);
    const [goal, setGoal] = useState(0);

    //load List
     useEffect(()=>{
        
        async function getList() {
            const res = await api.get('/search',{params:{email : 'test@email.com'}});
            
            const {List: ListRes, goal:goalRes} = res.data[0].dayList.find(e => e.id==id);

            console.log(ListRes); 

            setItemList(ListRes);
            setGoal(goalRes);
        }

        getList();
        
        //setItemList(dayList[id]);
    },[]);

    function update(e){
        e.preventDefault()
        api.put('/userGoal', {goal:goal}, {params : {email: "test@email.com", id : 1}});
    }
 

    return(
        <div>Hello sweet Home
            <input type="number" id="goal" value={goal} onChange = {e => setGoal(e.target.value)}/>
            <button onClick = {update}>save goal</button>
            <List ItemList = {ItemList} setItemList = {setItemList}></List>
            <StatsBar ItemList = {ItemList} goal={goal}></StatsBar>
		</div>
		
    );
}

export default App;