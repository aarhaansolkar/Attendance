document.getElementById("classForm").addEventListener("submit", submitFun1);
document.getElementById("clearTableBtn").addEventListener("click", clearTable);

var studentDataArr = JSON.parse(localStorage.getItem("studentData")) || [];

function submitFun1(e) {
    e.preventDefault();
    var rollNo = document.querySelector("#class").value;
    var date = document.querySelector("#date").value;
    var totalAttendance = document.querySelector("#totalAttendance").value;

    var studentObj = {
        class: rollNo,
        date: date,
        totalAttendance: totalAttendance,
        attendance: 0
    };

    studentDataArr.push(studentObj);
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    document.querySelector("#classForm").reset();

    displayFun(studentDataArr);
    calculateAndDisplayAverage(date);
}

function calculateAndDisplayAverage(date) {
    var monthData = studentDataArr.filter(function (item) {
        return item.date === date;
    });

    if (monthData.length > 0) {
        var totalAttendance = monthData.reduce(function (total, item) {
            return total + parseInt(item.attendance, 10);
        }, 0);

        var averageAttendance = (totalAttendance / monthData.length).toFixed(2);
        document.querySelector("#averageAttendance_" + date).textContent = averageAttendance + "%";
    }
}

function displayFun(studentDataArr) {
    var count = 1;
    document.querySelector("#tbody").innerHTML = "";

    var uniqueDates = [...new Set(studentDataArr.map(item => item.date))];

    uniqueDates.forEach(function (date) {
        var monthData = studentDataArr.filter(function (item) {
            return item.date === date;
        });

        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.innerHTML = count++;
        var td2 = document.createElement("td");
        td2.innerHTML = monthData[0].class;
        var td3 = document.createElement("td");
        td3.innerHTML = date;
        var td4 = document.createElement("td");
        td4.innerHTML = monthData[0].totalAttendance;
        var td5 = document.createElement("td");
        td5.innerHTML = monthData[0].attendance;
        var td6 = document.createElement("td");
        td6.id = "averageAttendance_" + date;

        tr.append(td1, td2, td3, td4, td5, td6);
        document.querySelector("#tbody").append(tr);

        calculateAndDisplayAverage(date);
    });
}

function clearTable() {
    document.querySelector("#tbody").innerHTML = "";
    localStorage.removeItem("studentData");
}

displayFun(studentDataArr);
