/* import { StatusBar } from "expo-status-bar"; */
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState(0 | 1 | 2);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (time === 0) {
      setIsActive(false);
      playAlarm();
      if (currentTime === 0) {
        setCurrentTime(1);
        setTime(5 * 60);
      } else if (currentTime === 1) {
        setCurrentTime(0);
        setTime(25 * 60);
      } else if (currentTime === 2) {
        setCurrentTime(0);
        setTime(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  function handlerStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/gota.mp3")
    );
    await sound.playAsync();
  }
  async function playAlarm() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/alarma.mp3")
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      {/* <StatusBar style="auto" /> */}
      <View style={styles.appView}>
        <Text style={styles.text}>Pomodoro!</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handlerStartStop}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              color: "white",
              textTransform: "uppercase",
            }}
          >
            {isActive ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appView: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: Platform.OS === "android" && 40,
  },
  text: { fontSize: 32, fontWeight: "bold" },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 20,
    borderRadius: 15,
    alignItems: "center",
  },
});
