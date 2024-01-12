import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";


const windowWidth = Dimensions.get("window").width;
const RelatedCard = ({ onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <View style={styles.card_container}>
          <View style={styles.related_left}>
            <Text style={styles.text_title}>
              Quang Trung : Wikipedia tieng viet
            </Text>

            <Text
              style={styles.text_desc}
              numberOfLines={6}
              ellipsizeMode="tail"
            >
              Nguyễn Huệ sinh năm Quý Dậu 1753 niên hiệu Cảnh Hưng thứ 13 dưới
              triều vua Lê Hiển Tông Nhà Hậu Lê. Ông còn có tên là Quang
              Bình,[12] Văn Huệ[13] hay Hồ Thơm. Sau này, người dân địa phương
              thường gọi ông là Đức ông Bình[14] hoặc Đức ông Tám.[9] Theo Quang
              Trung anh hùng dân tộc thì “Nguyễn Huệ tóc quăn, da sần, mắt như
              chớp sáng, tiếng nói sang sảng như tiếng chuông, nhanh nhẹn, khỏe
              mạnh, can đảm”. Sách Tây Sơn lược còn miêu tả đôi mắt Quang Trung
              “ban đêm khi ngồi không có đèn thì ánh sáng từ đôi mắt soi sáng cả
              chiếu”.
            </Text>
          </View>
          <View style={styles.related_right}>
            <Image
              style={styles.related_image}
              source={require("../assets/images/hungvuong.jpg")}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={styles.related_logo}
                source={require("../assets/images/hungvuong.jpg")}
              />

              <Text style={styles.text}>Wikipedia</Text>
            </View>

            <Text
              style={styles.text_link}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              https://www.youtube.com/watch?v=G3DPz4zGztQ
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    
    marginLeft: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 15,
    padding: 5,
   
  },
  card_container: {
    margin: 2,
    height: windowWidth * 0.4,
    width: windowWidth * 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  related_image: {
    width: "80%",
    height: "65%",
    borderRadius: 5,
    // marginRight: 5,

    // alignSelf: "center",
  },
  related_left: {
    margin: 5,
    width: "60%",
  },
  related_right: {
    margin: 5,
    width: "40%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  related_logo: {
    width: 20,
    height: 20,
    marginRight: 3,

    borderRadius: 50,
  },
  text: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
  },
  text_title: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: 5
  },
  text_desc: {
    color: "#000",

    fontSize: 12,
  },
  text_link: {
    fontSize: 10,
    color: "blue",
  },
});

export default RelatedCard;