var fromDate1 = document.getElementsByTagName('input').fromDate.value.split("/")[0] //getting filled out data from userpage
var fromDate2 = document.getElementsByTagName('input').fromDate.value.split("/")[1]
var fromDate3 = document.getElementsByTagName('input').fromDate.value.split("/")[2]
var fromDate =  document.getElementsByTagName('input').fromDate.value

var toDate1 = document.getElementsByTagName('input').toDate.value.split("/")[0]
var toDate2 = document.getElementsByTagName('input').toDate.value.split("/")[1]
var toDate3 = document.getElementsByTagName('input').toDate.value.split("/")[2]
var toDate = document.getElementsByTagName('input').toDate.value

var roomCountBox = document.getElementsByTagName('input').roomCountBox.value.replace(/ /g,"+")
var roomCount = document.getElementsByTagName('input').roomCountBox.value.split(" " , 1)[0]
var guestCountBox = document.getElementsByTagName('input').guestCountBox.value.replace(/ /g,"+") 
var guestCount = document.getElementsByTagName('input').guestCountBox.value.split(" " , 1)[0]
var childrenCountBox = document.getElementsByTagName('input').childrenCountBox.value.replace(/ /g,"+") 
var childrenCount = document.getElementsByTagName('input').childrenCountBox.value.split(" " , 1)[0]
var propertyCode = document.getElementsByTagName('input').propertyCode.value.replace(/ /g,"+")
console.log(document.getElementsByTagName('input').propertyCode.value)

// console.log(document.getElementsByTagName("input"))
var roomCount = 2
var corpCode = "IBM" //setting a corporation code

url = "https://www.marriott.com/reservation/availabilitySearch.mi?roomTypeCode=&recordsPerPage=20&autoSuggestItemType=&destinationAddress.types=&destinationAddress.latitude=&propertyCode=" + propertyCode + "&destinationAddress.stateProvinceShort=&isInternalSearch=true&destinationAddress.cityPopulation=&vsInitialRequest=false&searchType=InCity&destinationAddress.locality=&showAddressPin=&miniStoreFormSubmit=&destinationAddress.stateProvinceDisplayName=&destinationAddress.destinationPageDestinationAddress=&countryName=&destinationAddress.stateProvince=&searchRadius=50.0&singleSearchAutoSuggest=&missingcheckInDateMsg=Please+enter+a+check-in+date.&destinationAddress.placeId=&is-hotelsnearme-clicked=false&destinationAddress.addressline1=&airportName=&for-hotels-nearme=Near&missingcheckOutDateMsg=Please+enter+a+check-out+date.&suggestionsPropertyCode=&pageType=advanced&destinationAddress.country=&destinationAddress.name=&poiCity=&destinationAddress.countryShort=&marriottBrands=&poiName=&destinationAddress.address=&search-countryRegion=&collapseAccordian=is-hidden&singleSearch=true&destinationAddress.cityPopulationDensity=&destinationAddress.secondaryText=&destinationAddress.postalCode=&destinationAddress.city=&destinationAddress.mainText=&airportCode=&isTransient=true&destinationAddress.longitude=&initialRequest=false&destinationAddress.website=&search-locality=&dimensions=0&roomTypeCode=&propertyCode=" + propertyCode + "&flexibleDateSearchRateDisplay=false&propertyName=&isSearch=true&marriottRewardsNumber=&isRateCalendar=false&incentiveType_Number=&incentiveType=&flexibleDateLowestRateMonth=&flexibleDateLowestRateDate=&marrOfferId=&isMultiRateSearch=&multiRateMaxCount=&multiRateCorpCodes=&useMultiRateRewardsPoints=&multiRateClusterCodes=&multiRateCorpCodesEntered=&lowestRegularRate=&js-location-nearme-values=&destinationAddress.destination=&fromToDate="  + fromDate1 +"%2F" +fromDate2 + "%2F" + fromDate3 + "&fromToDate_submit=" + toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&fromDate=' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 +'&toDate='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&toDateDefaultFormat='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&fromDateDefaultFormat' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 + '&flexibleDateSearch=false&t-start='+fromDate3 + '-' + fromDate1 + '-' + fromDate2 + '&t-end='+toDate3 + '-' + toDate1 + '-' + toDate2 + '&lengthOfStay='+(toDate2 - fromDate2)+'&roomCountBox='+roomCountBox+'&roomCount='+roomCount+'&guestCountBox='+guestCountBox+'&numAdultsPerRoom='+guestCount+'&childrenCountBox='+childrenCountBox+'&childrenCount='+childrenCount+'&childrenAges=&clusterCode=corp&corporateCode='+corpCode+'&useRequestCriteria=true&showErrors=true&propertyCode='+propertyCode+'&isSearch=true&currency='
// url = 'https://www.marriott.com/reservation/availabilitySearch.mi?isSearch=false' //Post URL
console.log(url)
// console.log(corpCode)
// console.log(roomCount)
// // console.log(formData.getAll())
// var t0 = performance.now();

// fetch(url , { //sending the POST request
//     method: 'post',
//     body: (formData) 
// })
//     .then((response1) => {
//         console.log(response1)
//         return response1.text();
//     })
//     .then((response1) => {
//         var parser = new DOMParser();
//         var htmlDoc = parser.parseFromString(response1, 'text/html');
//         console.log(response1)
//         console.log(htmlDoc.getElementsByClassName("t-font-xl l-display-inline-block l-margin-none t-font-weight-bold")[0].innerText)
//         // console.log(response1)
//         console.log("------------")
//         console.log(corpCode)
//         console.log(roomCount)
//     });

  
// // .then((response) => {
// //     fetch('https://www.marriott.com/reservation/availabilitySearch.mi?isSearch=false')
// //     .then((response1) => {
// //         return response1.text();
// //     })
// //     .then((response1) => {
// //         var parser = new DOMParser();
// //         var htmlDoc = parser.parseFromString(response1, 'text/html');
// //         console.log(htmlDoc.getElementsByClassName("t-font-xl l-display-inline-block l-margin-none t-font-weight-bold")[0].innerText)
// //         // console.log(response1)
// //         console.log("------------")
// //     });
// //     return response.text();
// //   })
// //   .then((response) => {
// //     // console.log(response);
// //   });

// // fetch(url)
  
// // .then((response) => {
// //     return response.text()
    
// //   })
// //   .then((response) => {
// //     var parser = new DOMParser();
// //     var htmlDoc = parser.parseFromString(response, 'text/html');
// //     htmlDoc.getElementsByClassName("analytics-click js-is-roomkey-enabled m-button m-button-primary")[0].click();
// //     console.log("henlo")
// //     console.log(htmlDoc.getElementsByClassName("analytics-click js-is-roomkey-enabled m-button m-button-primary")[0].click())
// //     console.log("henlo2")

// // });

// var t1 = performance.now();

// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");


