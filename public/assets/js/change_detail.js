const urlParams = new URLSearchParams(window.location.search);
const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');


let imgcurrent = document.getElementById("imgcurrent")
let imgnext = document.getElementById("imageUpload")
let setnote=document.getElementById("note");
let setcontent_text=document.getElementById("longText");
let settitle=document.getElementById("title");
let setinside_title=document.getElementById("content_inside_title");
let settag1=document.getElementById("Hair");
let settag2=document.getElementById("Lifestyle");
let settag3=document.getElementById("must_read");
let form=document.getElementById("form");
let setcontent_id=document.getElementById("content_id")

if(id){
     getcontent(id);
}


imgnext.addEventListener("change", function (e) {
    if (e.target.files && e.target.files[0]) {
        // Dosyayı okuyup önizlemek için FileReader kullanılır
        const reader = new FileReader();
        reader.onload = function (event) {
            imgcurrent.src = event.target.result; // Base64 URI'yi görsele atar
            imgcurrent.style.maxHeight = "200px"; // Görselin boyutunu sınırla
        };
        reader.readAsDataURL(e.target.files[0]); // Dosyayı Base64 formatında okur
    }
});


async function getcontent(id) {
    let content=await fetch(`http://localhost:8000/homepage/contentdetails/${id}`)

    content=await content.json();
    let imglink= "http://localhost:8000/"+content.image_path;

    console.log( content.content_id);

    imgcurrent.src = imglink;

    setnote.value=content.note;
    setcontent_text.value=content.content_text;
    settitle.value=content.title;
    setinside_title.value=content.content_inside_title;

    if(content.tag_id==1){
        settag1.checked=true
    }
    else if(content.tag_id==2){
        settag2.checked=true
    }
    else if(content.tag_id==3){
        settag3.checked=true
    }
    else{
        console.log("content has no tag")
    }

    let yol=`http://localhost:8000/admin/update/${content.content_id}`;

    form.action=yol;
        
}