import api from "../src/services/api";
import { isLogged } from "../src/services/api";
import {useState, useEffect} from 'react';
import Redirect from '../src/components/Redirect';

function login(props){
    const [email, setEmail] = useState("testId@email.com");
    const [pass, setPass] = useState("1234");
    const [relativePath, setRelativePath] = useState("/");
    const [doRedirect, setDoRedirect] = useState(false);

    useEffect(async()=>{
        
        const apiLog = await isLogged();
        console.log({apiLog});
        setDoRedirect(apiLog);


    }, []);

    useEffect(async()=>{
        const apiLog = await isLogged();
        
        if (apiLog) {
            setDoRedirect(true);
            
        }

    },[doRedirect]);


    
    async function login(e) {
        e.preventDefault();

        const res = await api.post('/login', 
            {
                username: email,
                password: pass,
            }, 
            {   
                withCredentials:true,
            });
        
        console.log({loginRequest : res.data});

        const {authenticated} = res.data;
        setDoRedirect(authenticated);

    }

    async function logout(e) {
        e.preventDefault();

        const res = await api.get('/logout', 
            {   
                withCredentials:true,
            });

    }

    if (doRedirect) {
        return <Redirect relativePath={relativePath}></Redirect>
    }

    
    return(
        <div>
            Login
            <table>
                <th>
                    <tr>
                        email 
                    </tr>
                    <tr>
                        pass
                    </tr>
                </th>

                <th>
                    <tr>
                        <input id="email" value={email} onChange={e=>setEmail(e.target.value)}></input>
                    </tr>
                    

                    <tr>
                        <input id="pass" value={pass} onChange={e=>setPass(e.target.value)}></input>
                    </tr>
                </th>
            </table>

            <button onClick={login}>Log in</button>
            <button onClick={logout}>log out</button>
        </div>
    );
}

export default login;