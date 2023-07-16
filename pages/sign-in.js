import { useState } from "react";
import { auth, signIn } from "@/config/firebase";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      await router.push("/chat");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign in
      </Typography>
      <TextField
        fullWidth
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Typography
        align="center"
        sx={{ cursor: "pointer", paddingBottom: 1 }}
        onClick={() => router.push("/sign-up")}
      >
        Already have an account? Sign-up
      </Typography>
      <Button fullWidth variant="contained" onClick={handleLogin}>
        Login
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default Login;
