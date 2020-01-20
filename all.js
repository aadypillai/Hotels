// GRABBING DATA THAT USER SPECIFIED (CHECK-IN DATE, NO. OF GUESTS, ETC.)

var fromDate1 = document.getElementsByTagName('input').fromDate.value.split("/")[0] 
var fromDate2 = document.getElementsByTagName('input').fromDate.value.split("/")[1]
var fromDate3 = document.getElementsByTagName('input').fromDate.value.split("/")[2]

var toDate1 = document.getElementsByTagName('input').toDate.value.split("/")[0]
var toDate2 = document.getElementsByTagName('input').toDate.value.split("/")[1]
var toDate3 = document.getElementsByTagName('input').toDate.value.split("/")[2]

var roomCountBox = document.getElementsByTagName('input').roomCountBox.value.replace(/ /g,"+")
var roomCount = document.getElementsByTagName('input').roomCountBox.value.split(" " , 1)[0]
var guestCountBox = document.getElementsByTagName('input').guestCountBox.value.replace(/ /g,"+") 
var guestCount = document.getElementsByTagName('input').guestCountBox.value.split(" " , 1)[0]
var childrenCountBox = document.getElementsByTagName('input').childrenCountBox.value.replace(/ /g,"+") 
var childrenCount = document.getElementsByTagName('input').childrenCountBox.value.split(" " , 1)[0]

// GRABBING UNIQUE IDENTIFIERS OF THE PROPERTIES DISPLAYED ON THE RESULT PAGE

var propertyCodes = document.querySelector("#merch-property-results").dataset.hotelmarshacodes.split(";")
propertyCodes.pop()

// GRABBING HTML ELEMENT OF SPACE WHERE DISCOUNT AND CODE WILL BE DISPLAYED

var strips = document.getElementsByClassName("rate-container l-clear l-s-col-4 l-m-col-8 l-l-col-12 l-m-col-last l-s-col-last l-float-right  l-padding-top-five-quarters l-padding-bottom-half l-l-padding-bottom-five-quarters l-m-padding-bottom-three-quarters l-display-inline-block")

// WRAPPER FUNCTION TO RUN THROUGH EACH PROPERTY

async function forEachProperty() {
    for(let k = 0; k < propertyCodes.length; k++) {
        var propertyCode = propertyCodes[k]
        await new Promise(next => { getPrices(propertyCode , k).then(()=>{console.log('done');
        next() })       
        });
    }
}

forEachProperty()

// FUNCTION TO TEST SPECIFIED CODES FOR ONE PROPERTY

