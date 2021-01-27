import {useRouter} from 'next/router';
import {useEffect} from 'react';

function Redirect({relativePath}){
    const router = useRouter();
    useEffect(()=>{
        
        router.push(relativePath);
    }, [relativePath])
    
    
    

    return <div></div>;
}

export default Redirect;