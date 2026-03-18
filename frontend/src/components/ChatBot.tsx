import { useState } from "react";

export default function ChatBot() {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input) return;

        const userMessage = input;

        setMessages((prev) => [...prev, "You: " + userMessage]);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await res.json();

        setMessages((prev) => [...prev, "Bot: " + data.reply]);
        setInput("");
    };

    return (
        <div className="fixed bottom-5 right-5 w-80 bg-white shadow-xl p-4 rounded-xl">
            <div className="h-64 overflow-y-auto mb-2">
                {messages.map((m, i) => (
                    <p key={i}>{m}</p>
                ))}
            </div>

            <input
                className="border p-2 w-full"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
            />

            <button
                className="bg-blue-500 text-white p-2 mt-2 w-full"
                onClick={sendMessage}
            >
                Send
            </button>
        </div>
    );
}