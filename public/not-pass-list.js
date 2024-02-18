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

    getNotPass();
}

async function getNotPass(){
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

        const response = await fetch(URL_GET_SLIP_NOT_PASS+profile.userId, {
            method: 'GET'
        });

        document.getElementById("overlay").style.display = "none";
        console.log('response:', response);
        if(response.status == 200){
            const datas = await response.json();
            console.log('API Response:', datas);
            const ele = document.getElementById('divCardBody');
            datas.forEach(async (data,index) => {
                // console.log(data);
                // console.log(index);
                const currentDate = new Date(data.createdAt);
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');
                const hours = String(currentDate.getHours()).padStart(2, '0');
                const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

                const currentDate1 = new Date(data.updatedAt);
                const year1 = currentDate1.getFullYear();
                const month1 = String(currentDate1.getMonth() + 1).padStart(2, '0');
                const day1 = String(currentDate1.getDate()).padStart(2, '0');
                const hours1 = String(currentDate1.getHours()).padStart(2, '0');
                const minutes1 = String(currentDate1.getMinutes()).padStart(2, '0');
                const formattedDate1 = `${year1}-${month1}-${day1} ${hours1}:${minutes1}`;

                if(data.status.code == 'FAIL'){
                    const newDiv = document.createElement('div');
                    newDiv.innerHTML =  
                    `
                    <fieldset class="border p-2" style="margin-top: 10px;">
                        <legend  class="w-auto legend-header" style="text-align: left;color: #1ab196;"> ใบเสร็จที่${index+1}</legend>
                        <div class="d-flex justify-content-center">
                            <b>เลขที่ใบเสร็จ : ${data.code}</b>
                        </div>
                        <div class="d-flex justify-content-center">
                            <b>วันเวลาที่ทำรายการ : ${formattedDate}</b>
                        </div>
                        <div class="d-flex justify-content-center">
                            <b>วันเวลาที่แก้ไขรายการ : ${formattedDate1}</b>
                        </div>
                        <div class="d-flex justify-content-center">
                            <b>สถานะ : </b><b style="color: red;">ต้องแก้ไข</b>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-warning" onclick="nextTo('not-pass-detail.html?slip_id=${data.id}')">แก้ไขใบเสร็จ</button>
                        </div>
                    </fieldset>
                    `;
                    ele.appendChild(newDiv);
                }else if(data.status.code == 'PASS'){
                    const newDiv = document.createElement('div');
                    newDiv.innerHTML =  
                    `
                    <fieldset class="border p-2" style="margin-top: 10px;">
                        <legend  class="w-auto legend-header" style="text-align: left;color: #1ab196;"> ใบเสร็จที่${index+1}</legend>
                        <div class="d-flex justify-content-center">
                            <b>เลขที่ใบเสร็จ : ${data.code}</b>
                        </div>
                        <div class="d-flex justify-content-center">
                            <b>วันเวลาที่ทำรายการ : ${formattedDate}</b>
                        </div>
                        <div class="d-flex justify-content-center">
                            <b>วันเวลาที่แก้ไขรายการ : ${formattedDate1}</b>
                        </div>
                        <div class="d-flex justify-content-center">
                            <b>สถานะ : </b><b style="color: green;">${data.status.content}</b>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-primary" onclick="nextTo('not-pass-detail.html?slip_id=${data.id}')">ดูรายละเอียดใบเสร็จ</button>
                        </div>
                    </fieldset>
                    `;
                    ele.appendChild(newDiv);
                }else{
                    const newDiv = document.createElement('div');
                    newDiv.innerHTML =  
                    `
                    <fieldset class="border p-2" style="margin-top: 10px;">
                        <legend  class="w-auto legend-header" style="text-align: left;color: #1ab196;"> ใบเสร็จที่${index+1}</legend>
                        <div class="d-flex justify-content-center">
                            <b>เลขที่ใบเสร็จ : ${data.code}</b>
                        </div>
                        <div class="d-flex justify-content-center">
                            <b>วันเวลาที่ทำรายการ : ${formattedDate}</b>
                        </div>
                        <div class="d-flex justify-content-center">
                            <b>วันเวลาที่แก้ไขรายการ : ${formattedDate1}</b>
                        </div>
                        <div class="d-flex justify-content-center">
                            <b>สถานะ : </b><b style="color: orange;">รอการตรวจสอบ</b>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-primary" onclick="nextTo('not-pass-detail.html?slip_id=${data.id}')">ดูรายละเอียดใบเสร็จ</button>
                        </div>
                    </fieldset>
                    `;
                    ele.appendChild(newDiv);
                }

                
            });

        }else{
            swalError('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง','');
        }
    } catch (error) {
        document.getElementById("overlay").style.display = "none";
        swalError('เกิดข้อผิดพลาด','');
        console.error('API Error:', error);
    }
}