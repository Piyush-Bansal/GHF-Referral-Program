//grab uuid from the URL
const queryString = window.location.search;
const urlPara = new URLSearchParams(queryString);
const refCode = urlPara.get("uuid");
let userName;

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
    userName = userNameTag.innerHTML;
    const refCountTag = document.querySelector("#refCount");
    refCountTag.innerHTML = `${refCount}`;
  } else {
    loaderLogo.style.display = "none";
    loaderHeadline.style.display = "block";
    loaderHeadline.innerHTML =
      "Somethings not right, please check your dashboard link";
  }
});

// grab email element
const email = document.querySelector("#email");
const twitter = document.querySelector("#twitter");
const wa = document.querySelector("#wa");
const facebook = document.querySelector("#facebook");
const linkedIn = document.querySelector("#linkedIn");

//messages

email.innerHTML = `I've started my journey towards landing great tech jobs with GHF's courses - you should too! Use my referral code ${refCode} to get 20% off on your subscription. Join the coolest tech community today!`;
wa.href = `https://wa.me/?text=I've%20started%20my%20tech%20journey%20with%20GHF,%20and%20I%20think%20you%20should%20too!%20Use%20my%20referral%20code%20${refCode}%20to%20get%2020%25%20off%20on%20your%20subscription!%20%0ARegister%20at%20www.univ.ai/referralprogram?uuid=${refCode}%0A`;
twitter.href = `https://twitter.com/intent/tweet?text=I've%20started%20my%20tech%20journey%20with%20GHF,%20and%20I%20think%20you%20should%20too!%20Use%20my%20referral%20code%20ABC123%20to%20get%2020%25%20off%20on%20your%20subscription!%20%0ARegister%20at%20www.univ.ai/ghf/tell-a-friend?uuid=${refCode}%0A`;
facebook.href = `https://www.facebook.com/sharer.php?u=www.univ.ai/referralprogram?uuid=${refCode}&quote=I've%20started%20my%20tech%20journey%20with%20GHF,%20and%20I%20think%20you%20should%20too!%20Use%20my%20referral%20code%${refCode}%20to%20get%2020%25%20off%20on%20your%20subscription!%20%0ARegister%20at%20www.univ.ai/ghf/tell-a-friend?uuid=${refCode}%0A`;
linkedIn.href = `https://www.facebook.com/sharer.php?u=www.univ.ai/tell-a-friend?uuid=${refCode}&quote=I've%20started%20my%20tech%20journey%20with%20GHF,%20and%20I%20think%20you%20should%20too!%20Use%20my%20referral%20code%${refCode}%20to%20get%2020%25%20off%20on%20your%20subscription!%20%0ARegister%20at%20www.univ.ai/ghf/tell-a-friend?uuid=${refCode}%0A`;
