import React, { useState, useMemo, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAppContext } from "@/state/appState";
import { useRouter } from "next/navigation";

const TextEditor = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [text, setText] = useState("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const { state, dispatch } = useAppContext();
  const supabase = createClientComponentClient();
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "formula"],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  const [isListening, setIsListening] = useState(false);

  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    let recognitionInstance;

    const startSpeechRecognition = () => {
      recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setValue((prevValue) => prevValue + ' ' + result);

        // Store recognized speech in a variable
        setRecognizedSpeech(result);
        console.log("Recognized Speech:", result);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionInstance.start();
      setIsListening(true);
    };

    const stopSpeechRecognition = () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
        setIsListening(false);
      }
    };

    if (isListening) {
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
    }

    return () => {
      if (recognitionInstance) {
        stopSpeechRecognition();
      }
    };
  }, [isListening]);

  const [recognizedSpeech, setRecognizedSpeech] = useState("");

  const toggleSpeechRecognition = () => {
    setIsListening((prev) => !prev);
  };

  const handleSave = () => {
    const plainText = stripHtml(value);
    setText(plainText);
    console.log("Content saved:", plainText);
  };

  const handleChat = () => {
    router.push(`/chat?message=${encodeURIComponent(text)}`);
  };

  const stripHtml = (html) => {
    var doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left side: PDF Viewer */}
      <div style={{ flex: "1", borderRight: "1px solid #ccc", padding: "10px" }}>
        {/* Add your PDF viewer component here */}
        {/* Example: */}
        <iframe
          src="https://example.com/your-pdf-document.pdf"
          title="PDF Viewer"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Right side: Text Editor */}
      <div style={{ flex: "1", padding: "10px" }}>
        <ReactQuill modules={module} theme="snow" value={value} onChange={setValue} />
        <div className="items flex justify-center items-center">
          <Button style={{ padding: '20px', margin: '10px' }} onClick={handleSave}>
            Save
          </Button>
          <Button style={{ padding: '20px', margin: '10px' }} onClick={handleChat}>
            Ask AI
          </Button>
          <Button style={{ padding: '20px', margin: '10px' }} onClick={toggleSpeechRecognition}>
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
