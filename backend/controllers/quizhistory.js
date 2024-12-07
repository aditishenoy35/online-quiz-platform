const Quiz = require('../models/Quiz');
const Response = require('../models/Response');

exports.getUserQuizHistory = async (req, res) => {
  const { userId } = req.params; // Extract userId from URL
  try {
    // Fetch quizzes created by the user
    const createdQuizzes = await Quiz.find({ createdBy: userId }).select(
      'title description category difficulty'
    );

    // Fetch responses by the user, including quiz details
    const answeredQuizzes = await Response.find({ user: userId })
      .populate('quiz', 'title description category difficulty') // Populate quiz details
      .select('quiz score submittedAt'); // Include only necessary fields

    res.status(200).json({ createdQuizzes, answeredQuizzes });
  } catch (error) {
    console.error('Error fetching user quiz history:', error.message);
    res.status(500).json({ message: 'Error fetching user quiz history' });
  }
};

// Function to delete a quiz created by the user
exports.deleteUserQuiz = async (req, res) => {
  const { userId, quizId } = req.params; // Extract userId and quizId from URL
  console.log('Received userId:', userId); // Log userId
  console.log('Received quizId:', quizId);
  try {
    // Verify if the quiz belongs to the user
    const quiz = await Quiz.findOne({ _id: quizId, createdBy: userId });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found or unauthorized' });
    }

    // Delete the quiz
    await Quiz.deleteOne({ _id: quizId });
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error.message);
    res.status(500).json({ message: 'Error deleting quiz' });
  }
};

exports.getQuizWithResponses = async (req, res) => {
  const { responseId } = req.params; // Assume responseId is passed as a parameter

  try {
    // Fetch the response document
    const responseDoc = await Response.findById(responseId).populate('quiz');
    if (!responseDoc) {
      return res.status(404).json({ message: 'Response not found' });
    }

    // Fetch the related quiz document
    const quiz = await Quiz.findById(responseDoc.quiz._id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Combine quiz data with user responses
    const mergedData = quiz.questions.map((question) => {
      const userResponse = responseDoc.responses.find(
        (resp) => resp.questionId.toString() === question._id.toString()
      );
      return {
        questionText: question.text,
        options: question.options.map((option) => ({
          text: option.text,
          isCorrect: option.isCorrect,
        })),
        selectedOption: userResponse ? userResponse.selectedOption : null,
        isCorrect: userResponse ? userResponse.isCorrect : null,
      };
    });

    res.status(200).json({
      quizTitle: quiz.title,
      quizDescription: quiz.description,
      mergedData,
    });
  } catch (error) {
    console.error('Error fetching quiz with responses:', error.message);
    res.status(500).json({ message: 'Error fetching quiz with responses' });
  }
};
