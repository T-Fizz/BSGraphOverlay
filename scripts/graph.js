let socket;

const graph = (() => {
    var main = document.getElementById('chartContainer');
    var numberOfAccs = 0;
    var numberOfTimes = 0;
    //var player = prompt('Enter your in game name', 'TFizz')

    const hueShift = (() => {
        var rainbowCycle;
        var frequency = .05;
        var step = 0;

        var r = 255;
        var g = 255;
        var b = 255;

        var min = 70;
        var max = 100;

        var percentGradient = new Rainbow();
        percentGradient.setSpectrum('#ff0000', '#ffff00', '#00ff00', '#00ffff');
        percentGradient.setNumberRange(min, max);

        function percentHues(percent) {
            //var percentColor = new RGBColor(percentGradient.colourAt(Math.round(percent)));
            console.log(`Percent: ${percent}, Color: ${percentGradient.colourAt(percent)}!`);
            if (percent < min) { return percentGradient.colourAt(Math.round(min)); } else { return percentGradient.colourAt(Math.round(percent)); }
        }

        function rainbowHues() {
            if (step < 10000) {
                var i = step;
            } else {
                var i = 0;
            }
            r = Math.sin(frequency * i + 0) * 127 + 128;
            g = Math.sin(frequency * i + 2) * 127 + 128;
            b = Math.sin(frequency * i + 4) * 127 + 128;
            step = i + 1;
            return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
        }
        return {
            rainbowHues,
            percentHues,
            //myChart.data.datasets[0].borderColor = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
        }
        //myChart.options.scales.xAxes[0].ticks.fontColor = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
        //myChart.options.scales.yAxes[0].ticks.fontColor = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
        //console.log(`After color change`);
    })();

    const performance = (() => {
        var score = document.getElementById('score');
        //var isFirstHit = true;
        var percentAcc;
        var notesMissed = 0;
        var accs = [];

        return {
            update(data) {
                //if (accs.length < numberOfTimes + 1) {
                percentAcc = data.score / data.currentMaxScore * 100;
                if (data.currentMaxScore >= 440) {
                    percentAcc = data.score / data.currentMaxScore * 100;
                    accs.push(percentAcc);
                    numberOfAccs++;
                    myChart.data.datasets[0].data = accs;
                    if (percentMap) {
                        console.log(hueShift.percentHues(percentAcc));
                        percentColor = `#${hueShift.percentHues(percentAcc)}`
                        myChart.data.datasets[0].borderColor = percentColor;
                        myChart.options.scales.xAxes[0].ticks.fontColor = percentColor;
                        myChart.options.scales.yAxes[0].ticks.fontColor = percentColor;
                    }
                }
                myChart.update();
                //}
                totalScore = data.score;
                //console.log(accs);
                console.log(myChart.data.datasets[0].data);
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
        var rainbowInterval = 100;
        var active = false;
        var cycleColor;
        //var round = limitAsk;
        var times = [];
        var start;
        //var duration;
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
            if (active && rainbow) {
                var cycleColor = hueShift.rainbowHues()
                myChart.data.datasets[0].borderColor = cycleColor;
                //myChart.options.scales.xAxes[0].ticks.fontColor = cycleColor;
                //myChart.options.scales.yAxes[0].ticks.fontColor = cycleColor;
                myChart.update();
            }
        }

        function loop() {
            if (active) {
                update();
                requestAnimationFrame(loop);
            }
        }

        return {
            times,
            clear() {
                times = [];
            },
            push() {
                /*
                //round off time and pushs at most once each second
                if (times[times - 1] !== format(display) && round) {
                    times.push(format(display));
                    myChart.data.labels = times;
                    myChart.update();
                    numberOfTimes++;
                */
                //} else 
                if (times.length < numberOfAccs) { //don't round off and don't limit push rate
                    times.push(display);
                    myChart.data.labels = times;
                    myChart.options.scales.xAxes[0].ticks.max = times[times.length - 1];
                    //numberOfTimes++;
                }
                //console.log(times);
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
        player,
    }
})();

var defaultColor = 'white';
var limitAsk = false; //confirm(`Do you want to limit the graphing rate?\n(if no press cancel)`);
var colorPick = prompt(`Please enter a color you would like your graph to be`, 'white');
var colorPicked = new RGBColor(colorPick);
do {
    var wantsBorder = prompt(`Do you want a border around the graph?\nEnter "yes" or "no"`, 'no');
} while (wantsBorder != 'yes' && wantsBorder != null && wantsBorder != 'no');
if (wantsBorder === 'yes') {
    document.getElementById('chart').style.border = `2px solid ${colorPicked.toHex()}`
}



if (colorPick === 'rainbow') {
    var rainbow = true;
    var percentMap = false;
    var color = '#ffffff';
    console.log(`Rainbow mode activated!`);

} else if (colorPick === 'percent') {
    var rainbow = false;
    var percentMap = true;
    var color = '#ffffff';
    console.log(`Percent mode activated!`);
} else if (!colorPicked.ok) {
    delete colorPicked;
    var colorPicked = new RGBColor('white');
    var rainbow = false;
    var percentMap = false;
    var color = defaultColor;
} else {
    var rainbow = false;
    var percentMap = false;
    var color = colorPicked.toHex();
}

var lineColor = color;
var xColor = lineColor;
var yColor = lineColor;

var maxX = (graph.timer.times.length < 1 || graph.timer.times == undefined) ? 0 : graph.timer.times[graph.timer.times.length - 1];

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
            borderWidth: 3,
            lineTension: 0.3,
            spanGaps: true
        }],
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
                //type: 'linear',
                ticks: {
                    padding: 4,
                    fontColor: xColor,
                    fontFamily: 'Lucida Console',
                    fontSize: 0,
                    beginAtZero: true,
                    min: 0,
                    max: maxX
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
                    fontSize: 24
                }
            }]
        }
    }
});