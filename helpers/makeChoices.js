function makeChoices(data,[forId, forName]){
    let choices = [];
    let n = 0;
    for(let x of data){
        n+= 1;
        let myObject = {
            value:x[forId] ,
            name :`${`${n}.`.yellow} ${x[forName]}`
        }
        choices.push(myObject);
    }

        return choices;

}

module.exports = {
    makeChoices
}