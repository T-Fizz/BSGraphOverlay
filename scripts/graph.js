let socket;

const graph = (() => {
    var main = document.getElementById('chartContainer');
    var numberOfTimes = 0;

    const performance = (() => {
        var score = document.getElementById('score');
        var percentAcc;
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
        var times = [];
        var start;
        var duration;
        var display;

        function format(time) {
            var minutes = Math.floor(time / 60);
            var seconds = Math.round(time % 60);
            return (seconds > 10) ? `${minutes}:${seconds}` : `${minutes}:0${seconds}`;
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
                if (myChart.data.labels[myChart.data.labels.length - 1] !== format(display)) {
                    times.push(format(display));
                    myChart.data.labels = times;
                    myChart.update();
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
        var mapper = document.getElementById('mapper');
        var difficulty = document.getElementById('difficulty');
        return (data, time) => {
            if (data.diffculty === "ExpertPlus") {
                data.diffculty = "Expert+";
            }
            title.innerHTML = data.songName;
            mapper.innerHTML = data.songSubName;
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
        beatmap
    }
})();

var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        //labels: [],
        datasets: [{
            //data: [],
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
                    min: 0
                },
                gridLines: [{
                    drawTicks: true,
                    display: false
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