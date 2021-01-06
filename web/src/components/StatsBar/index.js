import React, { useState } from 'react';

function StatsBar({ItemList, goal}){
    const [days, setDays] = useState(5);
    //const [done, setDone] = useState(0);

    function daysLeft() {
        
        
        if (ItemList.length < 1) {
            
            return 0;
        }

        return ((parseFloat(goal)-parseFloat(done()))/med()).toFixed(2);
    }

    function done(){
        let sum = 0.0;
        ItemList.forEach(element => {
            sum += parseFloat(element.production);
        });

        return sum;
    }


    function med() {
        let out = 0.0;
        let count = days;
        
        const nonIgnore = ItemList.filter(e => e.ignore==false);
        
        console.log(nonIgnore);
        
        const size =  nonIgnore.length;

        if (size<1) {
            return 0;
        }

        if (size<days) {
            count = size;
        }

        for (let index = size-count; index < size; index++) {
            if (nonIgnore[index] == null) {
                break;
            }
            let element = parseFloat(nonIgnore[index].production);
            
            out+=element;
            
        }

        out = out/count;

        

        return out;
    }
    
    function s(){
        if(days>1){
            return("s");
        }
        return("");
    }
    
    return(
        <div>
            Quantidade Restante: {(parseFloat(goal)-parseFloat(done()))} <br></br>
            Media dos ultimos {days} dia{s()} : {med().toFixed(2)} <br></br>
            Dias Restantes dado a media: {daysLeft()} 


        </div>
    );

}

export default StatsBar;
