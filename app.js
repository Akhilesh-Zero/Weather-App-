window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/c487cdde1a250b5a5ace5413b6e56f85/${lat},${long}`;
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temperature, summary, icon } = data.currently;
                //Set DOM elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimeZone.textContent = data.timezone;

                //Formula for C
                    let celsius = (temperature - 32) * (5/9);
                 //Set icon
                 setIcons(icon, document.querySelector('.icon'));

                 //Change temeperature to F to C
                 temperatureSection.addEventListener('click', () => {
                     if(temperatureSpan.textContent === "F"){
                         temperatureSpan.textContent = "C";
                         temperatureDegree.textContent = Math.floor(celsius);
                     }else{
                         temperatureSpan.textContent = "F";
                         temperatureDegree.textContent = temperature;
                     }
                 })
            });

        });



        
    }//else{
    //      h1.textContent = "Weather app needs your location to show you the temperature"
    // }
    function setIcons(icon, iconID){
        const skycons = new Skycons({ color: "white " });
        //replacing "-" to "_" and making it upper case as per skycon document 
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});