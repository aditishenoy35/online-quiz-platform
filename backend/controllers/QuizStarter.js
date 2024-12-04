const Quiz = require('../models/Quiz');
const Response = require('../models/Response');

exports.startQuiz = async (req, res) => {
  try {
      const { quizId } = req.body;

      const quiz = await Quiz.findById(quizId);
      if (!quiz) return res.status(404).json({ error: "Quiz not found" });

      res.status(200).json({ quiz });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.storeResponses = async (req, res) => {
  try {
    const { userId, quizId, responses } = req.body;

    let totalScore = 0;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    // Check correctness and calculate score
    const formattedResponses = responses.map((response) => {
      const question = quiz.questions.id(response.questionId);
      const isCorrect = question.options.some(
        (option) => option.text === response.selectedOption && option.isCorrect
      );
      if (isCorrect) totalScore += 1; // Add to score for each correct answer
      return { ...response, isCorrect };
    });

    // Save to the Response model (without saving it in a variable)
    await Response.create({
      user: userId,
      quiz: quizId,
      responses: formattedResponses,
      score: totalScore,
    });

    res.status(201).json({ message: "Responses saved", score: totalScore });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getNumberOfQuestions = async (req, res) => {
  try {
      const { quizId } = req.params;
      const quiz = await Quiz.findById(quizId);

      if (!quiz) return res.status(404).json({ error: "Quiz not found" });

      const numberOfQuestions = quiz.questions.length;
      res.status(200).json({ numberOfQuestions });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};




