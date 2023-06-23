import React, { useState } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import tw from "twrnc";


import Button from "../../../components/button";
import Input from "../../../components/input";
import API_URL, { sendRequest } from "../../../config/api";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const TokenGeneration = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const fields = [
      {
        icon: <Feather name="dollar-sign" size={24} color="silver" />,
        placeholder: "Amount",
        value: "amount",
        secure: false,
      },
      {
        icon: <Feather name="more-horizontal" size={24} color="silver" />,
        placeholder: "Meter Number",
        value: "meterNumber",
        secure: false,
      },
    ];

  const initialValues = {
    amount: "",
    meterNumber: "",
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .min(100, "Amount must be at least 100")
      .required("Amount is required"),
    meterNumber: Yup.string()
      .length(6, "Meter number must be 6 digits")
      .required("Meter number is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  const { handleChange, handleBlur, values, errors, touched, resetForm } =
    formik;

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      // Make API request to generate token
      const response = await sendRequest(
        API_URL + "/token/generate",
        "POST",
        values
      );
      if (response?.data?.status === 200) {
        setLoading(false);
        // Display the generated token to the user
        const token = response?.data?.data?.token;

        alert(`Generated Token: ${token}`);
        resetForm();
      } else {
        return setError(
          response?.data?.message || "Error occurred while generating token"
        );
      }
    } catch (error) {
      setLoading(false);
      return setError(error?.response?.data?.message || "An error occurred");
    }
  };

  return (
    // <View>
        
    //   <Text>Token Generation Page</Text>
    //   {/* Render the form inputs and button */}
    //   {/* Use the Input component for amount and meter number */}
    //   {/* Display the error if there is any */}
    //   {/* Render the button to generate the token */}
    // </View>
     <View style={tw`h-[100%] bg-white justify-end items-center`}>
      <SafeAreaView style={tw`h-[85%] w-full bg-white`}>
        <ScrollView>
          <View>
            <View style={tw`w-full`}>
              <Text
                style={tw`text-[#2272C3] text-center font-extrabold text-xl`}
              >
                Generate Token
              </Text>
              <Text style={tw`text-[#cccbca] text-center text-xl`}>Inputs</Text>
            </View>

            {error.length > 0 && (
              <Text style={tw`mt-4 text-red-500 text-center`}>{error}</Text>
            )}
            <View style={tw`mt-8`}>
              <View style={tw`px-6 py-2`}>
                {fields.map((field, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {}}
                    activeOpacity={0.8}
                  >
                    <Input
                      Icon={field.icon}
                      placeholder={field.placeholder}
                      onChangeText={handleChange(field.value)}
                      onBlur={handleBlur(field.value)}
                      value={values[field.value]}
                      security={field.secure}
                      type={field?.type}
                      borderColor={
                        touched[field.value] && errors[field.value]
                          ? "red"
                          : "gray"
                      }
                    />
                    {touched[field.value] && errors[field.value] && (
                      <Text style={tw`text-red-500`}>
                        {errors[field.value]}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}

                <View style={tw`mt-8`}>
                  <Button
                    mode={"contained"}
                    style={tw`w-full p-[10] mt-4`}
                    onPress={handleSubmit}
                  >
                    {loading ? "Genereting ..." : "Generate"}
                  </Button>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Home")}
                  >
                    <View style={tw`mt-4`}>
                      <Text style={tw`text-base underline text-gray-500`}>
                        Don&rsquo;t have an account? Register
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TokenGeneration;
