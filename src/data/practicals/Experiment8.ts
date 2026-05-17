import type { Experiment } from "@/components/worksheets/experiment.types";

export const Experiment8: Experiment = {
  number: 8,
  module: "CH4011 Practical",
  title: "The Analysis of an Aluminium Complex",

  sections: [
    {
      sectionNumber: 1,
      title: "Calibration of Flask Volume Using Toluene",

      inputs: [
        { id: "mass_nacl", label: "Mass of solid NaCl", unit: "g" },
        { id: "mass_flask", label: "Mass of clean dry flask", unit: "g" },
        { id: "mass_flask_toluene", label: "Mass of flask + 25 cm³ toluene", unit: "g" }
      ],

      calculations: [
        {
          label: "Mass of 25 cm³ toluene",
          formula: "mass_flask_toluene - mass_flask",
          dependsOn: ["mass_flask_toluene", "mass_flask"],
          outputUnit: "g"
        },
        {
          label: "Density of toluene",
          formula: "(mass_flask_toluene - mass_flask) / 25",
          dependsOn: ["mass_flask_toluene", "mass_flask"],
          outputUnit: "g/cm³"
        }
      ],

      warnings: [
        {
          condition: "density < 0.5 || density > 0.9",
          message: "Density of toluene is outside expected range",
          severity: "error"
        }
      ]
    }
  ]
};