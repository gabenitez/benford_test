require('dotenv').config();
let apiKey = process.env.API_KEY;
let apiSecret = process.env.API_SECRET;
let ploter = require('./template.js');
const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: apiKey,
    APISECRET: apiSecret
});

let sample = [];
let counter = 0;

function startAnalizingTicker(ticker, sampleCount){    
    binance.websockets.trades([ticker], (trades) => {
        let { e: eventType, E: eventTime, s: symbol, p: price, q: quantity, m: maker, a: tradeId } = trades;

        let valueToAnalyze = quantity;
        let firstDigit = getFirstNonZeroDigit(valueToAnalyze);        
        sample.push(firstDigit);
        counter++;
        if(counter >= sampleCount){            
            let percentagesPerDigit = calculateDigitPercentagesAppeareance(sample);        
            ploter.plotPercentajesForNumbers(percentagesPerDigit);
            //sample = [];
            counter = 0;
            console.log(`Cumulative sample size: ${sample.length} Pair:${symbol} `);
        }
    });
}

function getFirstNonZeroDigit(numericalValue){
    //Returns the first non zero digit of a number, number can be float
    let firstDigit = numericalValue + "#";
    for(let i = 0; i < firstDigit.length; i++){
        if (firstDigit[i] != '0' && firstDigit[i] != '.'){
            return firstDigit[i];
        }
    }
}


function calculateDigitPercentagesAppeareance(samples) {
    //Calculates percentage of appearence for each digit in the sample
    let percentages = [];
    let total = samples.length;
    for (let i = 1; i <= 9; i++) {
        let count = samples.filter(x => x == i).length;
        percentages.push(100 * count / total);
    }
    return percentages;
}




let ticker = process.argv[2] || "BTCUSDT";
let sampleCount = process.argv[3]|| 100;
startAnalizingTicker(ticker, sampleCount);