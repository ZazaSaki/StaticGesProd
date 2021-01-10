import {Line, Scatter} from 'react-chartjs-2';
import {Component, React} from 'react';
import api from '../../services/api';


function Graph ({ItemList,med,vals,predictionDay}){
    
    if (ItemList.length < 1) {
            
        return <div></div>;
    }

    function logImage(x){
        const a = vals.a;
        const b = vals.b;
        
        //console.log({a,b,x});
        return a*Math.log(x)+b;
    }

    function Mapvals() {
        return ItemList.map(e=>({x:e.day,y:e.production}));
    }
    function Med() {
        return [{x:ItemList[0].day, y:med}, {x:ItemList[ItemList.length-1].day+predictionDay, y:med}];
    }

    function MapValPrediction() {
        const lastday = ItemList[ItemList.length-1].day;
        //ItemList.map(e=>console.log(logImage(e.day)));
        return [...ItemList.map(e=>({x:e.day,y:logImage(e.day)})), {x:lastday + predictionDay , y:logImage(lastday+ predictionDay)}];
    }

    const chartData = {
            //labels: ItemList.map(e=>(e.day)),
            datasets:[
                {
                    label:'Produção',
                    data:Mapvals(),
                    backgroundColor:'rgba(255, 99, 132, 0.8)',
                    showLine : true,
                    fill:true,
                    
                },
                {
                    label:'Média',
                    data:Med(),
                    backgroundColor:'rgba(132, 99, 255, 0.2)',
                    fill:true,
                    showLine : true,
                    
                    
                },
                {
                    label: "Previsão", // Name it as you want
                    data: MapValPrediction(), // Don't forget to add an empty data array, or else it will break
                    borderColor: "rgba(75, 192, 192, 1)",
                    fill: true,
                    showLine:true
                }
            ]
        }

    const props = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
    }

    
    function a(){
        //const out = ItemList.map(e => ({x:e.day , y:e.production}))
        //console.log({message: "data" ,out : out});
        //return out;
    }

    
        return(
            <div>
               <Scatter 
                    data = {chartData}
                    options={{
                        title:{
                        display:props.displayTitle,
                        text:'Produção',
                        fontSize:25
                        },
                        legend:{
                        display:props.displayLegend,
                        position:props.legendPosition
                        }
                    }}>

                </Scatter>
               

            </div>
        );
}

export default Graph;