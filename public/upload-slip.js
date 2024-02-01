document.addEventListener('DOMContentLoaded', function () {
    initializeLiff();
});

var roomNumber;
var profile;

async function initializeLiff() {
    console.log('--- initializeLiff ---')
    await liff.init({ liffId: LIFF_ID });

    const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
    const params = new URLSearchParams(queryString);
    const userId = params.get('userId');
    if (userId != null && userId != '') {
      console.log(userId);
    }

    if (!liff.isLoggedIn() && PROD) {
        const destinationUrl = window.location.href;
        liff.login({redirectUri: destinationUrl});
        return;
    }

    var profile
    if (PROD) {
        profile = await liff.getProfile();
    }else{
        profile = {
            userId:'U696407e9324efff51ab1652b92253add',
            displayName:'Tent365💰💰',
            statusMessage:'อย่าพยายาม ทำในสิ่งที่เป็นไปไม่ได้',
            pictureUrl:'https://profile.line-scdn.net/0h3-mBgel0bAJAO3l34VQSfTBrb2hjSjUQPw0jNnNoYWZ9CX8DaQoqMCY7MmUpDC9ROw5xYHE6YWFMKBtkXm2QNkcLMTN8CCtXa18i4w'
        }
    }
    const selectedImage = document.getElementById('img-profile');
    selectedImage.src = profile.pictureUrl;
}

var index = 1;
function addDiv(){
    this.index++;
    var idName = 'originalFieldset'+this.index;
    console.log(idName);
    document.getElementById(idName).style.display = "";
    document.getElementById('removeImg').style.display = "";

    if(this.index == 5){
        document.getElementById('addImg').style.display = "none";
    }else{
        document.getElementById('addImg').style.display = "";
    }
    
}

function removeDiv(){
    var idName = 'originalFieldset'+this.index;
    console.log(idName);
    document.getElementById(idName).style.display = "none";
    if(this.index == 2){
        document.getElementById('removeImg').style.display = "none";
    }else{
        document.getElementById('removeImg').style.display = "";
    }

    if(this.index == 5){
        document.getElementById('addImg').style.display = "none";
    }else{
        document.getElementById('addImg').style.display = "";
    }
    this.index--;
}

function displaySelectedImage(event, elementId) {
    console.log(elementId);
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            selectedImage.src = e.target.result;
            selectedImage.style.width = '100%';
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}

function validateUpload(){
    var customFile11 = document.getElementById("customFile11");
    const file11 = customFile11.files[0];
    var customFile12 = document.getElementById("customFile12");
    const file12 = customFile12.files[0];
    var customFile13 = document.getElementById("customFile13");
    const file13 = customFile13.files[0];

    var customFile21 = document.getElementById("customFile21");
    const file21 = customFile21.files[0];
    var customFile22 = document.getElementById("customFile22");
    const file22 = customFile22.files[0];
    var customFile23 = document.getElementById("customFile23");
    const file23 = customFile23.files[0];

    var customFile31 = document.getElementById("customFile31");
    const file31 = customFile31.files[0];
    var customFile32 = document.getElementById("customFile32");
    const file32 = customFile32.files[0];
    var customFile33 = document.getElementById("customFile33");
    const file33 = customFile33.files[0];

    var customFile41 = document.getElementById("customFile41");
    const file41 = customFile41.files[0];
    var customFile42 = document.getElementById("customFile42");
    const file42 = customFile42.files[0];
    var customFile43 = document.getElementById("customFile43");
    const file43 = customFile43.files[0];

    var customFile51 = document.getElementById("customFile51");
    const file51 = customFile51.files[0];
    var customFile52 = document.getElementById("customFile52");
    const file52 = customFile52.files[0];
    var customFile53 = document.getElementById("customFile53");
    const file53 = customFile53.files[0];

    if(!file11 && !file12 && !file13 &&
        !file21 && !file22 && !file23 &&
        !file31 && !file32 && !file33 &&
        !file41 && !file42 && !file43 &&
        !file51 && !file52 && !file53){
        Swal.fire({
            title: 'กรุณาอัปโหลดสลิปอย่างน้อย 1 สลิป',
            text: "อัปโหลดสลิปอย่างน้อย 1 สลิปเพื่อทำรายการ",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ตกลง'
          }).then((result) => {
            
          })
        return;
    }
    openDialogConfirm();
}

function openDialogConfirm(){
    Swal.fire({
    //   title: 'ยืนยันการส่งข้อมูลใช่ไหม?',
    //   text: "เมื่อกดยืนยัน คุณจะได้รับเลขนัดปรึกษาสัตวแพทย์ทางไลน์ หากไม่ได้รับกรุณาติดต่อแอดมิน",
      html: "<b style='font-size: 24px;'>ยืนยันการอัปโหลดสลิปใช่ไหม</b><br><br><label style='font-size: 20px;'></label>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        submit()
      }
    })
}

function swalSuccess(title,text){
    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
}

