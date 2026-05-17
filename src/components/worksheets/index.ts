import Experiment8 from "@/pages/Experiment8";
import Experiment11 from "@/pages/Experiment11";

// You can add more experiments here later
export const worksheets = [
  {
    id: "CH4011-E8",
    experimentNumber: 8,
    title: "Experiment 8: The Analysis of an Aluminium Complex",
    component: Experiment8,
  },
  {
    id: "CH4011-E11",
    experimentNumber: 11,
    title: "Experiment 11: Measuring the Radius of Sodium and Potassium Ions",
    component: Experiment11,
  },
  // {
  //   id: "CH4011-E12",
  //   experimentNumber: 12,
  //   title: "Experiment 12: ...",
  //   component: Experiment12,
  // },
];

export function getWorksheetByNumber(number: number) {
  return worksheets.find((w) => w.experimentNumber === number);
}