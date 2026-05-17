import type { Experiment } from "@/components/worksheets/experiment.types";


export const Experiment11: Experiment = {
  number: 11,
  module: "CH4011 Practical",
  title: "Measuring the Radius of Sodium and Potassium Ions",


  sections: [
    // === CALIBRATION ===
    {
      sectionNumber: 1,
      title: "Calibration of Flask Volume Using Toluene",
      description:
        "First, we need to determine the density of toluene by measuring the mass of exactly 25 cm³. This calibration is essential for accurate volume measurements.",


      inputs: [
        {
          id: "mass_nacl",
          label: "Mass of solid NaCl (to be added later)",
          unit: "g",
          type: "number",
          hint: "Expected range: 3-6 g (around 0.1 mole). Weigh by difference using the rough balance.",
          decimalPlaces: 2,
        },
        {
          id: "mass_flask",
          label: "Mass of clean dry flask",
          unit: "g",
          type: "number",
          hint: "Record to 2 decimal places. This is your empty flask mass.",
          decimalPlaces: 2,
        },
        {
          id: "mass_flask_toluene",
          label: "Mass of flask + 25 cm³ toluene",
          unit: "g",
          type: "number",
          hint: "Fill exactly to the mark on the volumetric flask. Record to 2 decimal places.",
          decimalPlaces: 2,
        },
      ],


      calculations: [
        {
          label: "Mass of 25 cm³ toluene",
          formula: "mass_flask_toluene - mass_flask",
          dependsOn: ["mass_flask_toluene", "mass_flask"],
          outputUnit: "g",
          explanation: "Subtract the empty flask mass from the combined mass to find just the toluene mass. This should be approximately 21.7 g (25 cm³ × 0.867 g/cm³).",
          expectedValue: 21.675,
          tolerance: 0.5,
          userEnters: true,
          userInputId: "mass_toluene_user",
        },
        {
          label: "Density of toluene",
          formula: "mass_of_25_cm_toluene / 25",
          dependsOn: ["mass_of_25_cm_toluene"],
          outputUnit: "g/cm³",
          explanation: "Density = mass/volume. You measured exactly 25 cm³, so divide your toluene mass by 25. Expected value: 0.867 g/cm³ (at room temperature).",
          expectedValue: 0.867,
          tolerance: 0.015,
          userEnters: true,
          userInputId: "toluene_density_user",
        },
      ],


      warnings: [
        {
          condition: "density_of_toluene < 0.85 || density_of_toluene > 0.88",
          message: "Your toluene density is outside the typical range (0.85-0.88 g/cm³). Check: Did you fill exactly to the mark? Is your balance calibrated?",
          severity: "warning",
        },
        {
          condition: "mass_nacl < 3 || mass_nacl > 6",
          message: "Mass of NaCl outside optimal range (3-6 g). Values this far outside may give less accurate results, but you can continue.",
          severity: "warning",
        },
      ],
    },


    // === SODIUM ION ===
    {
      sectionNumber: 2,
      title: "Measuring the Radius of Na⁺ Ion",
      description:
        "Pour out the toluene and add the known mass of NaCl. Refill exactly to the mark with toluene and weigh. The flask now contains (25-x) cm³ toluene + x cm³ NaCl.",


      inputs: [
        {
          id: "mass_flask_nacl_toluene",
          label: "Mass of flask + NaCl + toluene",
          unit: "g",
          type: "number",
          hint: "After adding NaCl and refilling to the mark, weigh the complete assembly. Record to 2 decimal places.",
          decimalPlaces: 2,
        },
      ],


      calculations: [
        {
          label: "Mass of toluene with NaCl",
          formula: "mass_flask_nacl_toluene - mass_flask - mass_nacl",
          dependsOn: ["mass_flask_nacl_toluene", "mass_flask", "mass_nacl"],
          outputUnit: "g",
          explanation: "Subtract both the flask mass and NaCl mass from the total to find just the toluene mass. This toluene occupies less than 25 cm³ because NaCl displaced some of it.",
          userEnters: true,
          userInputId: "mass_toluene_nacl_user",
        },
        {
          label: "Volume of toluene with NaCl",
          formula: "mass_of_toluene_with_nacl / density_of_toluene",
          dependsOn: ["mass_of_toluene_with_nacl", "density_of_toluene"],
          outputUnit: "cm³",
          explanation: "Use the toluene density you calculated in Section 1 to convert mass back to volume. This tells you how much space the toluene actually occupies after NaCl was added.",
          userEnters: true,
          userInputId: "volume_toluene_nacl_user",
        },
        {
          label: "Volume of NaCl",
          formula: "25 - volume_of_toluene_with_nacl",
          dependsOn: ["volume_of_toluene_with_nacl"],
          outputUnit: "cm³",
          explanation: "The NaCl displaced some toluene. Subtract the actual toluene volume from 25 cm³ to find the NaCl volume. Expected: ~1.4-1.5 cm³ for 3-6 g NaCl.",
          expectedValue: 1.43,
          tolerance: 0.2,
          userEnters: true,
          userInputId: "volume_nacl_user",
        },
        {
          label: "Density of NaCl",
          formula: "mass_nacl / volume_of_nacl",
          dependsOn: ["mass_nacl", "volume_of_nacl"],
          outputUnit: "g/cm³",
          explanation: "Density = mass/volume. This is the experimental density of solid NaCl. Expected value: 2.16 g/cm³. Your result will be used to calculate the ionic radius.",
          expectedValue: 2.16,
          tolerance: 0.06,
          userEnters: true,
          userInputId: "density_nacl_user",
        },
        {
          label: "Radius of Na⁺ ion",
          formula: "((3.882e-22 / (mass_nacl / (25 - (mass_flask_nacl_toluene - mass_flask - mass_nacl) / density_of_toluene)) * 1e30) ** (1/3) - 334) / 2 / 100",
          dependsOn: ["mass_nacl", "mass_flask_nacl_toluene", "mass_flask", "density_of_toluene"],
          outputUnit: "Å",
          explanation: "Using the rock-salt crystal structure: NaCl has 4 formula units per unit cell. If r_Na is the radius in pm and r_Cl = 167 pm, then edge length = 2(r_Na + 167) pm. From the density equation: (2r + 334)³ = 3.82×10⁻²³ × 10³⁰ / density. Rearrange to find r in pm, then convert to Å (divide by 100). Expected: 1.02 Å (102 pm).",
          expectedValue: 1.02,
          tolerance: 0.05,
          userEnters: true,
          userInputId: "na_radius_user",
        },
      ],


      warnings: [
        {
          condition: "density_of_nacl < 2.10 || density_of_nacl > 2.22",
          message: "Your NaCl density differs from expected (2.16 g/cm³). Check your mass and volume measurements.",
          severity: "warning",
        },
      ],
    },


    // === POTASSIUM ION ===
    {
      sectionNumber: 3,
      title: "Measuring the Radius of K⁺ Ion",
      description:
        "Repeat the experiment using KCl to find the radius of the K⁺ ion. KCl also has the rock-salt structure, so the same calculation method applies.",


      inputs: [
        {
          id: "mass_kcl",
          label: "Mass of solid KCl",
          unit: "g",
          type: "number",
          hint: "Use similar mass to NaCl (around 0.1 mole = 7.45 g). Record to 2 decimal places.",
          decimalPlaces: 2,
        },
        {
          id: "mass_flask_kcl",
          label: "Mass of clean dry flask (for KCl)",
          unit: "g",
          type: "number",
          hint: "This may be the same flask - if so, use the same mass as before.",
          decimalPlaces: 2,
        },
        {
          id: "mass_flask_kcl_toluene",
          label: "Mass of flask + KCl + toluene",
          unit: "g",
          type: "number",
          hint: "After adding KCl and refilling to the mark, weigh the complete assembly. Record to 2 decimal places.",
          decimalPlaces: 2,
        },
      ],


      calculations: [
        {
          label: "Mass of toluene with KCl",
          formula: "mass_flask_kcl_toluene - mass_flask_kcl - mass_kcl",
          dependsOn: ["mass_flask_kcl_toluene", "mass_flask_kcl", "mass_kcl"],
          outputUnit: "g",
          explanation: "Same method as for NaCl: subtract flask and KCl mass to find just the toluene mass.",
          userEnters: true,
          userInputId: "mass_toluene_kcl_user",
        },
        {
          label: "Volume of toluene with KCl",
          formula: "mass_of_toluene_with_kcl / density_of_toluene",
          dependsOn: ["mass_of_toluene_with_kcl", "density_of_toluene"],
          outputUnit: "cm³",
          explanation: "Convert toluene mass to volume using the density from Section 1.",
          userEnters: true,
          userInputId: "volume_toluene_kcl_user",
        },
        {
          label: "Volume of KCl",
          formula: "25 - volume_of_toluene_with_kcl",
          dependsOn: ["volume_of_toluene_with_kcl"],
          outputUnit: "cm³",
          explanation: "KCl volume = displaced toluene volume. Expected: ~1.6-1.7 cm³ for 7-8 g KCl (KCl is less dense than NaCl).",
          expectedValue: 1.65,
          tolerance: 0.2,
          userEnters: true,
          userInputId: "volume_kcl_user",
        },
        {
          label: "Density of KCl",
          formula: "mass_kcl / volume_of_kcl",
          dependsOn: ["mass_kcl", "volume_of_kcl"],
          outputUnit: "g/cm³",
          explanation: "Density = mass/volume. Expected value: 1.98 g/cm³ (KCl is less dense than NaCl because K⁺ is larger).",
          expectedValue: 1.98,
          tolerance: 0.06,
          userEnters: true,
          userInputId: "density_kcl_user",
        },
        {
          label: "Radius of K⁺ ion",
          formula: "((4.953e-22 / (mass_kcl / (25 - (mass_flask_kcl_toluene - mass_flask_kcl - mass_kcl) / density_of_toluene)) * 1e30) ** (1/3) - 334) / 2 / 100",
          dependsOn: ["mass_kcl", "mass_flask_kcl_toluene", "mass_flask_kcl", "density_of_toluene"],
          outputUnit: "Å",
          explanation: "Same method as Na⁺: KCl also has rock-salt structure with 4 formula units per unit cell. Use the same formula with KCl density (mass per unit cell = 4.953×10⁻²² g). Expected: 1.38 Å (138 pm). K⁺ is larger than Na⁺ as expected from periodic trends.",
          expectedValue: 1.38,
          tolerance: 0.05,
          userEnters: true,
          userInputId: "k_radius_user",
        },
      ],


      warnings: [
        {
          condition: "density_of_kcl < 1.92 || density_of_kcl > 2.04",
          message: "Your KCl density differs from expected (1.98 g/cm³). Check your measurements.",
          severity: "warning",
        },
      ],
    },


    // === AUTOMATIC MARKING (combined section) ===
    {
      sectionNumber: 4,
      title: "Automatic Marking & Data Quality",
      description:
        "Your marks are calculated automatically in real-time based on calculation accuracy and result quality. Marks decrease gradually as your results deviate from expected values.",


      inputs: [],
      calculations: [],
      warnings: [],
    },
  ],
};