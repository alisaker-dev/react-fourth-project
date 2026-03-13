import { useEffect, useRef, useState } from "react";
import axios from "axios";
import LoadingSubmit from "../../Components/Loading/Loading";
import { baseURL, LOGIN } from "../../Api/Api";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";

export default function Login() {
  //states
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // foucs
  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);

  const cookie = Cookie();
  //handle form change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, {
        email: form.email,
        password: form.password,
      });
      setLoading(false);
      const token = res.data.token;
      const role = res.data.user.role;
      const go = role === "1995" ? "users" : "writer";
      cookie.set("e-commerce", token);
      window.location.pathname = `/dashboard/${go}`;
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("Wrong Email Or Password");
      } else {
        setErr("Internal Server Error!");
      }
    }
  }
  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1 style={{ marginBottom: "20px" }}>Login</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email..."
                  required
                  ref={focus}
                />
                <Form.Label>Email:</Form.Label>
              </Form.Group>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password..."
                  minLength="6"
                  required
                />
                <Form.Label>Password:</Form.Label>
              </Form.Group>
              <button className="btn btn-primary">Login</button>
              <div className="google-btn">
                <a href="http://127.0.0.1:8000/login-google">
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src={require("../../Google_logo.svg").default}
                      alt="sign in with google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </a>
              </div>
              <div className="mt-2">
                <p>
                  If you don't have an account
                  <a href="/register">
                    <b> register</b>
                  </a>
                </p>
              </div>
              {err !== "" && <span className="error">{err}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
