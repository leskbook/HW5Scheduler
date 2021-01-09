//Variables
var now = moment();
var container = $(".container");
var txtArea = "";
var setInt;
var initTime;
var initTimeS

setPlanner();
setInt = setInterval(interval, 1000);

function interval() {
    initTime = parseInt(moment().format("mm"));
    initTimeS = parseInt(moment().format("ss"));
    var minLeft = 60 - initTime;

    if (initTime !== 0) {
        console.log("initTime: ", initTime, " ", typeof(initTime), "minLeft: ", minLeft, " ", typeof(minLeft));
    } else {
        console.log("Top of the hour");
        console.log("initTime: ", initTime, "initTimeS: ", initTimeS);
        if (initTimeS === 0) {
            setPlanner();
        }
    }
}
$(".saveBtn").on('click', function() {
    e.preventDefault();
    var currentEl = $(this);
    var parentIndex = parseInt(currentEl.parent().index());
    console.log("parent index on click:", parentIndex);
    txtArea = currentEl.siblings(".description");
    localStorage.setItem(parentIndex, txtArea.val());
    console.log(txtArea.val());
})

//Update Planner
function setPlanner() {
    current = moment();
    $("#currentDay").text(now.format("dddd, MMMM, D, YYYY, HH:mm a"));

    var add_minutes = function(dt, minutes) {
        return new Date(dt.getTime() + minutes * 60000);

    }
    console.log(add_minutes(new Date(2014, 10, 2), 30).toString());

    container.children().each(function() {
        var element = $(this);
        var index = parseInt(element.index());
        var pHourEl = element.children(".hour");
        var txtEl = element.children(".description");
        console.log(txtEl);
        if (localStorage.getItem(index) !== null) {
            // txtArea(HTML) = localStorage.setItem(index);
            console.log("txtArea: ", txtEl);
            txtEl.html(localStorage.getItem(index));
        }
        var pHour = moment().hour(9 + index);
        pHour = pHour.format("h A");
        pHourEl.html(pHour);
        pHour = moment().hour(9 + index);
        var hour = parseInt(pHour.format("H"));
        var cHour = parseInt(moment().format("H"));

        console.log("current hour: ", cHour, "pHour: ", hour);
        descEl = element.children(".description");
        if (hour < cHour) {
            descEl.removeClass("present");
            descEl.addClass("past");
        } else if (hour === cHour) {
            descEl.removeClass("future");
            descEl.addClass("present");
        } else {
            descEl.addClass("future");
        }

        return;
    });

}