import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "@/Hooks";
import BaseInput from "../BaseInput";
import DatePickerNativeInput from "../DatePickerNativeInput";
import BaseDropdown from "../BaseDropdown";
import CreateSymptomsForm from "./CreateSymptomsForm";
import CreateTreatmentForm from "./CreateTreatmentForm";
import RNPrint from "react-native-print";
import RNHTMLtoPDF from "react-native-html-to-pdf";

interface Readings {
  pulse: string;
  bp: string;
  temp: string;
  rr: string;
}

interface Treatment {
  medicineName: string;
  dosage: string;
  medicineType: "T" | "SY";
  qty: number;
  amount: number;
}

interface Fees {
  feeName: string;
  feeAmount: number;
  included: boolean;
}

interface Symptom {
  name: string;
}

export interface IFormDetails {
  sno: number;
  name: string;
  age: number;
  date: Date;
  sex: "MALE" | "FEMALE";
  readings: Readings;
  symptoms: Symptom[];
  diagnosis: string;
  investagtions: string;
  treatments: Treatment[];
  fees: Fees[];
}
const ConsultancyForm = () => {
  const { Layout, Gutters, Fonts } = useTheme();

  const { control } = useForm<IFormDetails>({
    defaultValues: {
      name: "",
      date: new Date(),
      sex: "MALE",
      readings: {
        pulse: "",
        bp: "",
        temp: "",
        rr: "",
      },
      symptoms: [{ name: "Firse" }, { name: "Firse" }],
      diagnosis: "",
      investagtions: "",
      treatments: [
        {
          medicineName: "",
          dosage: "",
          medicineType: "T",
          qty: 0,
          amount: 0,
        },
      ],
      fees: [
        {
          feeName: "FEES-OPD",
          feeAmount: 150,
          included: true,
        },
      ],
    },
  });

  const handleSubmit = async () => {
    const results = await RNHTMLtoPDF.convert({
      html: "<h1>Custom converted PDF Document</h1>",
      fileName: "test",
      base64: true,
    });

    await RNPrint.print({ filePath: results.filePath });
  };

  return (
    <ScrollView style={[Gutters.regularHMargin]}>
      <View style={[Layout.alignItemsEnd]}>
        <DatePickerNativeInput name="date" control={control} show={false} />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
      <View style={[Layout.row]}>
        <BaseInput
          name="name"
          control={control}
          placeholder="Patient Name"
          style={[]}
          containerStyle={[Layout.fill, Gutters.regularHPadding]}
          label="Patient Name"
        />
        <BaseInput
          name="age"
          control={control}
          placeholder="Age"
          containerStyle={[{ maxWidth: 100 }, Layout.fill]}
          label="Patient Age"
        />
        <BaseDropdown
          control={control}
          name="sex"
          items={[
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
          ]}
          containerStyle={[Layout.fill, Gutters.regularHPadding]}
        />
      </View>
      <View style={[Layout.row, Gutters.regularVPadding, { zIndex: -1 }]}>
        <BaseInput
          name="readings.bp"
          control={control}
          placeholder="BP"
          containerStyle={[Layout.fill, Gutters.regularHPadding]}
          label="BP"
        />
        <BaseInput
          name="readings.pulse"
          control={control}
          placeholder="Pulse"
          containerStyle={[Layout.fill, Gutters.regularHPadding]}
          label="Pulse"
        />
        <BaseInput
          name="readings.temp"
          control={control}
          placeholder="Temp"
          containerStyle={[Layout.fill, Gutters.regularHPadding]}
          label="Temp"
        />
        <BaseInput
          name="readings.rr"
          control={control}
          placeholder="RR"
          containerStyle={[Layout.fill, Gutters.regularHPadding]}
          label="RR"
        />
      </View>
      <CreateSymptomsForm control={control} />
      <CreateTreatmentForm control={control} />
    </ScrollView>
  );
};

export default ConsultancyForm;

const styles = StyleSheet.create({});
