
// today
let toDay =document.getElementById('today');
let todayDate =document.getElementById('todaydate');
let cityLocation =document.getElementById('location');
let todayDegree =document.getElementById('today-degree');
let todayIcon =document.getElementById('today-icon');
let descraption =document.getElementById('today-descraption');
let humidty =document.getElementById('humidty');
let wind =document.getElementById('wind');
let compass =document.getElementById('compass');
let searchBar =document.getElementById('search-bar');
let  currentCity = "Cairo";
let  apiResponse;
let  responseData;
let  date = new Date();
let  weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let monthName = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];

// next Day

let nextDay = document.getElementsByClassName("nextDay");
let   afterNextDay = document.getElementsByClassName("afterNextDay");
let    nextDate = document.getElementsByClassName("nextDate");
let  nextDayIcon = document.getElementsByClassName("nextDay-icon");
let   maxDegree = document.getElementsByClassName("max-degree");
let  minDegree = document.getElementsByClassName("min-degree");
let    nextDayDescription = document.getElementsByClassName("nextDay-description");

// get  data form api
async function getWeatherData() {
    apiResponse =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=848e4c9efef048e494f100521210205&q=${currentCity}&days=3&aqi=no&alerts=no`);
    responseData= await apiResponse.json();
  
    dispalayTodayWeather();
    displayNextDaysWeather();
};
// dispalt to day data 
function dispalayTodayWeather(){
let dateApi = responseData.forecast.forecastday[0].date;
let  date_components = dateApi.split("-");
let current_day = date_components[2];


toDay.innerHTML = weekDays[date.getDay()];
todayDate.innerText =`${current_day} ${monthName[date.getMonth()]}`;
cityLocation.innerHTML=responseData.location.name;
todayDegree.innerHTML =Math.round(responseData.current.temp_c);
todayIcon.setAttribute("src",`https:${responseData.current.condition.icon}`);
descraption.innerHTML = responseData.current.condition.text;
humidty.innerHTML=responseData.current.humidity;
wind.innerHTML = responseData.current.wind_kph;
compass.innerText =responseData.current.wind_dir;


};
//  next Day name
function getNextDays(nextDateApi){
 let day = new Date (nextDateApi);
 return day && weekDays[day.getDay()];

}; 

// next day -month

function getNextDayMonth(nextDateApi){
    let month = new Date (nextDateApi);
    return month && monthName[month.getMonth()];
   
};

// display NEXT days
function displayNextDaysWeather(){
    for(let i = 0;  i< nextDay.length; i++)
    {   
        let nextDateApi = responseData.forecast.forecastday[i+1].date;
        let nextDate_components = nextDateApi.split("-");
        let next_day = nextDate_components[2];

        nextDay[i].innerHTML = getNextDays(nextDateApi);
        nextDate[i].innerHTML = `${next_day} ${getNextDayMonth(nextDateApi)}`;
        nextDayIcon[i].setAttribute("src", `https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
        maxDegree[i].innerHTML = Math.round(responseData.forecast.forecastday[i+1].day.maxtemp_c);
        minDegree[i].innerHTML = Math.round(responseData.forecast.forecastday[i+1].day.mintemp_c);
        nextDayDescription[i].innerHTML= responseData.forecast.forecastday[i+1].day.condition.text;
        
    }
};

//  search bar

searchBar.addEventListener("keyup",function() {
 currentCity =searchBar.value;
 getWeatherData();

});



getWeatherData();

// email
let subsribrBtn = document.getElementById('subscribeBtn');
let closeBtn = document.getElementById('closeBtn');
let lighboxInfo = document.getElementById('lighboxInfo');
let inputEmail = document.getElementById('inputEmail');
let emailInputAlert = document.getElementById('emailInputAlert');

subsribrBtn.addEventListener('click', ()=>{
  if(validateEmail() == true){
    lighboxInfo.classList.replace("d-none","d-flex");



  }else{
      subsribrBtn.disabled = true;
  }
    
});
closeBtn.addEventListener('click',()=>{
lighboxInfo.classList.replace("d-flex","d-none");
inputEmail.value ='';
});

function validateEmail() {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/;
    if( regex.test(inputEmail.value) == true)
    {
        emailInputAlert.classList.replace("d-block","d-none");

        subsribrBtn.disabled = false;

        return true;
    
    } else {

        emailInputAlert.classList.add("d-block");
        emailInputAlert.classList.remove("d-none");

                    subsribrBtn.disabled = true;

        return false;
    };
}


inputEmail.addEventListener("keyup", validateEmail);













