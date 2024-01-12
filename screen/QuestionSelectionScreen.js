import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const QuestionSelectionScreen = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  const [numberOfQuestions, setNumberOfQuestions] = useState(20);
  const [trueFalse, setTrueFalse] = useState(true);
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [fillInTheBlank, setFillInTheBlank] = useState(false);
  const decreaseNumberOfQuestions = () => {
    if (numberOfQuestions > 1) {
      setNumberOfQuestions(numberOfQuestions - 1);
    }
  };

  const increaseNumberOfQuestions = () => {
    setNumberOfQuestions(numberOfQuestions + 1);
  };
  const startQuiz = () => {
    // Pass selected options to the next screen
    const selectedQuestionTypes = [];
    if (trueFalse) selectedQuestionTypes.push("trueFalse");
    if (multipleChoice) selectedQuestionTypes.push("multipleChoice");
    if (fillInTheBlank) selectedQuestionTypes.push("fillInTheBlank");

    navigation.navigate("TestScreen", {
      numberOfQuestions,
      questionTypes: selectedQuestionTypes,
    });
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
      <Text style={styles.title}>Quiz Configuration</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.text}>Number of Questions:</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            style={styles.text}
            value={numberOfQuestions.toString()}
            keyboardType="numeric"
            onChangeText={(value) => setNumberOfQuestions(parseInt(value) || 0)}
          />
          <View style={styles.numberControl}>
            <Icon
              name="sort-up"
              size={20}
              color="#4255FF"
              onPress={increaseNumberOfQuestions}
              style={styles.icon}
            />
            <Icon
              name="sort-down"
              size={20}
              color="#4255FF"
              onPress={decreaseNumberOfQuestions}
              style={styles.icon}
            />
          </View>
        </View>
      </View>
      <View style={styles.divider}></View>
      <Text style={styles.label}>Question Types:</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.text}>True/False</Text>
        <Switch
          value={trueFalse}
          onValueChange={() => setTrueFalse((prev) => !prev)}
          trackColor={{ false: "#fff", true: "#4255FF" }}
          thumbColor={trueFalse ? "#fff" : "#fff"}
          ios_backgroundColor="#4B5673"
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.text}>Multiple Choice</Text>
        <Switch
          value={multipleChoice}
          onValueChange={() => setMultipleChoice((prev) => !prev)}
          trackColor={{ false: "#fff", true: "#4255FF" }}
          thumbColor={trueFalse ? "#fff" : "#fff"}
          ios_backgroundColor="#4B5673"
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.text}>Fill in the Blank</Text>
        <Switch
          value={fillInTheBlank}
          onValueChange={() => setFillInTheBlank((prev) => !prev)}
          trackColor={{ false: "#fff", true: "#4255FF" }}
          thumbColor={trueFalse ? "#fff" : "#fff"}
          ios_backgroundColor="#4B5673"
        />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity style={styles.button} onPress={startQuiz}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    // margin: 5,
    backgroundColor: "#0A092B"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
    marginTop: 10,
    textAlign: "left",
  },
  label: {
    fontSize: 20,
    marginBottom: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    color: "#fff",
    // fontWeight: "bold",
    fontWeight: 600,
    fontSize: 18,
    marginBottom: 10,
  },
  numberControl: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    // marginLeft: 10,
    marginBottom: 0,
    padding: 10, // Add some space between the icons
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#4255FF",
    padding: 10,
    marginTop: 16,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#4B5673",
    marginVertical: 15,
  },
});

export default QuestionSelectionScreen;
