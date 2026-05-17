export type Experiment = {
  number: number;
  module: string;
  title: string;
  sections: ExperimentSection[];
};


export type ExperimentSection = {
  sectionNumber: number; 
  title: string;
  description?: string;
  isFinal? : boolean;


  inputs?: InputField[];
  calculations?: CalculationBlock[];
  warnings?: ValidationRule[];
};


export type InputField = {
  id: string;
  label: string;
  unit?: string;
  type?: "number" | "text";
  hint?: string;
  decimalPlaces?: number;
};


export type CalculationBlock = {
  label: string;
  formula: string;
  dependsOn: string[];
  outputUnit?: string;
  explanation?: string;
  expectedValue?: number;
  tolerance?: number;
  derivation?: string;
  userEnters?: boolean;
  userInputId?: string;
};


export type ValidationRule = {
  condition: string;
  message: string;
  severity: "warning" | "error";
};