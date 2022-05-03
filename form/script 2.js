const formTag = document.querySelector("form");
const submit = document.querySelector("#submit");
const success = document.querySelector(".success");

//prevent default action

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  submit.value = "loading...";
  const formData = {
    userName: name,
    userEmail: email,
  };
  
  const sendData = async () =>{
    try{
        const res = await fetch("https://hook.us1.make.com/qan822db1d0yvxv1rlch9howalaxfwn9",{
            method: "POST",
            body: JSON.stringify(formData),
          })
    }
  }
  
  catch((error) => {
    console.log(error);
    }
sendData();

});


