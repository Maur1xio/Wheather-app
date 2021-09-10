function showInfo({name, long,lat,tempAct,tempMin,tempMax,des}){
    console.log("\n")
    console.log(`Información del lugar \n`.rainbow);
    console.log(`${"Ciudad:".green} ${name}`);
    console.log(`${"Latitud:".green} ${lat}`);
    console.log(`${"Longitud:".green} ${long}`);
    console.log(`${"Temperatura actual:".green} ${tempAct}`);
    console.log(`${"Temperatura mínima:".green} ${tempMin}`);
    console.log(`${"Temperatura máxima:".green} ${tempMax}`);
    console.log(`${"Descripción:".green} ${des} \n`);

}

module.exports = {
    showInfo
}