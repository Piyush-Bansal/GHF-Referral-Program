const queryString = window.location.search;
const urlPara = new URLSearchParams(queryString);
const refCode = urlPara.get("uuid");

//grab loader element data
const loaderContainer = document.querySelector(".ref_loader");
const loaderLogo = document.querySelector(".ref_loader-logo");
const loaderHeadline = document.querySelector(".ref_loader-headline");

// if uuid is empty
if (refCode == null) {
  loaderLogo.style.display = "none";
  loaderHeadline.style.display = "block";
  loaderHeadline.innerHTML =
    "Somethings not right, please check your dashboard link";
}

let responseData;
const url = `https://api.airtable.com/v0/apptPNUvXdxLoYcaz/Referred?filterByFormula=%7BreferralCode%7D%3D%22${refCode}%22&maxRecords=1&pageSize=1&view=Grid+view`;
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
      return data.records.map((items) => {
        return items.fields;
      });
    } else {
      throw Error(response.statusText);
      loaderLogo.style.display = "none";
      loaderHeadline.style.display = "block";
      loaderHeadline.innerHTML =
        "Somethings not right, please check back in sometime";
    }
  } catch (err) {
    console.error(err);
  }
};

const getData = loadData();
getData.then((data) => {
  console.log(data[0]);
  responseData = data[0];
  if (responseData != undefined) {
    loaderContainer.style.display = "none";

    //update data in the page
    const firstName = responseData.firstName;
    const lastName = responseData.lastName;
    const refCount = responseData.totalReferrals;

    const userNameTag = document.querySelector("#userName");
    userNameTag.innerHTML = `${firstName} ${lastName}`;
    const refCountTag = document.querySelector("#refCount");
    refCountTag.innerHTML = `${refCount}`;
  } else {
    loaderLogo.style.display = "none";
    loaderHeadline.style.display = "block";
    loaderHeadline.innerHTML =
      "Somethings not right, please check your dashboard link";
  }
});
