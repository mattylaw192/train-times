// Initialize Firebase
var config = {
    apiKey: "AIzaSyD_fGbpjWU6R3syHiwaxq4lr9T7w-QDZf0",
    authDomain: "homework-7-82510.firebaseapp.com",
    databaseURL: "https://homework-7-82510.firebaseio.com",
    projectId: "homework-7-82510",
    storageBucket: "homework-7-82510.appspot.com",
    messagingSenderId: "10107466234"
};


firebase.initializeApp(config);

var database = firebase.database();


//submit button click saving train info and trim 
$("#addTrainBtn").on("click",function(event){
    event.preventDefault();

    var trainName = $("#nameInput").val();
    var destinationName = $("#destinationInput").val();
    var trainTime = $("#trainTimeInput").val();
    var trainFrequency = $("#frequencyInput").val();

    

    var newTrainInfo = {
        name: trainName,
        destination: destinationName,
        time: trainTime,
        frequency: trainFrequency,
    };

    console.log(newTrainInfo.name);
    console.log(newTrainInfo.destination);
    console.log(newTrainInfo.time);
    console.log(newTrainInfo.frequency);

    database.ref().push(newTrainInfo);




})


//Add info to Firebase then update table
database.ref().on("child_added", function(childSnapshot){

    var storedTrainName = childSnapshot.val().name;
    var storedDestinationName = childSnapshot.val().destination;
    var storedTrainTime = childSnapshot.val().time;
    var storedTrainFrequency = childSnapshot.val().frequency;

    console.log(storedTrainName);
    console.log(storedDestinationName);
    console.log(storedTrainTime);
    console.log(storedTrainFrequency);

    var trainTimeConversion = moment.unix(storedTrainTime).format("HH.mm");

    var nextArrival = trainTimeConversion + storedTrainFrequency;

    var minutesAway = moment() - nextArrival;

    var newRow = $("<tr>").append(
        $("<td>").text(storedTrainName),
        $("<td>").text(storedDestinationName),
        $("<td>").text(storedTrainFrequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway)

    );

    $("#schedule-table").append(newRow);



});



//