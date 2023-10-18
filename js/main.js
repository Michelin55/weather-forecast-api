//function    getPublic(){
 //   const url ="http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json";
 //   fetch(url)
  //      .then(response => response.json())
   //     .then(data => {
  //          console.log(data.dataseries);
   //     })
  //      .catch(error => console.log(error));
  //  }
// getPublic()

//Importing the cities variable
//import {
 //   cities
//} from "./cities.js";

//console.log(cities);

//Selecting elements from HTML

var selectElement = document.getElementById("citySelected");
var date = document.querySelectorAll(".date");
var img = document.querySelectorAll(".img");
var weather = document.querySelectorAll(".weather");
var max = document.querySelectorAll(".H");
var min = document.querySelectorAll(".L");
var loading = document.querySelector(".results");


//Function to retrieve city names and display them as options
//function retrievingCities() {
  //  var j = 0;
  //  var citiesKey = [];
 //   for (var key in cities) {
  //      var citiesData = cities[key]; // citiesData stores each country with their cities
     //   citiesKey[j] = citiesData; //citiesKey is an array to store only the cities 
   //     for (var i = 0; i < 2; i++) {
      //      var option = document.createElement('option');
       //     option.value = citiesData[i].name;
       //     option.text = citiesData[i].name + ", " + key;
        //    selectElement.appendChild(option);

    //    }
     //   j++;
   // }
   // return citiesKey;
//}
var forecastDiv = document.querySelector(".forecast-block");
//The citiesData variable contains an array of objects returned from the retrievingCities function
//var citiesData = retrievingCities();
//console.log(citiesData);

//This event listener helps us obtain the weather forecast for the selected option
selectElement.addEventListener('change', function () {
    //Displaying the div containing all seven cards representing the weather forecast for seven days.
   // loading.style.display = "block";
    
    //Storing the clicked option in a varible
    var selectedValue = selectElement.value;
    console.log('Selected option value:', selectedValue);
    citiesFetch(selectedValue.lon, selectedValue.lat)
    //Looping through the array to compare the value clicked (option) with the one stored in selectelement
 /*   for (var i = 0; i < selectElement.length; i++) {
        //Storing the i object of the citisData in a variable called cityGroup to loop through it
        var cityGroup = selectElement[i];

        for (var j = 0; j < cityGroup.length; j++) {
            
            //If the condition is true, we call the citiesLonlat function to use the 7timer API and retrieve the weather forecast for the longitude and latitude of the selected city
            if (selectedValue === cityGroup[j]) {
                citiesFetch(cityGroup[j].longitude, cityGroup[j].latitude);
                break;
            }
        }

    }
*/
})

//This function fetches weather forecast data from the 7timer API based on coordinates and updates the forecast display
function citiesFetch(longitude, latitude) {

    fetch(`https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Process the parsed JSON data
           // loading.style.display = "none";
            //Looping through data.dataseries array of objects
            for (var i = 0; i < data.dataseries.length; i++) {
                //Storing the i object in dataseries variable
                var dataseries = data.dataseries[i];
                console.log(dataseries)
                //Assigning the weather values retrieved from the API to a variable named weather[i] and displaying it on the webpage
                weather[i].textContent = dataseries.weather;
                //Assigning the max temperature values retrieved from the API to a variable named max[i] and displaying it on the webpage
                max[i].textContent = "H: " + dataseries.temp2m.max + "C°";
                //Assigning the min temperature values retrieved from the API to a variable named min[i] and displaying it on the webpage
                min[i].textContent = "L: " + dataseries.temp2m.min + "C°";
                //date : 
                //Storing the returned value from the readableDate function in the dateValue variable.
                var dateValue = readableDate(dataseries.date); //dateValue variable is a string
                //Creating a new date object to convert the string date into a date object
                var dateObject = new Date(dateValue); // output example : Tue May 10 2022 00:00:00 GMT+0000 (Coordinated Universal Time)
                //Converting the date object into a string using specific parameters (output: Tue May 10 2022)
                var d = dateObject.toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                //console.log(dateObject);
                //.log(typeof(d));
                
                //Displaying the date on the web page
                date[i].textContent = d;

                //console.log(typeof(dataseries.date));
                if (forecastDiv.style.display === "none" || forecastDiv.style.display === "") {
                    forecastDiv.style.display = "flex"; // Show the forecast div
                 } else {
                forecastDiv.style.display = "none"; // Hide the forecast div
                 }

                //img
                if (dataseries.weather === "clear") {
                    img[i].src = "images/clear.png"
                }
                if (dataseries.weather === "cloudy") {
                    img[i].src = "images/cloudy.png"
                }
                if (dataseries.weather === "fog") {
                    img[i].src = "images/fog.png"
                }
                if (dataseries.weather === "ishower") {
                    img[i].src = "images/ishower.png"
                }
                if (dataseries.weather === "lightrain") {
                    img[i].src = "images/lightrain.png"
                }
                if (dataseries.weather === "lightsnow") {
                    img[i].src = "images/lightsnow.png"
                }
                if (dataseries.weather === "mcloudy") {
                    img[i].src = "images/mcloudy.png"
                }
                if (dataseries.weather === "oshower") {
                    img[i].src = "oshower.png"
                }
                if (dataseries.weather === "pcloudy") {
                    img[i].src = "images/pcloudy.png"
                }
                if (dataseries.weather === "rain") {
                    img[i].src = "images/rain.png"
                }
                if (dataseries.weather === "rainsnow") {
                    img[i].src = "images/rainsnow.png"
                }
                if (dataseries.weather === "snow") {
                    img[i].src = "images/snow.png"
                }
                if (dataseries.weather === "ts") {
                    img[i].src = "images/tsrain.png"
                }
                if (dataseries.weather === "tstorm") {
                    img[i].src = "images/tstorm.png"
                }

            }
            //Displaying the cards
                parent.style.display = "block";
                parent.style.display = "flex";
                 parent.style.justifyContent = "center";

        })
        .catch(error => {
            console.error('Fetch error:', error);

        });

}
//citiesLonLat() ;

//This function converts a date number (e.g., 20230816) into a string format separated by hyphens (e.g., 2023-08-16)
function readableDate(dateNumber) {
    var d = dateNumber.toString();
    var year = d.substring(0, 4);
    var month = d.substring(4, 6);
    var day = d.substring(6, 8);
    var date = year + "-" + month + "-" + day;
    return date;
}
