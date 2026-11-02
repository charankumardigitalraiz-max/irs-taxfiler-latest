import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const PersonalizedRecommendationBanner = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "How do you feel about filing your taxes this year?",
      options: [
        { id: 'self', text: "I want to do it myself", icon: DocumentTextIcon },
        { id: 'review', text: "I want an expert to help and review", icon: UserGroupIcon },
        { id: 'full', text: "I want someone to do taxes for me", icon: CheckCircleIcon },
        { id: 'unsure', text: "I'm not sure", icon: DocumentTextIcon },
      ],
    },
    {
      id: 2,
      question: "What's your tax situation complexity?",
      options: [
        { id: 'simple', text: "Simple - W-2 income only", icon: DocumentTextIcon },
        { id: 'moderate', text: "Moderate - Some deductions/credits", icon: DocumentTextIcon },
        { id: 'complex', text: "Complex - Multiple income sources, investments", icon: DocumentTextIcon },
        { id: 'very-complex', text: "Very Complex - Business, international, etc.", icon: DocumentTextIcon },
      ],
    },
    {
      id: 3,
      question: "What's most important to you?",
      options: [
        { id: 'speed', text: "Fast processing and filing", icon: DocumentTextIcon },
        { id: 'accuracy', text: "Maximum accuracy and compliance", icon: CheckCircleIcon },
        { id: 'savings', text: "Maximizing refunds and savings", icon: DocumentTextIcon },
        { id: 'support', text: "Expert guidance and support", icon: UserGroupIcon },
      ],
    },
  ];

  const handleAnswerSelect = (optionId) => {
    setSelectedAnswer(optionId);
    setAnswers({ ...answers, [currentQuestion]: optionId });
  };

  const handleContinue = () => {
    if (selectedAnswer) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // All questions answered, redirect to contact or show results
        window.location.href = '/contact';
      }
    }
  };

  const handleSkip = () => {
    window.location.href = '/contact';
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Image */}
            <div className="relative h-full min-h-[500px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hidden lg:block">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop')] bg-cover bg-center opacity-90"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/80 via-purple-600/80 to-pink-600/80"></div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-12 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 mx-auto">
                    <DocumentTextIcon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Get Personalized Tax Help</h3>
                  <p className="text-lg text-white/90">
                    Answer a few questions and we'll recommend the best tax filing solution for your needs.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 lg:p-12">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Get a personalized recommendation
                  </h2>
                </div>
                <button
                  onClick={handleSkip}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                  ></motion.div>
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-8">
                    {questions[currentQuestion].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3 mb-8">
                    {questions[currentQuestion].options.map((option) => {
                      const Icon = option.icon;
                      const isSelected = selectedAnswer === option.id;
                      return (
                        <motion.button
                          key={option.id}
                          onClick={() => handleAnswerSelect(option.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                            isSelected
                              ? 'border-indigo-500 bg-indigo-50 shadow-md'
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                isSelected
                                  ? 'bg-indigo-500 text-white'
                                  : 'bg-gray-100 text-gray-600'
                              } transition-colors`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <span
                              className={`font-medium ${
                                isSelected ? 'text-indigo-900' : 'text-gray-700'
                              }`}
                            >
                              {option.text}
                            </span>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="ml-auto"
                              >
                                <CheckCircleIcon className="h-6 w-6 text-indigo-500" />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Continue Button */}
              <motion.button
                onClick={handleContinue}
                disabled={!selectedAnswer}
                whileHover={selectedAnswer ? { scale: 1.02 } : {}}
                whileTap={selectedAnswer ? { scale: 0.98 } : {}}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  selectedAnswer
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>
                  {currentQuestion < questions.length - 1 ? 'Continue' : 'Get My Recommendation'}
                </span>
                <ArrowRightIcon className="h-5 w-5" />
              </motion.button>

              {/* Skip Link */}
              <div className="mt-4 text-center">
                <button
                  onClick={handleSkip}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Skip and browse services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedRecommendationBanner;

