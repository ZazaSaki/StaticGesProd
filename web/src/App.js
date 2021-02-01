import React,{ useState, useEffect } from "react";

import List from "./components/List";
import StatsBar from "./components/StatsBar";
import Graph from "./components/Graph";
import analise from "./utils/Stats";

import api from './services/api';
import LogOutBt from "./components/LogOutBt";
import Redirect from "./components/Redirect";




function App(){
    const [ItemList, setItemList] = useState([]);
    const [id, setId] = useState(1);
    const [goal, setGoal] = useState(0);
    const [stats, setStats] = useState(analise(ItemList, goal));

    const [doRedirect, setDoRedirect] = useState(false);

    //load List
     useEffect(()=>{
        
        async function getList() {
            
            const {data} = await api.get('/logged',{
                withCredentials:true,
            });

            console.log({data});
            setDoRedirect(!data.authenticated);

            const res = await api.get('/user',{
                withCredentials:true,
            });
            
            console.log({res});

            const dayList =  res.data;
            const {List: ListRes, goal:goalRes} = dayList.find(e => e.id==id);
            
            setItemList(ListRes);
            setGoal(goalRes);
            
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

        setDoRedirect(true);

    }
    


    if (doRedirect) {
        return <Redirect relativePath={'/login'}></Redirect>
    }

    return(
        <div>
            <LogOutBt then = {()=>{setDoRedirect(true)}}></LogOutBt>
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