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
        profile = profileTest;
    }
    const selectedImage = document.getElementById('img-profile');
    selectedImage.src = profile.pictureUrl;

    getProvince();
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
function getAmphur(e) {
    // console.log(e);
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

var thumbonJson;
function getThumbon(e) {
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
    validateValue();
}

function validateValue(){
    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var gender = document.getElementById("gender");
    var phoneNumber = document.getElementById("phoneNumber");
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
    valid = valid && addOrRemoveClassIsInvalid(province);
    valid = valid && addOrRemoveClassIsInvalid(amphoe);
    valid = valid && addOrRemoveClassIsInvalid(district);
    valid = valid && zipcodeText(zipcode,5);
    valid = valid && petTotalText(petTotal,5);
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

function filterNonNumeric(input) {
    // Regular expression to match non-numeric characters
    var nonNumericRegex = /[^0-9]/g;
    
    // Remove non-numeric characters from the input
    return input.replace(nonNumericRegex, '');
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
    ele.value = filterNonNumeric(ele.value);
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

function petTotalText(ele,limit){
    ele.value = filterNonNumeric(ele.value);
    if(ele && ele.value){
        document.getElementById('petTotalText').innerHTML = ele.value.length+'/5';
        if(ele.value.length > limit){
            document.getElementById('petTotalTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('petTotalTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
    }else{
        document.getElementById('petTotalTextInvalid').innerHTML = 'กรุณากรอกข้อมูล';
        document.getElementById('petTotalText').innerHTML = '0/5';
        ele.classList.add("is-invalid");
        ele.scrollIntoView({ behavior: 'auto' });
        window.scrollBy(0, -40);
        return false;
    }
}

function zipcodeText(ele,limit){
    ele.value = filterNonNumeric(ele.value);
    if(ele && ele.value){
        document.getElementById('zipcodeText').innerHTML = ele.value.length+'/5';
        if(ele.value.length > limit){
            document.getElementById('zipcodeTextInvalid').innerHTML = 'ข้อความเกินที่กำหนด';
            ele.classList.add("is-invalid");
            ele.scrollIntoView({ behavior: 'auto' });
            window.scrollBy(0, -40);
            return false;
        }else{
            document.getElementById('zipcodeTextInvalid').innerHTML = '';
            ele.classList.remove("is-invalid");
            return true;
        }
    }else{
        document.getElementById('zipcodeTextInvalid').innerHTML = 'กรุณากรอกข้อมูล';
        document.getElementById('zipcodeText').innerHTML = '0/5';
        ele.classList.add("is-invalid");
        ele.scrollIntoView({ behavior: 'auto' });
        window.scrollBy(0, -40);
        return false;
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
        // html: "<button style='background-color: #D3AD80;color: white;width: 100%;' class='btn' type='button' onclick='closeSwal()'>ปิด</button><br><br><b style='font-size: 18px;'>ข้อตกลง Consent การให้ข้อมูลส่วนบุคคล</b><br><br><div style='text-align: left;'><label style='font-size: 14px;'>เมื่อคุณยินยอมข้อตกลงนี้ (ต่อไปจะเรียกว่า \"ผู้ให้ข้อมูล\") ในวันที่ยินยอมให้ข้อมูลเป็นต้นไป</label><br><b style='font-size: 14px;'>1. ข้อมูลที่จะให้</b><br><label style='font-size: 14px;margin-bottom: 0;'>ผู้ให้ข้อมูลยินยอมให้โรงพยาบาลในเครือ เข้าถึงและใช้ข้อมูลส่วนบุคคลต่อไปนี้:</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลเบื้องต้นของเจ้าของและสัตว์เลี้ยง</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลสุขภาพทั่วไปของสัตว์เลี้ยงประวัติการรักษาทางการแพทย์</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลเกี่ยวกับการนัดหมายและการรักษา</label><label style='font-size: 14px;margin-bottom: 0;'>- ข้อมูลประวัติการจ่ายเงินและการเรียกเก็บเงิน</label><br><b style='font-size: 14px;'>‍2. วัตถุประสงค์ในการให้ข้อมูล</b><br><label style='font-size: 14px;margin-bottom: 0;'>ข้อมูลที่ได้รับจะถูกนำมาใช้เพื่อวัตถุประสงค์ต่อไปนี้:</label><label style='font-size: 14px;margin-bottom: 0;'>- การให้บริการทางการแพทย์</label><label style='font-size: 14px;margin-bottom: 0;'>- การจัดการนัดหมายและการรักษาการบันทึกประวัติการรักษา</label><label style='font-size: 14px;margin-bottom: 0;'>- การชำระเงิน</label><label style='font-size: 14px;margin-bottom: 0;'>- การปรับปรุงคุณภาพการบริการ</label><br><b style='font-size: 14px;'>‍3. การรักษาความปลอดภัยของข้อมูล</b><br><label style='font-size: 14px;margin-bottom: 0;'>‍โรงพยาบาลในเครือจะดูแลรักษาความปลอดภัยของข้อมูลส่วนบุคคลของผู้ให้ข้อมูลตามนโยบายความปลอดภัยที่เป็นไปตามกฎหมายที่เกี่ยวข้อง.</label><br><b style='font-size: 14px;'>‍‍4. การยกเลิก Consent</b><br><label style='font-size: 14px;margin-bottom: 0;'>‍‍ผู้ให้ข้อมูลสามารถยกเลิกการให้ข้อมูลได้โดยการแจ้งให้ทราบลายลักษณ์อักษรถึง support@petpaw.com การยกเลิกนี้จะมีผลเมื่อทางเราได้รับข้อมูลแล้วเท่านั้น</label><br><label style='font-size: 14px;margin-bottom: 0;'>‍‍วันที่: 19 ธันวาคม 2566</label></div><br><button style='background-color: #D3AD80;color: white;width: 100%;' class='btn' type='button' onclick='closeSwal()'>ปิด</button>",
        // text: "เมื่อคุณยินยอมข้อตกลงนี้ (ต่อไปจะเรียกว่า \"ผู้ให้ข้อมูล\") ในวันที่ยินยอมให้ข้อมูลเป็นต้นไป\n\n1. ข้อมูลที่จะให้\nผู้ให้ข้อมูลยินยอมให้โรงพยาบาลในเครือ เข้าถึงและใช้ข้อมูลส่วนบุคคลต่อไปนี้:",
        html: `
        <button style='background-color: #D3AD80;color: white;width: 100%;' class='btn' type='button' onclick='closeSwal()'>ปิด</button>
        <div style='margin-top: 10px;'>
        <b style='font-size: 18px;'>การขอความยินยอมในการเก็บรวบรวม ใช้ ประมวลผล และเปิดเผยข้อมูลส่วนบุคคลเพื่อวัตถุประสงค์ทางการตลาด</b>
        <div/>
        <br>
        <div style='text-align: left;'>
            <label style='font-size: 14px;'>สิทธิประโยชน์และประสบการณ์ที่ดีที่สุดของท่าน คือเป้าหมายสำคัญในการพัฒนาสินค้าและบริการของเราอยู่ตลอดเวลา สิทธิประโยชน์ ความสะดวกสบาย รวดเร็ว คือสิ่งสำคัญและการที่จะทำให้สิ่งเหล่านี้เกิดขึ้นได้นั้นต้องอาศัยข้อมูล และความยินยอมจากผู้ใช้งานทุกท่าน ดังนี้</label>
            <br>
            <label style='font-size: 14px;'>ข้าพเจ้าให้ความยินยอมแก่ Nhamaew ("ผู้ให้บริการ") ในการเก็บรวบรวม ใช้ ประมวลผล และเปิดเผย ข้อมูลส่วนบุคคลของข้าพเจ้า และ/หรือข้อมูลใดๆ เกี่ยวกับการใช้เว็บไซต์ แอปพลิเคชัน และ/หรือ LINE Official Account ใดๆของ Nhamaew โดยมีรายละเอียดดังต่อไปนี้</label>
            <label style='font-size: 14px;'>    •	ข้อมูลที่ใช้ในการติดต่อ ส่งข้อมูลข่าวสาร และ/หรือยืนยันตัวตน เช่น ชื่อ-นามสกุล ที่อยู่ เบอร์โทรศัพท์ อีเมลแอดเดรส (E-mail Address) บัญชีผู้ใช้แอปพลิเคชัน LINE (LINE ID/LINE Account) เป็นต้น</label>
            <label style='font-size: 14px;'>    •	ข้อมูลใดๆ เกี่ยวกับการใช้สินค้า และ/หรือบริการของข้าพเจ้า เช่น พฤติกรรมการใช้งานเว็บไซต์ และ/หรือแอปพลิเคชันของผู้ให้บริการ ประวัติการสะสมสิทธิ์ ใช้คะแนน และ/หรือพอยท์ (Point) การใช้สิทธิประโยชน์ต่างๆ การเข้าร่วมกิจกรรม และ/หรือซื้อสินค้า และ/หรือใช้บริการของผู้ให้บริการ เป็นต้น รวมถึงข้อมูลจากใบเสร็จหรือสะลิปจากการพาสัตว์เลี้ยงของข้าพเจ้าไปรักษาที่โรงพยาบาลสัตว์หรือคลินิกรักษาสัตว์ เช่น ชื่อโรงพยาบาลสัตว์หรือคลินิกรักษาสัตว์ วันเวลาที่ใช้บริการ ยอดการรักษา และอื่นๆที่ระบุอยู่ในใบเสร็จหรือสะลิป เป็นต้น รวมถึงข้อมูลการให้คะแนนและข้อมูลการรีวิวการใช้บริการที่โรงพยาบาลสัตว์หรือคลินิกรักษาสัตว์ที่ข้าพเจ้ากรอกในระบบ</label>
            <label style='font-size: 14px;'>ข้าพเจ้ายินยอมให้ผู้ให้บริการ เก็บรวบรวม ใช้ ประมวลผล และเปิดเผยข้อมูลของข้าพเจ้าที่ระบุไว้ข้างต้นเพื่อวัตถุประสงค์ในการวิเคราะห์ หรือคาดการณ์เกี่ยวกับความชื่นชอบ หรือพฤติกรรมของข้าพเจ้าและสัตว์เลี้ยงของข้าพเจ้า วิจัย พัฒนา ปรับปรุงผลิตภัณฑ์ และวางแผนการตลาด เพื่อนำเสนอสินค้าและบริการ สิทธิประโยชน์ รายการส่งเสริมการขาย และข้อเสนอต่าง ๆ ของ ผู้ให้บริการ บริษัทร่วม หรือพันธมิตรทางธุรกิจของผู้ให้บริการ ที่วิเคราะห์ และคัดสรรอย่างเหมาะสมกับข้าพเจ้า รวมถึงยินยอมให้มีการเปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้าให้กับบริษัทร่วม หรือพันธมิตรทางธุรกิจของผู้ให้บริการ เพื่อวัตถุประสงค์ดังกล่าวด้วย</label>
            <br>
            <label style='font-size: 14px;'>ในการให้ความยินยอมตามหนังสือฉบับนี้ ข้าพเจ้ารับทราบและตกลงดังต่อไปนี้</label>
            <br>
            <label style='font-size: 14px;'>1. ข้าพเจ้าได้อ่าน และรับทราบรายละเอียดในการเก็บรวบรวม ใช้ ประมวลผล และเปิดเผยข้อมูลส่วนบุคคลดังที่ปรากฏในเอกสารฉบับนี้ของผู้ให้บริการเป็นอย่างดีแล้ว และยินดีปฏิบัติตามนโยบายความเป็นส่วนตัวฯนี้ทุกประการ</label>
            <br>
            <label style='font-size: 14px;'>2. ข้าพเจ้ารับทราบถึงสิทธิของข้าพเจ้าในฐานะเจ้าของข้อมูลส่วนบุคคล และสิทธิในการถอนความยินยอมฉบับนี้ รวมถึงผลอันอาจเกิดขึ้นจากการเพิกถอนความยินยอมของข้าพเจ้า ดังรายละเอียดที่กำหนดในเอกสารฉบับนี้  โดยข้าพเจ้าสามารถใช้สิทธิของข้าพเจ้าถอนความยินยอม และ/หรือสอบถามรายละเอียดการเก็บรวบรวม ใช้ ประมวลผล และเปิดเผยข้อมูลส่วนบุคคลของผู้ให้บริการ ได้โดยติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคลของผู้ให้บริการ ดังที่กำหนดในเอกสารนี้ ในกรณีที่ข้าพเจ้าไม่ยินยอมให้ใช้ข้อมูลส่วนบุคคล ใช้สิทธิเพิกถอนความยินยอม หรือใช้สิทธิของเจ้าของข้อมูลส่วนบุคคลอันกระทบต่อการเก็บรวบรวม ใช้ ประมวลผล และเปิดเผยข้อมูลส่วนบุคคลของผู้ให้บริการ ข้าพเจ้ายังคงสามารถใช้บริการของผู้ให้บริการ ต่อได้ โดยข้าพเจ้าอาจได้รับความสะดวกจากการใช้บริการน้อยลง เนื่องจากผู้ให้บริการ ไม่ได้รับความยินยอมให้ใช้ข้อมูลส่วนบุคคลเพื่อวัตถุประสงค์สำหรับการให้บริการอย่างเต็มประสิทธิภาพ</label>
            <br>
            <label style='font-size: 14px;'>3. ข้าพเจ้ารับทราบว่าผู้ให้บริการ อาจเปิดเผย และ/หรือโอนข้อมูลส่วนบุคคลให้แก่บริษัทร่วม หรือพันธมิตรทางธุรกิจ คู่ค้า คู่สัญญา รัฐวิสาหกิจ หน่วยงานของรัฐ องค์กรระหว่างประเทศ และ/หรือองค์กรหรือบุคคลอื่นใด ทั้งที่อยู่ในประเทศไทย และต่างประเทศ ภายใต้ขอบวัตถุประสงค์ที่ข้าพเจ้าได้ให้ความยินยอมไว้ในเอกสารนี้ ซึ่งมาตรฐานการคุ้มครองข้อมูลส่วนบุคคลของประเทศปลายทาง หรือองค์กรระหว่างประเทศปลายทางอาจมีมาตรฐานไม่เท่ากับกฎหมายคุ้มครองข้อมูลส่วนบุคคลของประเทศไทย ทั้งนี้ ข้าพเจ้ายินยอมให้ผู้ให้บริการ ดำเนินการดังที่กล่าวข้างต้นได้</label>
            <br>
            <label style='font-size: 14px;'>4. ข้าพเจ้ารับรองว่าบรรดาข้อเท็จจริง และข้อมูลส่วนบุคคลที่ข้าพเจ้าได้ให้ไว้กับผู้ให้บริการ เป็นข้อมูลที่ถูกต้อง สมบูรณ์ เป็นปัจจุบัน และไม่ก่อให้เกิดความเข้าใจผิด หากมีการเปลี่ยนแปลงใดๆ ข้าพเจ้าจะดำเนินการติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคลของผู้ให้บริการ โดยเร็ว</label>
            <br><br>
            <label style='font-size: 14px;'>หมายเหตุ: ข้าพเจ้าสามารถติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคลของผู้ให้บริการ เพื่อทำการถอนความยินยอม หรือสอบถามรายละเอียดการเก็บรวบรวม ใช้ ประมวผล และเปิดเผยข้อมูลส่วนบุคคลของผู้ให้บริการ ได้ที่</label>
            <br><br>
            <label style='font-size: 14px;'>รายละเอียดผู้ควบคุมข้อมูลส่วนบุคคล</label>
            <br><br>
            <label style='font-size: 14px;'>ชื่อ: Nhamaew</label>
            <br>
            <label style='font-size: 14px;'>ที่อยู่: เลขที่ 100/847 ซอย23/1 หมู่บ้านลานทอง ตำบลบางพูด อำเภอปากเกร็ด จังหวัดนนทบุรี 11120</label>
            <br>
            <label style='font-size: 14px;'>หมายเลขโทรศัพท์: 093-137-1602</label>
            <br>
            <label style='font-size: 14px;'>อีเมลแอดเดรส (E-mail Address): panditkul.p@gmail.com</label>
            <br>
            <label style='font-size: 14px;'>ข้าพเจ้าได้อ่านข้อความในเอกสารฉบับนี้ และนโยบายความเป็นส่วนตัวฯ โดยครบถ้วนแล้ว และยินยอมให้ผู้ให้บริการเก็บรวบรวม ใช้ ประมวลผล และเปิดเผยข้อมูลส่วนบุคคลดังที่กำหนดในเอกสารนี้</label>
        </div>
        <button style='background-color: #D3AD80;color: white;width: 100%;' class='btn' type='button' onclick='closeSwal()'>ปิด</button>
        `,
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
            profile = profileTest;
        }

        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var gender = document.getElementById("gender").value;
        var phoneNumber = document.getElementById("phoneNumber").value;
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
            nextTo('upload-slip.html');
        }else{
            swalError('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง','');
        }
    } catch (error) {
        swalError('เกิดข้อผิดพลาด','');
        console.error('API Error:', error);
    }
}