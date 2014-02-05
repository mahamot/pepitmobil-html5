p1.divers.trajet.Module = function (e) {

// public methods
    this.buildExercisePresentation = function (div) {
        div.css({
            'text-align': 'center',
            'font-size': '20px',
            'color': '#ffffff'
        });

// sm, md and lg devices
        var title_sm_md_lg = $('<div/>', {
            html: '<h1>Trajet</h1><br><h3>Décrire un déplacement</h3>',
            class: 'visible-sm visible-md visible-lg'
        });
        title_sm_md_lg.appendTo(div);

// xs devices
        var title_xs = $('<div/>', {
            html: '<h3>Trajet</h3><br><h5>Décrire un déplacement</h5>',
            class: 'visible-xs'
        });
        title_xs.appendTo(div);

        var image = $('<img/>', {
            style: 'width: 80%',
            src: 'exercises/p1/divers/trajet/img/example2.png'
        });

        image.appendTo(div);
    };

    this.buildExplanation = function (div, currentExercise) {
        div.css({
            'text-align': 'center',
            'font-size': '20px',
            'color': '#ffffff'
        });
// sm, md and lg devices
        var title_sm_md_lg = $('<div/>', {
            html: '',
            class: 'visible-sm visible-md visible-lg'
        });
        title_sm_md_lg.appendTo(div);

// xs devices
        var title_xs = $('<div/>', {
            html: '',
            class: 'visible-xs'
        });
        title_xs.appendTo(div);

        var image = $('<img/>', {
            style: 'width: 80%',
            src: 'exercises/p1/divers/trajet/img/example.png'
        });

        image.appendTo(div);
    };

    this.buildQuestion = function (div, currentExercise, currentModule) {
        if (currentExercise == 1) {
            view = new p1.divers.trajet.View(this, div, 10, 5, 10, 10);
        } else if (currentExercise == 2) {
            view = new p1.divers.trajet.View(this, div, 15, 10, 15, 15);
        } else if (currentExercise == 3) {
            view = new p1.divers.trajet.View(this, div, 20, 15, 20, 20);
        } else if (currentExercise == 4) {
            view = new p1.divers.trajet.View(this, div, 25, 20, 25, 25);
        } else if (currentExercise == 5) {
            view = new p1.divers.trajet.View(this, div, 30, 25, 30, 30);
        }
        questionIndex = 1;
        currentScore = this.getQuestionScore(currentExercise, currentModule);
    };

    this.error = function () {
        if (currentScore > 0) {
            --currentScore;
        }
    };

    this.finishModule = function (currentExercise, currentModule) {
        return questionIndex == this.getQuestionNumber(currentExercise, currentModule);
    };

    this.getExerciseList = function () {
        return {
            title: ["Exercice 1", "Exercice 2", "Exercice 3", "Exercice 4", "Exercice 5"],
            subTitle: ["Grilles de 10 x 5", "Grilles de 15 x 10", "Grilles de 20 x 15",
                "Grilles de 25 x 20", "Grilles de 30 x 25"]
        };
    };

    this.getGoodResponseMessage = function () {
        return 'Bonne réponse !';
    };

    this.getLevel = function () {
        return 'p1';
    };

    this.getModuleList = function (currentExercise) {
        return {
            title: ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"],
            subTitle: ["1 question", "1 question", "1 question", "1 question", "1 question"]
        };
    };

    this.getName = function () {
        return 'Décrire un déplacement';
    };

    this.getNextQuestionButtonText = function () {
        return 'Suivante';
    };

    this.getQuestionNumber = function (currentExercise, currentModule) {
        return 2;
    };

    this.getQuestionScore = function (currentExercise, currentModule) {
        return 55.56;  // total = 55.56 * 3 exercises * 3 modules * 2 questions = 1000 pts
    };

    this.getScore = function () {
        return currentScore;
    };

    this.getSubject = function () {
        return 'divers';
    };

    this.getTopic = function () {
        return 'trajet';
    };

    this.getWrongResponseMessage = function () {
        return 'Mauvaise réponse';
    };

    this.initScore = function () {
        return new Score([
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]
        ]);
    };

    this.next = function () {
        engine.next();
    };

    this.nextQuestion = function (currentExercise, currentModule) {
        questionIndex++;
        if (questionIndex <= this.getQuestionNumber(currentExercise, currentModule)) {
            currentScore = this.getQuestionScore(currentExercise, currentModule);
            view.next();
        }
    };

// private methods
    var init = function (e) {
        engine = e;
    };

// private attributes
    var view;
    var engine;

    var questionIndex;
    var currentScore;

    init(e);
};