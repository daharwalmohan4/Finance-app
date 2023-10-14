import React, { useState } from "react";
import "./style.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  function googleAuth() {
    setLoading(true);
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("user>>>", user);
      setLoading(false)
      toast.success("Login Success")
      createDoc(user)
      navigate("/dashboard")
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      setLoading(false)
      toast.error(errorMessage)


      // ...
    });
    try {
      
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
      console.log(error)
    }

   


  }

  function signupWithEmail() {
    setLoading(true);
    console.log(
      "name",
      name,
      "email",
      email,
      "pw",
      password,
      "cpw",
      confirmPassword
    );

    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("user", user);
            toast.success("User created");
            setLoading(false);
            setName("");
            setConfirmPassword("");
            setEmail("");
            setPassword("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Passwords are not matched");
      }
    } else {
      toast.error("All fields are mandatory");
      console.log("Please enter all required fields");
      setLoading(false);
    }
  }
  async function createDoc(user) {
    //make sure that the doc with the uid dones not already
    //create doc
    setLoading(true)
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created");
        setLoading(false)
      } catch (error) {
        toast.error(error.message);
        setLoading(false)
      }
    } else {
      toast.error("doc already exists");
      setLoading(false)
    }
  }

  function loginWithEmail() {
    setLoading(true);
    console.log("email", email);
    console.log("password", password);

    if (password !== "" && email !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In in");
          console.log("User Logged in", user);
          setLoading(false);
          setEmail("");
          setPassword("");
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("Email and password are required");
      setLoading(false);
    }
  }
  return (
    <>
      {loginForm ? (
        <>
          <div className="signup-wrapper">
            <h2 className="title">
              Login on <span style={{ color: "var(--theme)" }}>Financly.</span>
            </h2>
            <form action="">
              <Input
                label={"Email"}
                state={email}
                setSate={setEmail}
                placeholder={"example@gmail.com"}
                type="text"
              />
              <Input
                label={"password"}
                state={password}
                setSate={setPassword}
                placeholder={"Password123"}
                type="password"
              />

              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Login using Email and Password"}
                onClick={loginWithEmail}
                blue={false}
              />
              <p style={{ textAlign: "center", margin: "0" }}>Or</p>
              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Login with Google"}
                onClick={googleAuth}
                blue={true}
              />
              <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
                Don't have An Account Already? Click here
              </p>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="signup-wrapper">
            <h2 className="title">
              Sign Up on{" "}
              <span style={{ color: "var(--theme)" }}>Financly.</span>
            </h2>
            <form action="">
              <Input
                label={"Full Name"}
                state={name}
                setSate={setName}
                placeholder={"John Doe"}
                type="text"
              />
              <Input
                label={"Email"}
                state={email}
                setSate={setEmail}
                placeholder={"example@gmail.com"}
                type="text"
              />
              <Input
                label={"password"}
                state={password}
                setSate={setPassword}
                placeholder={"Password123"}
                type="password"
              />
              <Input
                label={"confirmPassword"}
                state={confirmPassword}
                setSate={setConfirmPassword}
                placeholder={"Password123"}
                type="password"
              />
              <Button
                disabled={loading}
                text={
                  loading ? "Loading..." : "Signup using Email and Password"
                }
                onClick={signupWithEmail}
                blue={false}
              />
              <p style={{ textAlign: "center", margin: "0" }}>Or</p>
              <Button
                disabled={loading}
                text={loading ? "Loading..." : "Signup with Google"}
                onClick={googleAuth}
                blue={true}
              />
              <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
                Already have Account? Click here
              </p>
            </form>
          </div>
        </>
      )}
      {/* <div className="signup-wrapper">
        <h2 className="title">
          Sign Up on <span style={{ color: "var(--theme)" }}>Financly.</span>
        </h2>
        <form action="">
          <Input
            label={"Full Name"}
            state={name}
            setSate={setName}
            placeholder={"John Doe"}
            type="text"
          />
          <Input
            label={"Email"}
            state={email}
            setSate={setEmail}
            placeholder={"example@gmail.com"}
            type="text"
          />
          <Input
            label={"password"}
            state={password}
            setSate={setPassword}
            placeholder={"Password123"}
            type="password"
          />
          <Input
            label={"confirmPassword"}
            state={confirmPassword}
            setSate={setConfirmPassword}
            placeholder={"Password123"}
            type="password"
          />
          <Button
            disabled={loading}
            text={loading ? "Loading..." : "Signup using Email and Password"}
            onClick={signupWithEmail}
            blue={false}
          />
          <p style={{ textAlign: "center", margin: "0" }}>Or</p>
          <Button
            disabled={loading}
            text={loading ? "Loading..." : "Signup with Google"}
            onClick={handleSubmit}
            blue={true}
          />
        </form>
      </div> */}
    </>
  );
}

export default SignupSigninComponent;
