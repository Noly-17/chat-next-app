import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, db, ref, onValue, set, get } from "@/config/firebase";
import {
  Container,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
} from "@mui/material";
import Navbar from "@/component/nav";

const Chat = ({ initialMessages }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [user, router]);

  useEffect(() => {
    const messages = ref(db, "messages/");

    onValue(messages, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data);
        setMessages(messageList);
      }
    });

    return () => messages;
  }, []);

  const handleSendMessage = () => {
    set(ref(db, `messages/` + Date.now()), {
      text: message,
      timestamp: Date.now(),
      sender: user.uid,
      email: user.email,
    });
    setMessage("");
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <>
      <Navbar handleLogout={handleLogout} header={user ? user.email : ""} />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          CHAT ROOM
        </Typography>
        <List>
          {messages.map((msg) => (
            <ListItem
              key={msg.timestamp}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.sender === user?.uid ? "end" : "start",
                padding: "10px",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    height: 20,
                    width: 20,
                    backgroundColor: msg.sender === user?.uid ? "black" : "red",
                    borderRadius: 10,
                    marginRight: 1,
                  }}
                ></Typography>
                {msg.sender === user?.uid ? "You" : msg.email}{" "}
                {new Date(msg.timestamp).toLocaleTimeString()}
              </Typography>
              <Typography variant="body1" sx={{ marginLeft: 2 }}>
                {msg.text}
              </Typography>
            </ListItem>
          ))}
        </List>
        <TextField
          fullWidth
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button variant="contained" onClick={handleSendMessage} sx={{ mt: 2 }}>
          Send
        </Button>
      </Container>
    </>
  );
};

export async function getServerSideProps() {
  const messages = ref(db, "messages/");
  const snapshot = await get(messages);
  const data = snapshot.val();
  const initialMessages = data ? Object.values(data) : [];

  return {
    props: {
      initialMessages,
    },
  };
}

export default Chat;
