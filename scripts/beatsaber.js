const events = {
    hello(data) {
        document.getElementById('player').innerHTML = graph.player;
        console.log(`Beat Saber (${data.game.gameVersion}) is connected!`);
    },
    songStart(data, time) {
        console.log(data);
        graph.clear();
        graph.beatmap(data.beatmap, time);
        console.log(graph.performance);
        //graph.timer.push();
        graph.performance.update(data.performance);
        graph.timer.push();
        graph.show();
    },

    finish(data, time) {
        //graph.timer.push();
        graph.performance.update(data.performance);
        graph.timer.push();
    },

    noteCut(data, time) {
        //graph.timer.push();
        graph.performance.update(data.performance);
        graph.timer.push();
    },

    noteFullyCut(data, time) {
        //graph.timer.push();
        graph.performance.update(data.performance);
        graph.timer.push();
    },

    obstacleEnter(data, time) {
        //graph.timer.push();
        graph.performance.update(data.performance);
        graph.timer.push();
    },

    noteMissed(data, time) {
        //graph.timer.push();
        graph.performance.update(data.performance);
        graph.timer.push();
    },

    bombCut(data, time) {
        //graph.timer.push();
        graph.performance.update(data.performance);
        graph.timer.push();
    },

    pause(data, time) {
        graph.timer.pause(data.beatmap.paused + (Date.now() - time));
        console.log(myChart);
    },

    resume(data, time) {
        graph.timer.start(data.beatmap.start + (Date.now() - time), data.beatmap.length);
    },

    menu() {
        graph.timer.stop();
        graph.performance.clear();
    }
};