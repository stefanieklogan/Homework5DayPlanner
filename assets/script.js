    //Listing today's date in header
      var nowHead = moment().format('MMMM Do, YYYY');
      $("#currentDay").text(nowHead);
        
    //Creating calendar hours
    var hourArr = [
     {hour: "8 AM", military: 8, appt:""},
     {hour: "9 AM", military: 9, appt:""},
     {hour: "10 AM", military: 10, appt:""},
     {hour: "11 AM", military: 11, appt:""},
     {hour: "12 PM", military: 12, appt:""},
     {hour: "1 PM", military: 13, appt:""},
     {hour: "2 PM", military: 14, appt:""},
     {hour: "3 PM", military: 15, appt:""},
     {hour: "4 PM", military: 16, appt:""},
     {hour: "5 PM", military: 17, appt:""},
    ];  
    
    
    // Create day view of calendar & for-loop to iterate through the time array.
    
    function renderCal() {
      for (var i = 0; i < hourArr.length; i++) {  
    //create div for each row
        var row = $("<div>");
        row.addClass("row row1 time-block");
        row.attr("time-hour", hourArr[i].hour)
        row.attr("id", hourArr[i].military);
        $(".container").append(row);
    
    //create col 1 of 3 for hr
        var hourCol = $("<div>");
        hourCol.addClass("col col-2 justify-content-center hour row time-block ml-2 py-4");
        hourCol.text($(row).attr("time-hour"));
        $(row).append(hourCol);
    
    //create col 2 of 3 for appt text
        var inputCol = $("<input>");
        inputCol.addClass("col col-8 input row time-block ml-3");
        inputCol.attr("input-key", hourArr[i].military);
        $(row).append(inputCol);
    
    //create col 3 of 3 to hold saveBtn
        var saveCol = $("<div>");
        saveCol.addClass("col col-2 justify-content-center hour save row time-block ml-3");
        $(row).append(saveCol);
    
    }}
    
    renderCal();
    
    function renderSaveBtn() {
    //create saveBtn and classes, append to col
      var saveBtn = $("<button>");
        saveBtn.addClass("btn saveBtn btn-primary my-2 mx-2");
        saveBtn.text("Save");
        $(".save").append(saveBtn);
    }
    
    renderSaveBtn();
    
    //Change <input> background color based on time/////////////////////////////////
    var pastPresentFuture = function () {
      var currentTime = (moment().format('H'));
    
      for (var i = 0; i < hourArr.length; i++) {
      var militaryID = hourArr[i].military;
      
      //Ensuring both var are num
      militaryNum = parseInt(militaryID);
      timeNum = parseInt(currentTime);
      
      if (militaryNum < timeNum)  {
        $("#" + militaryID).children("input").addClass("past");
      }
    
      else if (militaryNum === timeNum ) {
        $("#" + militaryID).children("input").addClass("present");
      }
    
      else {
        $("#" + militaryID).children("input").addClass("future");
      }
    };
      
      };
    
    pastPresentFuture();
    
    //input, saveBtn, localStorage //////////////////////////////////////////////////////
    
    //store appt in LS
    function storeAppt() {
      localStorage.setItem("hourArr", JSON.stringify(hourArr));
      console.log(hourArr);
    }
    
    //from LS, display existing appts in <input> element for correct hr
    function displayAppt() {
      hourArr.forEach(function (_thisHour) {
        $(".input").eq(_thisHour.military-8).val(_thisHour.appt);
        console.log(_thisHour.appt);
      })
    }
    
    //check LS for appt first, then call display func
    function initCal () {
      var storedAppt = JSON.parse(localStorage.getItem("hourArr"));
      console.log(storedAppt);
      if (storedAppt !== null) {
        hourArr = storedAppt;
      }
      displayAppt();
    }
    
    //saveBtn click event focusing on arr ID & input >>> append to hourArr
    $(".saveBtn").on("click", function(event) {
      event.preventDefault();
      var apptHour = $(this).parent().parent().attr("id");
      console.log(apptHour);
      var apptInput = $(this).parent().siblings(".input").val();
      console.log(apptInput);
      
      hourArr[apptHour-8].appt = $(this).parent().siblings("input").val();
     
        storeAppt();
      });
    
    initCal();