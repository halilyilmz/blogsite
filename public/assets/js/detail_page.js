const text1=document.querySelector(".text1")
const text2=document.querySelector(".text2")
const text3=document.querySelector(".text3")
const text4=document.querySelector(".text4")
const text5=document.querySelector(".text5")
const text6=document.querySelector(".text6")
const content_title=document.querySelector(".content_title");
const content_main_title=document.querySelector(".content_main_title");
const contentinsidetitle=document.querySelector(".contentinsidetitle");
const img = document.querySelector(".top_img_img");
const topp_content_note=document.querySelector(".top_content_note");


const top_img=document.querySelector(".top_img_img")


const urlParams = new URLSearchParams(window.location.search);
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');


getrecord(id).then((record)=>{
    splittext(record.content_text).then((splitedtext)=>{
        connectrecordtofrontend(splitedtext,record);
    })
})





async function getrecord(id){
    let record=await fetch(` http://localhost:8000/contentdetails/${id}`)
    record=await record.json();
    return record;
}

async function splittext(text){
    const splitedtext=text.split("\r\n");
    return splitedtext
}

async function connectrecordtofrontend(splitedtext,record){
    text1.textContent=splitedtext[0];
    text2.textContent=splitedtext[1];
    text3.textContent=splitedtext[2];
    text4.textContent=splitedtext[3];
    text5.textContent=splitedtext[4];
    text6.textContent=splitedtext[5];
    console.log(record);
    content_title.textContent=record.title;
    content_main_title.textContent=record.title;
    contentinsidetitle.textContent=record.content_inside_title;
    topp_content_note.textContent=record.note;

    let imgpath1="http://localhost:8000/"+ record.image_path;
    img.src=imgpath1;

}
