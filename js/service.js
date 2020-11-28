$(document).ready(function() {
    $("#state_content").hide();

const urlCovidApi = 'https://covid19-brazil-api.now.sh/api/report/v1';

getEstados();

function getEstados(stateName) {
    let request = new XMLHttpRequest();
    
    let url = stateName ? `${urlCovidApi}/${stateName}` : urlCovidApi

    request.open('GET' , urlCovidApi);
    request.responseType= 'json';
    request.send();

    request.onload = function(){     
        let responseData = request.response;  
        let size =  responseData.data.length;

        if (stateName) {
            for(let i = 0; i < size; i++){
                    if(stateName == responseData.data[i].state){
                        formatEstado(responseData.data[i]);
                }   
            }
        } else {
            formatEstados(responseData.data);
        }
    }
}

function formatEstado(state){
    console.log(state)
    if (state.state == null) {
        $("#state_content").append("Not found State")
    }
    else {
        $("#table").append("<tr>");

    let object_keys = Object.keys(state);

    for (let key = 0; key < object_keys.length; key++){
        let currentKey = object_keys[key];

        if (currentKey == "state") {
            $("#table").append("<td>" + `${state.state}` + "</td>")
        }
        else if (currentKey == "cases") {
            $("#table").append("<td>" + `${state.cases}` + "</td>")
        }
        else if (currentKey == "deaths") {
            $("#table").append("<td>" + `${state.deaths}` + "</td>")
        }
    }
    $("#table").append("</tr>");
    }

    $("#table").append("<a href='#' target='blank>Back</a>")

}

function formatEstados(estados){
    for (let i = 0; i < estados.length; i++) {
        
        let state = {
            state: estados[i].state,
            cases: estados[i].cases,
            deaths: estados[i].deaths
        }
        showEstados(state);
    }
    
}

function showEstados(state){
    $("#state_table").append("<tr>");
    let object_keys = Object.keys(state);

    for (let key = 0; key < object_keys.length; key++){
        let currentKey = object_keys[key];

        if (currentKey == "state") {
            $("#state_table").append("<td>" + `${state.state}` + "</td>")
        }
        else if (currentKey == "cases") {
            $("#state_table").append("<td>" + `${state.cases}` + "</td>")
        }
        else if (currentKey == "deaths") {
            $("#state_table").append("<td>" + `${state.deaths}` + "</td>")
        }
    }
    $("#state_table").append("</tr>");
}

$("#button_search").click(function(){
    $("#home_content").hide();
    $("#state_content").show();

    let stateName = $("input").val();
    getEstados(stateName)
})})
