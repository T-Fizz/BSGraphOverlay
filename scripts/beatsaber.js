const events = {
    hello(data) {
        document.getElementById('player').innerHTML = 'TFizz';
        console.log(`Beat Saber (${data.game.gameVersion}) is connected!`);
        console.log(name);
    },
    songStart(data, time) {
        console.log(data);
        graph.beatmap(data.beatmap, time);
        graph.performance.update(data.performance);
        console.log(graph.timer.push());
        graph.timer.push()
        graph.show();
    },

    finish(data, time) {
        graph.performance.update(data.performance);
        graph.timer.push();
    },

    noteCut(data, time) {
        graph.performance.update(data.performance);
        graph.timer.push();
    },

    noteFullyCut(data, time) {
        graph.performance.update(data.performance);
        graph.timer.push();
    },

    obstacleEnter(data, time) {
        graph.performance.update(data.performance);
        graph.timer.push();
    },

    noteMissed(data, time) {
        graph.performance.update(data.performance);
        graph.timer.push();
    },

    bombCut(data, time) {
        graph.performance.update(data.performance);
        graph.timer.push();
    },

    pause(data, time) {
        graph.timer.pause(data.beatmap.paused + (Date.now() - time));
    },

    resume(data, time) {
        graph.timer.start(data.beatmap.start + (Date.now() - time), data.beatmap.length);
    },

    menu() {
        graph.timer.stop();
        graph.performance.clear();
    }
};
s