const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Replace with your Groq API Key
const API_KEY = "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";

sendBtn.onclick = async () => {

    const question = input.value.trim();

    if (question === "") return;

    // Display User Message
    chatBox.innerHTML += `
        <div class="user-msg">
            <b>👤 You:</b><br>
            ${question}
        </div>
    `;

    input.value = "";

    // Loading Message
    chatBox.innerHTML += `
        <div class="ai-msg" id="loading">
            🤖 CS Mentor AI is thinking...
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + API_KEY
                },

                body: JSON.stringify({

                    model: "llama-3.1-8b-instant",

                    messages: [
                        {
                            role: "system",
                            content: `You are a Computer Science Mentor.

Explain concepts in simple words.

Rules:
- Keep answers under 150 words.
- Use short paragraphs.
- Use bullet points if needed.
- Do NOT use ** or ## markdown.
- Give one real-world example at the end.`
                        },

                        {
                            role: "user",
                            content: question
                        }
                    ]

                })

            }
        );

        const data = await response.json();

        let answer = data.choices[0].message.content;

        // Remove markdown
        answer = answer.replace(/\*\*/g, "");
        answer = answer.replace(/##/g, "");
        answer = answer.replace(/\*/g, "");

        // Replace loading message
        document.getElementById("loading").remove();

        // Show AI response
        chatBox.innerHTML += `
            <div class="ai-msg">
                <b>🤖 CS Mentor AI:</b><br><br>
                ${answer.replace(/\n/g, "<br>")}
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {

        document.getElementById("loading").remove();

        chatBox.innerHTML += `
            <div class="ai-msg">
                ❌ Error connecting to AI.
                <br><br>
                Please check your API key or internet connection.
            </div>
        `;

        console.log(error);

    }

};

// Press Enter to send
input.addEventListener("keypress", function(e) {

    if (e.key === "Enter") {

        sendBtn.click();

    }

});