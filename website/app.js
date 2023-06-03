// Base URL & API Key for OpenWeatherMap
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=3905bd4ac3214e35b14f961c6c5481e9";

/****************************************************************************/
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

/****************************************************************************/
//Event listener for the generate button
document.getElementById("generate").addEventListener("click", action);

function action() {
  const feelings = document.getElementById("feelings").value;
  const newZip = document.getElementById("zip").value;

  weather(baseURL, newZip, apiKey).then(async function (data) {
    // add data
    await postData("/add", {
      temprature: data.main.temp,
      date: newDate,
      input: feelings,
    });
    update();
  });
}

/****************************************************************************/
/* Function to POST data */

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ data }),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/****************************************************************************/
/*get Web API Data*/

const weather = async (baseURL, newZip, apiKey) => {
  const response = await fetch(baseURL + newZip + apiKey);
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/****************************************************************************/
//Getting project's data
const update = async () => {
  const request = await fetch("/all");
  try {
    //represents all data
    const all = await request.json();
    console.log("all object ", all);
    // upload new entries
    document.getElementById("temp").innerHTML = all.temprature;
    document.getElementById("date").innerHTML = all.date;
    document.getElementById("content").innerHTML = all.input;
  } catch (error) {
    console.log("error", error);
  }
};
