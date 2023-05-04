// Psuedocode
//
// Variables
// const cityEl
// const submitBtnEl
// const favoritesEl
// const container
//
//
//
// Functions:
// Event listener for submit buutton
// startApp()               Funct that reads city name from input & calls weather and health
// getWeather()             Funct will call getGeoCode()
// cityWeather()            Funct will get weather for specific city
// getHealth()              Funct returns nearby health information
// getPhoto()               Takes city name as input and returns 1 or more photos of location
// getEvents()              Takes city name and returns nearby events
// addFavorites()           Adds favorites as an array to local storage
// displayItems()           Displays items from local storage
// clearStorage()           Clears items from local storage

// // Psuedocode
//
// Variables
// const cityEl
// const submitBtnEl
// const favoritesEl
// const container
//
//
//
// Functions:
// Event listener for submit buutton
// startApp()               Funct that reads city name from input & calls weather and health
// getWeather()             Funct will call getGeoCode()
// cityWeather()            Funct will get weather for specific city
// getHealth()              Funct returns nearby health information
// getPhoto()               Takes city name as input and returns 1 or more photos of location
// getEvents()              Takes city name and returns nearby events
// addFavorites()           Adds favorites as an array to local storage
// displayItems()           Displays items from local storage
// clearStorage()           Clears items from local storage
// 
const accessAPIKey="EaQ9t1Sjw17W6zf0jNbxcojnup5AueopgWzyReTuDfY";
const eventsAPIKey="6K5ULLZPGGNE7POPJW7W";
const openTripAPIKey="5ae2e3f221c38a28845f05b637c4300ff4f0815f5d43b69a2bb28c20";
//const tripAdvisorAPIKey="0A0E1A2DD5B64A41B5BA8540C9D8DA1B";

const clientAPIID=" MzM0MDk3NzF8MTY4MzAxMDIzMi43MjgzMDk";
const theAppSecret="635f720cbf32b9dc9216edb636426e129a80319eda0f6f48fa9692dacf60371b -";
//const secretAPIKey="u1vEN6z6jphcPkL-SJYm0HT3wCva0eGs6Anydi2p95Y";
const openweatherAPIKey="dac838d30631fe359fde731b09d63ae8";
//const query = 'Chico';
const count = 50;
const citeNameEl=document.getElementById("city-to-search");
const inputEl=document.getElementById("city-form");

const submitEl=document.getElementById("submit");
const picutesContainer=document.getElementById("pictures");
const cityPicutreEl=document.querySelector(".cityPictures");
const showPicutersBtn=document.getElementById("show");
const showWeatherBtn=document.getElementById("weather");
const showEventsBtn=document.getElementById("event");
const eventsEl=document.getElementById("eventsContainer");
const mainresultEL=document.getElementById("mainResult");
const weatherEl=document.getElementById("WeatherContainer");
const weatherDivEl=document.getElementById("weatherDiv");
const eventDivEl=document.getElementById("eventDiv");
const pictureDivEl=document.getElementById("showDiv");
var numberOfPictures;
var currentPictureIndex;
var pictureArr=[];
var isSubmit=false;



async function getPictures(){
    //event.preventDefault();
    pictureArr=[];

    numberOfPictures=0;
    currentPictureIndex=0;
    var query=citeNameEl.value;
    for (var i=0;i<3;i++){
        var autoCompleteURL=`https://api.unsplash.com/search/photos/?client_id=${accessAPIKey}&query=${query}&per_page=${count}&page=${i}`
        fetch(autoCompleteURL)
            .then(function(response){
                return response.json();
            })
                .then(function(data){
                    console.log(data);
                   pictureArr=pictureArr.concat(data.results);
                   console.log(pictureArr);
                   numberOfPictures+=pictureArr.length;
                });
    }
    
    setTimeout(setBackgroundPicture, 20);

}

