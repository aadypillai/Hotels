var fromDate1 = document.getElementsByTagName('input').fromDate.value.split("/")[0] //getting filled out data from userpage
var fromDate2 = document.getElementsByTagName('input').fromDate.value.split("/")[1]
var fromDate3 = document.getElementsByTagName('input').fromDate.value.split("/")[2]
var fromDate =  document.getElementsByTagName('input').fromDate.value

var toDate1 = document.getElementsByTagName('input').toDate.value.split("/")[0]
var toDate2 = document.getElementsByTagName('input').toDate.value.split("/")[1]
var toDate3 = document.getElementsByTagName('input').toDate.value.split("/")[2]
var toDate = document.getElementsByTagName('input').toDate.value

var roomCount = document.getElementsByTagName('input').roomCountBox.value.split(" " , 1)[0]
var guestCount = document.getElementsByTagName('input').guestCountBox.value.split(" " , 1)[0]
var childrenCount = document.getElementsByTagName('input').childrenCountBox.value.split(" " , 1)[0]
var propertyCode = document.getElementsByTagName('input').propertyCode.value

var roomCount = 2
var corpCode = "IBM" //setting a corporation code

var formData = new FormData(); //populating Form Data
formData.append('recordsPerPage', '20');
formData.append('propertyCode', propertyCode)
formData.append('isInternalSearch', 'true')
formData.append('vsInitialRequest', 'false')
formData.append('searchType' , 'InCity')
formData.append('searchRadius', '55.0')
formData.append('missingcheckInDateMsg', 'Please enter a check-in date.')
formData.append('for-hotels-nearme', 'Near')
formData.append('missingcheckOutDateMsg','Please enter a check-out date.')
formData.append('pageType','editsearch')
formData.append('isTransient', 'true')
formData.append('initialRequest','false')
formData.append('dimensions','0')
formData.append('fromToDate', fromDate)
formData.append('fromToDate_submit', toDate)
formData.append('fromDate', fromDate)
formData.append('toDate', toDate)
formData.append('toDateDefaultFormat', toDate)
formData.append('fromDateDefaultFormat', fromDate)
formData.append('flexibleDateSearch', 'false')
formData.append('t-start', 'null')
formData.append('t-end', 'null')
formData.append('lengthOfStay','1')
formData.append('roomCountBox', roomCount)
formData.append('numberOfRooms' , '1')
formData.append('guestCountBox', guestCount + " Adult per Room")
formData.append('numberOfAdults' , guestCount)
formData.append('childrenCountBox', childrenCount + " Children Per Room")
formData.append('childrenCount' , childrenCount)
formData.append('clusterCode' , 'corp')
formData.append('corporateCode', corpCode)

url = 'https://www.marriott.com/reservation/availabilitySearch.mi?isSearch=false' //Post URL
console.log(url)
console.log(corpCode)
console.log(roomCount)
// console.log(formData.getAll())
var t0 = performance.now();

fetch(url , { //sending the POST request
    method: 'post',
    body: (formData) 
})
    .then((response1) => {
        console.log(response1)
        return response1.text();
    })
    .then((response1) => {
        var parser = new DOMParser();
        var htmlDoc = parser.parseFromString(response1, 'text/html');
        console.log(response1)
        console.log(htmlDoc.getElementsByClassName("t-font-xl l-display-inline-block l-margin-none t-font-weight-bold")[0].innerText)
        // console.log(response1)
        console.log("------------")
        console.log(corpCode)
        console.log(roomCount)
    });

  
// .then((response) => {
//     fetch('https://www.marriott.com/reservation/availabilitySearch.mi?isSearch=false')
//     .then((response1) => {
//         return response1.text();
//     })
//     .then((response1) => {
//         var parser = new DOMParser();
//         var htmlDoc = parser.parseFromString(response1, 'text/html');
//         console.log(htmlDoc.getElementsByClassName("t-font-xl l-display-inline-block l-margin-none t-font-weight-bold")[0].innerText)
//         // console.log(response1)
//         console.log("------------")
//     });
//     return response.text();
//   })
//   .then((response) => {
//     // console.log(response);
//   });

// fetch(url)
  
// .then((response) => {
//     return response.text()
    
//   })
//   .then((response) => {
//     var parser = new DOMParser();
//     var htmlDoc = parser.parseFromString(response, 'text/html');
//     htmlDoc.getElementsByClassName("analytics-click js-is-roomkey-enabled m-button m-button-primary")[0].click();
//     console.log("henlo")
//     console.log(htmlDoc.getElementsByClassName("analytics-click js-is-roomkey-enabled m-button m-button-primary")[0].click())
//     console.log("henlo2")

// });

var t1 = performance.now();

console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");


