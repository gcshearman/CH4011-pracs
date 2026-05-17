import type { Experiment, InputField } from "./experiment.types";

export type InputValues = Record<string, number | undefined>;
export type CalculationResults = Record<string, number | undefined>;

export type ValidationResult = {
  passed: boolean;
  message: string;
  severity: "warning" | "error";
};

export type MarkingResults = {
  calculationMarks: number;
  accuracyMarks: number;
  totalMarks: number;
  feedback: string[];
  dataQualityScore: number;
};

/**
 * Calculate a single value based on formula and inputs
 */
export function calculateValue(
  formula: string,
  values: Record<string, number | undefined>
): number | null {
  try {
    let expression = formula;
    
    const replacements: Record<string, string> = {
      "mass_toluene": "mass_flask_toluene - mass_flask",
      "mass_(25-x)_toluene": "mass_flask_nacl_toluene - mass_flask - mass_nacl",
      "mass_(25-x)_toluene_KCl": "mass_flask_kcl_toluene - mass_flask_kcl - mass_kcl",
    };

    for (const [key, replacement] of Object.entries(replacements)) {
      const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
      expression = expression.replace(regex, `(${replacement})`);
    }

    const sortedKeys = Object.keys(values).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      if (values[key] !== undefined && !isNaN(values[key] as number)) {
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`\\b${escapedKey}\\b`, "g");
        expression = expression.replace(regex, String(values[key]));
      }
    }

    const result = Function(`"use strict"; return (${expression})`)();
    
    return typeof result === "number" && !isNaN(result) && isFinite(result) ? result : null;
  } catch {
    return null;
  }
}

/**
 * Calculate all derived values recursively
 */
export function calculateAllValues(
  sections: Experiment["sections"],
  inputs: InputValues
): CalculationResults {
  const results: CalculationResults = {};

  for (const section of sections) {
    for (const calc of section.calculations || []) {
      const value = calculateValue(calc.formula, { ...inputs, ...results });
      if (value !== null) {
        const key = calc.label
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .replace(/\s+/g, "_");
        results[key] = value;
      }
    }
  }

  return results;
}

/**
 * Validate inputs for significant figures and reasonableness
 */
export function validateInputs(
  inputs: InputField[],
  values: InputValues
): ValidationResult[] {
  const results: ValidationResult[] = [];

  for (const input of inputs) {
    const value = values[input.id];
    
    if (value === undefined || value === null || isNaN(value)) {
      continue;
    }

    const strValue = value.toString();
    const decimalPart = strValue.split(".")[1];
    
    if (input.type === "number" && input.unit === "g") {
      if (!decimalPart || decimalPart.length < 2) {
        results.push({
          passed: false,
          message: `Significant figures: ${input.label} should be recorded to 2 decimal places (e.g., ${value.toFixed(2)})`,
          severity: "warning",
        });
      }
    }
  }

  return results;
}

/**
 * Calculate automatic marking (generic - works for any experiment)
 */
export function calculateMarking(
  inputs: InputValues,
  calculations: CalculationResults
): MarkingResults {
  const feedback: string[] = [];
  let calculationMarks = 0;
  let accuracyMarks = 0;
  let dataQualityScore = 0;

  const allInputsProvided = Object.values(inputs).every(
    (value) => value !== undefined && !isNaN(value as number) && (value as number) > 0
  );

  if (allInputsProvided) {
    calculationMarks += 1;
    dataQualityScore += 10;
    feedback.push("✓ All required measurements recorded");
  }

  const calculationCount = Object.keys(calculations).length;
  if (calculationCount > 0) {
    calculationMarks += Math.min(calculationCount * 0.5, 2);
    dataQualityScore += Math.min(calculationCount * 5, 20);
    feedback.push(`✓ ${calculationCount} calculation(s) completed`);
  }

  return {
    calculationMarks: Math.min(calculationMarks, 3),
    accuracyMarks: Math.min(accuracyMarks, 2),
    totalMarks: Math.min(calculationMarks + accuracyMarks, 5),
    feedback,
    dataQualityScore: Math.min(dataQualityScore, 100),
  };
}