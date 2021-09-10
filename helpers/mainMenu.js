const inquirer = require("inquirer");


async function mainMenu(type, message, choices){

    let options =   [
        {
            type,
            name : "opt",
            message,
            choices
        }
    ]

    let {opt} = await inquirer.prompt(options);

    return opt

}

module.exports = {
    mainMenu
}