function setBackgroundPicture(){
    var likes=0
    var id=0;
    var url;
    for (var i=0;i<pictureArr.length;i++){
        if (pictureArr[i].likes>likes){
            likes=pictureArr[i].likes;
            id=i;
        }
    }
    console.log("the most liked picture is");

    mainresultEL.value="";
    console.log(pictureArr[id]);
    url=pictureArr[id].urls.regular;
    console.log(url);
    mainresultEL.style.backgroundImage =`url('${url}')`;
    mainresultEL.style.backgroundSize = "cover";// to scale the image to cover the entire element
    mainresultEL.style.backgroundRepeat = "no-repeat";//to prevent the image from repeating.
    mainresultEL.style.width = "100vw";
    mainresultEL.style.height = "100vh";
    showPicutersBtn.style.display="block";
    showEventsBtn.style.display="block";
    showWeatherBtn.style.display="block";
}

showPicutersBtn.addEventListener("click",displayPictures);
//pictureDivEl.addEventListener("click",displayPictures);

async function displayPictures(event){
    event.preventDefault();
    mainresultEL.style.display="none";
    picutesContainer.style.display="flex";
    eventsEl.style.display="none";
    weatherEl.style.display="none";
    for (i=0;i<pictureArr.length;i++){
        var src = pictureArr[i].urls.regular;
        var alt = pictureArr[i].alt_description;
        $(picutesContainer).append(`<img class="cityPictures" id="picture${i}" src="${src}" width="300" height="300" alt="${alt}" style="display: none;"/>`);

    }
    for (var j=currentPictureIndex; j<5 ;j++){
        document.getElementById("picture"+j).style.display="block";
    }
    currentPictureIndex+=5;
    if(currentPictureIndex<pictureArr.length){
        document.getElementById("Next").style.display="block";
    }
}

function displayNext(event){
    event.preventDefault();
    if(currentPictureIndex+5>pictureArr.length){
        for (var i=currentPictureIndex; i<pictureArr.length; i++){
            document.getElementById("picture"+i).style.display="block";
        }
        document.getElementById("Next").style.display="none";
    }
    else{
        if(currentPictureIndex==pictureArr.length-5){
            document.getElementById("Next").style.display="none";
        }
    
        if(currentPictureIndex>=5){
            for (var j=currentPictureIndex-1; j>=currentPictureIndex-5; j--){
                document.getElementById("picture"+j).style.display="none";
            }
            for (var i=currentPictureIndex; i<currentPictureIndex+5; i++){
                document.getElementById("picture"+i).style.display="block";
            }
            currentPictureIndex+=5;
        }
        else{
            for (var i=currentPictureIndex; i<currentPictureIndex+5; i++){
                document.getElementById("picture"+i).style.display="block";
            }
            currentPictureIndex+=5;
        }
        if (currentPictureIndex>5){
            document.getElementById("Previous").style.display="block";
        }
    }
}
function displayPrevious(event){
    event.preventDefault();
    
   
    for (var i=currentPictureIndex-1; i>=currentPictureIndex-5; i--){
         document.getElementById("picture"+i).style.display="none";
    }
    currentPictureIndex-=5;
    if(currentPictureIndex-5==0){
        document.getElementById("Previous").style.display="none";
        for (var j=currentPictureIndex-1; j>=currentPictureIndex-5; j--){
            document.getElementById("picture"+j).style.display="block";
        }
        currentPictureIndex=0;
        document.getElementById("Previous").style.display="none";
    }  
    else if (currentPictureIndex-5<0){
        document.getElementById("Previous").style.display="none";
        for (var j=currentPictureIndex-1; j>=0; j--){
            document.getElementById("picture"+j).style.display="block";
        }
        currentPictureIndex=0;
        document.getElementById("Previous").style.display="none";
    }
    else{
        for (var j=currentPictureIndex-1; j>=currentPictureIndex-5; j--){
            document.getElementById("picture"+j).style.display="block";
        } 
    }


    if (currentPictureIndex<pictureArr.length-5){
        document.getElementById("Next").style.display="block";
    }
    
 }


 showEventsBtn.addEventListener("click",function(event){
    event.preventDefault();
    document.getElementById("Next").style.display="none";
    document.getElementById("Previous").style.display="none";
    mainresultEL.style.display="none";
    picutesContainer.style.display="none";
    eventsEl.style.display="flex";
    weatherEl.style.display="none";
});  

