const url =
  "https://api.airtable.com/v0/appv69J1ch06OaHjD/Table%201?maxRecords=300&view=Grid%20view";
const auth = "keyAmtKToVnkwqhsB";

const institute = document.querySelector("#institute");
const email = document.querySelector("#email");
const submit = document.querySelector("#submit");
let records;

submit.addEventListener("click", (e) => {
  e.preventDefault();
});

const getData = function () {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + auth,
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
    institute.innerHTML =
      institute.innerHTML +
      `<option value ="${element.Name}">${element.Name}</option>`;
  });
});

institute.addEventListener("change", () => {
  const selected = institute.value;
  const value = records.find((record) => record.Name == selected);
  console.log(value);
  email.setAttribute("pattern", `${value.regex}`);
});
