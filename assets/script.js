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
// 
const accessAPIKey="EaQ9t1Sjw17W6zf0jNbxcojnup5AueopgWzyReTuDfY";
const eventsAPIKey="6K5ULLZPGGNE7POPJW7W";
//const secretAPIKey="u1vEN6z6jphcPkL-SJYm0HT3wCva0eGs6Anydi2p95Y";
const openweatherAPIKey="dac838d30631fe359fde731b09d63ae8";
//const query = 'Chico';
const count = 50;
const citeNameEl=document.getElementById("city-to-search");
const inputEl=document.getElementById("city-form");
const submitEl=document.getElementById("subm");
const picutesContainer=document.getElementById("pictures");
const cityPicutreEl=document.querySelector(".cityPictures");
const showPicutersBtn=document.getElementById("show");
var numberOfPictures;
var currentPictureIndex;
var pictureArr=[];



async function getPictures(event){
    event.preventDefault();
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
    console.log(pictureArr[id]);
    url=pictureArr[id].urls.regular;
    console.log(url);
    picutesContainer.style.backgroundImage =`url('${url}')`;
    picutesContainer.style.backgroundSize = "cover";// to scale the image to cover the entire element
    picutesContainer.style.backgroundRepeat = "no-repeat";//to prevent the image from repeating.
    picutesContainer.style.width = "500px";
    picutesContainer.style.height = "300px";
    showPicutersBtn.style.display="block";
}

showPicutersBtn.addEventListener("click",displayPictures);

async function displayPictures(event){
    event.preventDefault();
    for (i=0;i<pictureArr.length;i++){
        var src = pictureArr[i].urls.regular;
        var alt = pictureArr[i].alt_description;
        $(picutesContainer).append(`<img class="cityPictures" id="picture${i}" src="${src}" width="200" height="200" alt="${alt}" style="display: none;"/>`);
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

function getHealthInfo(event){
    //const city = 'New York';
    event.preventDefault();
    var query=citeNameEl.value;
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?q=${query}&appid=${openweatherAPIKey}`;
    fetch(url)
    .then(function(response){ 
        return response.json()})
    .then(function(data) {
        console.log(data);
        // Do something with the flu data
        console.log(data.list[0].components.flu);
    })
    .catch(error => console.log(error));
}

function getEvents(event){
    event.preventDefault();
    var query=citeNameEl.value;
    var cityName=query.replace(/\s+/g, '+');
   //var url="https://www.eventbriteapi.com/v3/users/me/?token=6K5ULLZPGGNE7POPJW7W";
    //var url=`https://www.eventbriteapi.com/v3/events/search/?location.address=${cityName}&location.within=10km&sort_by=date&token=${eventsAPIKey}`;
    //fetch(url)
    fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=${cityName}`, {
    headers: {
    'Authorization': `Bearer ${eventsAPIKey}`
    }
    })
    .then(function(response){
        return(response.json());
    })
    .then(function(data){
        console.log(data);
    });
}


submitEl.addEventListener("click",getPictures);
document.getElementById("Next").addEventListener("click",displayNext);
document.getElementById("Previous").addEventListener("click",displayPrevious);
