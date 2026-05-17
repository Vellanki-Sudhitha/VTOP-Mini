let captcha = "";


function generateCaptcha() {
    captcha = Math.random().toString(36).substring(2, 7);
    document.getElementById("captchaText").innerText = captcha;
}

generateCaptcha();

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let userCaptcha = document.getElementById("captchaInput").value;

    if (userCaptcha !== captcha) {
        alert("Captcha incorrect");
        generateCaptcha();
        return;
    }

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.text())
    .then(msg => {
        if (msg === "Success") {
            window.location.href = "/";
        } else {
            alert("Invalid credentials");
        }
    });
}