import React,{ useState, useEffect } from "react";

import List from "./components/List";
import StatsBar from "./components/StatsBar";
import Graph from "./components/Graph";
import analise from "./utils/Stats";

import api from './services/api';




function App(){
    const [ItemList, setItemList] = useState([]);
    const [id, setId] = useState(1);
    const [goal, setGoal] = useState(0);
    const [med,setMed] = useState(0);
    const [vals, setVals] = useState({a:0,b:0});
    const [stats, setStats] = useState(analise(ItemList, goal));

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

    useEffect(async ()=>{

        await updatePredictionVals();

    },[ItemList]);

    async function updatePredictionVals(){
        setStats(await analise(ItemList, goal));
        
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

    async function logout(e) {
        e.preventDefault();

        const res = await api.get('/logout', 
            {   
                withCredentials:true,
            });

    }
 

    return(
        <div>
            <button onClick={logout}>Log out</button>
            <input type="number" id="goal" value={goal} onChange = {e => setGoal(e.target.value)}/>
            <button onClick = {update}>save goal</button>
            <List ItemList = {ItemList} setItemList = {setItemList}></List>
            <StatsBar stats = {stats} goal = {goal}></StatsBar>
            <button onClick={updatePredictionVals}>Refresh Graph</button>
            <Graph ItemList={ItemList.filter(e=>e.ignore==false)} predictionDay={3} stats={stats}></Graph>
		</div>
		
    );
}

export default App;