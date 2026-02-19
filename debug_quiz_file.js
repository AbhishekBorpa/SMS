const fs = require('fs');
try {
    const controller = require('./src/controllers/quizController');
    fs.writeFileSync('backend/debug_output.txt', 'Exports: ' + Object.keys(controller).join(', ') + '\ngetAvailableQuizzes type: ' + typeof controller.getAvailableQuizzes);
} catch (e) {
    fs.writeFileSync('backend/debug_output.txt', 'Error loading controller: ' + e.message + '\n' + e.stack);
}
