/* Global Variables */
const encodeURIComponent = require('urlencode');
let encode_string;
let loc_lat;
let loc_long;
let geo_url = 'http://api.geonames.org/postalCodeLookupJSON?placename=';
let geo_query;
let geo_key = `&username=ishanlal&lang=en`;
let weatherbit_url_current = 'https://api.weatherbit.io/v2.0/current?lat=';
let weatherbit_query;
let weatherbit_current_key = `&key=cec48a6d469a444cb6fe48a5b865f698&include=hourly`;
let weatherbit_url_forecast = 'https://api.weatherbit.io/v2.0/forecast/daily?&lat=';
let weatherbit_forecast_key = `&days=17&key=cec48a6d469a444cb6fe48a5b865f698`;
let pixabay_url = 'https://pixabay.com/api/?key=';
let pixabay_key = `20695199-e8003725b07cd0a2f36ef2992&q=`;
let pixabay_query;
let apiData;
let geoData;
let weatherbitData;
let pixabayData;
let s_date;
let e_date;
let loc_string;
let obscureLocation = false;
// Create a new date instance dynamically with JS
let td = new Date();
let todaysDate = td.getFullYear() +'-'+ (td.getMonth()+1) +'-'+ td.getDate();

function date_length(start_date, end_date) {
  let d1 = new Date(start_date);
  let d2 = new Date(end_date);
  let days_diff = Math.ceil((d2.getTime()-d1.getTime())/(1000 * 3600 * 24));
  return days_diff;
}

function init() {
    // set date min values
    document.getElementById('start').min = todaysDate;
    document.getElementById('end').min = todaysDate;
    // set initial Image
    pixabay_query = encodeURIComponent('');
    pixabayData = retrieveData(pixabay_url, pixabay_key, pixabay_query)
    .then( function(pixabayData){
         document.getElementsByTagName("img")[0].src = pixabayData.hits[0].webformatURL;
    })
    document.getElementById('generate').addEventListener('click', get_user_input);
}

function get_user_input (e) {
  s_date = document.getElementById('start').value;
  e_date = document.getElementById('end').value;
  loc_string = document.getElementById('location').value;
  if (s_date === "" || e_date === "" || loc_string === "") {
    alert('ERROR: Kindly, key in a trip destination in format <City, State, Country> example <San Diego, CA, US> in the location field. Also, fill both trip start and trip end dates!!');
  } else {
    get_lat_long_coordinates(e);
  }
}

function get_lat_long_coordinates(e) {
    encode_string = loc_string;
    geo_query = encodeURIComponent(encode_string);
    geoData = retrieveData(geo_url, geo_query, geo_key)
    .then( function(geoData){
      console.log(geoData)
      if (geoData.postalcodes.length != 0){
      loc_lat = geoData.postalcodes[0].lat;
      loc_long = geoData.postalcodes[0].lng;
      document.getElementById('time_to_dest').innerHTML = 'You\'re time to destination is: ' + date_length(td, s_date) + ' days';
      document.getElementById('length_of_trip').innerHTML = 'You\'re trip length is: ' + date_length(s_date, e_date);
      get_location_weather(e);
    } else {
         obscureLocation = true;
         alert('Couldn\'t find your location! Please refresh the page and enter a trip destination in format <City, State, Country> example <San Diego, CA, US>');
         // load a default pixabay image
         pixabay_query = encodeURIComponent('obscure');
         pixabayData = retrieveData(pixabay_url, pixabay_key, pixabay_query)
         .then( function(pixabayData){
              document.getElementsByTagName("img")[0].src = pixabayData.hits[0].webformatURL;
         })
      }
    }
    )
}

function get_location_weather(e) {
    weatherbit_query = `${loc_lat}&lon=${loc_long}`;
    let time_to_dest = date_length(td, s_date);
    if (time_to_dest <= 7){
      weatherbitData = retrieveData(weatherbit_url_current, weatherbit_query, weatherbit_current_key)
      .then( function(weatherbitData){
        if (weatherbitData.data.length != 0){
                document.getElementById('trip_weather').innerHTML = 'Weather at destination will have: ' + weatherbitData.data[0].weather.description;
                document.getElementById('destination').innerHTML = 'You\'re heading to: ' + weatherbitData.data[0].city_name;
                get_location_image(e);
              }
      })
    } else {
          weatherbitData = retrieveData(weatherbit_url_forecast, weatherbit_query, weatherbit_forecast_key)
          .then( function(weatherbitData){
            if (weatherbitData.data.length != 0){
                document.getElementById('trip_weather').innerHTML = 'Weather at destination will have: ' + weatherbitData.data[13].weather.description;
                document.getElementById('destination').innerHTML = 'You\'re heading to: ' + weatherbitData.data[0].city_name;
                get_location_image(e);
              }
          })
    }

}

function get_location_image(e) {
    pixabay_query = encodeURIComponent(encode_string);
    pixabayData = retrieveData(pixabay_url, pixabay_key, pixabay_query)
    .then( function(pixabayData){
         document.getElementsByTagName("img")[0].src = pixabayData.hits[0].webformatURL;
    })
}

export { date_length }
export { init }
export { get_user_input }
export { get_lat_long_coordinates }
export { get_location_weather }
export { get_location_image }


// Async GET
const retrieveData = async (url, query, key) =>{
  const request = await fetch(url+query+key);
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData)
  return allData;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
