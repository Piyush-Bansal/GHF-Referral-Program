const formTag = document.querySelector("#ghf-referral");
const signupForm = document.querySelector("#referral-signup");
const submit = document.querySelector("#submit");
const success = document.querySelector(".w-form-done");
const error = document.querySelector(".w-form-fail");
let file = document.getElementById("file-7");
const referralInput = document.querySelector("#referral-code");
const institute = document.querySelector("#institute");
const email = document.querySelector("#email");
const phoneReferral = document.querySelector("#phone-referral");
const emailReferral = document.querySelector("#email-referral");
let records;

//grab referral code from the url and input it in the form field
const queryString = window.location.search;
const urlPara = new URLSearchParams(queryString);
const refCode = urlPara.get("uuid");
referralInput.value = refCode;

//input dropdown options from the airtable

const dropdownURL =
  "https://api.airtable.com/v0/appv69J1ch06OaHjD/Table%201?maxRecords=300&view=Grid%20view&sort%5B0%5D%5Bfield%5D=Name";
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

  records.forEach((element) => {
    const selection = document.querySelector(".list");
    institute.innerHTML =
      institute.innerHTML +
      `<option value ="${element.Name}">${element.Name}</option>`;
    selection.innerHTML =
      selection.innerHTML +
      `<li data-value="${element.Name}" class="option">${element.Name}</li>`;
  });

  const selectChange = document.querySelectorAll(".option");
  selectChange.forEach((item) => {
    item.addEventListener("click", function (e) {
      const selected = e.target.textContent;
      console.log(selected);
      const value = records.find((record) => record.Name == selected);
      console.log(value);
      email.setAttribute("pattern", `${value.regex}`);
    });
  });
});

let formData = new FormData();

// add file attachement to the formData.

file.addEventListener(
  "change",
  function handleFiles(e) {
    const fileList = this.files;
    formData.append("id", e.target.files[0]);
  },
  false
);

// prevent default action

formTag.addEventListener("submit", (e) => {
  e.preventDefault();
  const fname = document.querySelector("#first-name").value;
  const lname = document.querySelector("#last-name").value;
  const phoneNumber = document.querySelector("#phone-number").value;
  const institute = document.querySelector("#institute").value;
  const email = document.querySelector("#email").value;
  const code = document.querySelector("#referral-code").value;

  formData.append("fname", fname);
  formData.append("email", email);
  formData.append("code", code);
  formData.append("lname", lname);
  formData.append("phoneNumber", phoneNumber);
  formData.append("institute", institute);

  if (file.files.length === 0) {
    console.log("error is here");
    error.style.display = "block";
    error.innerHTML = `
			<div>Please upload a valid ID-card</div>`;
  } else {
    if (file.files[0].size > 1000000) {
      console.log("error is here");
      error.style.display = "block";
      error.innerHTML = `
			<div>ID-card file size is larger than 1 MB. Please re-upload a compressed image</div>`;
    } else {
      submit.value = "loading...";

      // submit form values to webhook
      fetch("https://hook.us1.make.com/b586jqtf2sgmuoyki5vxdcmzd5p69hiw", {
        method: "POST",
        "Content-Type": "multipart/form-data; boundary=---generatedboundary",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
        })
        .then((data) => {
          submit.value = "submit";
          success.style.display = "block";
          // add email and phone number values to the verify otp form
          phoneReferral.innerHTML = phoneNumber;
          emailReferral.innerHTML = email;
          //success.innerHTML = `${data.message}`;
        })
        .catch((err) => {
          console.error(err);
          submit.value = "Submit";
          error.style.display = "block";
          error.innerHTML = `
			<div>${err}</div>`;
        });
    }
  }
});

//verify OTP form
const verifyOTP = document.querySelector("#verify-otp");
const backBtn = document.querySelector("#referral-back");
const verifyForm = document.querySelector("#verify-otp-form");
const verifySuccess = document.querySelector("#verify-otp-success");
const verifyFailure = document.querySelector("#verify-otp-failure");

//when back button is pressed hide verify OTP form and show GHF form
backBtn.addEventListener("click", () => {
  signupForm.style.display = "block";
  verifyForm.style.display = "none";
});

let verifyData = new FormData();
verifyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const smsOTP = document.querySelector("#sms-otp").value;
  const emailOTP = document.querySelector("#email-otp").value;
  verifyOTP.value = "Verifying...";
  verifyData.append("smsOTP", smsOTP);
  verifyData.append("emailOTP", emailOTP);
  verifyData.append("emailOTP", phoneNumber);

  // submit values to a webhook
  fetch("https://hook.us1.make.com/5xgo9ac6utvsgegjuirg0ref385a3w44", {
    method: "POST",
    "Content-Type": "application/json",
    body: verifyData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    .then((data) => {
      verifyFailure.style.display = "none";
      verifyForm.style.display = "none";
      verifySuccess.style.display = "block";
    })
    .catch((err) => {
      console.error(err);
      verifyOTP.value = "Submit";
      verifyFailure.style.display = "block";
      verifySuccess.style.display = "none";
      verifyFailure.innerHTML = `
			<div>${err}</div>`;
    });
});
