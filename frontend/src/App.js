import { useEffect, useState } from "react";
import api from "./api/api";

function App() {
  const [msg, setMsg] = useState("loading...");

  useEffect(() => {
    api.get("/customers/hello")
      .then(response => {
        console.log("API response:", response.data);
        setMsg(response.data || "Empty response");
      })
      .catch(error => {
        console.error("Error to connect:", error);
        setMsg("Error to get data");
      });
  }, []);

  return (
    <div>
      <h1>Front and Back connection</h1>
      <p>API Response: {msg}</p>
    </div>
  );
}

export default App;
