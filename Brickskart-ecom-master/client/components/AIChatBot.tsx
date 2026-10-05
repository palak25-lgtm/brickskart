import { useState } from "react";
import { Bot, X, Send } from "lucide-react";

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 👋 I'm the BricksKart Assistant. How can I help you with your construction project?",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: message,
      },
      {
        sender: "bot",
        text: "I'm your BricksKart Assistant. AI connection will be added in the next step!",
      },
    ]);

    setMessage("");
  };

  return (
    <>
      {/* CHAT WINDOW */}

      {isOpen && (
        <div className="fixed bottom-24 right-5 z-[100] w-[350px] overflow-hidden rounded-2xl bg-[#F7F1E7] shadow-2xl">

          {/* HEADER */}

          <div className="flex items-center justify-between bg-[#6E473B] px-5 py-4 text-[#F7F1E7]">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A66B] text-[#291C0E]">
                <Bot size={22} />
              </div>

              <div>
                <h3 className="font-bold">
                  BricksKart Assistant
                </h3>

                <p className="text-xs text-[#E1D4C2]">
                  Construction Help
                </p>
              </div>

            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 hover:bg-[#815547]"
            >
              <X size={20} />
            </button>

          </div>

          {/* MESSAGES */}

          <div className="h-[350px] space-y-3 overflow-y-auto p-4">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    msg.sender === "user"
                      ? "bg-[#6E473B] text-[#F7F1E7]"
                      : "bg-[#E1D4C2] text-[#291C0E]"
                  }`}
                >
                  {msg.text}
                </div>

              </div>

            ))}

          </div>

          {/* INPUT */}

          <div className="border-t border-[#D8C8B8] bg-white p-3">

            <div className="flex items-center gap-2">

              <input
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask about construction..."
                className="flex-1 rounded-xl border border-[#D8C8B8] bg-[#F7F1E7] px-4 py-3 text-sm text-[#291C0E] outline-none focus:border-[#6E473B]"
              />

              <button
                onClick={sendMessage}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6E473B] text-[#F7F1E7] transition hover:bg-[#815547]"
              >
                <Send size={18} />
              </button>

            </div>

          </div>

        </div>
      )}

      {/* FLOATING BUTTON */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-[100] flex h-16 w-16 items-center justify-center rounded-full bg-[#6E473B] text-[#F7F1E7] shadow-xl transition duration-300 hover:scale-110 hover:bg-[#815547]"
      >

        {isOpen ? (
          <X size={27} />
        ) : (
          <Bot size={27} />
        )}

      </button>
    </>
  );
};

export default AIChatBot;