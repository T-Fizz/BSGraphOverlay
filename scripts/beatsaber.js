const events = {
    hello(data) {
        document.getElementById('player').innerHTML = 'TFizz';
        console.log(`Beat Saber (${data.game.gameVersion}) is connected!`);
        console.log(name);
    },
    songStart(data, time) {
        setBeatmapInfo(data.beatmap);
        graph.beatmap(data.beatmap, time);
        graph.performance(data.performance);
        graph.show();
    },

    finish(data, time) {
        graph.performance(data.performance);
    },

    noteCut(data, time) { graph.performance(data.performance); },
    noteFullyCut(data, time) { graph.performance(data.performance); },
    obstacleEnter(data, time) { graph.performance(data.performance); },
    noteMissed(data, time) { graph.performance(data.performance); },
    bombCut(data, time) { graph.performance(data.performance); },

    pause(data, time) {
        graph.timer.pause(data.beatmap.paused + (Date.now() - time));
    },

    resume(data, time) {
        graph.timer.start(data.beatmap.start + (Date.now() - time), data.beatmap.length);
    },

    menu() {
        graph.timer.stop();
    }
};