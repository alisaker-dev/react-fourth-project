import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseURL, REGISTER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function Register() {
  //states
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  // navigate
  const navigate = useNavigate();
  // loading
  const [loading, setLoading] = useState(false);
  //error
  const [err, setErr] = useState("");
  //cookie
  const cookie = Cookie();
  // focus
  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);
  //handle form change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      setLoading(false);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      navigate("/dashboard/users", { replace: true });
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 422) {
        setErr("Email is already been taken!");
      } else {
        setErr("Internal server error!");
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
              <h1 style={{ marginBottom: "20px" }}>Register</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name..."
                  ref={focus}
                  required
                />
                <Form.Label>Name:</Form.Label>
              </Form.Group>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email..."
                  required
                />
                <Form.Label>Email:</Form.Label>
              </Form.Group>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput3"
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
              <button className="btn btn-primary">Regiseter</button>
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
                    <b>Sign up with google</b>
                  </p>
                </a>
              </div>
              <div className="mt-2">
                <p>
                  If you have an account
                  <a href="/login">
                    <b> login</b>
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
