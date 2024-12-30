const toDay =document.getElementById("toDay");
const dayNumber=document.getElementById("dayNumber");
const dayName= document.getElementById("dayName");
const country=document.getElementById("country");
const degrayDay=document.getElementById("degrayDay");
const imgDegry= document.getElementById("imgDegry");
const conditionText=document.getElementById("conditionText");


const todayHumidity=document.getElementById("todayHumidity");
const todayWind=document.getElementById("todayWind");
const todayWindDirection=document.getElementById("todayWindDirection");


//! NextDay

const tomorrowDay= document.getElementById("tomorrowDay")
const tomorrowImgDegry= document.getElementById("tomorrowImgDegry")
const maxDegryTomorrow= document.getElementById("maxDegryTomorrow")
const minDegryTomorrow= document.getElementById("minDegryTomorrow")
const conditionTomorrowText = document.getElementById("conditionTomorrowText")

//! After NExtDay


const afterNextDayName= document.getElementById("afterNextDayName")
const afterNextImgDegry= document.getElementById("afterNextImgDegry")
const afterNextMaxDegry= document.getElementById("afterNextMaxDegry")
const afterNextMinDegry= document.getElementById("afterNextMinDegry")
const afterNextConditionText= document.getElementById("afterNextConditionText")








const searchInput = document.getElementById('searchInput');
/*============ function ========= */
navigator.geolocation.getCurrentPosition((position)=>{
    console.log(position.coords)

    let myLatitude= position.coords.latitude;
    let myLongitude= position.coords.longitude;
    console.log ( myLatitude , myLongitude)
    getWeatherData(`${myLatitude}, ${myLongitude}`)
});
searchInput.addEventListener('input' , (e)=>{
let currentValue = e.target.value;
// console.log(currentValue);

getWeatherData(currentValue);

});
async function getWeatherData(query) {
    const api = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f8ca79a5607e4602966211020240612&q=${query}&days=3&aqi=no&alerts=no`)
    const response = await api.json();
    console.log(response)
    displayWeatherData(response);
    displayWeatherTomorrowData(response)
    displayWeatherAfterTomorrowData(response)
}
function displayWeatherData(data) {
    let todayData = data.current.last_updated;
    let myDataName = new Date(todayData);
    let todayName= myDataName.toLocaleString('en-us',{weekday:'long'})
    toDay.innerHTML=todayName;
    
    let todayMonth = myDataName.toLocaleString('en-us',{ month:'long'});
    let todayDay = myDataName.getDate();
    dayNumber.innerHTML = todayDay;
    dayName.innerHTML = todayMonth;
    country.innerHTML= data.location.country;
    degrayDay.innerHTML= data.current.temp_c;
    conditionText.innerHTML=data.current.condition.text;

    let currentImg= data.current.condition.icon;
    let currentSrc=`https:${currentImg}`;
    imgDegry.setAttribute('src',currentSrc);
    todayHumidity.innerHTML=data.current.humidity;
    todayWind.innerHTML=data.current.wind_kph;
    todayWindDirection.innerHTML=data.current.wind_dir;
}
function displayWeatherTomorrowData(data){
    let tomorrowDate = data.forecast.forecastday[1];
    let myTomorrowData = new Date (tomorrowDate.date);
    let myTomorrowDataName = myTomorrowData.toLocaleString('en-us', {weekday:'long'});
    tomorrowDay.innerHTML= myTomorrowDataName;
    let currentImg= tomorrowDate.day.condition.icon;
    let currentSrc=`https:${currentImg}`;
    tomorrowImgDegry.setAttribute('src',currentSrc);
    maxDegryTomorrow.innerHTML= tomorrowDate.day.maxtemp_c;
    minDegryTomorrow.innerHTML= tomorrowDate.day.mintemp_c;
    conditionTomorrowText.innerHTML= tomorrowDate.day.condition.text;
}

function displayWeatherAfterTomorrowData(data){
    let afterTomorrowData= data.forecast.forecastday[2];
    let myAfterTomorrowData= new Date(afterTomorrowData.date);
    let myAfterTomorrowDataName= myAfterTomorrowData.toLocaleString('en-us',{weekday:'long'});
    afterNextDayName.innerHTML=myAfterTomorrowDataName;
    let currentImg= afterTomorrowData.day.condition.icon;
    let currentSrc=`https:${currentImg}`;
    afterNextImgDegry.setAttribute('src',currentSrc);
    afterNextMaxDegry.innerHTML= afterTomorrowData.day.maxtemp_c;
    afterNextMinDegry.innerHTML= afterTomorrowData.day.mintemp_c;
    afterNextConditionText.innerHTML= afterTomorrowData.day.condition.text;
}