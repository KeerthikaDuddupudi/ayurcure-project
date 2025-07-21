import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
console.log("🔍 API KEY loaded:", API_KEY)

export async function getRemedySuggestion(symptom) {
  if (!API_KEY) {
    throw new Error("❌ API key is missing. Check your .env file.")
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Suggest an Ayurvedic remedy for: ${symptom}.
Include plant, part used, preparation, dosage, and caution.`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0].message.content
  } catch (error) {
    console.error("❌ OpenAI API Error:", error.response || error.message)
    throw new Error("Failed to fetch remedy suggestion. Check browser console.")
  }
}
