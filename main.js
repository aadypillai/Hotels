async function getPrices()  {
    var fromDate1 = document.getElementsByTagName('input').fromDate.value.split("/")[0] //getting filled out data from userpage
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
    var propertyCode = document.getElementsByTagName('input').propertyCode.value.replace(/ /g,"+")
    
    let min = 9999
    let useableCode = "none"
    let corpCode = ""
    let codes1 = ['APL' , 'IBM', 'MOS']
    for (let i = 0; i < codes1.length; i++) {
        try{
            let corpCode = codes1[i]
            let url = "https://www.marriott.com/reservation/availabilitySearch.mi?roomTypeCode=&recordsPerPage=20&autoSuggestItemType=&destinationAddress.types=&destinationAddress.latitude=&propertyCode=" + propertyCode + "&destinationAddress.stateProvinceShort=&isInternalSearch=true&destinationAddress.cityPopulation=&vsInitialRequest=false&searchType=InCity&destinationAddress.locality=&showAddressPin=&miniStoreFormSubmit=&destinationAddress.stateProvinceDisplayName=&destinationAddress.destinationPageDestinationAddress=&countryName=&destinationAddress.stateProvince=&searchRadius=50.0&singleSearchAutoSuggest=&missingcheckInDateMsg=Please+enter+a+check-in+date.&destinationAddress.placeId=&is-hotelsnearme-clicked=false&destinationAddress.addressline1=&airportName=&for-hotels-nearme=Near&missingcheckOutDateMsg=Please+enter+a+check-out+date.&suggestionsPropertyCode=&pageType=advanced&destinationAddress.country=&destinationAddress.name=&poiCity=&destinationAddress.countryShort=&marriottBrands=&poiName=&destinationAddress.address=&search-countryRegion=&collapseAccordian=is-hidden&singleSearch=true&destinationAddress.cityPopulationDensity=&destinationAddress.secondaryText=&destinationAddress.postalCode=&destinationAddress.city=&destinationAddress.mainText=&airportCode=&isTransient=true&destinationAddress.longitude=&initialRequest=false&destinationAddress.website=&search-locality=&dimensions=0&roomTypeCode=&propertyCode=" + propertyCode + "&flexibleDateSearchRateDisplay=false&propertyName=&isSearch=true&marriottRewardsNumber=&isRateCalendar=false&incentiveType_Number=&incentiveType=&flexibleDateLowestRateMonth=&flexibleDateLowestRateDate=&marrOfferId=&isMultiRateSearch=&multiRateMaxCount=&multiRateCorpCodes=&useMultiRateRewardsPoints=&multiRateClusterCodes=&multiRateCorpCodesEntered=&lowestRegularRate=&js-location-nearme-values=&destinationAddress.destination=&fromToDate="  + fromDate1 +"%2F" +fromDate2 + "%2F" + fromDate3 + "&fromToDate_submit=" + toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&fromDate=' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 +'&toDate='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&toDateDefaultFormat='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&fromDateDefaultFormat' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 + '&flexibleDateSearch=false&t-start='+fromDate3 + '-' + fromDate1 + '-' + fromDate2 + '&t-end='+toDate3 + '-' + toDate1 + '-' + toDate2 + '&lengthOfStay='+(toDate2 - fromDate2)+'&roomCountBox='+roomCountBox+'&roomCount='+roomCount+'&guestCountBox='+guestCountBox+'&numAdultsPerRoom='+guestCount+'&childrenCountBox='+childrenCountBox+'&childrenCount='+childrenCount+'&childrenAges=&clusterCode=corp&corporateCode='+corpCode+'&useRequestCriteria=true&showErrors=true&propertyCode='+propertyCode+'&isSearch=true&currency='
            let p1 = await fetch(url)
            let p2 = await p1.text()
            console.log(p2)
            var parser = new DOMParser();
            // console.log(corpCode)
            var htmlDoc = parser.parseFromString(p2, 'text/html');   
            let result = await htmlDoc.getElementsByClassName("t-font-xl l-display-inline-block l-margin-none t-font-weight-bold")[0].innerText
            price = parseInt(result)
            if (price < min) {
                min = price
                useableCode = corpCode
            }
            // console.log(price)
            // console.log("------------")
        }
        catch(e){
            console.error(e.message)
        }
    };
    console.log("Final code to use: " + useableCode)
    };
var t0 = performance.now();
var t1;
getPrices().then(()=>{console.log('done')
var t1 = performance.now();
console.log("Testing all codes took " + (t1 - t0) + " milliseconds.");
});