export interface Experiment11Feedback {
  accuracyMarks: number;
  dataQualityScore: number;
  feedback: string[];
}

export function calculateExperiment11Feedback(calculations: Record<string, number>): Experiment11Feedback {
  let accuracyMarks = 0;
  let dataQualityScore = 0;
  const feedback: string[] = [];

  // Toluene density accuracy
  if (calculations.density_of_toluene) {
    const density = calculations.density_of_toluene;
    if (density >= 0.852 && density <= 0.882) {
      accuracyMarks += 1;
      dataQualityScore += 15;
      feedback.push(`✓ Toluene density ${density.toFixed(3)} g/cm³ within expected range (0.867 g/cm³)`);
    } else if (density >= 0.837 && density <= 0.897) {
      accuracyMarks += 0.5;
      dataQualityScore += 10;
      feedback.push(`⚠ Toluene density ${density.toFixed(3)} g/cm³ slightly outside expected range (0.852-0.882 g/cm³)`);
    } else {
      feedback.push(`✗ Toluene density ${density.toFixed(3)} g/cm³ outside expected range (0.852-0.882 g/cm³, expected 0.867 g/cm³)`);
    }
  }

  // NaCl density accuracy
  if (calculations.density_of_nacl) {
    const density = calculations.density_of_nacl;
    if (density >= 2.10 && density <= 2.22) {
      accuracyMarks += 1;
      dataQualityScore += 15;
      feedback.push(`✓ NaCl density ${density.toFixed(3)} g/cm³ within expected range (2.16 g/cm³)`);
    } else if (density >= 2.04 && density <= 2.28) {
      accuracyMarks += 0.5;
      dataQualityScore += 10;
      feedback.push(`⚠ NaCl density ${density.toFixed(3)} g/cm³ slightly outside expected range (2.10-2.22 g/cm³)`);
    } else {
      feedback.push(`✗ NaCl density ${density.toFixed(3)} g/cm³ outside expected range (2.10-2.22 g/cm³, expected 2.16 g/cm³)`);
    }
  }

  // Na+ radius accuracy
  if (calculations.radius_of_na_ion) {
    const naRadius = calculations.radius_of_na_ion;
    if (naRadius >= 0.95 && naRadius <= 1.10) {
      accuracyMarks += 1;
      dataQualityScore += 15;
      feedback.push(`✓ Na radius ${naRadius.toFixed(2)} Å within expected range (1.02 Å)`);
    } else if (naRadius >= 0.90 && naRadius <= 1.15) {
      accuracyMarks += 0.5;
      dataQualityScore += 10;
      feedback.push(`⚠ Na radius ${naRadius.toFixed(2)} Å slightly outside expected range (0.95-1.10 Å)`);
    } else {
      feedback.push(`✗ Na radius ${naRadius.toFixed(2)} Å outside expected range (0.95-1.10 Å, expected 1.02 Å)`);
    }
  }

  // KCl density accuracy
  if (calculations.density_of_kcl) {
    const density = calculations.density_of_kcl;
    if (density >= 1.92 && density <= 2.04) {
      accuracyMarks += 1;
      dataQualityScore += 15;
      feedback.push(`✓ KCl density ${density.toFixed(3)} g/cm³ within expected range (1.98 g/cm³)`);
    } else if (density >= 1.86 && density <= 2.10) {
      accuracyMarks += 0.5;
      dataQualityScore += 10;
      feedback.push(`⚠ KCl density ${density.toFixed(3)} g/cm³ slightly outside expected range (1.92-2.04 g/cm³)`);
    } else {
      feedback.push(`✗ KCl density ${density.toFixed(3)} g/cm³ outside expected range (1.92-2.04 g/cm³, expected 1.98 g/cm³)`);
    }
  }

  // K+ radius accuracy
  if (calculations.radius_of_k_ion) {
    const kRadius = calculations.radius_of_k_ion;
    if (kRadius >= 1.30 && kRadius <= 1.46) {
      accuracyMarks += 1;
      dataQualityScore += 15;
      feedback.push(`✓ K radius ${kRadius.toFixed(2)} Å within expected range (1.38 Å)`);
    } else if (kRadius >= 1.25 && kRadius <= 1.50) {
      accuracyMarks += 0.5;
      dataQualityScore += 10;
      feedback.push(`⚠ K radius ${kRadius.toFixed(2)} Å slightly outside expected range (1.30-1.46 Å)`);
    } else {
      feedback.push(`✗ K radius ${kRadius.toFixed(2)} Å outside expected range (1.30-1.46 Å, expected 1.38 Å)`);
    }
  }

  return { accuracyMarks, dataQualityScore, feedback };
}