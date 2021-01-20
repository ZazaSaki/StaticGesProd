import info from "../src/utils/holdVars";
import api from "../src/services/api";
import {useState, useEffect} from 'react';

function login(props){
    const [email, setEmail] = useState("testId@email.com");
    const [pass, setPass] = useState("1234");

    useEffect(async()=>{
        const res = await api.get("/logged", {withCredentials:true});
        console.log(res);
    }, []);
    
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