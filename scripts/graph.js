let socket;

const graph = (() => {
    var accs = [];
    var minutes = [];
    var seconds = [];
    var times = [];

    var main = document.getElementById('chartContainer');
    var ctx = document.getElementById('myChart');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: this.performance.times,
            datasets: [{
                data: this.performance.accs,
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
                        max: this.performance.times ? 0 : this.performance.times[times.length - 1],
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

    const performance = (() => {
        var score = document.getElementById('score');
        var accs = [1, 2, 3]
        var times = [1, 2, 3];

        function updateChart() {
            accs.push((data.currentMaxScore > 0) ? (data.score / data.currentMaxScore) * 100 : 100);
            times.push(format(Date.now() - time));
        }
        return (data) => {
            totalScore = data.score;
            score.innerHTML = `Score: ${totalScore}`;
        }
    })();

    const timer = (() => {
        var active = false;
        var start;
        var end;
        var duration;
        var display;

        function format(time) {
            var minutes = Math.floor(seconds / 60);
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
            start(time, length) {
                active = true;
                start = time;
                duration = length;
                loop();
            },

            pause(time) {
                active = false;
                date(time);
            },

            stop() {
                active = false;
                start = undefined;
                duration = undefined;
            }
        }
    })();
    const beatmap = (() => {
        var title = document.getElementById('chartTitle');
        var subtitle = document.getElementById('mapper');
        var difficulty = document.getElementById('difficulty');
        return (data, time) => {
            if (data.diffculty === "ExpertPlus") { data.diffculty = "Expert+ "; }
            title.innerHTML = data.songName;
            subtitle.innerHTML = data.songSubName;
            difficulty.innerHTML = data.diffculty;
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