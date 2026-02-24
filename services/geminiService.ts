
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || 'dummy_key'
});

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

export async function generateFlashcards(topic: string, existingQuestions: string[]): Promise<any> {
    const prompt = `Create a set of 50 flashcards for the topic: "${topic}".
Each flashcard must have a 'question' and a concise 'answer'.
The questions should cover key concepts of the topic, suitable for someone studying for an exam.
IMPORTANT: Do not generate any questions from the following list, they have already been created: ${existingQuestions.join('; ')}`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        flashcards: {
                            type: Type.ARRAY,
                            description: "An array of 50 flashcard objects.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: {
                                        type: Type.STRING,
                                        description: "The question for the flashcard.",
                                    },
                                    answer: {
                                        type: Type.STRING,
                                        description: "The concise answer to the question.",
                                    }
                                },
                                required: ["question", "answer"]
                            }
                        }
                    },
                    required: ["flashcards"]
                },
            },
        });

        const jsonResponse = JSON.parse(response.text);
        return jsonResponse.flashcards;
    } catch (error) {
        console.error("Gemini API call failed for flashcards:", error);
        throw new Error("Failed to generate flashcards from Gemini API.");
    }
}