// const formTag = document.querySelector("ghf-referral");
// const submit = document.querySelector("#submit");
// const success = document.querySelector(".w-form-done");
// const error = document.querySelector(".w-form-fail");
// let file = document.getElementById("file");
const referralInput = document.querySelector("#referral-code");
const institute = document.querySelector("#institute");
const email = document.querySelector("#email");
let records;

const selectChange = document.querySelectorAll(".option");
console.log(selectChange);

//grab referral code from the url and input it in the form field
const queryString = window.location.search;
const urlPara = new URLSearchParams(queryString);
const refCode = urlPara.get("uuid");
referralInput.value = refCode;

//input dropdown options from the airtable

const dropdownURL =
  "https://api.airtable.com/v0/appv69J1ch06OaHjD/Table%201?maxRecords=300&view=Grid%20view";
const dropdownAuth = "keyAmtKToVnkwqhsB";

const getData = function () {
  return fetch(dropdownURL, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + dropdownAuth,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.records.map((record) => {
        return record.fields;
      });
    });
};

getData().then((data) => {
  records = data;
  console.log(records);

  records.forEach((element) => {
    const selection = document.querySelector(".list");
    institute.innerHTML =
      institute.innerHTML +
      `<option value ="${element.Name}">${element.Name}</option>`;
    selection.innerHTML =
      selection.innerHTML +
      `<li data-value="${element.Name}" class="option">${element.Name}</li>`;
  });
});

selectChange.forEach((item) => {
  item.addEventListener("click", function () {
    console.log(institute.value);
    const selected = institute.value;
    const value = records.find((record) => record.Name == selected);
    console.log(value);
    email.setAttribute("pattern", `${value.regex}`);
  });
});

// let formData = new FormData();

// file.addEventListener(
//   "change",
//   function handleFiles(e) {
//     const fileList = this.files;
//     formData.append("id", e.target.files[0]);
//   },
//   false
// );

// //prevent default action

// submit.addEventListener("click", (e) => {
//   e.preventDefault();
//   const name = document.querySelector("#name").value;
//   const email = document.querySelector("#email").value;
//   const code = document.querySelector("#code").value;
//   submit.value = "loading...";
//   formData.append("name", name);
//   formData.append("email", email);
//   formData.append("code", code);

//   // submit form values to webhook
//   fetch("https://hook.us1.make.com/kf3c4ladtzej6htolylbi3xtqsztveio", {
//     method: "POST",
//     "Content-Type": "multipart/form-data; boundary=---generatedboundary",
//     body: formData,
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         return response.text().then((text) => {
//           throw new Error(text);
//         });
//       }
//     })
//     .then((data) => {
//       submit.value = "Submit";
//       success.style.display = "block";
//       //success.innerHTML = `${data.message}`;
//     })
//     .catch((err) => {
//       console.error(err);
//       submit.value = "Submit";
//       error.style.display = "block";
//       error.innerHTML = `
// 			<div>${err}</div>`;
//     });
// });
