let city = "";
let lastSearch;

function GetWeather(myLocation) {
    // Used to make sure current searchword 
    // isn't the same as the last search
    let check = document.querySelector("input").value
    .toLowerCase().replace(/å/g, "a").replace(/ä/g, "a")
    .replace(/ö/g, "o").replace(/ /g, "");

    // Don't fetch same information twice in a row
    if (check != lastSearch) {
        // Check weather to get user location or search location
        if (myLocation) {
            if (city != "") {
                var input = city;
                document.getElementById("search-location")
                .disabled = true;
            } else {
                return;
            }
        } else {
            if (check != "") {
                var input = document.querySelector("input").value;
                document.getElementById("search-location")
                .disabled = false;
            } else {
                return;
            }
        }

        // Fetch API
        fetch(GetAPIKey(input))
        .then(response => response.json())
        .then((obj) => {
            let h1 = document.querySelector("h1");

            // Get city name. If more than one comma was found, 
            // strip down name
            let arr = AllIndexOf(obj.resolvedAddress, ",");

            if (arr.length > 1) {
                h1.innerText = 
                `${obj.resolvedAddress.substring(0, arr[0])}` +
                `${obj.resolvedAddress.substring(arr[arr.length - 1])}`;
            } else {
                h1.innerText = `${obj.resolvedAddress}`;
            }

            /* Set date, max, current, min 
            temp and feels like text */
            const cards = document.getElementsByClassName("forecast-card");

            for (let i = 0; i < cards.length; i++) {
                // Set date
                let date = new Date(obj.days[i].datetime);

                switch (date.getUTCMonth()) {
                    case 0:
                        cards[i].children[1].innerText = 
                        `January ${date.getUTCDate()}`;
                        break;
                
                    case 1:
                        cards[i].children[1].innerText = 
                        `February ${date.getUTCDate()}`;
                        break;

                    case 2:
                        cards[i].children[1].innerText = 
                        `Mars ${date.getUTCDate()}`;
                        break;

                    case 3:
                        cards[i].children[1].innerText = 
                        `April ${date.getUTCDate()}`;
                        break;
                    
                    case 4:
                        cards[i].children[1].innerText = 
                        `May ${date.getUTCDate()}`;
                        break;
            
                    case 5:
                        cards[i].children[1].innerText = 
                        `June ${date.getUTCDate()}`; 
                        break;

                    case 6:
                        cards[i].children[1].innerText = 
                        `July ${date.getUTCDate()}`;
                        break;
                    
                    case 7:
                        cards[i].children[1].innerText = 
                        `August ${date.getUTCDate()}`;
                        break;
            
                    case 8:
                        cards[i].children[1].innerText = 
                        `September ${date.getUTCDate()}`;
                        break;
            
                    case 9:
                        cards[i].children[1].innerText = 
                        `October ${date.getUTCDate()}`;  
                        break;
                        
                    case 10:
                        cards[i].children[1].innerText = 
                        `November ${date.getUTCDate()}`;  
                        break;
                
                    case 11:
                        cards[i].children[1].innerText = 
                        `December ${date.getUTCDate()}`;  
                        break;
                }

                // Set temp
                // Max
                cards[i].children[2].innerText = 
                `Max: ${Math.round(obj.days[i].tempmax)}°`;

                // Current
                cards[i].children[3].innerText = 
                `${Math.round(obj.days[i].temp)}°`;

                // Min
                cards[i].children[4].innerText = 
                `Min: ${Math.round(obj.days[i].tempmin)}°`;

                // Set feels like
                cards[i].children[5].innerHTML = 
                `Feels like<br>${Math.round(obj.days[i].feelslike)}°`;
            }

            // Restart animation
            let body = document.querySelector("body");

            document.querySelector("div").remove();
            body.insertBefore(document.createElement("div"), body.firstChild);
            body.firstChild.classList.add("fade");

            // Set background image
            let url = "";

            switch (obj.days[0].conditions) {
                case "Overcast":
                    url = "https://wallpaperbat.com/img/346351-download-free-rain-wallpaper-weather-wallpaper-clouds-rain.jpg";
                    break;

                case "Clear":
                    url = "https://ak.picdn.net/shutterstock/videos/1056425282/thumb/1.jpg";
                    break;

                case "Partially cloudy":
                    url = "https://cardinalwxservice.com/wp-content/uploads/2019/10/Cloudy.Skies_.jpg";
                    break;

                case "Rain":
                case "Rain, Overcast":
                case "Snow, Rain, Overcast":
                case "Rain, Partially cloudy":
                    url = "https://ak.picdn.net/shutterstock/videos/6327374/thumb/1.jpg";
                    break;

                case "Snow":
                case "Snow, Clear":
                case "Snow, Overcast":
                    url = "https://wallpapercrafter.com/desktop/12909-trees-snow-snowy-winter-sky-elevation-4k.jpg";
                    break;
            
                default:
                    url = "";
                    break;
            }

            document.querySelector("body").style.background = 
            "url('" + url + "') no-repeat center center fixed";
            document.querySelector("body").style.backgroundSize = "cover";

            // Extend content
            document.querySelector("#content").classList.add("content-extend");
            document.querySelector("#content").classList.remove("content");
            
            // Log redult
            console.log(obj);

            // Save current search to last search
            lastSearch = input.toLowerCase().replace(/å/g, "a")
            .replace(/ä/g, "a").replace(/ö/g, "o").replace(/ /g, "");
        }).catch(message => console.log(message));
    }
        
}

function GetAPIKey(city) {
    let name = city.toLowerCase().replace(/å/g, "a").replace(/ä/g, "a").replace(/ö/g, "o");
    return `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${name}?unitGroup=metric&key={key}`; // Your key here
}

function OnLoadInformation() {
    let day = new Date().getDay();
    const cards = document.getElementsByClassName("forecast-card");

    // Set day text
    for (let i = 0; i < cards.length; i++) {
        // Asign day to h2
        if (i != 0) {
            switch (day) {
                case 0: // Sunday
                    cards[i].children[0].innerText = "Sun";
                    break;

                case 1: // Monday
                    cards[i].children[0].innerText = "Mon";
                    break;

                case 2: // Tuesday
                    cards[i].children[0].innerText = "Tue";
                    break;
    
                case 3: // Wednesday
                    cards[i].children[0].innerText = "Wed";
                    break;

                case 4: // Thursday
                    cards[i].children[0].innerText = "Thu";
                    break;
    
                case 5: // Friday
                    cards[i].children[0].innerText = "Fri";
                    break;
    
                case 6: // Saturday
                    cards[i].children[0].innerText = "Sat";
                    break;
            }
        } else {
            cards[i].children[0].innerText = "Today";
        }

        // Increase day variable
        if (day == 6) {
            day = 0;
        } else {
            day++;
        }
    }

    // Get user location
    fetch("http://ip-api.com/json/?fields=61439")
    .then(response => response.json())
    .then(data => city = data.city)
    .catch(message => console.log(message));
}

function AllIndexOf(string, findString) {
    let arr = [];

    for (let i = 0; i < string.length; i++) {
        if (string[i] == findString) {
            arr.push(i);
        }
    }

    return arr;
}