function swalError(title,text){
    Swal.fire({
        title: title,
        text: text,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ตกลง'
      }).then((result) => {
        
      })
}

async function submit(){
    try {
        if (!liff.isLoggedIn() && PROD) {
            const destinationUrl = window.location.href;
            liff.login({redirectUri: destinationUrl});
            return;
        }

        var profile
        if (PROD) {
            profile = await liff.getProfile();
        }else{
            profile = {
                userId:'U696407e9324efff51ab1652b92253add',
                displayName:'Tent365💰💰',
                statusMessage:'อย่าพยายาม ทำในสิ่งที่เป็นไปไม่ได้',
                pictureUrl:'https://profile.line-scdn.net/0h3-mBgel0bAJAO3l34VQSfTBrb2hjSjUQPw0jNnNoYWZ9CX8DaQoqMCY7MmUpDC9ROw5xYHE6YWFMKBtkXm2QNkcLMTN8CCtXa18i4w'
            }
        }

        const fileInput11 = document.getElementById('customFile11');
        var file11 = new File([""], "");
        if(fileInput11.files.length > 0){
            file11 = fileInput11.files[0];
        }
        
        const fileInput12 = document.getElementById('customFile12');
        var file12 = new File([""], "");
        if(fileInput12.files.length > 0){
            file12 = fileInput12.files[0];
        }

        const fileInput13 = document.getElementById('customFile13');
        var file13 = new File([""], "");
        if(fileInput13.files.length > 0){
            file13 = fileInput13.files[0];
        }

        const fileInput21 = document.getElementById('customFile21');
        var file21 = new File([""], "");
        if(fileInput21.files.length > 0){
            file21 = fileInput21.files[0];
        }
        
        const fileInput22 = document.getElementById('customFile22');
        var file22 = new File([""], "");
        if(fileInput22.files.length > 0){
            file22 = fileInput22.files[0];
        }

        const fileInput23 = document.getElementById('customFile23');
        var file23 = new File([""], "");
        if(fileInput23.files.length > 0){
            file23 = fileInput23.files[0];
        }

        const fileInput31 = document.getElementById('customFile31');
        var file31 = new File([""], "");
        if(fileInput31.files.length > 0){
            file31 = fileInput31.files[0];
        }
        
        const fileInput32 = document.getElementById('customFile32');
        var file32 = new File([""], "");
        if(fileInput32.files.length > 0){
            file32 = fileInput32.files[0];
        }

        const fileInput33 = document.getElementById('customFile33');
        var file33 = new File([""], "");
        if(fileInput33.files.length > 0){
            file33 = fileInput33.files[0];
        }

        const fileInput41 = document.getElementById('customFile41');
        var file41 = new File([""], "");
        if(fileInput41.files.length > 0){
            file41 = fileInput41.files[0];
        }
        
        const fileInput42 = document.getElementById('customFile42');
        var file42 = new File([""], "");
        if(fileInput42.files.length > 0){
            file42 = fileInput42.files[0];
        }

        const fileInput43 = document.getElementById('customFile43');
        var file43 = new File([""], "");
        if(fileInput43.files.length > 0){
            file43 = fileInput43.files[0];
        }

        const fileInput51 = document.getElementById('customFile51');
        var file51 = new File([""], "");
        if(fileInput51.files.length > 0){
            file51 = fileInput51.files[0];
        }
        
        const fileInput52 = document.getElementById('customFile52');
        var file52 = new File([""], "");
        if(fileInput52.files.length > 0){
            file52 = fileInput52.files[0];
        }

        const fileInput53 = document.getElementById('customFile53');
        var file53 = new File([""], "");
        if(fileInput53.files.length > 0){
            file53 = fileInput53.files[0];
        }

        document.getElementById("buttonSubmit").disabled = true;
        document.getElementById("overlay").style.display = "block";

        const formData = new FormData();
        formData.append('file11', file11);
        formData.append('file12', file12);
        formData.append('file13', file13);
        formData.append('file21', file21);
        formData.append('file22', file22);
        formData.append('file23', file23);
        formData.append('file31', file31);
        formData.append('file32', file32);
        formData.append('file33', file33);
        formData.append('file41', file41);
        formData.append('file42', file42);
        formData.append('file43', file43);
        formData.append('file51', file51);
        formData.append('file52', file52);
        formData.append('file53', file53);
        formData.append('lineUserId', profile.userId);

        const response = await fetch(URL_UPLOAD_SLIP, {
            method: 'POST',
            body: formData
        });
        document.getElementById("overlay").style.display = "none";
        console.log('response:', response);
        if(response.status == 200){
            const data = await response.json();
            console.log('API Response:', data);
            swalSuccess('อัปโหลดสลิปเรียบร้อย','');
            setTimeout(liff.closeWindow(), 1500);
        }else{
            document.getElementById("buttonSubmit").disabled = false;
            swalError('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง','');
        }

    } catch (error) {
        swalError('เกิดข้อผิดพลาด','');
        console.error('API Error:', error);
    }
}