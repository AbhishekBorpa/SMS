const controller = require('./src/controllers/quizController');
console.log('Controller Exports:', Object.keys(controller));
console.log('getAvailableQuizzes type:', typeof controller.getAvailableQuizzes);
console.log('createQuiz type:', typeof controller.createQuiz);
