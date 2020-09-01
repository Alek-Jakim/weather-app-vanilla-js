let search = document.querySelector('.search');
let container = document.getElementById('info-container');
let header = document.getElementById('header');
let showErr = document.querySelector('.show-err');
let clearBtn = document.getElementById('btn');
let apiKey = '47cfac5b56e7f8696442c08a4f7be058'


let searchResults = [];

const getLocation = async () => {
    //Get the location by Searching For it
    let location = search.value;

    try {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await res.json();

        let weather = data.weather[0];



        let locationData = {
            city: data.name,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            feelsLike: data.main.feels_like,
            desc: weather.description
        }



        searchResults.push(locationData);
    } catch {
        let err = document.createElement('div');
        err.classList = 'error'
        err.innerHTML = `<p>No Results For ${search.value}. Try Again</p`
        showErr.appendChild(err);

        setTimeout(() => {
            err.innerHTML = '';
            showErr.removeChild(err);
        }, 3000)
    }



    container.innerHTML = ''

    updateDOM()
}

function updateDOM() {
    searchResults.map(res => {

        let capitalLetter = (str) => {
            let strArr = str.toLowerCase().split(' ');
            for (let i = 0; i < strArr.length; i++) {
                strArr[i] = strArr[i].substring(0, 1).toUpperCase() + strArr[i].substring(1);
            }

            return strArr.join(' ');
        }

            ;

        container.innerHTML = `
        <div class="weather-info">
            <h2>Search results for "${search.value.toUpperCase()}"</h2>
            <h3>${res.city}</h3>
            <ul class="weather-details">
                <li>Today's Temperature: ${res.temperature} °C</li>
                <li>Weather Description: ${capitalLetter(res.desc)}</li>
                <li>Humidity Level: ${res.humidity}</li>
                <li>Feels like ${res.feelsLike} °C</li>
            </ul>
        </div>
        `

        setTimeout(() => {
            container.innerHTML = ''
        }, 15000)
    })

    search.value = ''
}


search.addEventListener('search', getLocation)
