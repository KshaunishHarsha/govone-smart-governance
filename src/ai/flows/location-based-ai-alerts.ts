'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating location-based AI alerts.
 *
 * The flow analyzes complaint data to identify high-priority issues in a user's location and
 * generates alerts to proactively inform citizens about these issues.
 *
 * @interface LocationBasedAIAlertsInput - Defines the input schema for the flow.
 * @interface LocationBasedAIAlertsOutput - Defines the output schema for the flow.
 * @function generateLocationBasedAIAlert - The main function to trigger the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LocationBasedAIAlertsInputSchema = z.object({
  location: z.string().describe('The location of the user (e.g., city or area).'),
  complaints: z.array(
    z.object({
      category: z.string(),
      subcategory: z.string(),
      description: z.string(),
      location: z.string(),
      upvotes: z.number(),
      status: z.string(),
    })
  ).describe('An array of complaint objects.'),
});

export type LocationBasedAIAlertsInput = z.infer<typeof LocationBasedAIAlertsInputSchema>;

const LocationBasedAIAlertsOutputSchema = z.object({
  alerts: z.array(
    z.string().describe('A list of alerts based on location and complaint data.')
  ).describe('A list of alerts.'),
});

export type LocationBasedAIAlertsOutput = z.infer<typeof LocationBasedAIAlertsOutputSchema>;

export async function generateLocationBasedAIAlert(input: LocationBasedAIAlertsInput): Promise<LocationBasedAIAlertsOutput> {
  return locationBasedAIAlertsFlow(input);
}

const locationBasedAIAlertsPrompt = ai.definePrompt({
  name: 'locationBasedAIAlertsPrompt',
  input: {schema: LocationBasedAIAlertsInputSchema},
  output: {schema: LocationBasedAIAlertsOutputSchema},
  prompt: `You are an AI assistant that analyzes citizen complaints and generates location-specific alerts.

  Given the following location: {{{location}}}
  And the following complaints: 
  {{#each complaints}}
  - Category: {{category}}, Subcategory: {{subcategory}}, Description: {{description}}, Location: {{location}}, Upvotes: {{upvotes}}, Status: {{status}}
  {{/each}}

  Identify any high-priority issues (e.g., potholes, garbage, etc.) based on the number of upvotes and generate a list of concise alerts.
  Only include alerts for issues in the given location.
`,
});

const locationBasedAIAlertsFlow = ai.defineFlow(
  {
    name: 'locationBasedAIAlertsFlow',
    inputSchema: LocationBasedAIAlertsInputSchema,
    outputSchema: LocationBasedAIAlertsOutputSchema,
  },
  async input => {
    const {output} = await locationBasedAIAlertsPrompt(input);
    return output!;
  }
);
