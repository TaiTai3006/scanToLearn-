import { View, Text, StyleSheet,TouchableOpacity,Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState, useEffect } from "react";
import { RadioButton } from "react-native-paper";
import { Switch, TextInput } from "react-native-gesture-handler";
const sampleQuestions = [
    {
      type: "trueFalse",
      question: "React Native is a framework for building mobile applications.",
      answer: true,
    },
    {
      type: "multipleChoice",
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      type: "fillInTheBlank",
      question: "JavaScript is a _______-side programming language.",
      answer: "client",
    },
  ];
  const getRandomQuestionType = () => {
    const questionTypes = ["trueFalse", "multipleChoice", "fillInTheBlank"];
    const randomIndex = Math.floor(Math.random() * questionTypes.length);
    return questionTypes[randomIndex];
  };
    
const TestResult = ({ route}) => {
    const [questions, setQuestions] = useState([]);
    const navigation = useNavigation();
  const handleGoBack = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };
  const { numberOfQuestions, totalQuestions } = route.params;
  const [userAnswer, setUserAnswer] = useState(null);
  const handleNextQuestion = () => {
    // Logic for saving the user's answer and navigating to the next question
    // You may want to store the user's answers in a state or a global state management solution
    // and implement your own logic for moving to the next question
    // For demonstration purposes, we'll just increment the question number
    const nextQuestionNumber = numberOfQuestions + 1;

    if (nextQuestionNumber <= totalQuestions) {
      navigation.push("Question", {
        questionNumber: nextQuestionNumber,
        totalQuestions,
      });
    } else {
      // If all questions are answered, you can navigate to a results screen or perform other actions
      navigation.navigate("QuizResults");
    }
  };
  useEffect(() => {
    // Generate random questions based on the selected number
    const randomQuestions = Array.from({ length: route.params.numberOfQuestions }, (_, index) => {
      const randomType = getRandomQuestionType();
      const sampleQuestion = sampleQuestions.find(question => question.type === randomType);

      return {
        ...sampleQuestion,
        id: index + 1, // You can use a better identifier if needed
      };
    });

    setQuestions(randomQuestions);
  }, [route.params.numberOfQuestions]);
  return (
    <View style={styles.container}>
          
      <Text style={styles.title}>Quiz</Text>
      {questions.map((question, index) => (
        <View key={index}>
          {question.type === "trueFalse" && (
            <TrueFalseQuestion question={question.question} answer={question.answer} />
          )}
          {question.type === "multipleChoice" && (
            <MultipleChoiceQuestion
              question={question.question}
              options={question.options}
              answer={question.answer}
            />
          )}
          {question.type === "fillInTheBlank" && (
            <FillInTheBlankQuestion question={question.question} answer={question.answer} />
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleQuizCompletion}>
        <Text style={styles.buttonText}>Complete Quiz</Text>
      </TouchableOpacity>
 

        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            style={[styles.icon, { color: "#000" }]}
            name="arrow-left"
            size={20}
          />
        </TouchableOpacity>
        <Button title="Next Question" onPress={handleNextQuestion} />
      {/* Add your content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adjust the background color as needed
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000', // Adjust the text color as needed
  },
});

export default TestResult;
