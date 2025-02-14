
const button=document.querySelector(".button");
const usernameinput=document.querySelector(".username");
const passwordinput=document.querySelector(".password");

let username,password;

button.addEventListener("click",()=>{
    password=passwordinput.value;
    username=usernameinput.value;

    gettoken(username,password).then((token)=>{
        console.log(token.token)
        if(token.message){
            alert("wrong username or password")
        }
        if(token.token){
            settokentolocalstorage(token.token)
            getchangeinformationpage()
        }

    });

})

async function gettoken(username,password) {
    let token=await fetch("http://localhost:8000/auth/login",{
        method:"POST",
        body:JSON.stringify({
            username:username,
            password:password
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    });
    token=await token.json();

    return token;
}

function settokentolocalstorage(token){
    localStorage.setItem("token",JSON.stringify(token));
}
 
async function getchangeinformationpage(){
    window.location.href = "http://localhost:8000/admin/change_information";
}