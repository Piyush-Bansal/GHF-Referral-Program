let responseData;
const url =
  "https://api.airtable.com/v0/apptPNUvXdxLoYcaz/Referred?maxRecords=1&view=Grid%20view&filterByFormula%3D%7BreferralCode%7D%3D%22PIYBAN78768%22";
const auth = "keyATbFCUlFQ30Bqz";

const loadData = async () => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + auth,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.records.map((items) => {
        return items.fields;
      });
    } else {
      throw Error(response.statusText);
    }
  } catch (err) {
    console.error(err);
  }
};

const getData = loadData();
getData.then((data) => {
  console.log(data[0]);
  responseData = data[0];
});
