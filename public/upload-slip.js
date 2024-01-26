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
    var customFile1 = document.getElementById("customFile1");
    const file1 = customFile1.files[0];
    var customFile2 = document.getElementById("customFile2");
    const file2 = customFile2.files[0];
    var customFile3 = document.getElementById("customFile3");
    const file3 = customFile3.files[0];

    if(!file1 && !file2 && !file3){
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

function nextToReward(){
    var url = "reward.html";
    window.location.href = url;
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
                userId:'test1',
                displayName:'test1',
                statusMessage:'test1',
                pictureUrl:'test1'
            }
        }

        const fileInput1 = document.getElementById('customFile1');
        var file1 = new File([""], "");
        if(fileInput1.files.length > 0){
            file1 = fileInput1.files[0];
        }
        
        const fileInput2 = document.getElementById('customFile2');
        var file2 = new File([""], "");
        if(fileInput2.files.length > 0){
            file2 = fileInput2.files[0];
        }

        const fileInput3 = document.getElementById('customFile3');
        var file3 = new File([""], "");
        if(fileInput3.files.length > 0){
            file3 = fileInput3.files[0];
        }

        document.getElementById("buttonSubmit").disabled = true;
        document.getElementById("overlay").style.display = "block";

        const formData = new FormData();
        formData.append('file1', file1);
        formData.append('file2', file2);
        formData.append('file3', file3);
        formData.append('lineUserId', profile.userId);

        console.log('file1:', file1);
        console.log('file2:', file2);
        console.log('file3:', file3);

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