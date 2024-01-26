document.addEventListener('DOMContentLoaded', function () {
    initializeLiff();
});

var roomNumber;
var profile;

async function initializeLiff() {
    try {
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
            profile = {userId:'test1'}
        }
        
        const response = await fetch(URL_CHECK_USER, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lineUserId: profile.userId
            })
        });

        console.log('response:', response);
        if(response.status == 200){
            const data = await response.json();
            console.log('API Response:', data);
            var url = "upload-slip.html";
            window.location.href = url;
        }else{
            var url = "register.html";
            window.location.href = url;
        }
    } catch (error) {
        alert('เกิดข้อผิดพลาด');
        console.error('API Error:', error);
    }
}