const url = `https://api.airtable.com/v0/apptPNUvXdxLoYcaz/Users?maxRecords=3&view=Grid%20view&filterByFormula=%7BEmail%7D=%22piyush@univ.ai%22`;

const token = "keyAmtKToVnkwqhsB";

const getData = async function () {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

getData();
console.log(encodeURI(`{Email}="piyush@univ.ai"`));
