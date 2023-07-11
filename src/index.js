import { api } from "./api.js";
import "./style.css";

var search = document.querySelector("#search");

const time = ["#56A3A6", "#FFCC33", "#E9FFF9", "#DB504A", "#084C61"];
const temp = ["#FCFCFC", "#19647E", "#62BFF8", "#F1C40F", "#F2542D"];

document.body.style.backgroundImage =
  "linear-gradient(to top right," + temp[2] + "," + time[2] + ")";

search.addEventListener("submit", (e) => {
  fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=" +
      api +
      "&q=" +
      document.querySelector("#location").value +
      "&days=" +
      10,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })

    .then(function (response) {
      console.log(response);
      document.querySelector(".weather").classList.remove("hidden");
      document.querySelector(".c").textContent =
        "Current weather in " + response.location.name;
      const localtime = response.location.localtime.slice(-5).slice(0,2)
      console.log(localtime)
      var t = "";
      var m = "";
      if (localtime < 5) {
        t = 0;
      } else if (localtime < 11) {
        t = 1;
      } else if (localtime < 18) {
        t = 2;
      } else if (localtime < 21) {
        t = 3;
      } else {
        t = 4;
      }

      if (response.current.feelslike_f < 20) {
        m = 0;
      } else if (response.current.feelslike_f < 40) {
        m = 1;
      } else if (response.current.feelslike_f < 60) {
        m = 2;
      } else if (response.current.feelslike_f < 80) {
        m = 3;
      } else {
        m = 4;
      }
      document.body.style.backgroundImage =
        "linear-gradient(to top right," + temp[m] + "," + time[t] + ")";
      var current = document.querySelector(".current");
      current.innerHTML = "";
      var h = document.createElement("h3");
      h.textContent = response.current.feelslike_f;
      var h2 = document.createElement("h2");
      h2.textContent = response.current.condition.text;
      current.append(h);
      current.append(h2);

      var forecast = response.forecast.forecastday;

      var h = document.querySelector(".hourly");
      h.innerHTML = "";
      forecast[0].hour.forEach((element) => {
        var d1 = document.createElement("div");
        d1.classList.add("hour");
        var p = document.createElement("div");
        p.classList.add("p");
        p.textContent = element.time.slice(11, 16);
        d1.append(p);
        var h31 = document.createElement("h3");
        h31.classList.add("temp");
        h31.textContent = element.feelslike_f;
        d1.append(h31);
        var h3 = document.createElement("h3");
        h3.classList.add("condition");
        h3.textContent = element.condition.text;
        d1.append(h3);
        h.append(d1);
      });

      var d = document.querySelector(".ten-day");
      d.innerHTML = "";
      forecast.forEach((element) => {
        var d1 = document.createElement("div");
        d1.classList.add("hour");
        var p = document.createElement("div");
        p.classList.add("p");
        p.textContent = element.date.slice(5, 10);
        d1.append(p);
        var h31 = document.createElement("h3");
        h31.classList.add("temp");
        h31.textContent = element.day.maxtemp_f;
        d1.append(h31);
        var h3 = document.createElement("h3");
        h3.classList.add("condition");
        h3.textContent = element.day.condition.text;
        d1.append(h3);
        d.append(d1);
      });
    })
    .catch(function (err) {
      // Error :(
      console.log(err);
    });

  e.preventDefault();
});
