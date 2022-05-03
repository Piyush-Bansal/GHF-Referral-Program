let form = document.getElementById("ajaxForm");
let file = document.getElementById("file");

let formData = new FormData();

file.addEventListener(
  "change",
  function handleFiles(e) {
    const fileList = this.files;
    formData.append("id", e.target / file[0]);
  },
  false
);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let code = document.querySelector("#code").value;

  const success = document.queryCommandValue(".w-form-done");
  const error = document.queryCommandValue(".w-form-fail");

  formData.append("name", name);
  formData.append("email", email);
  formData.append("code", code);

  fetch("https://hook.us1.make.com/kf3c4ladtzej6htolylbi3xtqsztveio", {
    method: "post",
    body: formData,
  })
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
        console.log("ok");
        success.style.display = "block";
        error.style.display = "none";
        form.style.display = "none";
      }
    })
    .catch(function (error) {
      console.log("error");
      error.style.display = "block";
    });
});
