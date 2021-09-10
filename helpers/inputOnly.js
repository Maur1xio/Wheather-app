
const inquirer = require("inquirer");

async function inputOnly(message){

    let options =   [
        {
            type : "input",
            name : "myVar",
            message : message
        }
    ]

    let {myVar} = await inquirer.prompt(options);

    return myVar

}


module.exports = {
    inputOnly 
};