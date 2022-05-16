// grab ui elements
const sendToTag = document.querySelector("#send");
const messageTag = document.querySelector("#email");
const sendBtn = document.querySelector("#sendBttn");
const failure = document.querySelector(".w-form-fail");
const form = document.querySelector("#wf-form-Share-email");

//webhook address
const webhookUrl = "https://hook.us1.make.com/1fkxoj996etbxpa5tlt60w7g14suoh3j";

//add event listner to the submit button
sendBtn.addEventListener("click", function (e) {
  e.preventDefault();
  sendBtn.value = "Sending...";
  let formResponse = new FormData();
  const sendTo = sendToTag.value;
  const message = messageTag.value;

  //send data to the webhook
  formResponse.append("sendto", sendTo);
  formResponse.append("message", message);

  fetch(webhookUrl, {
    method: "POST",
    body: formResponse,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      sendBtn.value = "Send";
      //   form.style.display = "none";
      failure.style.display = "block";
      failure.innerHTML = `<div>Your emails has been sent</div>`;
    })
    .catch((err) => {
      sendBtn.value = "Send";
      failure.style.display = "block";
      failure.innerHTML = `<div>Something went wrong, please try again later.</div>`;
    });

  //
});
