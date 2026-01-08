import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResponse, ValidationStatus, UploadedFile } from "../types";
import { SYSTEM_BEHAVIOR, TECHNICAL_CHECKLIST } from "../constants";

export const analyzeApplication = async (
  files: UploadedFile[]
): Promise<AnalysisResponse> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found");
    }

    const ai = new GoogleGenAI({ apiKey });

    // Define the schema for structured JSON output
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        summary: { 
          type: Type.STRING,
          description: "Formal summary of the application status, citing compliance with Articles 17-26."
        },
        issues: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              ruleId: { type: Type.STRING, description: "Technical ID of the check" },
              ruleName: { type: Type.STRING, description: "Human-readable name of the regulation" },
              status: { type: Type.STRING, enum: Object.values(ValidationStatus) },
              message: { type: Type.STRING, description: "Detailed explanation of compliance or failure, citing Art. numbers" },
              detectedValue: { type: Type.STRING, description: "The specific text or evidence found in documents" },
              suggestion: { type: Type.STRING, description: "Remedial action required if non-compliant" },
              relatedFileNames: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Filenames where evidence was found" 
              }
            },
            required: ["ruleId", "ruleName", "status", "message"]
          }
        }
      },
      required: ["summary", "issues"]
    };

    // Construct the task parts
    const parts: any[] = [
      { 
        text: `TECHNICAL VALIDATION CHECKLIST (REFERENCE MANUAL):\n${TECHNICAL_CHECKLIST}` 
      },
      { 
        text: `TASK INSTRUCTIONS:
1. Validate the following ${files.length} documents against the checklist.
2. PERFORM DESCRIPTION-TO-DRAWING AUDIT:
   - Carefully extract the "Description of Proposed Development" from the application form (Art 22) or the newspaper notice (Art 18).
   - List every component mentioned (e.g., "attic conversion", "rear extension", "new window to side", "garage demolition").
   - CROSS-REFERENCE: For every component mentioned, verify that a corresponding drawing exists. If "attic conversion" is mentioned but there is no floor plan showing the attic level, mark as NON_COMPLIANT under Art. 23(1)(b).
3. PERFORM CROSS-DOCUMENT CONSISTENCY CHECKS:
   - Check if floor plans are mislabelled. If you find multiple documents titled "Existing Floor Plan" but they show different internal layouts, one is likely mislabelled.
   - Flag naming contradictions as NON_COMPLIANT under Art. 23(1)(e).
4. Be pedantic and strict. Fail the application if the plans do not visually support the written description.` 
      }
    ];

    // Add document parts
    files.forEach(file => {
      parts.push({ text: `DOCUMENT: ${file.name} (${file.type})` });
      parts.push({
        inlineData: {
          mimeType: file.type,
          data: file.content
        }
      });
    });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: parts
      },
      config: {
        systemInstruction: SYSTEM_BEHAVIOR,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as AnalysisResponse;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      summary: "An error occurred during technical validation. Please check your network connection and try again.",
      issues: []
    };
  }
};