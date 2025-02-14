const topimg=document.querySelector(".top_img_img");
const top_note=document.querySelector(".top_note");
const top_title=document.querySelector(".top_title");
const top_text=document.querySelector(".top_text");

const img1=document.querySelector(".img1");
const note1=document.querySelector(".note1");
const title1=document.querySelector(".title1");
const explanation1=document.querySelector(".explanation1");

const img2=document.querySelector(".img2");
const note2=document.querySelector(".note2");
const title2=document.querySelector(".title2");
const explanation2=document.querySelector(".explanation2");

const img3=document.querySelector(".img3");
const note3=document.querySelector(".note3");
const title3=document.querySelector(".title3");
const explanation3=document.querySelector(".explanation3");

const img4=document.querySelector(".img4");
const note4=document.querySelector(".note4");
const title4=document.querySelector(".title4");
const explanation4=document.querySelector(".explanation4");

const rightnote1=document.querySelector(".rightnote1")
const righttitle1=document.querySelector(".righttitle1")

const rightnote2=document.querySelector(".rightnote2")
const righttitle2=document.querySelector(".righttitle2")

const rightnote3=document.querySelector(".rightnote3")
const righttitle3=document.querySelector(".righttitle3")

const rightnote4=document.querySelector(".rightnote4")
const righttitle4=document.querySelector(".righttitle4")


getlastmaincontent().then((data)=>{
    settopcontent(data);
})

getlast4contentaccseptfirst().then((data)=>{
    setmaincontents(data);
})

getlastmustread4content().then((data)=>{
    setrightcontents(data.content);
    console.log(data.content)
})




function settopcontent(data){
    imgroad="http://localhost:8000/public/"+data.content.image_path;
    topimg.src=imgroad;
    top_note.textContent=data.content_note;
    top_title.textContent=data.content.title;
    top_text.textContent=data.content.content_text;
}

async function getlastmaincontent(){
    let content = await fetch("http://localhost:8000/lastcontent")
    content=await content.json()
    return content;
}

async function getlast4contentaccseptfirst(){
    let records=await fetch("http://localhost:8000/last4contentaccseptfirst");
    records=await records.json()
    return records;
}

function setmaincontents(data){
    let imgroad1="http://localhost:8000/public/"+data[0].image_path;
    img1.src=imgroad1;
    note1.textContent=data[0].content_text;
    title1.textContent=data[0].title;
    explanation1.textContent=data[0].content_text;

    let imgroad2="http://localhost:8000/public/"+data[1].image_path;
    img2.src=imgroad2;
    note2.textContent=data[1].content_text;
    title2.textContent=data[1].title;
    explanation2.textContent=data[1].content_text;

    let imgroad3="http://localhost:8000/public/"+data[2].image_path;
    img3.src=imgroad3;
    note3.textContent=data[2].content_text;
    title3.textContent=data[2].title;
    explanation3.textContent=data[2].content_text;

    let imgroad4="http://localhost:8000/public/"+data[3].image_path;
    img4.src=imgroad4;
    note4.textContent=data[3].content_text;
    title4.textContent=data[3].title;
    explanation4.textContent=data[3].content_text;
}

async function getlastmustread4content(){
    let last4mustread=await fetch("http://localhost:8000/last4mustreadcontent");
    last4mustread=await last4mustread.json();
    return last4mustread;
}

async function setrightcontents(data){
    rightnote1.textContent=data[0].note;
    righttitle1.textContent=data[0].title;

    rightnote2.textContent=data[1].note;
    righttitle2.textContent=data[1].title;
    
    rightnote3.textContent=data[2].note;
    righttitle3.textContent=data[2].title;

    rightnote4.textContent=data[3].note;
    righttitle4.textContent=data[3].title;

    console.log(data[3].content_note)
}