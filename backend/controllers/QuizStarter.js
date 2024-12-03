const Quiz = require('../models/Quiz');
const Response = require('../models/Response');

let activeQuizSessions = {}; // Structure: { userId-quizId: { startTime: <timestamp>, responses: [] } };

// Start quiz
exports.startQuiz = async (req, res) => {
  const { userId } = req.body; // Assuming userId comes from the request
  const quizId = req.params.id;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    // Initialize a session with a start time and empty responses
    activeQuizSessions[`${userId}-${quizId}`] = {
      startTime: Date.now(),
      responses: [],
      totalTime: quiz.questions.length * 30, // Total quiz duration in seconds
    };

    res.status(200).json({
      message: 'Quiz started',
      totalTime: quiz.questions.length * 30, // Total time for the quiz
      quiz,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Submit a response
exports.submitResponse = async (req, res) => {
  const { userId, questionId, selectedOption } = req.body;
  const quizId = req.params.id;

  try {
    const quizSession = activeQuizSessions[`${userId}-${quizId}`];
    if (!quizSession) return res.status(400).json({ error: 'Quiz session not found' });

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const question = quiz.questions.find((q) => q._id.toString() === questionId);
    if (!question) return res.status(404).json({ error: 'Question not found' });

    // Check if the selected option is correct
    const correctOption = question.options.find((opt) => opt.isCorrect);
    const isCorrect = correctOption.text === selectedOption;

    // Store response in session
    quizSession.responses.push({
      questionId,
      selectedOption,
      isCorrect,
    });

    res.status(200).json({ message: 'Response recorded', isCorrect });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// End quiz and save responses
exports.endQuiz = async (req, res) => {
  const { userId } = req.body;
  const quizId = req.params.id;

  try {
    const quizSession = activeQuizSessions[`${userId}-${quizId}`];
    if (!quizSession) return res.status(400).json({ error: 'Quiz session not found' });

    const { responses } = quizSession;

    // Calculate total score
    const score = responses.filter((resp) => resp.isCorrect).length;

    // Save to database
    const responseDoc = new Response({
      user: userId,
      quiz: quizId,
      responses,
      score,
    });
    await responseDoc.save();

    // Clean up in-memory session
    delete activeQuizSessions[`${userId}-${quizId}`];

    res.status(200).json({ message: 'Quiz completed', score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
