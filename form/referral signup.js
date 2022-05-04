console.log("linked");
const formTag = document.querySelector("ghf-referral");
const submit = document.querySelector("#submit");
const success = document.querySelector(".w-form-done");
const error = document.querySelector(".w-form-fail");
let file = document.getElementById("file");
const referralInput = document.querySelector("#referral-code");

//grab referral code from the url and input it in the form field
const queryString = window.location.search;
const urlPara = new URLSearchParams(queryString);
const refCode = urlPara.get("uuid");
referralInput.value = refCode;

let formData = new FormData();

file.addEventListener(
  "change",
  function handleFiles(e) {
    const fileList = this.files;
    formData.append("id", e.target.files[0]);
  },
  false
);

//prevent default action

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const code = document.querySelector("#code").value;
  submit.value = "loading...";
  formData.append("name", name);
  formData.append("email", email);
  formData.append("code", code);

  // submit form values to webhook
  fetch("https://hook.us1.make.com/kf3c4ladtzej6htolylbi3xtqsztveio", {
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
      submit.value = "Submit";
      success.style.display = "block";
      //success.innerHTML = `${data.message}`;
    })
    .catch((err) => {
      console.error(err);
      submit.value = "Submit";
      error.style.display = "block";
      error.innerHTML = `
			<div>${err}</div>`;
    });
});
