const pagenum1=document.getElementById("pagenum1");
const pagenum2=document.getElementById("pagenum2");
const pagedots=document.getElementById("pagedots");
const maxpage=document.getElementById("maxpage");
const afterbutton=document.getElementById("after");
const beforebutton=document.getElementById("before");
const addcontentbutton=document.querySelector(".addcontentbutton");

const content1_note=document.querySelector(".note1");
const content1_img=document.querySelector(".img1")
const content1_h1=document.querySelector(".h11")
const content1_explanation1=document.querySelector(".explanation1")
const content1_button=document.querySelector(".content1_update")


const content2_note=document.querySelector(".note2");
const content2_img=document.querySelector(".img2")
const content2_h1=document.querySelector(".h12")
const content2_explanation1=document.querySelector(".explanation2")
const content2_button=document.querySelector(".content2_update")


const content3_note=document.querySelector(".note3");
const content3_img=document.querySelector(".img3")
const content3_h1=document.querySelector(".h13")
const content3_explanation1=document.querySelector(".explanation3")
const content3_button=document.querySelector(".content3_update")

const content4_note=document.querySelector(".note4");
const content4_img=document.querySelector(".img4")
const content4_h1=document.querySelector(".h14")
const content4_explanation1=document.querySelector(".explanation4")
const content4_button=document.querySelector(".content4_update")

const content1=document.querySelector(".content1")
const content2=document.querySelector(".content2")
const content3=document.querySelector(".content2")
const content4=document.querySelector(".content3")

let firstpage = 1;
let nextpage = 2;
let pagenumthatwein = 0;
let chosenpage=pagenum1;
let maxpagenum;
let recordsfrombackend;

let localtoken=localStorage.getItem("token");
localtoken = localtoken.slice(1, localtoken.length - 1);
console.log(localtoken)


chosepage();

getMaxPage().then((data)=>{
  maxpage.textContent=data.maxpage;
  maxpagenum=data.maxpage;
  checkifmaxpage2();
})

getrecord(pagenumthatwein,localtoken).then((data)=>{
console.log(data)
  setcontenttofrontend(data);
});

addcontentbutton.addEventListener("click",async function(e){
      window.location.href = "http://localhost:8000/admin/add_content_page";
})


beforebutton.addEventListener("click",function(e){
  
  if(maxpagenum!=2){
    if(chosenpage == maxpage){
      pagenumthatwein--;
      changechosen(pagenum2);
    }
    else{
  
      if(nextpage==maxpagenum-1){
        pagenumthatwein--;
        pagedots.style.display="";
        firstpage--;
        nextpage--;
        pagenum1.innerText=firstpage;
        pagenum2.innerText=nextpage;
      }
      else if(firstpage==1){
        //skip
      }
      else if(nextpage==2){
        pagenumthatwein--;
        changechosen(pagenum1);
      }
      
      else{
        pagenumthatwein--;
        firstpage--;
        nextpage--;
        pagenum1.innerText=firstpage;
        pagenum2.innerText=nextpage;
      }
    }
  }else{
      changechosen(pagenum1)
      pagenumthatwein--;
  }
getrecord(pagenumthatwein,localtoken).then((data)=>{
  console.log(data)
    setcontenttofrontend(data);

    if(data[3]){
      content2.style.display="";
      content3.style.display="";
      content4.style.display="";
    }
    else if(data[2]){
      content2.style.display="";
      content3.style.display="";
    }
    else if(data[1]){
      content2.style.display="";
    }
  });


})

afterbutton.addEventListener("click",function(e){
  if(maxpagenum!=2){
    if(firstpage==1 && chosenpage==pagenum1){
      console.log("1");
      changechosen(pagenum2);
      pagenumthatwein++;
    }
    else{
      if(nextpage==maxpagenum-2){
        console.log("2");
        pagedots.style.display="none";
        firstpage++;
        nextpage++;
        pagenum1.innerText=firstpage;
        pagenum2.innerText=nextpage;
        pagenumthatwein++;
      }
      else if(chosenpage==maxpage){
        console.log("4");
        //skip
      }
      else if(nextpage==maxpagenum-1){
        console.log("3");
        pagenumthatwein++;
        changechosen(maxpage);
      }
      else{
        console.log("5");
        pagenumthatwein++;
        firstpage++;
        nextpage++;
        pagenum1.innerText=firstpage;
        pagenum2.innerText=nextpage;
      }
      
    }
  }
  else{
    changechosen(pagenum2);
    pagenumthatwein++;
  }
  
getrecord(pagenumthatwein,localtoken).then((data)=>{
  console.log(data)
    setcontenttofrontend(data);
  
    if(!data[1]){
      content2.style.display="none";
      content3.style.display="none";
      content4.style.display="none";
    }
    else if(!data[2]){
      content3.style.display="none";
      content4.style.display="none";
    }
    else if(!data[3]){
      content4.style.display="none";
    }

  });
  
  
})

async function getrecord(pagenum,localtoken) {
  try{


   let response=await fetch(`http://localhost:8000/admin/getcontentswithid/${pagenum}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localtoken}`,
        "Content-Type": "application/json"
      }
    })
      response=await response.json()

      return response;
  }  
  catch(err){
    console.log(err);
  }
}
  
function checkifmaxpage2(){
    if(maxpagenum==2){
      pagedots.style.display="none";
      maxpage.style.display="none";
  }
}

async function getMaxPage() {
    try {
      const response = await fetch('http://localhost:8000/maxpage');
  
      if (!response.ok) {
        throw new Error('HTTP hatası! status: ' + response.status);
      }
  
      const maxpage = await response.json();


      return maxpage;
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  }

  function chosepage(){
    chosenpage.style.backgroundColor="darkgrey";
    chosenpage.style.color="white";
  }

  function unchosepage(){
    chosenpage.style.backgroundColor="rgb(237, 237, 237)";
    chosenpage.style.color="black";
  }

  function changechosen(changeto){
    unchosepage();
    chosenpage=changeto;
    chosepage();
  }

  function setcontenttofrontend(data){

    content1_note.innerText=data[0].note;
    let imgpath1="http://localhost:8000/public/"+ data[0].image_path;
    content1_img.src=imgpath1;
    content1_h1.innerText=data[0].title;
    content1_explanation1.innerText=data[0].content_text;
    content1_button.href=`http://localhost:8000/admin/change_detail?id=${data[0].content_id}`

    if(data[1]){
      content2_note.innerText=data[1].note;
      let imgpath2="http://localhost:8000/public/"+ data[1].image_path;
      content2_img.src=imgpath2;
      content2_h1.innerText=data[1].title;
      content2_explanation1.innerText=data[1].content_text;
      content2_button.href=`http://localhost:8000/admin/change_detail?id=${data[1].content_id}`
    }
    if(data[2]){
      content3_note.innerText=data[2].note;
      let imgpath3="http://localhost:8000/public/"+ data[2].image_path;
      content3_img.src=imgpath3;
      content3_h1.innerText=data[2].title;
      content3_explanation1.innerText=data[2].content_text;
      content3_button.href=`http://localhost:8000/admin/change_detail?id=${data[2].content_id}`
    }
    if(data[3]){
      content4_note.innerText=data[3].note;
      let imgpath4="http://localhost:8000/public/"+ data[3].image_path;
      content4_img.src=imgpath4;
      content4_h1.innerText=data[3].title;
      content4_explanation1.innerText=data[3].content_text;
      content4_button.href=`http://localhost:8000/admin/change_detail?id=${data[3].content_id}`
    }
    
  }