const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function summarize(text, mode = "summary") {
  let prompt = "";

  switch (mode) {
    case "summary":
      prompt = `
You are an AI Notes Summarizer.

Generate:
📖 Summary
Explain the notes in simple student-friendly language.

⭐ Key Points
List 5-10 important points.

📚 Important Definitions
Mention important definitions with short explanations.
`;
      break;

    case "exam":
      prompt = `
You are an AI Exam Preparation Assistant.

Generate:

📖 Short Summary

⭐ Key Points

📚 Important Definitions

📝 Important Exam Questions

💡 Tips for Exam Preparation
`;
      break;

    case "viva":
      prompt = `
You are an AI Viva Preparation Assistant.

Generate:

📖 Short Summary

🎤 10 Viva Questions

✅ Answers for each Viva Question
`;
      break;

    case "mcq":
      prompt = `
You are an AI MCQ Generator.

Generate 10 Multiple Choice Questions.

Each question should have:

A)

B)

C)

D)

Mention the correct answer after each question.
`;
      break;

    case "flashcards":
      prompt = `
You are an AI Flashcard Generator.

Create flashcards in this format:

Question:
Answer:

Generate at least 10 flashcards.
`;
      break;

    default:
      prompt = `
Summarize the uploaded notes in simple student-friendly language.
`;
  }

  const chatCompletion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return chatCompletion.choices[0].message.content;
}

module.exports = summarize;