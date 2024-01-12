import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert,ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

// Sample questions data
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

const getRandomQuestionType = (selectedTypes) => {
    // Use the selectedTypes if provided, otherwise, choose a random type
    const questionTypes = selectedTypes.length > 0 ? selectedTypes : ["trueFalse", "multipleChoice", "fillInTheBlank"];
    const randomIndex = Math.floor(Math.random() * questionTypes.length);
    return questionTypes[randomIndex];
  };
  
  const TrueFalseQuestion = ({ question, answer, onAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
  
    const handlePress = (value) => {
      setSelectedAnswer(value);
      onAnswer(value);
    };
  
    return (
      <View>
        <Text style={styles.question}>{question}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handlePress("true")}
            style={[
              styles.button,
              selectedAnswer === "true" && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.text,
                selectedAnswer === "true" && styles.selectedText,
              ]}
            >
              True
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress("false")}
            style={[
              styles.button,
              selectedAnswer === "false" && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.text,
                selectedAnswer === "false" && styles.selectedText,
              ]}
            >
              False
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const MultipleChoiceQuestion = ({ question, options, answer, onAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
  
    const handlePress = (value) => {
      setSelectedAnswer(value);
      onAnswer(value);
    };
  
    return (
      <View>
        <Text style={styles.question}>{question}</Text>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(option)}
            style={[
              styles.button,
              selectedAnswer === option && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.text,
                selectedAnswer === option && styles.selectedText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

const FillInTheBlankQuestion = ({ question, answer, onAnswer }) => {
  const [userAnswer, setUserAnswer] = useState("");

  const handleTextChange = (text) => {
    setUserAnswer(text);
    onAnswer(text);
  };

  return (
    <View>
      <Text style={styles.question}>{question}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Your answer"
        onChangeText={handleTextChange}
      />
    </View>
  );
};

const TestScreen = ({ route }) => {
  const navigation = useNavigation();
  const { numberOfQuestions, questionTypes } = route.params;
  const handleGoBack = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    // Generate random questions based on the selected number and type
    const randomQuestions = Array.from(
      { length: route.params.numberOfQuestions },
      (_, index) => {
        const randomType = getRandomQuestionType(route.params.questionTypes);
        const sampleQuestion = sampleQuestions.find(
          (question) => question.type === randomType
        );
  
        return {
          ...sampleQuestion,
          id: index + 1,
        };
      }
    );
  
    setQuestions(randomQuestions);
  }, [route.params.numberOfQuestions, route.params.selectedQuestionType]);
  

  const handleQuizCompletion = () => {
    // Check user answers and calculate the score
    let score = 0;

    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];

      if (userAnswer !== undefined) {
        if (
          (question.type === "trueFalse" ||
            question.type === "fillInTheBlank") &&
          userAnswer === question.answer
        ) {
          score++;
        } else if (
          question.type === "multipleChoice" &&
          userAnswer === question.answer
        ) {
          score++;
        }
      }
    });

    // Display the score or any other completion action
    Alert.alert("Quiz Completed", `Your score: ${score}/${questions.length}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon
          style={[styles.icon, { color: "#ffffff" }]}
          name="close"
          size={25}
        />
      </TouchableOpacity>
      
      <ScrollView
        style={styles.body_container}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      > 
      <Text style={styles.title}>Quizz</Text>
    
      {questions.map((question, index) => (
        <View key={index}>
             <Text style={styles.questionNumber}>{`Question ${index + 1}`}</Text>
          {question.type === "trueFalse" && (
            <TrueFalseQuestion
              question={question.question}
              answer={question.answer}
              onAnswer={(value) =>
                setUserAnswers((prev) => ({ ...prev, [question.id]: value }))
              }
            />
          )}
          {question.type === "multipleChoice" && (
            <MultipleChoiceQuestion
              question={question.question}
              options={question.options}
              answer={question.answer}
              onAnswer={(value) =>
                setUserAnswers((prev) => ({ ...prev, [question.id]: value }))
              }
            />
          )}
          {question.type === "fillInTheBlank" && (
            <FillInTheBlankQuestion
              question={question.question}
              answer={question.answer}
              onAnswer={(value) =>
                setUserAnswers((prev) => ({ ...prev, [question.id]: value }))
              }
            />
          )}
          
        </View>
      ))}
      <TouchableOpacity style={styles.buttonSubmit} onPress={handleQuizCompletion}>
        <Text style={styles.buttonText}>Complete Quiz</Text>
      </TouchableOpacity>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: "center",
    backgroundColor: "#0A092B",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
    marginTop: 10,
    textAlign: "left",
  },
  text:{
    fontSize: 18,
    fontWeight: 600,
    color: "#fff",
    marginBottom: 14,
    marginTop: 10,
    
  },
  question:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    marginTop: 10,
    
  },
  questionNumber:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    marginTop: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    color: "#fff",
  },
  textInput: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius:10,
    marginVertical: 10,
  },
 
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    
  },
  icon: {
    marginBottom: 5,
    padding: 10,
  }, 
  selectedRadioButton: {
    backgroundColor: "blue", // Change to the desired background color
    borderRadius: 5, // Optional: Add borderRadius for a rounded appearance
    paddingHorizontal: 8, // Optional: Add padding for better appearance
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#0A092B",
    marginVertical: 10,
    padding: 10,
    alignItems: "center",
    borderColor: "#4B526C",
    borderWidth: 2,
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: "#4255FF", // Change to the desired background color
  },
  buttonSubmit:{
    backgroundColor: "#4255FF",
    padding: 15,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    marginTop: 16,
    borderRadius: 5,
  }
});

export default TestScreen;
