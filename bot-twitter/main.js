const twit = require('twit');
const https = require('https');
const http = require('http');
const config = require('./config.js');
const twitter = new twit(config);

const sendThresholdHours = 72; // en horas, 3 dias entre envios

setInterval(checkLastTweet, 60*60*1000); // comprobación cada hora

async function checkLastTweet() {
    console.log("Iniciando comprobación");
    var dateNow = new Date().toLocaleString("es-ES");
    
    var params = {
        screen_name: 'CoberturaAragon',
        count: 1
    }

    twitter.get('statuses/user_timeline/', params, function(err, data) {
        if (!err) {
            if (data && data.length > 0) {
                var lastTweetDate = data[0].created_at;

                lastTweetDate = Date.parse(lastTweetDate);
    
                lastTweetDate = new Date(lastTweetDate);

                lastTweetDate.setHours(lastTweetDate.getHours() + sendThresholdHours);

                var now = Date.now();
                now = new Date(now);
    
                if (lastTweetDate <= now) {
                    sendStatusTweet();
                }
            } else {
                // no hay tweet previo
                sendStatusTweet();
            }
        }
        else {
            console.log(dateNow + '   No se pudo obtener el último tweet');
        }
    });
}

async function sendStatusTweet() {
    var msg = await prepareMsg();
    var dateNow = new Date().toLocaleString("es-ES");

    if (msg) {
        twitter.post('statuses/update', {
            status: msg
        }, function(err, response) {
            if (!err) {
                console.log(dateNow + '   Tweet enviado');
            } else {
                console.log(dateNow + '   No se pudo enviar tweet ' + err);
            }
        });
    } else {
        console.log(dateNow + '   No se pudieron obtener los datos del tweet');
    }
}

async function prepareMsg() {
    try {
        let data = await getData();
        data = JSON.parse(data);

        var listMunicipios = [];

        if (data.length > 0) {
            data.forEach(function(element) {             
                if (!listMunicipios.includes(element.municipio)) {
                    listMunicipios.push(element.municipio);
                }
            });
        } 
        
        if (listMunicipios.length > 0){

            listMunicipios.sort();

            var textoMunicipios = "";

            var msgBase = "Nuevos datos de:  aportados colaborativamente sobre la red y calidad de cobertura a internet en Aragón.  #opendata . Conócelos en: https://opendata.aragon.es/servicios/cobertura";

            var longitudBase = msgBase.length;
            var longitudMaxTweet = 280;

            var longitudDisponible = longitudMaxTweet - longitudBase;

            listMunicipios.forEach(function(element) {
                var textoComprobar = textoMunicipios + " #" + element;

                if (textoComprobar.length <= longitudDisponible) {
                    element = element.replace(/\s/g, "_");
                    textoMunicipios = textoMunicipios + " #" + element;
                    return true;
                } else {
                    return false;
                }
            });

            var msg = "Nuevos datos de:" + textoMunicipios  + " aportados colaborativamente sobre la red y calidad de cobertura a internet en Aragón.  #opendata . Conócelos en: https://opendata.aragon.es/servicios/cobertura";

            return msg;
        } else {
            return "¿Quieres saber la calidad de conexión a internet en tu municipio de Aragón? Conoce el servicio de Análisis de la calidad de cobertura de acceso a internet en el que puedes aportar tus datos: https://opendata.aragon.es/servicios/cobertura Realizado con datos abiertos #opendata";
        }
      } catch (err) {
        console.log("Error: " + err);

        return undefined;
      }
}

async function getData() {
    var apiURL = config.apiURL;

    var today = new Date();
    var dHasta = today.toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit"});
    dHasta = dHasta.split("-")[2] + "/" + dHasta.split("-")[1] + "/" + dHasta.split("-")[0];
    dHasta = dHasta + " 23:59:59";
    dHasta = encodeURI(dHasta);

    today.setHours(today.getHours() - sendThresholdHours);
    var dDesde = today.toLocaleDateString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit"});
    dDesde = dDesde.split("-")[2] + "/" + dDesde.split("-")[1] + "/" + dDesde.split("-")[0];
    dDesde = dDesde + " 00:00:00";
    dDesde = encodeURI(dDesde);

    apiURL = apiURL + "?fechaDesde=" + dDesde;
    apiURL = apiURL + "&fechaHasta=" + dHasta;

    return new Promise((resolve) => {
        https.get(apiURL, res => {
            const dataBuffers = []
            res.on('data', data => dataBuffers.push(data.toString('utf8')));
            res.on('end', () => {
  
              try {
                 const returnData = dataBuffers.join('');

                 resolve(returnData);
              }catch(errr) {
                console.log("Error: " + errr);
                resolve("[]");
              }
            });
  
            res.on('error', err => {
              console.log("Error: " + err);
              resolve("[]");
           })
        }) 
    })
  }
