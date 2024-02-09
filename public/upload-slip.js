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
        document.getElementById('addImg').style.display = "";
    }

    if(index == 5){
        if(this.customFile51){
            this.customFile51.value = "";
        }
        var selectedImage = document.getElementById('selectedImage51');
        selectedImage.src = "icon/image.png";
        selectedImage.style.width = 'auto';
        document.getElementById("divSelectedImage51").style.setProperty("display", "none", "important");

        if(this.customFile52){
            this.customFile52.value = "";
        }
        var selectedImage = document.getElementById('selectedImage52');
        selectedImage.src = "icon/image.png";
        selectedImage.style.width = 'auto';
        document.getElementById("divSelectedImage52").style.setProperty("display", "none", "important");

        if(this.customFile53){
            this.customFile53.value = "";
        }
        var selectedImage = document.getElementById('selectedImage53');
        selectedImage.src = "icon/image.png";
        selectedImage.style.width = 'auto';
        document.getElementById("divSelectedImage53").style.setProperty("display", "none", "important");
    }else if(index == 4){
        if(this.customFile41){
            this.customFile41.value = "";
        }
        var selectedImage = document.getElementById('selectedImage41');
        selectedImage.src = "icon/image.png";
        selectedImage.style.width = 'auto';
        document.getElementById("divSelectedImage41").style.setProperty("display", "none", "important");

        if(this.customFile42){
            this.customFile42.value = "";
        }
        var selectedImage = document.getElementById('selectedImage42');
        selectedImage.src = "icon/image.png";
        selectedImage.style.width = 'auto';
        document.getElementById("divSelectedImage42").style.setProperty("display", "none", "important");

        if(this.customFile43){
            this.customFile43.value = "";
        }
        var selectedImage = document.getElementById('selectedImage43');
        selectedImage.src = "icon/image.png";
        selectedImage.style.width = 'auto';
        document.getElementById("divSelectedImage43").style.setProperty("display", "none", "important");
    }else if(index == 3){
        if(this.customFile31){
            this.customFile31.value = "";
        }
        var selectedImage = document.getElementById('selectedImage31');
        selectedImage.src = "icon/image.png";
        selectedImage.style.width = 'auto';
        document.getElementById("divSelectedImage31").style.setProperty("display", "none", "important");

        if(this.customFile32){
            this.customFile32.value = "";
        }
        var selectedImage = document.getElementById('selectedImage32');
        selectedImage.src = "icon/image.png";
        selectedImage.style.width = 'auto';
        document.getElementById("divSelectedImage32").style.setProperty("display", "none", "important");

        if(this.customFile33){
            this.customFile33.value = "";
        }
        var selectedImage = document.getElementById('selectedImage33');
        selectedImage.src = "icon/image.png";
        selectedImage.style.width = 'auto';
        document.getElementById("divSelectedImage33").style.setProperty("display", "none", "important");
    }else if(index == 2){
        if(this.customFile21){
            this.customFile21.value = "";
        }
        var selectedImage = document.getElementById('selectedImage21');
        selectedImage.src = "icon/image.png";
        selectedImage.style.width = 'auto';
        document.getElementById("divSelectedImage21").style.setProperty("display", "none", "important");

        if(this.customFile22){
            this.customFile22.value = "";
        }
        var selectedImage = document.getElementById('selectedImage22');
        selectedImage.src = "icon/image.png";
        selectedImage.style.width = 'auto';
        document.getElementById("divSelectedImage22").style.setProperty("display", "none", "important");

        if(this.customFile23){
            this.customFile23.value = "";
        }
        var selectedImage = document.getElementById('selectedImage23');
        selectedImage.src = "icon/image.png";
        selectedImage.style.width = 'auto';
        document.getElementById("divSelectedImage23").style.setProperty("display", "none", "important");
    }

    this.index--;
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
    var file11;
    if(this.customFile11){
        file11 = this.customFile11.files[0];
    }
    var file12;
    if(this.customFile12){
        file12 = this.customFile12.files[0];
    }
    var file13;
    if(this.customFile13){
        file13 = this.customFile13.files[0];
    }

    var file21;
    if(this.customFile21){
        file21 = this.customFile21.files[0];
    }
    var file22;
    if(this.customFile22){
        file22 = this.customFile22.files[0];
    }
    var file23;
    if(this.customFile23){
        file23 = this.customFile23.files[0];
    }

    var file31;
    if(this.customFile31){
        file31 = this.customFile31.files[0];
    }
    var file32;
    if(this.customFile32){
        file32 = this.customFile32.files[0];
    }
    var file33;
    if(this.customFile33){
        file33 = this.customFile33.files[0];
    }

    var file41;
    if(this.customFile41){
        file41 = this.customFile41.files[0];
    }
    var file42;
    if(this.customFile42){
        file42 = this.customFile42.files[0];
    }
    var file43;
    if(this.customFile43){
        file43 = this.customFile43.files[0];
    }

    var file51;
    if(this.customFile51){
        file51 = this.customFile51.files[0];
    }
    var file52;
    if(this.customFile52){
        file52 = this.customFile52.files[0];
    }
    var file53;
    if(this.customFile53){
        file53 = this.customFile53.files[0];
    }

    if(!file11 && !file12 && !file13 &&
        !file21 && !file22 && !file23 &&
        !file31 && !file32 && !file33 &&
        !file41 && !file42 && !file43 &&
        !file51 && !file52 && !file53){
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
      html: "<b style='font-size: 24px;'>ยืนยันการอัปโหลดใบเสร็จใช่ไหม</b><br><br><label style='font-size: 20px;'></label>",
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

        var file11 = new File([""], "");
        if(this.customFile11){
            file11 = this.customFile11.files[0];
        }
        
        var file12 = new File([""], "");
        if(this.customFile12){
            file12 = this.customFile12.files[0];
        }

        var file13 = new File([""], "");
        if(this.customFile13){
            file13 = this.customFile13.files[0];
        }

        var file21 = new File([""], "");
        if(this.customFile21){
            file21 = this.customFile21.files[0];
        }
        
        var file22 = new File([""], "");
        if(this.customFile22){
            file22 = this.customFile22.files[0];
        }

        var file23 = new File([""], "");
        if(this.customFile23){
            file23 = this.customFile23.files[0];
        }

        var file31 = new File([""], "");
        if(this.customFile31){
            file31 = this.customFile31.files[0];
        }
        
        var file32 = new File([""], "");
        if(this.customFile32){
            file32 = this.customFile32.files[0];
        }

        var file33 = new File([""], "");
        if(this.customFile33){
            file33 = this.customFile33.files[0];
        }

        var file41 = new File([""], "");
        if(this.customFile41){
            file41 = this.customFile41.files[0];
        }
        
        var file42 = new File([""], "");
        if(this.customFile42){
            file42 = this.customFile42.files[0];
        }

        var file43 = new File([""], "");
        if(this.customFile43){
            file43 = this.customFile43.files[0];
        }

        var file51 = new File([""], "");
        if(this.customFile51){
            file51 = this.customFile51.files[0];
        }
        
        var file52 = new File([""], "");
        if(this.customFile52){
            file52 = this.customFile52.files[0];
        }

        var file53 = new File([""], "");
        if(this.customFile53){
            file53 = this.customFile53.files[0];
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
            swalSuccess('อัปโหลดใบเสร็จเรียบร้อย','');
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

var customFile11;
var customFile12;
var customFile13;
var customFile21;
var customFile22;
var customFile23;
var customFile31;
var customFile32;
var customFile33;
var customFile41;
var customFile42;
var customFile43;
var customFile51;
var customFile52;
var customFile53;
function openCustomFile(index){
    console.log('== openCustomFile ==');
    Swal.fire({
        // title: "ข้อตกลง Consent การให้ข้อมูลส่วนบุคคล",
        html: '<fieldset id="originalFieldset2" class="border p-2">'+
        '<legend  class="w-auto legend-header" style="text-align: left;color: #1ab196;"> รูปใบเสร็จ</legend>'+
        '<div class="mb-3" style="margin-top: 10px;">'+
        '   <div class="mb-4 d-flex justify-content-center">'+
        '       <img id="selectedImage1" src="icon/image.png" alt="example placeholder" />'+
        '   </div>'+
        '   <div class="d-flex justify-content-center">'+
        '       <div class="btn btn-primary btn-rounded">'+
        '           <label class="form-label text-white m-1" for="customFile1">รูปที่1</label>'+
        '           <input type="file" class="form-control d-none" id="customFile1" onchange="displaySelectedImage(event, \'selectedImage1\')" />'+
        '       </div>'+
        '       <button type="button" class="btn btn-danger" style="margin-left: 20px;font-size: 1.6em;" onclick="removeImage(\'1\')">ลบรูปที่1</button>'+
        '   </div>'+
        '</div>'+
        '<hr>'+
        '<div class="mb-3" style="margin-top: 10px;">'+
        '   <div class="mb-4 d-flex justify-content-center">'+
        '       <img id="selectedImage2" src="icon/image.png" alt="example placeholder" />'+
        '   </div>'+
        '   <div class="d-flex justify-content-center">'+
        '       <div class="btn btn-primary btn-rounded">'+
        '           <label class="form-label text-white m-1" for="customFile2">รูปที่2</label>'+
        '           <input type="file" class="form-control d-none" id="customFile2" onchange="displaySelectedImage(event, \'selectedImage2\')" />'+
        '       </div>'+
        '       <button type="button" class="btn btn-danger" style="margin-left: 20px;font-size: 1.6em;" onclick="removeImage(\'2\')">ลบรูปที่2</button>'+
        '   </div>'+
        '</div>'+
        '<hr>'+
        '<div class="mb-3" style="margin-top: 10px;">'+
        '   <div class="mb-4 d-flex justify-content-center">'+
        '       <img id="selectedImage3" src="icon/image.png" alt="example placeholder" />'+
        '   </div>'+
        '   <div class="d-flex justify-content-center">'+
        '       <div class="btn btn-primary btn-rounded">'+
        '           <label class="form-label text-white m-1" for="customFile3">รูปที่3</label>'+
        '           <input type="file" class="form-control d-none" id="customFile3" onchange="displaySelectedImage(event, \'selectedImage3\')" />'+
        '       </div>'+
        '       <button type="button" class="btn btn-danger" style="margin-left: 20px;font-size: 1.6em;" onclick="removeImage(\'3\')">ลบรูปที่3</button>'+
        '   </div>'+
        '</div>'+
        '</fieldset>'+
        '<br>'+
        '<button type="button" class="btn btn-success" style="font-size: 1.6em;" onclick="confirmSwal('+index+')">ยืนยัน</button>'+
        '<button type="button" class="btn btn-secondary" style="margin-left: 20px;font-size: 1.6em;" onclick="closeSwal()">ปิด</button>',
        // text: "เมื่อคุณยินยอมข้อตกลงนี้ (ต่อไปจะเรียกว่า \"ผู้ให้ข้อมูล\") ในวันที่ยินยอมให้ข้อมูลเป็นต้นไป\n\n1. ข้อมูลที่จะให้\nผู้ให้ข้อมูลยินยอมให้โรงพยาบาลในเครือ เข้าถึงและใช้ข้อมูลส่วนบุคคลต่อไปนี้:",
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false
    });

    var file11;
    if(this.customFile11){
        file11 = this.customFile11.files[0];
    }
    var file12;
    if(this.customFile12){
        file12 = this.customFile12.files[0];
    }
    var file13;
    if(this.customFile13){
        file13 = this.customFile13.files[0];
    }

    var file21;
    if(this.customFile21){
        file21 = this.customFile21.files[0];
    }
    var file22;
    if(this.customFile22){
        file22 = this.customFile22.files[0];
    }
    var file23;
    if(this.customFile23){
        file23 = this.customFile23.files[0];
    }

    var file31;
    if(this.customFile31){
        file31 = this.customFile31.files[0];
    }
    var file32;
    if(this.customFile32){
        file32 = this.customFile32.files[0];
    }
    var file33;
    if(this.customFile33){
        file33 = this.customFile33.files[0];
    }

    var file41;
    if(this.customFile41){
        file41 = this.customFile41.files[0];
    }
    var file42;
    if(this.customFile42){
        file42 = this.customFile42.files[0];
    }
    var file43;
    if(this.customFile43){
        file43 = this.customFile43.files[0];
    }

    var file51;
    if(this.customFile51){
        file51 = this.customFile51.files[0];
    }
    var file52;
    if(this.customFile52){
        file52 = this.customFile52.files[0];
    }
    var file53;
    if(this.customFile53){
        file53 = this.customFile53.files[0];
    }

    if(index == 1){
        if(file11){
            var customFile1 = document.getElementById('customFile1');
            customFile1.files = this.customFile11.files;
            const selectedImage = document.getElementById('selectedImage1');
            if (customFile1.files && customFile1.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile1.files[0]);
            }
        }
        if(file12){
            var customFile2 = document.getElementById('customFile2');
            customFile2.files = this.customFile12.files;
            const selectedImage = document.getElementById('selectedImage2');
            if (customFile2.files && customFile2.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile2.files[0]);
            }
        }
        if(file13){
            var customFile3 = document.getElementById('customFile3');
            customFile3.files = this.customFile13.files;
            const selectedImage = document.getElementById('selectedImage3');
            if (customFile3.files && customFile3.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile3.files[0]);
            }
        }
    }else if(index == 2){
        if(file21){
            var customFile1 = document.getElementById('customFile1');
            customFile1.files = this.customFile21.files;
            const selectedImage = document.getElementById('selectedImage1');
            if (customFile1.files && customFile1.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile1.files[0]);
            }
        }
        if(file22){
            var customFile2 = document.getElementById('customFile2');
            customFile2.files = this.customFile22.files;
            const selectedImage = document.getElementById('selectedImage2');
            if (customFile2.files && customFile2.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile2.files[0]);
            }
        }
        if(file23){
            var customFile3 = document.getElementById('customFile3');
            customFile3.files = this.customFile23.files;
            const selectedImage = document.getElementById('selectedImage3');
            if (customFile3.files && customFile3.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile3.files[0]);
            }
        }
    }else if(index == 3){
        if(file31){
            var customFile1 = document.getElementById('customFile1');
            customFile1.files = this.customFile31.files;
            const selectedImage = document.getElementById('selectedImage1');
            if (customFile1.files && customFile1.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile1.files[0]);
            }
        }
        if(file32){
            var customFile2 = document.getElementById('customFile2');
            customFile2.files = this.customFile32.files;
            const selectedImage = document.getElementById('selectedImage2');
            if (customFile2.files && customFile2.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile2.files[0]);
            }
        }
        if(file33){
            var customFile3 = document.getElementById('customFile3');
            customFile3.files = this.customFile33.files;
            const selectedImage = document.getElementById('selectedImage3');
            if (customFile3.files && customFile3.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile3.files[0]);
            }
        }
    }else if(index == 4){
        if(file41){
            var customFile1 = document.getElementById('customFile1');
            customFile1.files = this.customFile41.files;
            const selectedImage = document.getElementById('selectedImage1');
            if (customFile1.files && customFile1.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile1.files[0]);
            }
        }
        if(file42){
            var customFile2 = document.getElementById('customFile2');
            customFile2.files = this.customFile42.files;
            const selectedImage = document.getElementById('selectedImage2');
            if (customFile2.files && customFile2.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile2.files[0]);
            }
        }
        if(file43){
            var customFile3 = document.getElementById('customFile3');
            customFile3.files = this.customFile43.files;
            const selectedImage = document.getElementById('selectedImage3');
            if (customFile3.files && customFile3.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile3.files[0]);
            }
        }
    }else if(index == 5){
        if(file51){
            var customFile1 = document.getElementById('customFile1');
            customFile1.files = this.customFile51.files;
            const selectedImage = document.getElementById('selectedImage1');
            if (customFile1.files && customFile1.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile1.files[0]);
            }
        }
        if(file52){
            var customFile2 = document.getElementById('customFile2');
            customFile2.files = this.customFile52.files;
            const selectedImage = document.getElementById('selectedImage2');
            if (customFile2.files && customFile2.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile2.files[0]);
            }
        }
        if(file53){
            var customFile3 = document.getElementById('customFile3');
            customFile3.files = this.customFile53.files;
            const selectedImage = document.getElementById('selectedImage3');
            if (customFile3.files && customFile3.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(customFile3.files[0]);
            }
        }
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


