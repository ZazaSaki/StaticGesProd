import React,{ useState, useEffect } from "react";

import List from "./components/List";
import StatsBar from "./components/StatsBar";
import Graph from "./components/Graph";

import api from './services/api';




function App(){
    const [ItemList, setItemList] = useState([]);
    const [id, setId] = useState(1);
    const [goal, setGoal] = useState(0);
    const [med,setMed] = useState(0);
    const [vals, setVals] = useState({a:0,b:0});

    //load List
     useEffect(()=>{
        
        async function getList() {
            const res = await api.get('/search',{params:{email : 'test@email.com'}});
            
            const {List: ListRes, goal:goalRes} = res.data[0].dayList.find(e => e.id==id);
            
            setItemList(ListRes);
            setGoal(goalRes);
            console.log({message: "vals : ", vals});
        }

        getList();
        
        //setItemList(dayList[id]);
    },[]);

    useEffect(()=>{
        async function updatePredictionVals(){
            const list = ItemList.map(e=>[e.day, e.production]);
            console.log({message : "val change:",list});
            const res = await api.put('/LogRegression',{list});
            
            console.log({message : "val change:", val : res.data});
            setVals(res.data);
            
        }

        updatePredictionVals();

    },[ItemList]);

    function update(e){
        e.preventDefault()
        api.put('/userGoal', {goal:goal}, {params : {email: "test@email.com", id : 1}});
    }
 

    return(
        <div>Hello sweet Home
            <input type="number" id="goal" value={goal} onChange = {e => setGoal(e.target.value)}/>
            <button onClick = {update}>save goal</button>
            <List ItemList = {ItemList} setItemList = {setItemList}></List>
            <StatsBar ItemList = {ItemList} goal={goal} setMed={setMed}></StatsBar>
            <Graph ItemList={ItemList} med={med} vals={vals} predictionDay={3}></Graph>
		</div>
		
    );
}

export default App;