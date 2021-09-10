const axios = require("axios");
const { pause } = require("./pause");

async function call({baseURL,params}){
    try {
        let instance = axios.create({
            baseURL,
            params
        });

        let data = await instance.get();
        return data.data;

    } catch (e) {
        throw ("A ocurrido un error");
    }

}

module.exports = {
    call
}