
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateStudyNotes(topic: string): Promise<string> {
  const prompt = `Generate a comprehensive, well-structured study guide for the topic: "${topic}".
  Use markdown-style headings, bullet points, and bold text to organize the information clearly.
  The guide should be detailed enough for someone preparing for an examination on this subject.
  Start with a brief introduction to the topic.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed for notes:", error);
    throw new Error("Failed to generate study notes from Gemini API.");
  }
}

export async function generateQuiz(topic: string): Promise<any> {
    const prompt = `Create a 5-question multiple-choice quiz on the topic: "${topic}". For each question, provide 4 distinct options and clearly indicate the correct answer. The questions should test key concepts of the topic.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        quiz: {
                            type: Type.ARRAY,
                            description: "An array of 5 quiz questions.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: {
                                        type: Type.STRING,
                                        description: "The question text.",
                                    },
                                    options: {
                                        type: Type.ARRAY,
                                        description: "An array of 4 possible answers.",
                                        items: {
                                            type: Type.STRING
                                        }
                                    },
                                    correctAnswer: {
                                        type: Type.STRING,
                                        description: "The correct answer text, must be one of the provided options."
                                    }
                                },
                                required: ["question", "options", "correctAnswer"]
                            }
                        }
                    },
                    required: ["quiz"]
                },
            },
        });

        const jsonResponse = JSON.parse(response.text);
        return jsonResponse.quiz;
    } catch (error) {
        console.error("Gemini API call failed for quiz:", error);
        throw new Error("Failed to generate quiz from Gemini API.");
    }
}
