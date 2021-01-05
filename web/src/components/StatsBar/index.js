import React, { useState } from 'react';

function StatsBar({ItemList, goal}){
    const [days, setDays] = useState(5);

    function left() {
        let done = 0;
        ItemList.forEach(element => {
            done += parseFloat(element.production);
        });
        
        return ((parseFloat(goal)-parseFloat(done))/med()).toFixed(2);
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
            Media dos ultimos {days} dia{s()} : {med().toFixed(2)} <br></br>
            Dias Restantes dado a media: {left()} 

        </div>
    );

}

export default StatsBar;
