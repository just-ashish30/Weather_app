import React, { useState, useEffect } from "react";
import { auth } from "../Config/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🔐 Redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError("Google login failed");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (err) {
      setError("Failed to send reset email");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>🔒</div>

        <h2 style={styles.title}>Login Now</h2>

        <form onSubmit={handleLogin}>
          <label style={styles.label}>Email *</label>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label style={styles.label}>Password *</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={styles.error}>{error}</p>}
          {message && <p style={styles.success}>{message}</p>}

          <button style={styles.primaryBtn} type="submit">
            LOGIN
          </button>
        </form>

        <button style={styles.googleBtn} onClick={handleGoogleLogin}>
          Sign in with Google
        </button>

        <div style={styles.footer}>
          <Link to="/register" style={styles.link}>
            Don’t have an account?
          </Link>
          <span style={styles.forgot} onClick={handleForgotPassword}>
            Forgot password?
          </span>
        </div>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "360px",
    padding: "40px 30px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 10px 35px rgba(0, 0, 0, 0.12)",
    position: "relative",
  },
  iconWrapper: {
    width: "60px",
    height: "60px",
    background: "linear-gradient(135deg, #9D50BB, #6E48AA)",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    position: "absolute",
    top: "-30px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  title: {
    marginTop: "20px",
    marginBottom: "30px",
  },
  label: {
    display: "block",
    textAlign: "left",
    fontSize: "13px",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "25px",
    border: "1px solid #e0e0e0",
    marginBottom: "15px",
  },
  primaryBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "25px",
    border: "none",
    background: "#35b9d6",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  googleBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "25px",
    border: "none",
    background: "#db4437",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "12px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    fontSize: "13px",
  },
  link: {
    color: "#35b9d6",
    textDecoration: "none",
  },
  forgot: {
    color: "#888",
    cursor: "pointer",
  },
  error: {
    color: "#e74c3c",
    fontSize: "13px",
    marginBottom: "10px",
  },
  success: {
    color: "#2ecc71",
    fontSize: "13px",
    marginBottom: "10px",
  },
};

export default Login;
