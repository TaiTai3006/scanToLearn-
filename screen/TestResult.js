// TestResult.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import { PieChart } from "react-native-chart-kit";
import PieChart from "react-native-pie-chart";

import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Chip } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TestResult = ({ route }) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.navigate("PreviewScreen");
  };

  const { questions, userAnswers } = route.params;

  const calculateTotalScore = () => {
    let totalScore = 0;

    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id];
      const correctAnswer =
        question.type === "trueFalse"
          ? question.answer.toString()
          : question.answer;
      if (userAnswer !== undefined && userAnswer === correctAnswer) {
        totalScore++;
      }
    });

    return totalScore;
  };

  const totalScore = calculateTotalScore();

  // Tính phần trăm điểm
  const calculateScorePercentage = () => {
    return (totalScore / questions.length) * 100;
  };

  const scorePercentage = calculateScorePercentage();

  // Dữ liệu biểu đồ Doughnut

  const widthAndHeight = 150;
  const series = [scorePercentage, 100 - scorePercentage];
  const sliceColor = ["#18AE79", "#D02500"];

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons style={{ color: "#fff" }} name="close" size={25} />
        </TouchableOpacity>

        <Text style={styles.title}>{` ${totalScore}/${questions.length}`}</Text>
      </View>

      <ScrollView
        style={styles.body_container}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chartContainer}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.85}
            coverFill={""}
            padding={10}
          />
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View
                style={{
                  ...styles.legendColor,
                  backgroundColor: "#18AE79",
                }}
              />
              <Text style={styles.legendText}>{`${scorePercentage.toFixed(0)} % Correct`} </Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={{
                  ...styles.legendColor,
                  backgroundColor: "#D02500",
                }}
              />
              <Text style={styles.legendText_incorrect}>{`${100-scorePercentage.toFixed(0)} % Incorrect`}</Text>
            </View>
          </View>
        </View>

        <View>
          <View style={[styles.chip_container]}>
            <Text style={styles.subtitle}>Next step</Text>
            <TouchableOpacity onPress={() => navigation.navigate("TestScreen")}>
              <Chip
                icon={() => <Ionicons name="refresh" color="#fff" size={23} />}
                style={[styles.chip_border, { marginBottom: 10 }]}
                textStyle={styles.chip_text}
              >
                Learn again
              </Chip>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("QuestionSelectionScreen")}
            >
              <Chip
                icon={() => <Ionicons name="document" color="#fff" size={20} />}
                style={[styles.chip_border_practice]}
                textStyle={styles.chip_text}
              >
                Practice
              </Chip>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.subtitle}>Preview</Text>
        {questions.map((question, index) => (
          <View key={index}>
            <Text style={styles.questionNumber}>{`Question ${index + 1}`}</Text>
            {userAnswers[question.id] ===
            (question.type === "trueFalse"
              ? question.answer.toString()
              : question.answer) ? (
              <View style={styles.true_answerContainer}>
                <Text style={styles.question}>{question.question}</Text>
                <Text style={styles.correctAnswer}>{`✓ ${
                  userAnswers[question.id]
                }`}</Text>
              </View>
            ) : (
              <View style={styles.wrong_answerContainer}>
                <Text style={styles.question}>{question.question}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.userAnswers}>{`✗ ${
                    userAnswers[question.id] || "Not answered"
                  }`}</Text>
                  <Text
                    style={styles.correctAnswer}
                  >{`✓ ${question.answer}`}</Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#0A092B",
  },
  header_container: {
    color: "#ffffff",
    borderBottomColor: "#4B5673",
    borderBottomWidth: 4,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: 0,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    marginLeft: wp("35%"),
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    marginTop: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    // marginBottom: 16,
    margin: 5,
  },
  correctAnswer: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#18AE79",
    marginBottom: 16,
    marginTop: 10,
  },
  userAnswers: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D02500",
    marginBottom: 16,
    marginTop: 10,
  },
  chip_container: {
    flexDirection: "column",
    marginVertical: 5,
    // padding: 10,
  },
  chip_border_practice: {
    backgroundColor: "#0A092B",
    marginVertical: 10,
    padding: 10,
    alignItems: "center",
    borderColor: "#4B526C",
    borderWidth: 2,
    borderRadius: 15,
  },
  chip_text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    padding: 8,
  },
  chip_border: {
    backgroundColor: "#4255FF",
    marginVertical: 10,
    padding: 8,
    alignItems: "center",
    borderColor: "#4B526C",
    borderWidth: 2,
    borderRadius: 15,
  },
  true_answerContainer: {
    backgroundColor: "#0A092B",
    marginVertical: 10,
    padding: 10,
    // alignItems: "center",
    borderColor: "#18AE79",
    borderWidth: 2,
    borderRadius: 15,
  },
  wrong_answerContainer: {
    backgroundColor: "#0A092B",
    marginVertical: 10,
    padding: 10,
    // alignItems: "center",
    borderColor: "#D02500",
    borderWidth: 2,
    borderRadius: 15,
  },
  chartContainer: {
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
  legendContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingLeft: 10,
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 5,
  },
  legendText: {
    color: "#18AE79",
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  legendText_incorrect:{
    color: "#D02500",
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 5,
  }
});

export default TestResult;
