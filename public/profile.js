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

    getProvince();
    getLineProfile();
}

async function getLineProfile(){
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

        const selectedImage = document.getElementById('img-profile');
        selectedImage.src = profile.pictureUrl;

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
        var pointButton = document.getElementById("pointButton");

        document.getElementById("overlay").style.display = "block";

        const response = await fetch(URL_GET_LINE_PROFILE+profile.userId, {
            method: 'GET'
        });

        document.getElementById("overlay").style.display = "none";
        console.log('response:', response);
        if(response.status == 200){
            const data = await response.json();
            console.log('API Response:', data);

            firstName.value = data.firstName
            lastName.value = data.lastName
            gender.value = data.gender
            phoneNumber.value = data.phoneNumber
            email.value = data.email
            province.value = data.province
            console.log('before getAmphur');
            await getAmphur(data.province);
            console.log('after getAmphur');
            amphoe.value = data.amphoe
            await getThumbon(data.amphoe);
            district.value = data.district

            zipcode.value = data.zipcode
            petTotal.value = data.petTotal

            pointButton.textContent = "คุณมี "+data.point+" สิทธิ์";

            validateValue(true);
        }else{
            swalError('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง','');
        }
    } catch (error) {
        document.getElementById("overlay").style.display = "none";
        swalError('เกิดข้อผิดพลาด','');
        console.error('API Error:', error);
    }
}

