import info from "../src/utils/holdVars";
import api from "../src/services/api";
import {useState, useEffect} from 'react';

function register(props){
    const [email, setEmail] = useState("Register@email.com");
    const [pass, setPass] = useState("1234");
    const [userName, setUserName] = useState("R1");
    const [name, setName] = useState("Register");

    useEffect(async()=>{
        const res = await api.get("/logged", {withCredentials:true});
        console.log(res);
    }, []);
    
    async function regist(e) {
        e.preventDefault();

        const res = await api.post('/register', 
            {
                email,
                pass,
                name,
                id : userName
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
                        Email 
                    </tr>
                    <tr>
                        Pass
                    </tr>
                    <tr>
                        Nome
                    </tr>
                    <tr>
                        Nome de utilizador
                    </tr>
                </th>

                <th>
                    <tr>
                        <input id="email" value={email} onChange={e=>setEmail(e.target.value)}></input>
                    </tr>
                    

                    <tr>
                        <input id="pass" value={pass} onChange={e=>setPass(e.target.value)}></input>
                    </tr>

                    <tr>
                        <input id="name" value={name} onChange={e=>setName(e.target.value)}></input>
                    </tr>

                    <tr>
                        <input id="userName" value={userName} onChange={e=>setUserName(e.target.value)}></input>
                    </tr>

                </th>
            </table>

            <button onClick={regist}>Regist</button>
            
        </div>
    );
}

export default register;