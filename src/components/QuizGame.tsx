import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Trophy, Medal, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import idiom images (adjust import paths as needed)
import idiomSmallFish from "@/assets/idiom-small-fish-big-whale.jpg";
import idiomMoonWater from "@/assets/idiom-moon-in-water.jpg";
import idiomCrowPeacock from "@/assets/idiom-crow-peacock.jpg";
import idiomEmptyVessel from "@/assets/idiom-empty-vessel.jpg";

interface QuizQuestion {
  id: number;
  image: string;
  correctAnswer: string;
  options: string[];
  explanation?: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    image: idiomSmallFish,
    correctAnswer: "ଛୋଟ ମାଛ ବଡ଼ ଦରିଆ (Small fish, big ocean)",
    options: [
      "ଛୋଟ ମାଛ ବଡ଼ ଦରିଆ (Small fish, big ocean)",
      "ବଡ଼ ମାଛ ଛୋଟ ପୁଷ୍କରିଣୀ (Big fish, small pond)",
      "ମାଛ ବିନା ତରକାରୀ (Curry without fish)",
      "ଦରିଆ ମଧ୍ୟରେ ତୃଷା (Thirsty in the ocean)",
    ],
  },
  {
    id: 2,
    image: idiomMoonWater,
    correctAnswer: "ଜଳରେ ଚନ୍ଦ୍ର ଧରିବା (Catching moon in water)",
    options: [
      "ଆକାଶର ତାରା ଗଣିବା (Counting stars in sky)",
      "ଜଳରେ ଚନ୍ଦ୍ର ଧରିବା (Catching moon in water)",
      "ଚନ୍ଦ୍ର ସହିତ କଥା (Talking to the moon)",
      "ରାତିରେ ସୂର୍ଯ୍ୟ ଖୋଜିବା (Finding sun at night)",
    ],
  },
  {
    id: 3,
    image: idiomCrowPeacock,
    correctAnswer: "କାଉଁରି ମୟୂର ହେବାକୁ ଚାହେଁ (Crow wanting to be peacock)",
    options: [
      "ମୟୂର ନୃତ୍ୟ (Peacock dance)",
      "କାଉଁରି ମୟୂର ହେବାକୁ ଚାହେଁ (Crow wanting to be peacock)",
      "ପକ୍ଷୀମାନଙ୍କ ରାଜା (King of birds)",
      "ରଙ୍ଗିନ ପର (Colorful feathers)",
    ],
  },
  {
    id: 4,
    image: idiomEmptyVessel,
    correctAnswer: "ଖାଲି ଘଟ ଅଧିକ ଶବ୍ଦ କରେ (Empty pot makes more noise)",
    options: [
      "ଭରା ଘଟ ନୀରବ (Full pot is silent)",
      "ଖାଲି ଘଟ ଅଧିକ ଶବ୍ଦ କରେ (Empty pot makes more noise)",
      "ଘଟର ମୂଲ୍ୟ (Value of the pot)",
      "ଜଳ ବିନା ଘଟ (Pot without water)",
    ],
  },
];

function QuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );
  const { toast } = useToast();

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple selections

    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === quizQuestions[currentQuestion].correctAnswer;
    const points = isCorrect ? 10 : -5;

    setScore((prev) => prev + points);
    setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion));

    toast({
      title: isCorrect ? "Correct! ✅" : "Incorrect ❌",
      description: isCorrect
        ? `+10 points! Great job!`
        : `Correct answer: ${quizQuestions[currentQuestion].correctAnswer}`,
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  const getBadge = (score: number, totalQuestions: number) => {
    const percentage = (score / (totalQuestions * 10)) * 100;
    if (percentage >= 80)
      return { type: "gold", icon: Trophy, label: "Gold Medal!" };
    if (percentage >= 60)
      return { type: "silver", icon: Medal, label: "Silver Medal!" };
    return { type: "bronze", icon: Award, label: "Bronze Medal!" };
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setAnsweredQuestions(new Set());
  };

  if (gameComplete) {
    const badge = getBadge(score, quizQuestions.length);
    const BadgeIcon = badge.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-green-100 p-4">
        <Card className="w-full max-w-md p-8 text-center rounded-xl shadow-lg animate-bounce-in">
          <div className="space-y-6">
            <div
              className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${
                badge.type === "gold"
                  ? "bg-yellow-400"
                  : badge.type === "silver"
                  ? "bg-gray-400"
                  : "bg-amber-700"
              }`}
            >
              <BadgeIcon className="w-10 h-10 text-white" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
              <Badge
                variant="secondary"
                className={`text-lg px-4 py-2 ${
                  badge.type === "gold"
                    ? "bg-yellow-400 text-white"
                    : badge.type === "silver"
                    ? "bg-gray-400 text-white"
                    : "bg-amber-700 text-white"
                }`}
              >
                {badge.label}
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-xl font-semibold">Final Score: {score} points</p>
              <p className="text-gray-600">
                You answered {answeredQuestions.size} out of {quizQuestions.length} questions
              </p>
            </div>

            <Button
              onClick={restartQuiz}
              className="w-full bg-gradient-to-r from-sky-400 to-green-400 hover:scale-105 transition-transform font-semibold"
              size="lg"
            >
              Play Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-green-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🎯 Odia Idiom Picture Match</h1>
          <div className="flex justify-center items-center gap-6 text-gray-900">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">Score: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-3" />
        </div>

        {/* Quiz Card */}
        <Card className="p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
          {/* Question Image */}
          <div className="mb-6">
            <div className="relative overflow-hidden rounded-lg bg-white shadow">
              <img
                src={currentQ.image}
                alt="Idiom illustration"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6 text-center">
            <p className="text-lg font-medium text-gray-700">
              Which Odia idiom does this picture represent?
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full p-4 h-auto text-left flex items-center gap-3 font-medium rounded-lg border transition
                ${
                  selectedAnswer === option
                    ? option === currentQ.correctAnswer
                      ? "bg-green-100 border-green-500 text-green-700 shadow-lg"
                      : "bg-red-100 border-red-500 text-red-700 line-through"
                    : showResult && option === currentQ.correctAnswer
                    ? "bg-green-100 border-green-500 text-green-700"
                    : "hover:bg-blue-50 hover:text-blue-800"
                }`}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
              >
                <div className="flex items-center gap-3">
                  {showResult && (
                    selectedAnswer === option ? (
                      option === currentQ.correctAnswer ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
                      )
                    ) : option === currentQ.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
                    ) : null
                  )}
                  <span className="text-sm md:text-base">{option}</span>
                </div>
              </Button>
            ))}
          </div>

          {/* Next Button */}
          {showResult && (
            <div className="text-center">
              <Button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-sky-400 to-green-400 hover:scale-105 transition-transform font-semibold"
                size="lg"
              >
                {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "View Results"}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default QuizGame;