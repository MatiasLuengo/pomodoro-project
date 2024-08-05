import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];
export default function Header({ currentTime, setCurrentTime, setTime }) {
  function handlerPress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  }

  return (
    <View style={styles.headerContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.itemStyle,
            currentTime !== index && { borderColor: "transparent" },
          ]}
          onPress={() => handlerPress(index)}
        >
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  itemStyle: {
    borderWidth: 3,
    padding: 7,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
  },
});
