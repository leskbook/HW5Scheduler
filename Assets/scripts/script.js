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

    } else {

        if (initTimeS === 0) {
            setPlanner();
        }
    }
}
$(".btn").on('click', function() {
    var currentEl = $(this);
    var parentIndex = parseInt(currentEl.parent().index());
    txtArea = currentEl.siblings(".descr");
    localStorage.setItem(parentIndex, txtArea.val());

})

//Update Planner

function setPlanner() {
    current = moment();
    $("#currentDay").text(now.format("dddd, MMMM, D, YYYY - hh:mm a"));

    container.children().each(function() {
        var element = $(this);
        var index = parseInt(element.index());
        var pHourEl = element.children(".hour");
        var txtEl = element.children(".descr");
        console.log(txtEl);
        if (localStorage.getItem(index) !== null) {
            console.log("txtArea: ", txtEl);
            txtEl.html(localStorage.getItem(index));
        }
        var pHour = moment().hour(9 + index);
        pHour = pHour.format("h A");
        pHourEl.html(pHour);
        pHour = moment().hour(+index);
        var hour = parseInt(pHour.format("H"));
        var cHour = parseInt(moment().format("H"));

        console.log("current hour: ", cHour, "pHour: ", hour);
        descEl = element.children(".descr");
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