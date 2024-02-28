// const LIFF_ID = '2002126306-rG8n6Bnp';
const LIFF_ID = '2003132696-jZQqpMZ4';
const PROD = true;
const DOMAIN = "test-api.net/";
// const DOMAIN = "http://localhost:8091/";
const URL_CHECK_USER = DOMAIN+"api/v1/cat-bot/check-user";
const URL_REGISTER_USER = DOMAIN+"api/v1/cat-bot/register-line-user";
const URL_UPDATE_LINE_USER = DOMAIN+"api/v1/cat-bot/update-line-user";
const URL_UPLOAD_SLIP = DOMAIN+"api/v1/cat-bot/upload-slip";
const URL_UPLOAD_SLIP_NOT_PASS = DOMAIN+"api/v1/cat-bot/upload-slip-not-pass";
const URL_GET_LINE_PROFILE = DOMAIN+"api/v1/cat-bot/line-profile/";
const URL_GET_SLIP_NOT_PASS = DOMAIN+"api/v1/cat-bot/slip-not-pass/";
const URL_GET_SLIP = DOMAIN+"api/v1/cat-bot/slip/";

var profileTest = {
    userId:'U88ca6af84181b2f92c62f50ab4b5da52',
    displayName:'Tent365💰💰',
    statusMessage:'อย่าพยายาม ทำในสิ่งที่เป็นไปไม่ได้',
    pictureUrl:'https://profile.line-scdn.net/0h3-mBgel0bAJAO3l34VQSfTBrb2hjSjUQPw0jNnNoYWZ9CX8DaQoqMCY7MmUpDC9ROw5xYHE6YWFMKBtkXm2QNkcLMTN8CCtXa18i4w'
}

function nextTo(url){
    window.location.href = url;
}