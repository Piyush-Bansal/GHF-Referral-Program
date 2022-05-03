const refCode = "INABC";
const url = `https://api.airtable.com/v0/apptPNUvXdxLoYcaz/Referred?filterByFormula=%7BreferralCode%7D%3D%22${refCode}%22&maxRecords=1&pageSize=1&view=Grid+view`;
const auth = "keyATbFCUlFQ30Bqz";

fetch(url, {
  method: "GET",
  headers: {
    Authorization: "Bearer " + auth,
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data.records.length));
