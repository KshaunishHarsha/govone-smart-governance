'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing utility bill complaints in relation to community complaints.
 *
 * It includes:
 * - `analyzeUtilityBillComplaint` - A function to analyze utility bill complaints and flag them if there are related high-volume community complaints in the same area.
 * - `UtilityBillComplaintAnalysisInput` - The input type for the analyzeUtilityBillComplaint function.
 * - `UtilityBillComplaintAnalysisOutput` - The return type for the analyzeUtilityBillComplaint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UtilityBillComplaintAnalysisInputSchema = z.object({
  utilityType: z.string().describe('The type of utility (e.g., Electricity, Water).'),
  consumerId: z.string().describe('The consumer ID associated with the bill.'),
  billingArea: z.string().describe('The billing area or location.'),
  complaintDescription: z.string().describe('Description of the utility bill complaint.'),
  communityComplaintVolume: z.number().describe('The volume of community complaints in the same billing area.'),
});
export type UtilityBillComplaintAnalysisInput = z.infer<typeof UtilityBillComplaintAnalysisInputSchema>;

const UtilityBillComplaintAnalysisOutputSchema = z.object({
  flagForReview: z.boolean().describe('Whether the bill should be flagged for review due to related community complaints.'),
  reason: z.string().describe('The reason for flagging the bill, if applicable.'),
});
export type UtilityBillComplaintAnalysisOutput = z.infer<typeof UtilityBillComplaintAnalysisOutputSchema>;

export async function analyzeUtilityBillComplaint(input: UtilityBillComplaintAnalysisInput): Promise<UtilityBillComplaintAnalysisOutput> {
  return analyzeUtilityBillComplaintFlow(input);
}

const analyzeUtilityBillComplaintPrompt = ai.definePrompt({
  name: 'analyzeUtilityBillComplaintPrompt',
  input: {schema: UtilityBillComplaintAnalysisInputSchema},
  output: {schema: UtilityBillComplaintAnalysisOutputSchema},
  prompt: `You are an AI assistant for GovOne, tasked with analyzing utility bill complaints.

  Given a utility bill complaint with the following details:
  - Utility Type: {{{utilityType}}}
  - Consumer ID: {{{consumerId}}}
  - Billing Area: {{{billingArea}}}
  - Complaint Description: {{{complaintDescription}}}
  - Community Complaint Volume: {{{communityComplaintVolume}}}

  Determine whether the bill should be flagged for review based on the volume of community complaints in the same billing area. If the community complaint volume is high (e.g., greater than 10), it indicates a potential widespread billing issue. Return ` + '`flagForReview: true`' + ` and a ` + '`reason`' + ` explaining why.
  Otherwise, return ` + '`flagForReview: false`' + ` and an empty ` + '`reason`' + `.
  `,
});

const analyzeUtilityBillComplaintFlow = ai.defineFlow(
  {
    name: 'analyzeUtilityBillComplaintFlow',
    inputSchema: UtilityBillComplaintAnalysisInputSchema,
    outputSchema: UtilityBillComplaintAnalysisOutputSchema,
  },
  async input => {
    const {output} = await analyzeUtilityBillComplaintPrompt(input);
    return output!;
  }
);
