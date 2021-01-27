
import App from '../src/App';
import {useEffect, useState} from 'react';
import Redirect from '../src/components/Redirect';
import {isLogged} from '../src/services/api';

function Home() {

    const [logged,setLogged] = useState(true);
    
    useEffect(()=>{
        async function redirect() {
            const effcetIndex = await isLogged();
            console.log({effcetIndex});
            setLogged(effcetIndex);
        }

        redirect();
    },[]);
    
    
    if(!logged){
        console.log("should return");
        return(
                <Redirect relativePath="/login" Condition={isLogged}></Redirect>
        );
        
    }

    return(<App></App>);
}

export default Home;