async function getPrices(propertyCode , k)  {
    let min = 9999
    let useableCode = " "
    var textnode = document.createTextNode("The best code for this property so far is " + useableCode);
    strips[k].appendChild(textnode)                   // attach text node to site HTML
    let codes1 = ['APL' , 'ACC', 'IBM', 'CIT', 'MOS'] // only selecting a few codes for this exercise, all 212 would take too long
    var totalTime = codes1.length * 1.3               // it takes about 1.3 seconds to fetch each URL for code, so this serves as a timer
    
    // AVOID HTTP REQUEST OVERLOAD IF NUMBER OF CODES, n, IS GREATER THAN 10 BY SLEEPING FOR 3 SECONDS
    
    if (codes1.length > 10)   {
        setTimeout( async function(){ 
            for (let i = 0; i < codes1.length; i++) {
                totalTime = totalTime - 1.3
                try{
                    let corpCode = codes1[i]
                    
                    // TAKE USER-FILLED DATA AND USE THEM AS QUERIES IN URL
                    
                    let url = 'https://www.marriott.com/reservation/availabilitySearch.mi?propertyCode=' + propertyCode + '&isInternalSearch=true&vsInitialRequest=false&searchType=InCity&searchRadius=50.0&missingcheckInDateMsg=Please+enter+a+check-in+date.&&is-hotelsnearme-clicked=false&for-hotels-nearme=Near&missingcheckOutDateMsg=Please+enter+a+check-out+date.&pageType=advanced&collapseAccordian=is-hidden&singleSearch=true&isTransient=true&initialRequest=false&dimensions=0&propertyCode=' + propertyCode + '&flexibleDateSearchRateDisplay=false&isSearch=true&isRateCalendar=false&fromToDate=' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 + '&fromToDate_submit='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&fromDate=' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 +'&toDate='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&toDateDefaultFormat='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&fromDateDefaultFormat' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 + '&flexibleDateSearch=false&t-start='+fromDate3 + '-' + fromDate1 + '-' + fromDate2 + '&t-end='+toDate3 + '-' + toDate1 + '-' + toDate2 + '&lengthOfStay='+(toDate2 - fromDate2)+'&roomCountBox='+roomCountBox+'&roomCount='+roomCount+'&guestCountBox='+guestCountBox+'&numAdultsPerRoom='+guestCount+'&childrenCountBox='+childrenCountBox+'&childrenCount='+childrenCount+'&clusterCode=corp&corporateCode='+codes1[i]+'&useRequestCriteria=true&showErrors=true&propertyCode='+propertyCode+'&isSearch=true&currency='                   
                    let p1 = await fetch(url)   // asynchronous call, needs to be handled with async
                    let p2 = await p1.text()    // ** 
                    var parser = new DOMParser();
                    var htmlDoc = parser.parseFromString(p2, 'text/html');   
                    let result = await htmlDoc.getElementsByClassName("t-font-xl l-display-inline-block l-margin-none t-font-weight-bold")[0].innerText
                    price = parseInt(result)
                    if (price < min) {          // minimization
                        min = price
                        useableCode = corpCode
                    }
                    textnode.nodeValue = "The best code for this property so far is " + useableCode + ", " + Math.round(totalTime) + " seconds remain."
                }
                catch(e){
                    console.error(e.message)
                }
            };
        }, 3000);          
    }
    
    // FIRES IF NUMBER OF CODES, n, IS LESS THAN 5. NO TIMEOUT

    else    {
        for (let i = 0; i < codes1.length; i++) {
            totalTime = totalTime - 1.3
            try{
                let corpCode = codes1[i]
                let url = 'https://www.marriott.com/reservation/availabilitySearch.mi?propertyCode=' + propertyCode + '&isInternalSearch=true&vsInitialRequest=false&searchType=InCity&searchRadius=50.0&missingcheckInDateMsg=Please+enter+a+check-in+date.&&is-hotelsnearme-clicked=false&for-hotels-nearme=Near&missingcheckOutDateMsg=Please+enter+a+check-out+date.&pageType=advanced&collapseAccordian=is-hidden&singleSearch=true&isTransient=true&initialRequest=false&dimensions=0&propertyCode=' + propertyCode + '&flexibleDateSearchRateDisplay=false&isSearch=true&isRateCalendar=false&fromToDate=' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 + '&fromToDate_submit='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&fromDate=' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 +'&toDate='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&toDateDefaultFormat='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&fromDateDefaultFormat' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 + '&flexibleDateSearch=false&t-start='+fromDate3 + '-' + fromDate1 + '-' + fromDate2 + '&t-end='+toDate3 + '-' + toDate1 + '-' + toDate2 + '&lengthOfStay='+(toDate2 - fromDate2)+'&roomCountBox='+roomCountBox+'&roomCount='+roomCount+'&guestCountBox='+guestCountBox+'&numAdultsPerRoom='+guestCount+'&childrenCountBox='+childrenCountBox+'&childrenCount='+childrenCount+'&clusterCode=corp&corporateCode='+codes1[i]+'&useRequestCriteria=true&showErrors=true&propertyCode='+propertyCode+'&isSearch=true&currency='
                let p1 = await fetch(url)
                let p2 = await p1.text()
                var parser = new DOMParser();
                var htmlDoc = parser.parseFromString(p2, 'text/html');   
                let result = await htmlDoc.getElementsByClassName("t-font-xl l-display-inline-block l-margin-none t-font-weight-bold")[0].innerText
                price = parseInt(result)
                if (price < min) {
                    min = price
                    useableCode = corpCode
                }
                textnode.nodeValue = "The best code for this property so far is " + useableCode + ", " + Math.round(totalTime) + " seconds remain."
            }
            catch(e){
                console.error(e.message)
            }
        };
    }
    textnode.nodeValue = "The best code for this property is " + useableCode + ", which lowers the price to " + min + " USD / night"
    strips[k].style.color = "#00ff00" //change color of text once this property is finished
    corpCode = useableCode
};