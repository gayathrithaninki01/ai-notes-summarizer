const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const chatWithNotes = async (req, res) => {
  try {
    const { notes, question } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Answer only using the uploaded notes. If the answer is not present, say 'Not found in uploaded notes.'",
        },
        {
          role: "user",
          content: `
Uploaded Notes:
${notes}

Question:
${question}
          `,
        },
      ],
      model: "openai/gpt-oss-120b",
    });

    res.json({
      answer: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Chat failed",
    });
  }
};

module.exports = {
  chatWithNotes,
};