

var info = {
    email : "",
    token : "",
    loading:false
}

function setLoad(isLoading){
    info.loading = isLoading;
}

function getEmail(){
    return info.email;
}

function getToken(){
    return info.token;
}

function getLoading(){
    return info.loading;
}

function setInfo(email, pass){
    info.email = email;
    info.token = pass;
}




export default info;