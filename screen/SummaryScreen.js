import React from "react";
import { ScrollView, Text, View, StyleSheet, SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const SummaryScreen = () => {
  return (
    <SafeAreaView>
      <Ionicons style={{paddingLeft: 16}} size={30} name="arrow-back-outline" />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Lịch sử Nhà Nước Văn Lang</Text>

        <Text style={styles.subtitle}>1. Giao Lưu và Xung Đột</Text>
        <Text style={styles.content}>
          {"\u2022"} Có sự giao lưu và xung đột giữa người Lạc Việt với các tộc
          người khác.
        </Text>
        <Text style={styles.content}>
          {"\u2022"} Xung đột không chỉ xảy ra giữa người Lạc Việt và tộc người
          khác mà còn giữa các bộ lạc Lạc Việt với nhau.
        </Text>
        <Text style={styles.subtitle}>2. Nước Văn Lang Thành Lập</Text>
        <Text style={styles.content}>
          {"\u2022"} Bộ lạc Văn Lang, có cư trú ven sông Hồng, từ Ba Vì đến Việt
          Trì, là một trong những bộ lạc giàu có và hùng mạnh.
        </Text>
        <Text style={styles.content}>
          {"\u2022"} Làng Cả (Việt Trì) là nơi có nghề đúc đồng phát triển sớm,
          dân cư đông đúc.
        </Text>
        <Text style={styles.content}>
          {"\u2022"} Văn Lang hợp nhất các bộ lạc lân cận thành một nước, nhờ
          vào thế mạnh và sự ủng hộ của các bộ lạc khác ở vùng đồng bằng Bắc Bộ
          và Bắc Trung Bộ.
        </Text>
        <Text style={styles.subtitle}>3. Tổ Chức của Nhà Nước Văn Lang</Text>
        <Text style={styles.content}>
          {"\u2022"} Vua Hùng Vương, đặt đô ở Bạch Hạc (Việt Trì), chia nước
          thành 15 bộ.
        </Text>
        <Text style={styles.content}>
          {"\u2022"} Vua giữ mọi quyền hành trong nước, các bộ đều thần thuộc.
        </Text>
        <Text style={styles.content}>
          {"\u2022"} Có tướng văn là Lạc hầu và tướng võ là Lạc tướng.
        </Text>
        <Text style={styles.content}>
          {"\u2022"} Con trai vua là Quan lang, con gái vua là Mị nương.
        </Text>
        <Text style={styles.content}>
          {"\u2022"} Có sự tôn trọng đối với người già trong chiềng, chạ, những
          người này giúp Bồ chính giải quyết các vấn đề sản xuất và xã hội.
        </Text>
        <Text style={styles.subtitle}>4. Luật Pháp và Quân Đội</Text>
        <Text style={styles.content}>
          {"\u2022"} Nhà nước Văn Lang chưa có luật pháp và quân đội cố định.
        </Text>
        <Text style={styles.content}>
          {"\u2022"} Khi có chiến tranh, vua Hùng và các Lạc tướng huy động
          thanh niên trai tráng từ các chiềng, chạ để tham gia chiến đấu.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "blue",
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default SummaryScreen;
