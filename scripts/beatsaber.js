const events = {
    hello(data) {
        document.getElementById('player').innerHTML = 'TFizz';
        console.log(`Beat Saber (${data.game.gameVersion}) is connected!`);
        console.log(name);
    },
    songStart(data, time) {
        console.log(data);
        graph.beatmap(data.beatmap, time);
        console.log(graph.performance);
        graph.performance.update(data.performance);
        console.log(graph.timer.push());
        graph.timer.push()
        graph.show();
    },

    finish(data, time) {
        console.log(graph.performance);
        graph.performance.update(data.performance);
        graph.timer.push();
    },

    noteCut(data, time) {
        console.log(graph.performance);
        graph.performance.update(data.performance);
        graph.timer.push();
        console.log(`Arrays outside:`);
        console.log(graph.timer.times);
        console.log(graph.performance.accs);
        console.log(`End`);
    },

    noteFullyCut(data, time) {
        graph.performance.update(data.performance);
        graph.timer.push();
        console.log(`Arrays outside:`);
        console.log(graph.timer.times);
        console.log(graph.performance.accs);
        console.log(`End`);
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