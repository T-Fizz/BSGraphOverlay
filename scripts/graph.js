let socket;

const graph = (() => {
    var main = document.getElementById('chartContainer');

    const performance = (() => {
        var score = document.getElementById('score');
        var accs = [];

        return {
            update(data) {
                totalScore = data.score;
                accs.push((score !== 0) ? (data.score / data.currentMaxScore) : 100);
                accs;
                score.innerHTML = `Score: ${totalScore}`;
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
            var seconds = time % 60;
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
            push() {
                console.log(display);
                times.push(format(display))
                console.log(format(display))
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
        labels: graph.timer.times,
        datasets: [{
            data: graph.performance.accs,
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
                    max: (graph.performance.times === undefined) ? 0 : graph.performance.times[times.length - 1],
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