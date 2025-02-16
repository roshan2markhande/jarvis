import { pipeline } from "@xenova/transformers";

let generator;

// Load the model once
async function loadModel() {
  console.log("Loading model...");
  generator = await pipeline("text-generation", "Xenova/distilgpt2");
  console.log("Model loaded successfully!");
}

// Function to generate AI responses
export async function generateText(prompt) {
  if (!generator) {
    await loadModel();
  }

  const result = await generator(prompt, { max_new_tokens: 100 });
  return result[0].generated_text;
}
