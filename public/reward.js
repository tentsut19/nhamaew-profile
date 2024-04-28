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

function validateValue(){
    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var gender = document.getElementById("gender");
    var phoneNumber = document.getElementById("phoneNumber");
    var email = document.getElementById("email");
    var district = document.getElementById("district");
    var amphoe = document.getElementById("amphoe");
    var province = document.getElementById("province");
    var zipcode = document.getElementById("zipcode");
    var petTotal = document.getElementById("petTotal");
    var consent = document.getElementById("consent");

    var valid = true;
    valid = valid && firstNameText(firstName,100);
    valid = valid && lastNameText(lastName,100);
    valid = valid && addOrRemoveClassIsInvalid(gender);
    valid = valid && phoneNumberText(phoneNumber,100);
    valid = valid && emailText(email,100);
    valid = valid && addOrRemoveClassIsInvalid(province);
    valid = valid && addOrRemoveClassIsInvalid(amphoe);
    valid = valid && addOrRemoveClassIsInvalid(district);
    valid = valid && addOrRemoveClassIsInvalid(zipcode);
    valid = valid && addOrRemoveClassIsInvalid(petTotal);
    valid = valid && validateConsent(consent);

    if(!valid){
        // Swal.fire({
        //     title: 'กรุณากรอกข้อมูลให้ครบ',
        //     text: "กรุณากรอกข้อมูลให้ครบเพื่อไปต่อได้",
        //     icon: 'warning',
        //     confirmButtonColor: '#3085d6',
        //     confirmButtonText: 'ตกลง'
        //   }).then((result) => {
            
        //   })
        return;
    }
    openDialogConfirm();
}

function addOrRemoveClassIsInvalid(ele,limit){
    if(!ele.value || ele.value.length > limit){
        ele.classList.add("is-invalid");
        ele.scrollIntoView({ behavior: 'auto' });
        window.scrollBy(0, -40);
        return false;
    }else{
        ele.classList.remove("is-invalid");
        return true;
    }
}

