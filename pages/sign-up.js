import { useState } from "react";
import { auth, signUp } from "@/config/firebase";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await signUp(email, password);
      await router.push("/sign-in");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign up
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
      <Button fullWidth variant="contained" onClick={handleSignup}>
        Create Account
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default Login;
