require("colors");
require("dotenv").config();


const { call } = require("./helpers/call.js");
const { inputOnly } = require("./helpers/inputOnly.js");
const {mainMenu} = require("./helpers/mainMenu.js");
const { makeChoices } = require("./helpers/makeChoices.js");
const { pause } = require("./helpers/pause.js");
const { showInfo } = require("./helpers/showInfo.js");
const { historyData } = require("./models/History.js");




async function main(){


    let opt = ""

    while(opt !== "0"){
        console.clear();

        let menuChoices =  [
            {
                value: "1",
                name :`${"1.".yellow} Buscar ciudad`
            },
            {
                value: "2",
                name :`${"2.".yellow} Historial`
            },
            {
                value: "0",
                name :`${"0.".yellow} Salir`
            },
        ];

        opt = await mainMenu("list", "¿Qué quieres hacer?", menuChoices);
        
        if(opt === "1"){
            
            let city = await inputOnly("Lugar:");
            let myData = await call(
                {
                    baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?`,
                    params :{
                        "access_token": process.env.MAPBOX_KEY,
                        "limit" : 3,
                        "language" : "es"
                    }
                }
                );
            let placeChoices = makeChoices(myData.features, ["id", "place_name_es"]);
            let placeSelection = await mainMenu("list", "Elige un lugar", placeChoices);
            let [myInfo]= myData.features.filter(travel=> travel.id === placeSelection);
            myInfo = {
                id: myInfo.id,
                name : myInfo.place_name_es,
                long: myInfo.center[0],
                lat : myInfo.center[1]
            }

            let infoForTemp = await call({
                baseURL: "https://api.openweathermap.org/data/2.5/weather",
                params :{
                    "lat" : myInfo.lat,
                    "lon" : myInfo.long,
                    "appid" : process.env.OPENWHEATER_KEY,
                    "units" : "metric",
                    "lang" : "es",
                }
            });
                myInfo.tempAct = infoForTemp.main.temp;
                myInfo.tempMin = infoForTemp.main.temp_min - 3;
                myInfo.tempMax = infoForTemp.main.temp_max + 1;
                myInfo.des = infoForTemp.weather[0].description


            historyData.addInfo(myInfo);
            showInfo(myInfo);

        }else if(opt === "2"){
            if(historyData.myHistory.length != 0){
                let choicesHistory = makeChoices(historyData.myHistory,["id", "name"]);
                let selectionIdHistory = await mainMenu("list", "Tu historial:", choicesHistory);
                let newInfo = historyData.myHistory.filter(travel => travel.id == selectionIdHistory );
                showInfo(newInfo[0]);
            }
            console.log(`No tienes nada guardado en tu historial`.green);
        }


        await pause();





    }

    


}


main();