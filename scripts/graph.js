//create date object of current time
var startTime = new Date();

var player = "TFizz";
var songTitle = 'Song Name Goes Here';
var mapper = 'Mapper Goes Here';
var totalScore = 9999999;
//graph data
var accs = [];
var times = [];
var time = '';
var minutes = 0;
var seconds = 0;
//graph
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: times,
        datasets: [{
            data: accs,
            pointRadius: 0,
            backgroundColor: [
                'rgba(255, 99, 132, 0.0)'
            ],
            borderColor: [
                'red'
            ],
            borderWidth: 3
        }]
    },
    options: {
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                ticks: {
                    padding: 4,
                    fontColor: 'rgb(220, 0, 0, 0.5)',
                    beginAtZero: true,
                    max: (minutes * 60) + seconds,
                },
                gridLines: [{
                    drawTicks: true,
                    display: false,
                }],
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 100,
                    fontColor: 'rgb(220, 0, 0, 0.8)'
                }
            }]
        }
    }
});

function setGraphData() {
    document.getElementById('chartHeader').innerHTML = songTitle;
    document.getElementById('player').innerHTML = "Player: " + player;
    document.getElementById('mapper').innerHTML = "Mapper: " + mapper;
    document.getElementById('score').innerHTML = "Score: " + totalScore;
}

function timer() {
    var endTime = new Date();
    seconds = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
    delete endTime;
    if (seconds >= 60) {
        let mod = seconds % 60;
        minutes = (seconds - mod) / 60;
        seconds = 0;
    }
    if (seconds < 10) { time = time = minutes.toString() + ':0' + seconds.toString(); } else { time = minutes.toString() + ':' + seconds.toString(); }
    return time;
}

function getAcc() {
    return (20 * Math.random() + 70);
}

function updateGraph() {
    //convert time from seconds to a printable time format
    let t = timer();
    let a = getAcc();
    console.log("Time: " + t);
    console.log("Acc: " + a);
    times.push(t);
    accs.push(a);
    myChart.update();
}

function updateGraph() {
    //convert time from seconds to a printable time format
    let t = timer();
    let a = getAcc();
    console.log("Time: " + t);
    console.log("Acc: " + a);
    times.push(t);
    accs.push(a);
    myChart.update();
}

//setGraphData();
updateGraph();
var graphUpdate = setInterval(updateGraph, 1000);
/*
setInterval(function() {
    //convert time from seconds to a printable time format
    console.log(timer());
    times.push(timer());
    accs.push(genAcc());
    myChart.update();
}, 1000);
//add data to graph
//window.setInterval(updateGraph(myChart, timer(), genAcc(), 50));
*/

/*
for (var i = 0; i <= 100; i++) {
    accs.push((Math.random() * 15) + 70);

    if (seconds < 10) {
        time = minutes.toString() + ":" + "0" + seconds.toString();
    } else {
        time = minutes.toString() + ":" + seconds.toString();
    }

    times.push(time);
    console.log(time);

    seconds += 5;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
}
*/