// GRABBING DATA THAT USER SPECIFIED (CHECK-IN DATE, NO. OF GUESTS, ETC.)

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

// FUNCTION TO TEST SPECIFIED CODES FOR ONE PROPERTY

async function getPrices()  {
    let min = 9999
    let useableCode = "none"
    let corpCode = ""
    // for this exercise, we'll test roughly 20 codes
    let codes1 = ['A70','A9M','AAC','ACC','ACS','ADP','AET','AFI','AIG','ALL','AMW','AMX','AOL','APC','APL','APP','ARN','ARP','ASG','ATT']
    let totalTime = 1.3 * codes1.length
    
    // CREATION OF MODAL PROGRESS BOX

    wrapperDiv = document.createElement("div");
    wrapperDiv.setAttribute("style","position: absolute; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.5; z-index: 2000; height: 1083px; width: 100%;");
    iframeElement = document.createElement("iframe");
    iframeElement.setAttribute("style","width: 100%; height: 100%;");
    wrapperDiv.appendChild(iframeElement);
    modalDialogParentDiv = document.createElement("div");
    modalDialogParentDiv.setAttribute("style","position: absolute; width: 350px; border: 1px solid rgb(51, 102, 153); padding: 10px; background-color: rgb(255, 255, 255); z-index: 2001; overflow: auto; text-align: center; top: 149px; left: 497px;");
    modalDialogSiblingDiv = document.createElement("div");
    modalDialogTextDiv = document.createElement("div"); 
    modalDialogTextDiv.setAttribute("style" , "text-align:center");
    modalDialogTextSpan = document.createElement("span"); 
    modalDialogText = document.createElement("strong"); 
    modalDialogText.innerHTML = "Processing... The best code so far is " + useableCode + ", about " + totalTime + " seconds remain.";
    breakElement = document.createElement("br");    
    modalDialogTextSpan.appendChild(modalDialogText);
    modalDialogTextDiv.appendChild(modalDialogTextSpan);
    modalDialogTextDiv.appendChild(breakElement);
    modalDialogTextDiv.appendChild(breakElement);
    modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
    modalDialogParentDiv.appendChild(modalDialogSiblingDiv);
    document.body.appendChild(wrapperDiv);
    document.body.appendChild(modalDialogParentDiv);

    // TEST EACH CODE

    for (let i = 0; i < codes1.length; i++) {
        totalTime = totalTime - 1.3
        try{  
            let corpCode = codes1[i]
            
            // TAKE USER-FILLED DATA AND USE THEM AS QUERIES IN URL

            let url = 'https://www.marriott.com/reservation/availabilitySearch.mi?propertyCode=' + propertyCode + '&isInternalSearch=true&vsInitialRequest=false&searchType=InCity&searchRadius=50.0&missingcheckInDateMsg=Please+enter+a+check-in+date.&&is-hotelsnearme-clicked=false&for-hotels-nearme=Near&missingcheckOutDateMsg=Please+enter+a+check-out+date.&pageType=advanced&collapseAccordian=is-hidden&singleSearch=true&isTransient=true&initialRequest=false&dimensions=0&propertyCode=' + propertyCode + '&flexibleDateSearchRateDisplay=false&isSearch=true&isRateCalendar=false&fromToDate=' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 + '&fromToDate_submit='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&fromDate=' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 +'&toDate='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&toDateDefaultFormat='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&fromDateDefaultFormat' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 + '&flexibleDateSearch=false&t-start='+fromDate3 + '-' + fromDate1 + '-' + fromDate2 + '&t-end='+toDate3 + '-' + toDate1 + '-' + toDate2 + '&lengthOfStay='+(toDate2 - fromDate2)+'&roomCountBox='+roomCountBox+'&roomCount='+roomCount+'&guestCountBox='+guestCountBox+'&numAdultsPerRoom='+guestCount+'&childrenCountBox='+childrenCountBox+'&childrenCount='+childrenCount+'&clusterCode=corp&corporateCode='+codes1[i]+'&useRequestCriteria=true&showErrors=true&propertyCode='+propertyCode+'&isSearch=true&currency='
            let p1 = await fetch(url)   // asynchronous call
            let p2 = await p1.text()    // **
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(p2, 'text/html');   
            let result = await htmlDoc.getElementsByClassName("t-font-xl l-display-inline-block l-margin-none t-font-weight-bold")[0].innerText
            price = parseInt(result)
            if (price <= min) {         // minimization
                min = price
                useableCode = corpCode
                
                // CHANGE DISPLAYED CODE IF BETTER CODE IS FOUND

                wrapperDiv.remove()    
                modalDialogParentDiv.remove()
                wrapperDiv = document.createElement("div");
                wrapperDiv.setAttribute("style","position: absolute; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.5; z-index: 2000; height: 1083px; width: 100%;");
                iframeElement = document.createElement("iframe");
                iframeElement.setAttribute("style","width: 100%; height: 100%;");
                wrapperDiv.appendChild(iframeElement);
                modalDialogParentDiv = document.createElement("div");
                modalDialogParentDiv.setAttribute("style","position: absolute; width: 350px; border: 1px solid rgb(51, 102, 153); padding: 10px; background-color: rgb(255, 255, 255); z-index: 2001; overflow: auto; text-align: center; top: 149px; left: 497px;");
                modalDialogSiblingDiv = document.createElement("div");
                modalDialogTextDiv = document.createElement("div"); 
                modalDialogTextDiv.setAttribute("style" , "text-align:center");
                modalDialogTextSpan = document.createElement("span"); 
                modalDialogText = document.createElement("strong"); 
                modalDialogText.innerHTML = "Processing... The best code so far is " + useableCode + ", about " + Math.round(totalTime) + " seconds remain.";
                breakElement = document.createElement("br");    
                modalDialogTextSpan.appendChild(modalDialogText);
                modalDialogTextDiv.appendChild(modalDialogTextSpan);
                modalDialogTextDiv.appendChild(breakElement);
                modalDialogTextDiv.appendChild(breakElement);
                modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
                modalDialogParentDiv.appendChild(modalDialogSiblingDiv);
                document.body.appendChild(wrapperDiv);
                document.body.appendChild(modalDialogParentDiv);  
            }
            modalDialogText.innerHTML = "Processing... The best code so far is " + useableCode + ", about " + Math.round(totalTime) + " seconds remain.";            
        }
        catch(e){
            console.error(e.message)
        }
    };
    corpCode = useableCode
    
    // AUTOMATICALLY SELECT BEST CODE ONCE ALL CODES ARE TESTED, AND TAKE USER TO THAT PAGE
    
    let redirect = "https://www.marriott.com/reservation/availabilitySearch.mi?roomTypeCode=&recordsPerPage=20&autoSuggestItemType=&destinationAddress.types=&destinationAddress.latitude=&propertyCode=" + propertyCode + "&destinationAddress.stateProvinceShort=&isInternalSearch=true&destinationAddress.cityPopulation=&vsInitialRequest=false&searchType=InCity&destinationAddress.locality=&showAddressPin=&miniStoreFormSubmit=&destinationAddress.stateProvinceDisplayName=&destinationAddress.destinationPageDestinationAddress=&countryName=&destinationAddress.stateProvince=&searchRadius=50.0&singleSearchAutoSuggest=&missingcheckInDateMsg=Please+enter+a+check-in+date.&destinationAddress.placeId=&is-hotelsnearme-clicked=false&destinationAddress.addressline1=&airportName=&for-hotels-nearme=Near&missingcheckOutDateMsg=Please+enter+a+check-out+date.&suggestionsPropertyCode=&pageType=advanced&destinationAddress.country=&destinationAddress.name=&poiCity=&destinationAddress.countryShort=&marriottBrands=&poiName=&destinationAddress.address=&search-countryRegion=&collapseAccordian=is-hidden&singleSearch=true&destinationAddress.cityPopulationDensity=&destinationAddress.secondaryText=&destinationAddress.postalCode=&destinationAddress.city=&destinationAddress.mainText=&airportCode=&isTransient=true&destinationAddress.longitude=&initialRequest=false&destinationAddress.website=&search-locality=&dimensions=0&roomTypeCode=&propertyCode=" + propertyCode + "&flexibleDateSearchRateDisplay=false&propertyName=&isSearch=true&marriottRewardsNumber=&isRateCalendar=false&incentiveType_Number=&incentiveType=&flexibleDateLowestRateMonth=&flexibleDateLowestRateDate=&marrOfferId=&isMultiRateSearch=&multiRateMaxCount=&multiRateCorpCodes=&useMultiRateRewardsPoints=&multiRateClusterCodes=&multiRateCorpCodesEntered=&lowestRegularRate=&js-location-nearme-values=&destinationAddress.destination=&fromToDate="  + fromDate1 +"%2F" +fromDate2 + "%2F" + fromDate3 + "&fromToDate_submit=" + toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&fromDate=' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 +'&toDate='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&toDateDefaultFormat='+ toDate1 +'%2F' +toDate2 + '%2F' + toDate3 + '&fromDateDefaultFormat' + fromDate1 +'%2F' +fromDate2 + '%2F' + fromDate3 + '&flexibleDateSearch=false&t-start='+fromDate3 + '-' + fromDate1 + '-' + fromDate2 + '&t-end='+toDate3 + '-' + toDate1 + '-' + toDate2 + '&lengthOfStay='+(toDate2 - fromDate2)+'&roomCountBox='+roomCountBox+'&roomCount='+roomCount+'&guestCountBox='+guestCountBox+'&numAdultsPerRoom='+guestCount+'&childrenCountBox='+childrenCountBox+'&childrenCount='+childrenCount+'&childrenAges=&clusterCode=corp&corporateCode='+corpCode+'&useRequestCriteria=true&showErrors=true&propertyCode='+propertyCode+'&isSearch=true&currency='
    window.location.assign(redirect) 
    };

getPrices().then(()=>{console.log('done')   
});