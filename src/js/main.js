
document.querySelector("form").addEventListener('submit', event =>{
  let city = document.querySelector("input").value;
  event.preventDefault();
  getCities(city);
}, false)


function getCities(city) { 
let  data = {
    "modelName": "Address",
  "calledMethod": "getWarehouses",
    "methodProperties": {
      "CityName": city
    },
    "apiKey": "!!!!!"
  }

fetch('https://api.novaposhta.ua/v2.0/json/',
  {
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify(data),
  }
)
  .then(res => { return res.json() })
  .then(res => {
    createTable(city,res.data); 
    console.log(res);
  })
  .catch(error => {
    console.log('erro');
    
  });
}

let data = [
  {
    "SiteKey": "10119",
    "Description": "Відділення №1: вул. М. Грушевського, 3",
    "DescriptionRu": "Отделение №1: ул. М. Грушевского, 3",
    "Phone": "0-800-500-609",
    "TypeOfWarehouse": "9a68df70-0267-42a8-bb5c-37f427e36ee4",
    "Ref": "39931b80-e1c2-11e3-8c4a-0050568002cf",
    "Number": "1",
    "CityRef": "20982d74-9b6c-11e2-a57a-d4ae527baec3",
    "CityDescription": "Заболотів (Снятинський р-н)",
    "CityDescriptionRu": "Заболотов (Снятинский р-н)",
    "Longitude": "25.299652300000000",
    "Latitude": "48.470805500000000",
    "PostFinance": "1",
    "BicycleParking": "0",
    "POSTerminal": "1",
    "InternationalShipping": "0",
    "TotalMaxWeightAllowed": 0,
    "PlaceMaxWeightAllowed": 0,
    "Reception": {
      "Monday": "15:30-18:00",
      "Tuesday": "15:30-18:00",
      "Wednesday": "15:30-18:00",
      "Thursday": "15:30-18:00",
      "Friday": "15:30-18:00",
      "Saturday": "-",
      "Sunday": "-"
    },
    "Delivery": {
      "Monday": "09:00-15:00",
      "Tuesday": "09:00-15:00",
      "Wednesday": "09:00-15:00",
      "Thursday": "09:00-15:00",
      "Friday": "09:00-15:00",
      "Saturday": "-",
      "Sunday": "-"
    },
    "Schedule": {
      "Monday": "09:00-18:00",
      "Tuesday": "09:00-18:00",
      "Wednesday": "09:00-18:00",
      "Thursday": "09:00-18:00",
      "Friday": "09:00-18:00",
      "Saturday": "09:00-15:00",
      "Sunday": "-"
    }
  }
]

function createTable(city , params ) {//

 let wparer =  document.getElementById('app');
  wparer.innerHTML = "";
  let cityName = document.createElement("div");
  cityName.innerHTML = '<h1>'+ city + '</h1> ';
  wparer.appendChild(cityName);
  
  if (params.length!=0){
    let warehouseWrap = document.createElement("ul");
    warehouseWrap.classList.add("warehouseWrap");
    params.forEach(element => {

      let warehouse = document.createElement("li");
      warehouse.classList.add("warehouse");

      let warehouseAddress = document.createElement("p");
      warehouseAddress.innerHTML = "<h3>" + element.Description + "</h3>";
      warehouse.appendChild(warehouseAddress);

      let warehouseSchedule = document.createElement("p");
      warehouseSchedule.classList.add("schedule");
      warehouseSchedule.innerHTML = "График работы: ";
      warehouse.appendChild(warehouseSchedule);
      
      let scheduleWrap = document.createElement("ul");
      let scheduleDay = Object.keys(element.Schedule);
      scheduleDay.forEach(sDay => {
        let day = document.createElement("li");
        day.classList.add("scheduleDay");
        day.innerHTML = `<span> ${sDay}</span><span>${element.Schedule[sDay]}</span>`;
        scheduleWrap.appendChild(day);
      });
      warehouse.appendChild(scheduleWrap);    
      warehouseWrap.appendChild(warehouse);     
      });
      wparer.appendChild(warehouseWrap);
  }  
  else{
    let noFaund = document.createElement("div");
    noFaund.innerHTML = '<span>Здесь отделений нет, пока ;)</span> ';
    noFaund.classList.add("noFaund");
    wparer.appendChild(noFaund);
  }
}