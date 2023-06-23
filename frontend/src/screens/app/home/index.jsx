// import React, { useEffect, useState } from "react";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  // StyleSheet,
} from "react-native";
import tw from "twrnc";
// import { Button, Card, Paragraph } from "react-native-paper";
// import API_URL, { sendRequest } from "../../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
// import Spinner from "../../../components/spinner";

const Home = ({ navigation }) => {
  // const [user, setUser] = useState("");
  // const [candidates, setCandidates] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [hasUserVoted, setHasUserVoted] = useState(false);

  // const getUserProfile = async () => {
  //   const profile = await sendRequest(API_URL + "/users/profile", "GET");
  //   setUser(profile?.data?.data);
  // };

  // const getCandidates = async () => {
  //   const res = await sendRequest(API_URL + "/candidates/as-voter", "GET");
  //   setCandidates(res?.data?.data || []);
  // };

  // const checkIfUserHasVoted = async () => {
  //   const res = await sendRequest(API_URL + "/users/has-voted", "GET");
  //   setHasUserVoted(res?.data?.data?.voted);
  // };

  // const loadData = async () => {
  //   setLoading(true);
  //   await getCandidates();
  //   await checkIfUserHasVoted();
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   getUserProfile();

  //   loadData();
  // }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Auth");
  };

  // const handleVote = async (candidate) => {
  //   setLoading(true);
  //   try {
  //     await sendRequest(API_URL + "/candidates/vote", "POST", {
  //       candidateId: candidate,
  //     });
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //   }

  //   await loadData();
  // };

  return (
    <View style={tw`h-full pt-20`}>
      <SafeAreaView>
        <ScrollView>
          <View style={tw`flex items-end pr-4 mb-4`}>
            <TouchableOpacity onPress={handleLogout}>
              <MaterialIcons name="logout" size={37} color="red" />
            </TouchableOpacity>
          </View>

          <View style={tw`h-full pt-20`}>
            <SafeAreaView>
              <ScrollView>
                <TouchableOpacity
                  onPress={() => navigation.navigate("TokenGeneration")}
                >
                  <View style={tw`mt-4`}>
                    <Text style={tw`text-base underline text-gray-500`}>
                      Generate
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("TokenValidation")}
                >
                  <View style={tw`mt-4`}>
                    <Text style={tw`text-base underline text-gray-500`}>
                      Validate
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("TokensByMeterNumber")}>
                  <View style={tw`mt-4`}>
                    <Text style={tw`text-base underline text-gray-500`}>
                      Get
                    </Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   text: {
//     fontFamily: "Poppins-Regular",
//   },
//   textBold: {
//     fontFamily: "Poppins-Bold",
//   },
//   button: {
//     borderColor: "#2272C3"
//   }
// });

export default Home;
