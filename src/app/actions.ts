'use server';

import {
  generateLocationBasedAIAlert,
  type LocationBasedAIAlertsInput,
} from '@/ai/flows/location-based-ai-alerts';
import {
  analyzeUtilityBillComplaint,
  type UtilityBillComplaintAnalysisInput,
} from '@/ai/flows/utility-bill-complaint-analysis';

export async function getAIAlerts(input: LocationBasedAIAlertsInput) {
  try {
    return await generateLocationBasedAIAlert(input);
  } catch (error) {
    console.error('Error generating AI alerts:', error);
    return { alerts: [] };
  }
}

export async function analyzeBill(input: UtilityBillComplaintAnalysisInput) {
  try {
    return await analyzeUtilityBillComplaint(input);
  } catch (error) {
    console.error('Error analyzing utility bill:', error);
    return { flagForReview: false, reason: 'AI analysis failed.' };
  }
}
