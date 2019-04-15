let socket;

const graph = (() => {
    var main = document.getElementById('chartContainer');
    //var numberOfAccs = 0;
    var numberOfTimes = 0;
    //var player = prompt('Enter your in game name', 'TFizz')

    const rainbowShift = (() => {
        var frequency = .3;
        var step = 0;
        //
        function changeHues() {
            if (step < 10000) {
                var i = step;
            } else {
                var i = 0;
            }
            r = Math.sin(frequency * i + 0) * 127 + 128;
            g = Math.sin(frequency * i + 2) * 127 + 128;
            b = Math.sin(frequency * i + 4) * 127 + 128;
            step = i + 1;
        }
        return () => {
            changeHues();
            console.log(`Before: rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`);
            myChart.data.datasets[0].borderColor = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
            //myChart.options.scales.xAxes[0].ticks.fontColor = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
            //myChart.options.scales.yAxes[0].ticks.fontColor = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
            console.log(`After color change`);
        }

    })();

    const performance = (() => {
        var score = document.getElementById('score');
        //var isFirstHit = true;
        var percentAcc;
        var notesMissed = 0;
        var accs = [];

        return {
            update(data) {
                if (accs.length <= numberOfTimes - 1) {
                    if (isNaN(data.score / data.currentMaxScore)) {
                        console.log(`Current Score: ${data.score}\nCurrent Max Score: ${data.currentMaxScore}\nPercent: ${data.score / data.currentMaxScore * 100}`);
                        percentAcc = 100;
                    } else {
                        percentAcc = (data.score / data.currentMaxScore) * 100;
                    }
                    accs.push(percentAcc);
                    myChart.data.datasets[0].data = accs;
                    rainbowShift();
                    myChart.update();
                }
                totalScore = data.score;
                console.log(accs);
                console.log(myChart.data.datasets[0].data)
                console.log(`Accuracy: ${percentAcc}`);
                score.innerHTML = `Score: ${totalScore}`;
                accs;
            },
            clear() {
                accs = [];
            }
        }
    })();

    const timer = (() => {
        var active = false;
        var round = limitAsk;
        var times = [];
        var start;
        var duration;
        var display;

        function format(time) {
            var minutes = Math.floor(time / 60);
            var seconds = Math.round(time % 60);
            return (seconds >= 10) ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`;
        }

        function update(time) {
            time = time || Date.now();
            var diff = time - start;
            var diffInSeconds = diff / 1000;
            if (diffInSeconds != display) {
                display = diffInSeconds;
            }
        }

        function loop() {
            if (active) {
                update();
                requestAnimationFrame(loop);
            }
        }

        return {
            clear() {
                times = [];
            },
            push() {
                //round off time and pushs at most once each second
                if (myChart.data.labels[myChart.data.labels.length - 1] !== format(display) && !round) {
                    times.push(format(display));
                    myChart.data.labels = times;
                    myChart.update();
                    numberOfTimes++;
                } else if (myChart.data.labels[myChart.data.labels.length - 1] !== (display)) { //don't round off and don't limit push rate
                    times.push((display));
                    myChart.data.labels = times;
                    if (rainbow) {

                    }
                    numberOfTimes++;
                }
                console.log(times);
                console.log(myChart.data.labels);
            },
            start(time, length) {
                active = true;
                start = time;
                duration = length;
                loop();
            },

            pause(time) {
                active = false;
                update(time);
            },

            stop() {
                active = false;
                start = undefined;
                duration = undefined;
                numberOfTimes = 0;
                times = [];
            }
        }
    })();

    const beatmap = (() => {
        var title = document.getElementById('chartTitle');
        var subtitle = document.getElementById('subTitle');
        var mapper = document.getElementById('mapper');
        var difficulty = document.getElementById('difficulty');
        return (data, time) => {
            if (data.diffculty === "ExpertPlus") {
                data.diffculty = "Expert+";
            }
            title.innerHTML = data.songName;
            subtitle.innerHTML = data.songSubName;
            mapper.innerHTML = data.songAuthorName;
            difficulty.innerHTML = data.difficulty;
            timer.start(Date.now(), data.length);
        }
    })();

    return {
        clear() {
            myChart.data.labels = [];
            myChart.data.datasets[0].data = [];
            this.performance.clear();
            this.timer.clear();
        },
        show() {
            main.style.display = 'block';
        },
        hide() {
            main.style.display = 'none';
        },
        performance,
        timer,
        beatmap,
        player
    }
})();

var defaultColor = 'white';
var limitAsk = confirm(`Press OK to limit graph (or press cancel)`);
var colorPick = prompt(`Please enter a color you would like your graph to be, default is ${defaultColor}\nSee readme for more info on color choices`, 'white');
if (colorPick === 'rainbow') {
    var rainbow = true;
    var dynamicColor = new RGBColor('rgb(255,255,255)');
    lineColor = dynamicColor.toHex();
    console.log(`Rainbow mode activated!`);
} else {
    var rainbow = false;
    var staticColor = new RGBColor(colorPick).toHex();
    var lineColor = staticColor;
}
var lineColor = lineColor
var xColor = lineColor;
var yColor = lineColor;

var ctx = document.getElementById('myChart');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            pointRadius: 0,
            backgroundColor: [
                'rgba(255, 99, 132, 0.0)'
            ],
            borderColor: [
                lineColor
            ],
            borderWidth: 3
        }],
        /*
            {
                pointRadius: 0,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.0)'
                ],
                borderColor: [
                    lineColor
                ],
                borderWidth: 3
            }
        ],
        */
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 10
        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                ticks: {
                    padding: 4,
                    fontColor: xColor,
                    fontFamily: 'Lucida Console',
                    fontSize: 0,
                    beginAtZero: true,
                    min: 0
                },
                gridLines: [{
                    drawTicks: true,
                    display: false
                }],
            }],
            yAxes: [{
                ticks: {
                    max: 100,
                    fontColor: yColor,
                    fontFamily: 'Lucida Console',
                    fontSize: 20
                }
            }]
        }
    }
});