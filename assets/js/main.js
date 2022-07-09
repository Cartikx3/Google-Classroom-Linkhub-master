// console.log(values);

function ValidURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(str)) {
        // alert("Please enter valid URL.");
        return false;
    } else {
        return true;
    }
}



let arr = document.querySelectorAll(".input")
//---------caching the data entered by the user-----------

//getting data form cache
for (let i = 0; i < 4; i++) {
    x = localStorage.getItem(`input${i}`);
    if (x) {
        arr[i].value = x;
    }
}

//storing data in cache
for (let i = 0; i < 4; i++) {
    arr[i].addEventListener("change", () => {
        localStorage.setItem(`input${i}`, arr[i].value);
    })
}

//updating the drop downs
updatelist();
function updatelist() {

    let obj = localStorage.getItem("data");

    if (obj != null) {
        obj = JSON.parse(obj);
    }
    else {
        obj = [];
    }
    var teachers = document.getElementById("teachers");
    let html = ``;
    let html2 = ``;
    obj.forEach(function (element) {
        let x = `<option value="${element.teacher}">${element.teacher}</option>`
        html += x;
        let y = `<option value="${element.class}">${element.class}</option>`
        html2 += y;

    })

    teachers.innerHTML = html;
    classes.innerHTML = html2;

}



//---------------linking both dropdowns-----------

document.getElementById("teachers").addEventListener("change", () => {
    let index = document.getElementById("teachers").options.selectedIndex;
    document.getElementById("classes").value = document.getElementById("classes").options[index].value;
});
document.getElementById("classes").addEventListener("change", () => {
    let index = document.getElementById("classes").options.selectedIndex;
    document.getElementById("teachers").value = document.getElementById("teachers").options[index].value;
});



var addbtn = document.getElementById("addbtn");

addbtn.addEventListener("click", () => {

    let obj = {
        "teacher": document.getElementById("inputteacher").value,
        "class": document.getElementById("inputclass").value,
        "meet": document.getElementById("inputmeet").value,
        "gcr": document.getElementById("inputgcr").value
    }

    if (ValidURL(obj.meet) && ValidURL(obj.gcr) == true) {

        if (obj.teacher && obj.class && obj.meet && obj.gcr != "") {
            console.log("values updated", obj);
            let data = JSON.parse(localStorage.getItem("data"));
            if (data == null) { data = []; }

            data.push(obj);
            localStorage.setItem("data", JSON.stringify(data));
            updatelist();

            for (let i = 0; i < 4; i++) {
                localStorage.removeItem(`input${i}`);
            }

            document.getElementById("inputteacher").value = "";
            document.getElementById("inputclass").value = "";
            document.getElementById("inputmeet").value = "";
            document.getElementById("inputgcr").value = "";

        } 

    }


    if(obj.teacher==false){
        document.querySelector("#inputteacher").style.border = "2px solid red";
        setTimeout(() => {
            document.querySelector("#inputteacher").style.border = "2px solid black";
        }, 2000);

    }
    if(obj.class==false){
        document.querySelector("#inputclass").style.border = "2px solid red";
        setTimeout(() => {
            document.querySelector("#inputclass").style.border = "2px solid black";
        }, 2000);

    }
    if(ValidURL(obj.meet)==false){
        document.querySelector("#inputmeet").style.border = "2px solid red";
        setTimeout(() => {
            document.querySelector("#inputmeet").style.border = "2px solid black";
        }, 2000);

    }
    if(ValidURL(obj.gcr)==false){
        document.querySelector("#inputgcr").style.border = "2px solid red";
        setTimeout(() => {
            document.querySelector("#inputgcr").style.border = "2px solid black";
        }, 2000);

    }


});

document.getElementById("meetbtn").addEventListener("click", () => {

    let index = (document.getElementById("classes").options.selectedIndex);
    let data = localStorage.getItem("data");

    if (data != null) {
        data = JSON.parse(data);
    }
    else {
        data = [];
    }
    console.log(data[index].meet);

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "btnclicked", "link": data[index].meet });
    });


    // console.log(document.getElementById("teachers").options.selectedIndex);
    //link of the meet or obj is values[index]

});
document.getElementById("gcrbtn").addEventListener("click", () => {

    let index = (document.getElementById("classes").options.selectedIndex);
    let data = localStorage.getItem("data");

    if (data != null) {
        data = JSON.parse(data);
    }
    else {
        data = [];
    }
    console.log(data[index].gcr); //link of the meet or obj is values[index]
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "btnclicked", "link": data[index].gcr });
    });


});
document.getElementById("delbtn").addEventListener("click", () => {

    let index = (document.getElementById("classes").options.selectedIndex);

    // console.log(values[index].gcr); //link of the meet or obj is values[index]
    let data = localStorage.getItem("data");

    if (data != null) {
        data = JSON.parse(data);
    }
    else {
        data = [];
    }
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    updatelist();


});