function confirmSwal(index){
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
            allowOutsideClick: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ตกลง'
          }).then((result) => {
            openCustomFile(index)
          })
        return;
    }

    if(index == 1){
        if(file1){
            this.customFile11 = customFile1;
            const selectedImage = document.getElementById('selectedImage11');
            if (this.customFile11.files && this.customFile11.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile11.files[0]);
                
                document.getElementById("divSelectedImage11").style.display = "";
            }
        }else{
            if(this.customFile11){
                this.customFile11.value = "";
            }
            const selectedImage = document.getElementById('selectedImage11');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage11").style.setProperty("display", "none", "important");
        }
        if(file2){
            this.customFile12 = customFile2;
            const selectedImage = document.getElementById('selectedImage12');
            if (this.customFile12.files && this.customFile12.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile12.files[0]);
                
                document.getElementById("divSelectedImage12").style.display = "";
            }
        }else{
            if(this.customFile12){
                this.customFile12.value = "";
            }
            const selectedImage = document.getElementById('selectedImage12');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage12").style.setProperty("display", "none", "important");
        }
        if(file3){
            this.customFile13 = customFile3;
            const selectedImage = document.getElementById('selectedImage13');
            if (this.customFile13.files && this.customFile13.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile13.files[0]);
                
                document.getElementById("divSelectedImage13").style.display = "";
            }
        }else{
            if(this.customFile13){
                this.customFile13.value = "";
            }
            const selectedImage = document.getElementById('selectedImage13');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage13").style.setProperty("display", "none", "important");
        }
    }else if(index == 2){
        if(file1){
            this.customFile21 = customFile1;
            const selectedImage = document.getElementById('selectedImage21');
            if (this.customFile21.files && this.customFile21.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile21.files[0]);
                
                document.getElementById("divSelectedImage21").style.display = "";
            }
        }else{
            if(this.customFile21){
                this.customFile21.value = "";
            }
            const selectedImage = document.getElementById('selectedImage21');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage21").style.setProperty("display", "none", "important");
        }
        if(file2){
            this.customFile22 = customFile2;
            const selectedImage = document.getElementById('selectedImage22');
            if (this.customFile22.files && this.customFile22.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile22.files[0]);
                
                document.getElementById("divSelectedImage22").style.display = "";
            }
        }else{
            if(this.customFile22){
                this.customFile22.value = "";
            }
            const selectedImage = document.getElementById('selectedImage22');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage22").style.setProperty("display", "none", "important");
        }
        if(file3){
            this.customFile23 = customFile3;
            const selectedImage = document.getElementById('selectedImage23');
            if (this.customFile23.files && this.customFile23.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile23.files[0]);
                
                document.getElementById("divSelectedImage23").style.display = "";
            }
        }else{
            if(this.customFile23){
                this.customFile23.value = "";
            }
            const selectedImage = document.getElementById('selectedImage23');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage23").style.setProperty("display", "none", "important");
        }
    }else if(index == 3){
        if(file1){
            this.customFile31 = customFile1;
            const selectedImage = document.getElementById('selectedImage31');
            if (this.customFile31.files && this.customFile31.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile31.files[0]);
                
                document.getElementById("divSelectedImage31").style.display = "";
            }
        }else{
            if(this.customFile31){
                this.customFile31.value = "";
            }
            const selectedImage = document.getElementById('selectedImage31');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage31").style.setProperty("display", "none", "important");
        }
        if(file2){
            this.customFile32 = customFile2;
            const selectedImage = document.getElementById('selectedImage32');
            if (this.customFile32.files && this.customFile32.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile32.files[0]);
                
                document.getElementById("divSelectedImage32").style.display = "";
            }
        }else{
            if(this.customFile32){
                this.customFile32.value = "";
            }
            const selectedImage = document.getElementById('selectedImage32');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage32").style.setProperty("display", "none", "important");
        }
        if(file3){
            this.customFile33 = customFile3;
            const selectedImage = document.getElementById('selectedImage33');
            if (this.customFile33.files && this.customFile33.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile33.files[0]);
                
                document.getElementById("divSelectedImage33").style.display = "";
            }
        }else{
            if(this.customFile33){
                this.customFile33.value = "";
            }
            const selectedImage = document.getElementById('selectedImage33');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage33").style.setProperty("display", "none", "important");
        }
    }else if(index == 4){
        if(file1){
            this.customFile41 = customFile1;
            const selectedImage = document.getElementById('selectedImage41');
            if (this.customFile41.files && this.customFile41.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile41.files[0]);
                
                document.getElementById("divSelectedImage41").style.display = "";
            }
        }else{
            if(this.customFile41){
                this.customFile41.value = "";
            }
            const selectedImage = document.getElementById('selectedImage41');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage41").style.setProperty("display", "none", "important");
        }
        if(file2){
            this.customFile42 = customFile2;
            const selectedImage = document.getElementById('selectedImage42');
            if (this.customFile42.files && this.customFile42.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile42.files[0]);
                
                document.getElementById("divSelectedImage42").style.display = "";
            }
        }else{
            if(this.customFile42){
                this.customFile42.value = "";
            }
            const selectedImage = document.getElementById('selectedImage42');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage42").style.setProperty("display", "none", "important");
        }
        if(file3){
            this.customFile43 = customFile3;
            const selectedImage = document.getElementById('selectedImage43');
            if (this.customFile43.files && this.customFile43.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile43.files[0]);
                
                document.getElementById("divSelectedImage43").style.display = "";
            }
        }else{
            if(this.customFile43){
                this.customFile43.value = "";
            }
            const selectedImage = document.getElementById('selectedImage43');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage43").style.setProperty("display", "none", "important");
        }
    }else if(index == 5){
        if(file1){
            this.customFile51 = customFile1;
            const selectedImage = document.getElementById('selectedImage51');
            if (this.customFile51.files && this.customFile51.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile51.files[0]);
                
                document.getElementById("divSelectedImage51").style.display = "";
            }
        }else{
            if(this.customFile51){
                this.customFile51.value = "";
            }
            const selectedImage = document.getElementById('selectedImage51');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage51").style.setProperty("display", "none", "important");
        }
        if(file2){
            this.customFile52 = customFile2;
            const selectedImage = document.getElementById('selectedImage52');
            if (this.customFile52.files && this.customFile52.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile52.files[0]);
                
                document.getElementById("divSelectedImage52").style.display = "";
            }
        }else{
            if(this.customFile52){
                this.customFile52.value = "";
            }
            const selectedImage = document.getElementById('selectedImage52');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage52").style.setProperty("display", "none", "important");
        }
        if(file3){
            this.customFile53 = customFile3;
            const selectedImage = document.getElementById('selectedImage53');
            if (this.customFile53.files && this.customFile53.files[0]) {
                const reader = new FileReader();
        
                reader.onload = function(e) {
                    selectedImage.src = e.target.result;
                    selectedImage.style.width = '100%';
                };
        
                reader.readAsDataURL(this.customFile53.files[0]);
                
                document.getElementById("divSelectedImage53").style.display = "";
            }
        }else{
            if(this.customFile53){
                this.customFile53.value = "";
            }
            const selectedImage = document.getElementById('selectedImage53');
            selectedImage.src = "icon/image.png";
            selectedImage.style.width = 'auto';
            document.getElementById("divSelectedImage53").style.setProperty("display", "none", "important");
        }
    }


    Swal.clickConfirm();
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