eventDivEl.addEventListener("click",function(event){
    event.preventDefault();
    document.getElementById("Next").style.display="none";
    document.getElementById("Previous").style.display="none";
    mainresultEL.style.display="none";
    picutesContainer.style.display="none";
    eventsEl.style.display="block";
    weatherEl.style.display="none";
});  


function getEvents(){
    //event.preventDefault();
    $(eventsEl).value="";
    eventsArr=[];

    var query=citeNameEl.value;
    var cityName=query.replace(/\s+/g, '+');
    var url=`https://api.seatgeek.com/2/events?venue.city=${cityName}&client_id=${clientAPIID}`;
    fetch(url)
    .then(function(response){
        return(response.json());
    })
    .then(function(data){
        if(data.events.length>0){
            console.log(data.events);
            displayEvents(data.events);
        }
        else{
            $(eventsEl).append(`<p> there are no events will be in ${query} </p>`);
        }
    });
}


function displayEvents(eventsArr){
    
    for (var i=0;i<eventsArr.length;i++){
        var eventDate=eventsArr[i].datetime_local;
        var eventType= eventsArr[i].type.toUpperCase();
        var eventTitle=eventsArr[i].short_title;

        var logoImage=eventsArr[i].performers[0].image;
        var firstPerformer=eventsArr[i].performers[0].name;
        var SecondPerformer
        if(eventsArr[i].performers.length>1){
            if(eventsArr[i].taxonomies.length>1){
            SecondPerformer=" VS "+eventsArr[i].performers[1].name;
            }
            else{
                SecondPerformer=" & "+eventsArr[i].performers[1].name;
            }
        }
        else{
            SecondPerformer="";
        }
        //var SecondPerformerImage=eventsArr[i].performers[1].image;
        var eventStreetAddress=eventsArr[i].venue.address;
        var eventCityStateZIP=eventsArr[i].venue.extended_address;
        $(eventsEl).append(`
        <div class="card">
            <div class="card-body">
                <h3 class="card-title">${eventType} : ${eventTitle}</h3>
                <p>${eventDate}</p>
                <img id="wicon" src="${logoImage}">
                <h4 class="card-text">${firstPerformer} ${SecondPerformer}</h4>
                <h4>Event Address:</h4>
                <p class="card-text">${eventStreetAddress}</p>
                <p>${eventCityStateZIP}</p>
            </div>
        </div>
        `);
    }

}


function getInformation(event){
    event.preventDefault();
   // getDescription();
    getPictures();
    getEvents();
    citySearch();

}

submitEl.addEventListener("click",getInformation);

document.getElementById("Next").addEventListener("click",displayNext);
document.getElementById("Previous").addEventListener("click",displayPrevious);

showWeatherBtn.addEventListener("click",function(event){
    event.preventDefault();
    document.getElementById("Next").style.display="none";
    document.getElementById("Previous").style.display="none";
    mainresultEL.style.display="none";
    picutesContainer.style.display="none";
    eventsEl.style.display="none";
    weatherEl.style.display="block";
})
weatherDivEl.addEventListener("click",function(event){
    event.preventDefault();
    document.getElementById("Next").style.display="none";
    document.getElementById("Previous").style.display="none";
    mainresultEL.style.display="none";
    picutesContainer.style.display="none";
    eventsEl.style.display="none";
    weatherEl.style.display="block";
})
const myApiKey = '0fffcdb9d9732daced94e2c5d89e2a50';
const cityInputValue = document.getElementById('city-form');

//cityInputValue.addEventListener('submit', citySearch);


