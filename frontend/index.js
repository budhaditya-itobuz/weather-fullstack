const day = document.getElementById("day");
const date = document.getElementById("date");
const place = document.getElementById("place");
const condition = document.getElementById("condition");
const temperature = document.getElementById("temp");
const form = document.getElementById("myform");
const input = document.getElementById("input");
const image = document.getElementsByTagName("img")[0];
const theme = document.getElementById("theme");
const container =document.getElementById('container')
const showError=document.getElementById('error-handle')
container.classList.add('d-none')

const dayArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObject = Object.fromEntries(formData.entries());
    input.value = "";
    weather(dataObject.location);
});

const weather = async (location) => {
    theme.classList.remove("day", "night", "rain");
    try {
        showError.innerText=""
        container.classList.remove('d-none')
        const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${location}&aqi=no`
        );
        const data = await res.json();
        const date = new Date(data.location.localtime);

        if (data.current.precip_mm > 0) theme.classList.add("rain");
        else if (date.getHours() > 5 && date.getHours() < 18) theme.classList.add("day");
        else theme.classList.add("night");

        day.innerText = dayArr[date.getDay()] + ",";
        date.innerText = date.toString().substring(4, 10);
        place.innerText = data.location.name;
        condition.innerText = data.current.condition.text;
        temperature.innerText = data.current.temp_c;
        image.setAttribute("src", "./image/location.png");

    } catch (e) {
        container.classList.add('d-none')
        showError.innerText="No data found!"
        day.innerText = "";
        date.innerText = "";
        place.innerText = "";
        condition.innerText = "";
        temperature.innerText = "";
    }
};
