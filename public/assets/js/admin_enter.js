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
            console.log(token);
            settokentolocalstorage(token.token)
            getchangeinformationpage(token.token)
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
    token=token.json();

    return token;
}

function settokentolocalstorage(token){
    localStorage.setItem("token",JSON.stringify(token));
    console.log(localStorage.getItem("token"))
}
 
async function getchangeinformationpage(token){
    fetch("http://localhost:8000/admin/changecontents", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.redirected) { 
            // Tarayıcının yönlendirmesi için
            window.location.href = response.url;
          }
          return response.text(); // Yanıtın içeriğini al
        })
        .then(data => {
          console.log("Gelen veri:", data);
        })
        .catch(error => console.error("Hata:", error));
      
}