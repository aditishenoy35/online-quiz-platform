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
      if (isCorrect) totalScore += 10; // Add to score for each correct answer
      return { ...response, isCorrect };
    });

    // Save to the Response model (without saving it in a variable)
    const savedResponse = await Response.create({
      user: userId,
      quiz: quizId,
      responses: formattedResponses,
      score: totalScore,
    });

    // Return the responseId along with the score
    res.status(201).json({ message: "Responses saved", score: totalScore, responseId: savedResponse._id });
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

// Fetch the quiz result for a specific response (user's quiz submission)
exports.getQuizResults = async (req, res) => {
  const { responseId } = req.params; // Assume responseId is passed in the URL to fetch a specific response
  try {
    // Find the response by ID and populate the quiz details and question options
    const response = await Response.findById(responseId)
      .populate({
        path: 'quiz',
        select: 'title questions', // Populate quiz title and questions
        populate: {
          path: 'questions.options', // Populate options for each question
          select: 'text isCorrect' // Get text and correct answer flag
        }
      })
      .lean();

    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }

    // Calculate the user's score and track correct and incorrect answers
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    const correctResponses = [];
    const incorrectResponses = [];

    response.responses.forEach((userResponse, index) => {
      const question = response.quiz.questions[index]; // Get the corresponding question
      const selectedOption = question.options.find(option => option.text === userResponse.selectedOption);
      
      if (selectedOption && selectedOption.isCorrect) {
        correctAnswers++;
        correctResponses.push({
          questionText: question.text,
          selectedOption: userResponse.selectedOption,
        });
      } else {
        incorrectAnswers++;
        incorrectResponses.push({
          questionText: question.text,
          selectedOption: userResponse.selectedOption,
        });
      }
    });

    // Calculate percentage score
    const totalQuestions = response.quiz.questions.length;
    const scorePercentage = (correctAnswers / totalQuestions) * 100;

    // Prepare the response data
    const result = {
      score: response.score,
      correctResponses,
      incorrectResponses,
      scorePercentage: scorePercentage.toFixed(2),
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ message: 'Error fetching quiz results' });
  }
};




