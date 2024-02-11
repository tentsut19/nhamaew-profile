document.addEventListener('DOMContentLoaded', function () {
    initializeLiff();
});

var roomNumber;
var profile;
var slipId;

async function initializeLiff() {
    console.log('--- initializeLiff ---')
    await liff.init({ liffId: LIFF_ID });

    const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
    const params = new URLSearchParams(queryString);
    this.slipId = params.get('slip_id');
    console.log(this.slipId);

    if (!liff.isLoggedIn() && PROD) {
        const destinationUrl = window.location.href;
        liff.login({redirectUri: destinationUrl});
        return;
    }
    getSlip(this.slipId);
}

async function getSlip(slipId){
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
            profile = profileTest;
        }

        document.getElementById("overlay").style.display = "block";

        const response = await fetch(URL_GET_SLIP+slipId, {
            method: 'GET'
        });

        document.getElementById("overlay").style.display = "none";
        console.log('response:', response);
        if(response.status == 200){
            const data = await response.json();
            console.log('API Response:', data);

            const selectedImage1 = document.getElementById('selectedImage1');
            if (data.urlSlip1) {
                selectedImage1.src = data.urlSlip1;
                selectedImage1.style.width = '100%';
            }
            const selectedImage2 = document.getElementById('selectedImage2');
            if (data.urlSlip2) {
                selectedImage2.src = data.urlSlip2;
                selectedImage2.style.width = '100%';
            }
            const selectedImage3 = document.getElementById('selectedImage3');
            if (data.urlSlip3) {
                selectedImage3.src = data.urlSlip3;
                selectedImage3.style.width = '100%';
            }

            if(!data.check1 && data.urlSlip1){
                document.getElementById("divButton1").style.setProperty("display", "none", "important");
            }
            if(!data.check2 && data.urlSlip2){
                document.getElementById("divButton2").style.setProperty("display", "none", "important");
            }
            if(!data.check3 && data.urlSlip3){
                document.getElementById("divButton3").style.setProperty("display", "none", "important");
            }

        }else{
            swalError('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง','');
        }
    } catch (error) {
        document.getElementById("overlay").style.display = "none";
        swalError('เกิดข้อผิดพลาด','');
        console.error('API Error:', error);
    }
}

function displaySelectedImage(event, elementId) {
    console.log(elementId);
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;
    console.log(fileInput.files);
    if (fileInput.files && fileInput.files[0]) {
        console.log("== FileReader ==");
        const reader = new FileReader();

        reader.onload = function(e) {
            selectedImage.src = e.target.result;
            selectedImage.style.width = '100%';
        };

        reader.readAsDataURL(fileInput.files[0]);
    }else{
        selectedImage.src = "icon/image.png";
        selectedImage.style.width = 'auto';
    }
}

function validateUpload(){
    var customFile1 = document.getElementById("customFile1");
    var file1;
    if(customFile1){
        file1 = customFile1.files[0];
    }
    var customFile2 = document.getElementById("customFile2");
    var file2;
    if(customFile2){
        file2 = customFile2.files[0];
    }
    var customFile3 = document.getElementById("customFile3");
    var file3;
    if(customFile3){
        file3 = customFile3.files[0];
    }

    if(!file1 && !file2 && !file3){
        Swal.fire({
            title: 'กรุณาอัปโหลดใบเสร็จอย่างน้อย 1 ใบเสร็จ',
            text: "อัปโหลดใบเสร็จอย่างน้อย 1 ใบเสร็จเพื่อทำรายการ",
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
      html: "<b style='font-size: 24px;'>ยืนยันการอัปโหลดแก้ไขใบเสร็จใช่ไหม</b><br><br><label style='font-size: 20px;'></label>",
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
            profile = profileTest;
        }

        var customFile1 = document.getElementById("customFile1");
        var file1 = new File([""], "");
        if(customFile1 && customFile1.files.length > 0){
            file1 = customFile1.files[0];
        }
        var customFile2 = document.getElementById("customFile2");
        var file2 = new File([""], "");
        if(customFile2 && customFile2.files.length > 0){
            file2 = customFile2.files[0];
        }
        var customFile3 = document.getElementById("customFile3");
        var file3 = new File([""], "");
        if(customFile3 && customFile3.files.length > 0){
            file3 = customFile3.files[0];
        }

        document.getElementById("buttonSubmit").disabled = true;
        document.getElementById("overlay").style.display = "block";

        const formData = new FormData();
        formData.append('file1', file1);
        formData.append('file2', file2);
        formData.append('file3', file3);
        formData.append('lineUserId', profile.userId);
        formData.append('slipId', this.slipId);

        const response = await fetch(URL_UPLOAD_SLIP_NOT_PASS, {
            method: 'POST',
            body: formData
        });
        document.getElementById("overlay").style.display = "none";
        console.log('response:', response);
        if(response.status == 200){
            const data = await response.json();
            console.log('API Response:', data);
            swalSuccess('อัปโหลดแก้ไขใบเสร็จเรียบร้อย','');
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

function removeImage(index){
    const selectedImage = document.getElementById('selectedImage'+index);
    selectedImage.src = "icon/image.png";
    selectedImage.style.width = 'auto';
    
    var customFile = document.getElementById("customFile"+index);
    if(customFile && customFile.files){
        customFile.value = "";
    }
}

function closeSwal(){
    Swal.clickConfirm();
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