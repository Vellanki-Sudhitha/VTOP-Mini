
function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    if (id === "attendance") loadAttendance();
    if (id === "marks") loadMarks();
    if (id === "feedback") loadFeedback();
    if (id === "payments") loadPayments();
    if (id === "assignment") loadFiles();
}


function loadAttendance() {
    fetch('/attendance')
    .then(res => res.json())
    .then(data => {
        let list = document.getElementById("attendanceList");
        list.innerHTML = "";

        data.forEach(item => {
            let color = item.percentage >= 75 ? "green" : "red";

            list.innerHTML += `
            <li>${item.subject} - 
            <span class="${color}">${item.percentage}%</span>
            </li>`;
        });
    });
}


function loadMarks() {
    fetch('/marks')
    .then(res => res.json())
    .then(data => {
        let list = document.getElementById("marksList");
        list.innerHTML = "";

        data.forEach(item => {
            list.innerHTML += `
            <li>${item.subject} - 
            ${item.marks} (${item.grade})
            </li>`;
        });
    });
}

function submitFeedback() {
    let text = document.getElementById("fb").value;

    if (!text.trim()) {
        alert("Enter feedback");
        return;
    }

    fetch('/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        document.getElementById("fb").value = "";
        loadFeedback();
    });
}

function loadFeedback() {
    fetch('/feedback')
    .then(res => res.json())
    .then(data => {
        let list = document.getElementById("feedbackList");
        list.innerHTML = "";

        data.forEach(f => {
            if (!f.text) return;

            list.innerHTML += `
            <div>
                ${f.text}
                <button onclick="deleteFeedback('${f._id}')">Delete</button>
            </div>`;
        });
    });
}

function deleteFeedback(id) {
    fetch('/feedback/' + id, { method: 'DELETE' })
    .then(() => loadFeedback());
}


function loadPayments() {
    fetch('/payments')
    .then(res => res.json())
    .then(data => {
        let div = document.getElementById("paymentList");
        div.innerHTML = "";

        data.forEach(p => {
            div.innerHTML += `
            <div>
                ₹${p.amount} | ${p.deadline}
                <button onclick="payNow('${p._id}')">Pay Now</button>
            </div>`;
        });
    });
}

function payNow(id) {
    fetch('/pay/' + id, { method: 'POST' })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        loadPayments();
    });
}


function uploadFile() {
    let fileInput = document.getElementById("file");

    if (!fileInput.files[0]) {
        alert("Select file");
        return;
    }

    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        loadFiles();
    });
}

function loadFiles() {
    fetch('/assignments')
    .then(res => res.json())
    .then(data => {
        let div = document.getElementById("fileList");
        div.innerHTML = "";

        data.forEach(f => {
            div.innerHTML += `
            <div>
                <a href="/${f.path}" target="_blank">${f.filename}</a>
            </div>`;
        });
    });
}


window.onload = () => {
    showSection('home');
};