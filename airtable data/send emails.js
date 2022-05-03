// grab ui elements
const sendToTag = document.querySelector("#send");
const messageTag = document.querySelector("#email");
const sendBtn = document.querySelector("#sendBttn");

//webhook address
const webhookUrl = "https://hook.us1.make.com/9bjsg4zukmh6gxd1ogihei7fq7vj69u1";

//add event listner to the submit button
sendBtn.addEventListener("click", function (e) {
  e.preventDefault();
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
    .then((data) => console.log(data));
  //
});
