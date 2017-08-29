  // Initialize Firebase
var config = {
  apiKey: "AIzaSyBetvj1H9MQvqMb_v7clbVGXSUZ-orRPBk",
  authDomain: "q-train-schedule.firebaseapp.com",
  databaseURL: "https://q-train-schedule.firebaseio.com",
  projectId: "q-train-schedule",
  storageBucket: "",
  messagingSenderId: "14513881081"
};

firebase.initializeApp(config);

var dataRef = firebase.database();
var trainName ="";
var destination = "";
var firstTrain = "";
var frequency = "";
var convertedTime = "";
var currentTime = "";
var diffTime = "";
var modulus = "";
var timeToNextTrain = "";
var nextTrain = "";
var nextTrainFormat = "";

$(document).ready(function(){

$("#add-train").on("click", function(event){

  event.preventDefault();

  trainName = $("#train-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrain = $("#firstTrain-input").val().trim();
  frequency = $("#frequency-input").val().trim();
    convertedTime = moment(firstTrain, "hh:mm").subtract(1, "years");
    currentTime = moment();
    diffTime = moment().diff(moment(convertedTime), "minutes");
    modulus = diffTime % frequency;
    timeToNextTrain = frequency - modulus;
    nextTrain = moment().add(timeToNextTrain, "minutes");
    nextTrainFormat = moment(nextTrain).format("hh:mm");


  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);
  console.log(nextTrainFormat);
  console.log(timeToNextTrain);

  dataRef.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    nextTrainFormat: nextTrainFormat,
    timeToNextTrain: timeToNextTrain
  });

});

dataRef.ref().on("child_added", function(childSnapshot) {
  // full list of items to the well

  $('.trainSchedule').append("<tr class='table-row'>" +
   "<td class='col-md-3'>" + childSnapshot.val().trainName +
   "</td>" +
   "<td class='col-md-2'>" + childSnapshot.val().destination +
   "</td>" +
   "<td class='col-md-2'>" + childSnapshot.val().frequency +
   "</td>" +
   "<td class='col-md-2'>" + childSnapshot.val().nextTrainFormat + // Next Arrival Formula ()
   "</td>" +
   "<td class='col-md-2'>" + childSnapshot.val().timeToNextTrain + // Minutes Away Formula
   "</td></tr>");
// Handle the errors
}, function(errorObject){
  //console.log("Errors handled: " + errorObject.code)
});


}); //closes document function
