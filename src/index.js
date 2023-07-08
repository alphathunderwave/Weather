import { api } from "./api.js";
import "./style.css";

var search = document.querySelector("#search");

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
      console.log(response)
      document.querySelector('.weather').classList.remove('hidden')
      document.querySelector('.c').textContent = 'Current weather in ' + response.location.name

      var current = document.querySelector(".current")
      current.innerHTML = ''
      var h = document.createElement('h3')
      h.textContent=response.current.feelslike_f
      var h2 = document.createElement('h2')
      h2.textContent=response.current.condition.text
      current.append(h)
      current.append(h2)


      var forecast = response.forecast.forecastday


      var h = document.querySelector('.hourly')
      h.innerHTML = ''
      forecast[0].hour.forEach(element => {
        var d1 = document.createElement('div')
        d1.classList.add('hour')
        var p = document.createElement('div')
        p.classList.add('p')
        p.textContent= element.time.slice(11,16)
        d1.append(p)
        var h31 = document.createElement('h3')
        h31.classList.add('temp')
        h31.textContent =  element.feelslike_f
        d1.append(h31)
        var h3 = document.createElement('h3')
        h3.classList.add('condition')
        h3.textContent = element.condition.text
        d1.append(h3)
        h.append(d1)

      });

      var d = document.querySelector('.ten-day')
      d.innerHTML=''
      forecast.forEach(element => {
        var d1 = document.createElement('div')
        d1.classList.add('hour')
        var p = document.createElement('div')
        p.classList.add('p')
        p.textContent= element.date.slice(5,10)
        d1.append(p)
        var h31 = document.createElement('h3')
        h31.classList.add('temp')
        h31.textContent =  element.day.maxtemp_f
        d1.append(h31)
        var h3 = document.createElement('h3')
        h3.classList.add('condition')
        h3.textContent = element.day.condition.text
        d1.append(h3)
        d.append(d1)

      });

    })
    .catch(function (err) {
      // Error :(
      console.log(err);
    });

  e.preventDefault();
});