function firstNameText(ele,limit){
    if(ele && ele.value){
        document.getElementById('firstNameText').innerHTML = ele.value.length+'/100';
        if(ele.value.length > limit){
            document.getElementById('firstNameTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('firstNameTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
    }else{
        document.getElementById('firstNameTextInvalid').innerHTML = 'กรุณากรอกข้อมูล';
        document.getElementById('firstNameText').innerHTML = '0/100';
        ele.classList.add("is-invalid");
        ele.scrollIntoView({ behavior: 'auto' });
        window.scrollBy(0, -40);
        return false;
    }
}

function lastNameText(ele,limit){
    if(ele && ele.value){
        document.getElementById('lastNameText').innerHTML = ele.value.length+'/100';
        if(ele.value.length > limit){
            document.getElementById('lastNameTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('lastNameTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
    }else{
        document.getElementById('lastNameTextInvalid').innerHTML = 'กรุณากรอกข้อมูล';
        document.getElementById('lastNameText').innerHTML = '0/100';
        ele.classList.add("is-invalid");
        ele.scrollIntoView({ behavior: 'auto' });
        window.scrollBy(0, -40);
        return false;
    }
}

function phoneNumberText(ele,limit){
    if(ele && ele.value){
        document.getElementById('phoneNumberText').innerHTML = ele.value.length+'/100';
        if(ele.value.length > limit){
            document.getElementById('phoneNumberTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('phoneNumberTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
    }else{
        document.getElementById('phoneNumberTextInvalid').innerHTML = 'กรุณากรอกข้อมูล';
        document.getElementById('phoneNumberText').innerHTML = '0/100';
        ele.classList.add("is-invalid");
        ele.scrollIntoView({ behavior: 'auto' });
        window.scrollBy(0, -40);
        return false;
    }
}

function emailText(ele,limit){
    if(ele && ele.value){
        document.getElementById('emailText').innerHTML = ele.value.length+'/100';
        if(ele.value.length > limit){
            document.getElementById('emailTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('emailTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
    }else{
        document.getElementById('emailText').innerHTML = '0/100';
        ele.classList.remove("is-invalid");
        return true;
    }
}

function clickConsent(){
    var consent = document.getElementById("consent");
    validateConsent(consent);
}

function validateConsent(ele){
    if(ele.checked){
        document.getElementById("consentInvalid").style.display = 'none';
        return true;
    }else{
        document.getElementById("consentInvalid").style.display = '';
        return false;
    }
}

function openConsent(){
    Swal.fire({
        // title: "ข้อตกลง Consent การให้ข้อมูลส่วนบุคคล",
        html: "<button style='background-color: #D3AD80;color: white;width: 100%;' class='btn' type='button' onclick='closeSwal()'>ปิด</button><br><br><b style='font-size: 18px;'>ข้อตกลง Consent การให้ข้อมูลส่วนบุคคล</b><br><br><div style='text-align: left;'><label style='font-size: 14px;'>เมื่อคุณยินยอมข้อตกลงนี้ (ต่อไปจะเรียกว่า \"ผู้ให้ข้อมูล\") ในวันที่ยินยอมให้ข้อมูลเป็นต้นไป</label><br><b style='font-size: 14px;'>1. ข้อมูลที่จะให้</b><br><label style='font-size: 14px;margin-bottom: 0;'>ผู้ให้ข้อมูลยินยอมให้โรงพยาบาลในเครือ เข้าถึงและใช้ข้อมูลส่วนบุคคลต่อไปนี้:</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลเบื้องต้นของเจ้าของและสัตว์เลี้ยง</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลสุขภาพทั่วไปของสัตว์เลี้ยงประวัติการรักษาทางการแพทย์</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลเกี่ยวกับการนัดหมายและการรักษา</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลประวัติการจ่ายเงินและการเรียกเก็บเงิน</label><br><b style='font-size: 14px;'>‍2. วัตถุประสงค์ในการให้ข้อมูล</b><br><label style='font-size: 14px;margin-bottom: 0;'>ข้อมูลที่ได้รับจะถูกนำมาใช้เพื่อวัตถุประสงค์ต่อไปนี้:</label><label style='font-size: 14px;margin-bottom: 0;'>- การให้บริการทางการแพทย์</label><label style='font-size: 14px;margin-bottom: 0;'>- การจัดการนัดหมายและการรักษาการบันทึกประวัติการรักษา</label><label style='font-size: 14px;margin-bottom: 0;'>- การชำระเงิน</label><label style='font-size: 14px;margin-bottom: 0;'>- การปรับปรุงคุณภาพการบริการ</label><br><b style='font-size: 14px;'>‍3. การรักษาความปลอดภัยของข้อมูล</b><br><label style='font-size: 14px;margin-bottom: 0;'>‍โรงพยาบาลในเครือจะดูแลรักษาความปลอดภัยของข้อมูลส่วนบุคคลของผู้ให้ข้อมูลตามนโยบายความปลอดภัยที่เป็นไปตามกฎหมายที่เกี่ยวข้อง.</label><br><b style='font-size: 14px;'>‍‍4. การยกเลิก Consent</b><br><label style='font-size: 14px;margin-bottom: 0;'>‍‍ผู้ให้ข้อมูลสามารถยกเลิกการให้ข้อมูลได้โดยการแจ้งให้ทราบลายลักษณ์อักษรถึง support@petpaw.com การยกเลิกนี้จะมีผลเมื่อทางเราได้รับข้อมูลแล้วเท่านั้น</label><br><label style='font-size: 14px;margin-bottom: 0;'>‍‍วันที่: 19 ธันวาคม 2566</label></div><br><button style='background-color: #D3AD80;color: white;width: 100%;' class='btn' type='button' onclick='closeSwal()'>ปิด</button>",
        // text: "เมื่อคุณยินยอมข้อตกลงนี้ (ต่อไปจะเรียกว่า \"ผู้ให้ข้อมูล\") ในวันที่ยินยอมให้ข้อมูลเป็นต้นไป\n\n1. ข้อมูลที่จะให้\nผู้ให้ข้อมูลยินยอมให้โรงพยาบาลในเครือ เข้าถึงและใช้ข้อมูลส่วนบุคคลต่อไปนี้:",
        showCancelButton: false,
        showConfirmButton: false
    });
}

function openPopupReward(){
    Swal.fire({
        html: ''+
        '<button style="background-color: #D3AD80;color: white;width: 100%;" class="btn" type="button" onclick="closeSwal()">ปิด</button><br><br>'+
        '<b style="font-size: 18px;">รายชื่อผู้ได้รับรางวัล</b><br><br>'+
        '<div style="text-align: left;">'+
        '   <b style="font-size: 14px;">รางวัลที่1: ของรางวัลมูลค่า 1,000 บาท</b><br>'+
        '   <label style="font-size: 14px;margin-bottom: 0;">คุณชีวรัตน์ เนียมจีน</label><br>'+
        '   <img src="./pic/ชีวรัตน์ เนียมจีน 1.JPG" style="max-width:50%;height:auto;padding: 10px;" alt="reward placeholder" /><img src="./pic/ชีวรัตน์ เนียมจีน 2.JPG" style="max-width:50%;height:auto;padding: 10px;" alt="reward placeholder" /><br><br>'+
        '   <b style="font-size: 14px;">รางวัลที่2: ของรางวัลมูลค่า 500 บาท</b><br>'+
        '   <label style="font-size: 14px;margin-bottom: 0;">คุณวรรณภา สายเพ็ชร</label><br>'+
        '   <img src="./pic/วรรณภา สายเพ็ชร 1.JPG" style="max-width:50%;height:auto;padding: 10px;" alt="reward placeholder" /><img src="./pic/วรรณภา สายเพ็ชร 2.JPG" style="max-width:50%;height:auto;padding: 10px;" alt="reward placeholder" /><br><br>'+
        '   <b style="font-size: 14px;">รางวัลที่3: ของรางวัลมูลค่า 500 บาท</b><br>'+
        '   <label style="font-size: 14px;margin-bottom: 0;">คุณวิภาภรณ์ สงค์โพธิ์</label><br>'+
        '   <img src="./pic/วิภาภรณ์ สงค์โพธิ์ 1.JPG" style="max-width:50%;height:auto;padding: 10px;" alt="reward placeholder" /><img src="./pic/วิภาภรณ์ สงค์โพธิ์ 2.JPG" style="max-width:50%;height:auto;padding: 10px;" alt="reward placeholder" /><br><br>'+
        '</div><br><br>'+
        '<button style="background-color: #D3AD80;color: white;width: 100%;" class="btn" type="button" onclick="closeSwal()">ปิด</button>',
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false
    });
}


function closeSwal(){
    Swal.clickConfirm();
}

function openDialogConfirm(){
    Swal.fire({
    //   title: 'ยืนยันการส่งข้อมูลใช่ไหม?',
    //   text: "เมื่อกดยืนยัน คุณจะได้รับเลขนัดปรึกษาสัตวแพทย์ทางไลน์ หากไม่ได้รับกรุณาติดต่อแอดมิน",
      html: "<b style='font-size: 24px;'>ยืนยันการลงทะเบียนใช่ไหม</b><br><br><label style='font-size: 20px;'></label>",
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

        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var gender = document.getElementById("gender").value;
        var phoneNumber = document.getElementById("phoneNumber").value;
        var email = document.getElementById("email").value;
        var district = document.getElementById("district").value;
        var amphoe = document.getElementById("amphoe").value;
        var province = document.getElementById("province").value;
        var zipcode = document.getElementById("zipcode").value;
        var petTotal = document.getElementById("petTotal").value;

        document.getElementById("buttonSubmit").disabled = true;

        document.getElementById("overlay").style.display = "block";

        const response = await fetch(URL_REGISTER_USER, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lineUserId: profile.userId,
                displayName: profile.displayName,
                statusMessage: profile.statusMessage,
                pictureUrl: profile.pictureUrl,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                phoneNumber: phoneNumber,
                email: email,
                district: district,
                amphoe: amphoe,
                province: province,
                zipcode: zipcode,
                petTotal: petTotal
            })
        });

        document.getElementById("overlay").style.display = "none";
        console.log('response:', response);
        if(response.status == 200){
            const data = await response.json();
            console.log('API Response:', data);
            liff.closeWindow();
        }else{
            alert('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง');
        }
    } catch (error) {
        alert('เกิดข้อผิดพลาด');
        console.error('API Error:', error);
    }
}