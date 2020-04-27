document.addEventListener("DOMContentLoaded", async ()=> {
    const students = await getStudents();
    fillStudentsDD(students);
});

async function addMessage(event) {
    event.preventDefault();

    const message = {
        studentId: document.querySelector("#studentsDD").value,
        subject: document.querySelector("#subject").value,
        message: document.querySelector("#message").value
    };
    console.log("addMessage.message", message);

    const url = "/api/messages";

    try {
        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        });
        //If response if not ok then jump to the catch block
        if (!response.ok)
            throw response;

        alert("Message added successfully.");
        window.location = "/index-coordinator.html";
    }
    catch(err) {
        console.log(err);
        alert(err.statusText);
    }
}

async function getStudents() {
    //Get login userId
    const user = JSON.parse(localStorage.user);
    if (user) {
        const teacherId = user.id;
        const url = `/api/students/${teacherId}`;
        const response = await fetch(url);
        return await response.json();
    }
}

function fillStudentsDD(students) {
    const studentsDD = document.querySelector('#studentsDD');
    studentsDD.innerHTML = '<option></option>';
    students.forEach(s => {
        const option = `<option value="${s.studentId}"> 
                           ${s.studentId} - ${s.firstName} ${s.lastName} 
                        </option>`;
        studentsDD.innerHTML += option;
    });
}