import React, { useState } from 'react';

function StatsBar({stats : {med, done, left}, goal}){
    console.log({med, done, goal});
    
    const [days, setDays] = useState(5);
    
    function s(){
        if(days>1){
            return("s");
        }
        return("");
    }
    
    return(
        <div>
            Quantidade Restante: {(parseFloat(goal)-parseFloat(done))} <br></br>
            Media dos ultimos {days} dia{s()} : {med} <br></br>
            Dias Restantes dado a media: {left} 


        </div>
    );

}

export default StatsBar;