function citySearch() {
    //event.preventDefault();

    document.getElementById("day-one").value="";
    document.getElementById("day-two").value="";
    document.getElementById("day-three").value="";
    document.getElementById("day-four").value="";
    document.getElementById("day-five").value="";
    const inputBox = document.getElementById('city-to-search');

    if (!inputBox.value) {
        return;
    }

    let city = inputBox.value.trim();
    console.log('city searched:', city);

    fetchGeoInfo(city);
}

function fetchGeoInfo(city) {

    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q='${city}&appid=${myApiKey}`;

    fetch(geoUrl)
        .then(function (response) {

            if (!response.ok) {
                throw response.json();
            }
            return response.json();
            })

        .then(function (geoData) {

        //save to storage here
        getCurrentWeather(geoData[0].lat, geoData[0].lon);
        getForecastData(geoData[0].lat, geoData[0].lon);
        });
}

function getCurrentWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=imperial`;
    
    fetch(weatherUrl)
    .then(function (response) {
        // console.log('weather call response: ', response);
        if (!response.ok) {
        // console.log('weather fetch response is not ok');
        throw response.json();
      }
        // console.log('weather fetched successfully');
        return response.json();
    })
    .then(function (weatherData) {
        filterTodayWeatherData(weatherData)
        // console.log('data from getCurrentWeather', weatherData)
    });
}

function filterTodayWeatherData(weatherData){
    // console.log('must pinpoint which data points you want from the following list', weatherData)
}

let dayNumber = 0

function displayForecast(forecastData) { 
//  console.log('should be the 4, 12, 20, 28, and 36 arrays', forecastData)
    let dateForcasted = forecastData.dt_txt.split(' ')[0]
    let weatherIcon = forecastData.weather[0].icon
    let temperature = forecastData.main.temp
    let windSpeed = forecastData.wind.speed
    let humidity = forecastData.main.humidity

    const daySection = document.querySelectorAll('.days');
    const dayOneSection = daySection[dayNumber]
    
    var dayEl = document.createElement('li');
    dayEl.setAttribute('style', 'list-style:none;');
    dayEl.innerText = dateForcasted;
    dayOneSection.appendChild(dayEl);

    var dayEl = document.createElement('img');
    dayEl.setAttribute('style', 'background-color: rgb(148, 148, 212);border-radius: 20px;');
    dayEl.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
    dayOneSection.appendChild(dayEl);

    var dayEl = document.createElement('li');
    dayEl.setAttribute('style', 'list-style:none;');
    dayEl.innerText = temperature + ' F';
    dayOneSection.appendChild(dayEl);

    var dayEl = document.createElement('li');
    dayEl.setAttribute('style', 'list-style:none;');
    dayEl.innerText = windSpeed + ' miles/hour';
    dayOneSection.appendChild(dayEl);

    var dayEl = document.createElement('li');
    dayEl.setAttribute('style', 'list-style:none;');
    dayEl.innerText = 'humidity ' + humidity + ' %';
    dayOneSection.appendChild(dayEl);

    dayNumber++;
}

function filterForecastData(forecastData){
    let startIndex;
// #region
        //dt._txt is currently an array, but we want to get a number value .: 
        // after splitting you get an array with the date and time seperated
        // call for index one because that's where the time number is, [0] is the date -- back in string form here
        // to get first two characters from a string use slice(0,2)
        // so then the i of startindex will be the days at 12pm   
        // increment by 8 to get the next day at 12pm
// #endregion
for (let i=0; i < forecastData.length; i++){

        if (forecastData[i].dt_txt.split(' ')[1].slice(0,2) === '12'){
            startIndex = i
            console.log(startIndex)
            break  // if return, it goes to array 36 because that's the last 12pm
        }
    }
    for (let i = startIndex; i < forecastData.length; i+=8){
        
        displayForecast(forecastData[i]); 
    }
}

function getForecastData(lat, lon) {

    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=imperial`;

    fetch(weatherUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
            })

        .then(function (forecastData) {
            filterForecastData(forecastData.list);
            });
}

