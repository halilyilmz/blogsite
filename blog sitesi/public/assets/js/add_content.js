let imgcurrent = document.getElementById("imgcurrent")

let imgnext = document.getElementById("imageUpload")

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