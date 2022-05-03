const queryString = window.location.search;
const urlPara = new URLSearchParams(queryString);
const refCode = urlPara.get("uuid");
