// ===============================
// CodeMentor AI - learn.js
// ===============================

// Get Topic
const params = new URLSearchParams(window.location.search);
const topic = params.get("topic") || "Computer Science";

// Put your NEW Groq API Key here
const API_KEY = "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";

// ----------------------------
// Page Title
// ----------------------------

document.getElementById("topicTitle").textContent = topic;

document.getElementById("topicDesc").textContent =
`Learn everything about ${topic} with AI-powered explanations, notes and quizzes.`;

// ----------------------------
// AI Explanation
// ----------------------------

const aiBtn = document.getElementById("aiBtn");
const aiResponse = document.getElementById("aiResponse");

aiBtn.onclick = async ()=>{

    aiResponse.innerHTML="🤖 Generating explanation...";

    try{

        const response=await fetch(
        "https://api.groq.com/openai/v1/chat/completions",{

            method:"POST",

            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+API_KEY
            },

            body:JSON.stringify({

                model:"llama-3.1-8b-instant",

                messages:[

                    {

                        role:"system",

                        content:
                        "Explain Computer Science concepts simply. Use headings and bullet points. Keep under 150 words."

                    },

                    {

                        role:"user",

                        content:"Explain "+topic

                    }

                ]

            })

        });

        const data=await response.json();

        let answer=data.choices[0].message.content;

        answer=answer.replace(/\*\*/g,"");

        aiResponse.innerHTML=
        `
        <h2>🤖 AI Explanation</h2>
        <hr>
        <p>${answer.replace(/\n/g,"<br>")}</p>
        `;

    }

    catch(err){

        aiResponse.innerHTML="❌ AI Error";

    }

};

// ----------------------------
// Study Notes
// ----------------------------

const notesBtn=document.getElementById("notesBtn");

const notesBox=document.getElementById("notesBox");

notesBtn.onclick=async()=>{

    notesBox.innerHTML="📄 Generating Notes...";

    try{

        const response=await fetch(
        "https://api.groq.com/openai/v1/chat/completions",{

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                "Authorization":"Bearer "+API_KEY

            },

            body:JSON.stringify({

                model:"llama-3.1-8b-instant",

                messages:[

                    {

                        role:"system",

                        content:
`Generate beautiful study notes.

Include:

Definition

Key Points

Real World Example

ASCII Diagram

Interview Question

Revision Tips

No markdown.

Keep under 250 words.`

                    },

                    {

                        role:"user",

                        content:"Generate notes on "+topic

                    }

                ]

            })

        });

        const data=await response.json();

        let notes=data.choices[0].message.content;

        notes=notes.replace(/\*\*/g,"");

        notesBox.innerHTML=

        `
        <h2>📚 AI Study Notes</h2>

        <hr>

        <div>

        ${notes.replace(/\n/g,"<br>")}

        </div>

        `;

    }

    catch(err){

        notesBox.innerHTML="❌ Unable to Generate Notes";

    }

};

// ----------------------------
// AI Quiz Generator
// ----------------------------

const quizBtn=document.getElementById("quizBtn");

const quizBox=document.getElementById("quizBox");

quizBtn.onclick=async()=>{

    quizBox.innerHTML="📝 Generating Quiz...";

    try{

        const response=await fetch(
        "https://api.groq.com/openai/v1/chat/completions",{

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                "Authorization":"Bearer "+API_KEY

            },

            body:JSON.stringify({

                model:"llama-3.1-8b-instant",

                messages:[

                    {

                        role:"system",

                        content:
"Generate 5 MCQs with 4 options and mention the answer after each question."

                    },

                    {

                        role:"user",

                        content:
"Generate MCQ quiz on "+topic

                    }

                ]

            })

        });

        const data=await response.json();

        let quiz=data.choices[0].message.content;

        quiz=quiz.replace(/\*\*/g,"");

        quizBox.innerHTML=

        `
        <h2>📝 AI Quiz</h2>

        <hr>

        ${quiz.replace(/\n/g,"<br>")}

        `;

    }

    catch(err){

        quizBox.innerHTML="❌ Quiz Generation Failed";

    }

};

// ----------------------------
// PDF Download
// ----------------------------

const downloadBtn=document.getElementById("downloadPDF");

downloadBtn.onclick = () => {

    if(notesBox.innerText.trim()==""){

        alert("Generate Notes First!");
        return;
    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    const text = notesBox.innerText;

    doc.setFontSize(12);

    doc.text(text,10,10,{maxWidth:180});

    doc.save(topic+"_Notes.pdf");

};