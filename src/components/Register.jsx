import React, { useState } from "react";
import { auth } from "../Config/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleRegister = async (data) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(result.user, {
        displayName: data.name,
        photoURL: preview || null,
      });

      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        {/* PROFILE IMAGE */}
        <div style={styles.avatarBox}>
          <img
            src={preview || "https://i.pravatar.cc/100"}
            alt="avatar"
            style={styles.avatar}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            style={styles.fileInput}
          />
        </div>

        <form onSubmit={handleSubmit(handleRegister)}>
          <input
            style={styles.input}
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p style={styles.error}>{errors.name.message}</p>}

          <input
            style={styles.input}
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && <p style={styles.error}>{errors.email.message}</p>}

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message:
                  "Must include upper, lower, number & special character",
              },
            })}
          />
          {errors.password && (
            <p style={styles.error}>{errors.password.message}</p>
          )}

          <button style={styles.primaryBtn} type="submit">
            Register
          </button>
        </form>

        <button style={styles.googleBtn} onClick={handleGoogleRegister}>
          Sign up with Google
        </button>

        <p style={styles.text}>
          Already have an account?
          <Link to="/login" style={styles.link}> Login here</Link>
        </p>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "360px",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
    textAlign: "center",
  },
  title: {
    marginBottom: "15px",
  },
  avatarBox: {
    marginBottom: "20px",
  },
  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "8px",
  },
  fileInput: {
    fontSize: "12px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "6px",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },
  error: {
    color: "#e74c3c",
    fontSize: "13px",
    marginBottom: "10px",
    textAlign: "left",
  },
  primaryBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    borderRadius: "10px",
    border: "none",
    fontWeight: "bold",
  },
  googleBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#db4437",
    color: "#fff",
    borderRadius: "10px",
    border: "none",
    marginTop: "12px",
  },
  text: {
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#4CAF50",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default Register;
