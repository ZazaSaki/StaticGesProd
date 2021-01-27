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
            
            const res2 = await api.get('/logged',{
                withCredentials:true,
            });

            console.log({res2});

            const res = await api.get('/user',{
                withCredentials:true,
            });
            
            console.log({res});

            const dayList =  res.data;
            const {List: ListRes, goal:goalRes} = dayList.find(e => e.id==id);
            
            setItemList(ListRes);
            setGoal(goalRes);
            console.log({message: "vals : ", vals});
        }

        getList();
        
        //setItemList(dayList[id]);
    },[id]);

    useEffect(()=>{

        updatePredictionVals();

    },[ItemList]);

    async function updatePredictionVals(){
        const list = ItemList.filter(e=>e.ignore==false).map(e=>[e.day, e.production]);
        console.log({message : "val change:",list});
        const res = await api.put('/LogRegression',{list}, {withCredentials:true});
        
        console.log({message : "val change:", val : res.data});
        setVals(res.data);
        
    }

    function update(e){
        e.preventDefault()
        api.put('/userGoal', {goal:goal}, {
            params : {
                email: "test@email.com", id : 1
            },
            withCredentials:true,
        });
    }
 

    return(
        <div>Hello sweet Home
            <input type="number" id="goal" value={goal} onChange = {e => setGoal(e.target.value)}/>
            <button onClick = {update}>save goal</button>
            <List ItemList = {ItemList} setItemList = {setItemList}></List>
            <StatsBar ItemList = {ItemList} goal={goal} setMed={setMed}></StatsBar>
            <button onClick={updatePredictionVals}>Refresh Graph</button>
            <Graph ItemList={ItemList.filter(e=>e.ignore==false)} med={med} vals={vals} predictionDay={3}></Graph>
		</div>
		
    );
}

export default App;