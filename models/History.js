
const fs = require("fs");

class History  {
    constructor(){
        this.myHistory = [];
    }


    addInfo(data){
        if(this.myHistory.length === 6){
            this.myHistory.pop();
        }
        this.myHistory.unshift(data);

        this.saveInfo();
    }


    saveInfo(){
        fs.writeFileSync("models/my-history.json", JSON.stringify(this.myHistory));
    }

}


let historyData = new History;

    
if(fs.existsSync(`models/my-history.json`)){

    let myData =  fs.readFileSync(`models/my-history.json`, {encoding: "utf-8"}); 

    historyData.myHistory = JSON.parse(myData);

}


module.exports = {
    historyData
}