var countryJson;
function getProvince() {
    var provinceElement = document.getElementById("province");
    var option = document.createElement("option");
    option.text = "--- จังหวัด ---";
    option.value = "";
    provinceElement.add(option);

    var amphoeElement = document.getElementById("amphoe");
    var option = document.createElement("option");
    option.text = "--- อำเภอ / เขต ---";
    option.value = "";
    amphoeElement.add(option);

    var districtElement = document.getElementById("district");
    var option = document.createElement("option");
    option.text = "--- ตำบล / แขวง ---";
    option.value = "";
    districtElement.add(option);

    fetch('./data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      this.countryJson = data;

      this.countryJson.forEach(element => {
        // console.log(element);
        var option1 = document.createElement("option");
        option1.text = element[0];
        option1.value = element[0];
        provinceElement.add(option1);
      });

    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

var amphurJson;
async function getAmphur(e) {
    console.log(e);
    // console.log(this.countryJson);
    var amphoeElement = document.getElementById("amphoe");
    while (amphoeElement.options.length > 0) {
        amphoeElement.remove(0);
    }
    var option = document.createElement("option");
    option.text = "--- อำเภอ / เขต ---";
    option.value = "";
    amphoeElement.add(option);

    var districtElement = document.getElementById("district");
    while (districtElement.options.length > 0) {
        districtElement.remove(0);
    }
    var option = document.createElement("option");
    option.text = "--- ตำบล / แขวง ---";
    option.value = "";
    districtElement.add(option);

    document.getElementById("zipcode").value = "";

    if(this.countryJson){
        this.countryJson.forEach(element => {
            if(element[0] == e){
                console.log(element[1]);
                this.amphurJson = element[1];

                this.amphurJson.forEach(element => {
                    // console.log(element);
                    var option1 = document.createElement("option");
                    option1.text = element[0];
                    option1.value = element[0];
                    amphoeElement.add(option1);
                });
            }
        });
    }

}

var thumbonJson;
async function getThumbon(e) {
    var districtElement = document.getElementById("district");
    while (districtElement.options.length > 0) {
        districtElement.remove(0);
    }
    var option = document.createElement("option");
    option.text = "--- ตำบล / แขวง ---";
    option.value = "";
    districtElement.add(option);

    document.getElementById("zipcode").value = "";

    this.amphurJson.forEach(element => {
        if(element[0] == e){
            console.log(element[1]);
            this.thumbonJson = element[1];

            this.thumbonJson.forEach(element => {
                // console.log(element);
                var option1 = document.createElement("option");
                option1.text = element[0];
                option1.value = element[0];
                districtElement.add(option1);
            });
        }
    });

}

function getZipCode(e) {
    this.thumbonJson.forEach(element => {
        if(element[0] == e){
            console.log(element[1]);
            document.getElementById("zipcode").value = element[1];
        }
    });
}

function validateValue(isInit){
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
    if(!isInit){
        openDialogConfirm();
    }
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

function openConsent(){
    Swal.fire({
        // title: "ข้อตกลง Consent การให้ข้อมูลส่วนบุคคล",
        html: "<button style='background-color: #D3AD80;color: white;width: 100%;' class='btn' type='button' onclick='closeSwal()'>ปิด</button><br><br><b style='font-size: 18px;'>ข้อตกลง Consent การให้ข้อมูลส่วนบุคคล</b><br><br><div style='text-align: left;'><label style='font-size: 14px;'>เมื่อคุณยินยอมข้อตกลงนี้ (ต่อไปจะเรียกว่า \"ผู้ให้ข้อมูล\") ในวันที่ยินยอมให้ข้อมูลเป็นต้นไป</label><br><b style='font-size: 14px;'>1. ข้อมูลที่จะให้</b><br><label style='font-size: 14px;margin-bottom: 0;'>ผู้ให้ข้อมูลยินยอมให้โรงพยาบาลในเครือ เข้าถึงและใช้ข้อมูลส่วนบุคคลต่อไปนี้:</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลเบื้องต้นของเจ้าของและสัตว์เลี้ยง</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลสุขภาพทั่วไปของสัตว์เลี้ยงประวัติการรักษาทางการแพทย์</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลเกี่ยวกับการนัดหมายและการรักษา</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลประวัติการจ่ายเงินและการเรียกเก็บเงิน</label><br><b style='font-size: 14px;'>‍2. วัตถุประสงค์ในการให้ข้อมูล</b><br><label style='font-size: 14px;margin-bottom: 0;'>ข้อมูลที่ได้รับจะถูกนำมาใช้เพื่อวัตถุประสงค์ต่อไปนี้:</label><label style='font-size: 14px;margin-bottom: 0;'>- การให้บริการทางการแพทย์</label><label style='font-size: 14px;margin-bottom: 0;'>- การจัดการนัดหมายและการรักษาการบันทึกประวัติการรักษา</label><label style='font-size: 14px;margin-bottom: 0;'>- การชำระเงิน</label><label style='font-size: 14px;margin-bottom: 0;'>- การปรับปรุงคุณภาพการบริการ</label><br><b style='font-size: 14px;'>‍3. การรักษาความปลอดภัยของข้อมูล</b><br><label style='font-size: 14px;margin-bottom: 0;'>‍โรงพยาบาลในเครือจะดูแลรักษาความปลอดภัยของข้อมูลส่วนบุคคลของผู้ให้ข้อมูลตามนโยบายความปลอดภัยที่เป็นไปตามกฎหมายที่เกี่ยวข้อง.</label><br><b style='font-size: 14px;'>‍‍4. การยกเลิก Consent</b><br><label style='font-size: 14px;margin-bottom: 0;'>‍‍ผู้ให้ข้อมูลสามารถยกเลิกการให้ข้อมูลได้โดยการแจ้งให้ทราบลายลักษณ์อักษรถึง support@petpaw.com การยกเลิกนี้จะมีผลเมื่อทางเราได้รับข้อมูลแล้วเท่านั้น</label><br><label style='font-size: 14px;margin-bottom: 0;'>‍‍วันที่: 19 ธันวาคม 2566</label></div><br><button style='background-color: #D3AD80;color: white;width: 100%;' class='btn' type='button' onclick='closeSwal()'>ปิด</button>",
        // text: "เมื่อคุณยินยอมข้อตกลงนี้ (ต่อไปจะเรียกว่า \"ผู้ให้ข้อมูล\") ในวันที่ยินยอมให้ข้อมูลเป็นต้นไป\n\n1. ข้อมูลที่จะให้\nผู้ให้ข้อมูลยินยอมให้โรงพยาบาลในเครือ เข้าถึงและใช้ข้อมูลส่วนบุคคลต่อไปนี้:",
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
      html: "<b style='font-size: 24px;'>ยืนยันการบันทึกข้อมูลใช่ไหม</b><br><br><label style='font-size: 20px;'></label>",
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

function swalSuccess(title,text){
    Swal.fire({
        title: title,
        text: text,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
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

        const response = await fetch(URL_UPDATE_LINE_USER, {
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
        document.getElementById("buttonSubmit").disabled = false;
        console.log('response:', response);
        if(response.status == 200){
            const data = await response.json();
            console.log('API Response:', data);
            swalSuccess('อัปเดตข้อมูลส่วนตัวเรียบร้อย','');
        }else{
            swalError('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง','');
        }
    } catch (error) {
        swalError('เกิดข้อผิดพลาด','');
        console.error('API Error:', error);
    }
}