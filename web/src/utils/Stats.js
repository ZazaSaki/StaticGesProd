import api from '../services/api';

function filterVals(List) {
    return List.filter((e)=>(e.ignore==false));
}


//media
function med(List, days){
    
    //iniciating counting vars
    let med = 0.0;
    let count = 0.0;
    let thisDays = days;
    
    //filtering ignored days
    const nonIgnored = filterVals(List);;
    const nonIgnoredDays = nonIgnored.length;
    
    //checking an emptyness of the array
    if(nonIgnored.length<1){
        return{med:0, days:0};
    } 

    //
    if (nonIgnored.length<=days) {
        med = nonIgnored.reduce((acc, curr)=>(acc + curr))/nonIgnoredDays;
        thisDays = nonIgnoredDays;

        
    }else{

        const dayIndex = nonIgnoredDays<=days? 0 : days;
        for (let i = nonIgnored.length - 1; i > nonIgnored.length-(dayIndex+1); i--) {
            
            const {production} = nonIgnored[i];

            med += production;
            count += 1;
        }
    }
    
    
    
    return {med : med/count, days : thisDays};
}

//total production
function done(List){
    let out = 0;

    List.forEach(e => {
        out += e.production;
    });

    return out;
}

//production to build
function left(List, goal) {
    return goal - done(List);
}

//time left basedon last days rythm of production
function timeLeft(List,goal){
    return left(List,goal)/med(List);
}

//requesting logarithmic regression
async function logarithmicRegression(List) {
    const cleanData = filterVals(List).map((e)=>[e.day,e.production]);
    const {data} = await api.put('/LogRegression', {list:cleanData}, {withCredentials : true});
    
    console.log(data);
    return data;
}

//Return an object with all data
async function analise(List, goal) {
    
    const {media, days} = med(List, 5);
    const logReg = await logarithmicRegression(List);

    const stats = {
        med : media,
        days,
        done : done(List),
        left : left(List, goal),
        timeLeft : timeLeft(List,goal),
        logReg
    }

    console.log(stats);
    return(stats);
}

export default analise;

