const formTag = document.querySelector("form");
const submit = document.querySelector("#submit");
const success = document.querySelector(".success");
const error = document.querySelector(".error");

let formData = new FormData();

//prevent default action

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  submit.value = "loading...";
  formData.append("name", name);
  formData.append("email", email);

  // submit form values to webhook
  fetch("https://hook.us1.make.com/qan822db1d0yvxv1rlch9howalaxfwn9", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // return Promise.reject(response);
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
    })
    .then((data) => {
      submit.value = "Submit";
      success.style.display = "block";
      success.innerHTML = `${data.message}`;
    })
    .catch((err) => {
      console.error(err);
      submit.value = "Submit";
      error.style.display = "block";
      error.innerHTML = `${err}`;
    });
});
