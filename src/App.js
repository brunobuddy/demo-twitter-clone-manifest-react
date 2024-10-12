import "./App.css";
import Manifest from "@mnfst/sdk";
import { useEffect, useState } from "react";

function App() {
  // Import the Manifest SDK and create a new instance.
  const manifest = new Manifest();

  // Create a state to store the tweets.
  const [tweets, setTweet] = useState([]);

  useEffect(() => {
    // Fetch the tweets and the user who created the tweet.
    manifest
      .from("tweets")
      .with(["user"])
      .find()
      .then((tweets) => {
        setTweet(tweets.data);
      });
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "10px" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {tweets.map((tweet) => (
          <li
            key={tweet.createdAt}
            style={{
              border: "1px solid #e1e8ed",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={
                  manifest.baseUrl.replace("api", "storage") +
                  "/" +
                  tweet.user.avatar.thumbnail
                }
                alt={`${tweet.user.name}'s avatar`}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <div>
                <strong>{tweet.user.name}</strong>
                <br />
                <span style={{ color: "gray", fontSize: "12px" }}>
                  {new Date(tweet.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
            <p style={{ marginTop: "10px", marginBottom: "0" }}>
              {tweet.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
