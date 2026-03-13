import { useEffect, useRef, useState } from "react";
import { Form, FormLabel } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // focus
  const focus = useRef();
  useEffect(() => {
    focus.current.focus();
  }, []);

  // handle submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      setLoading(false);
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  return (
    <>
      {loading && <LoadingSubmit />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <FormLabel>User Name</FormLabel>
          <Form.Control
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="name..."
            ref={focus}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <FormLabel>Email</FormLabel>
          <Form.Control
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <FormLabel>Password</FormLabel>
          <Form.Control
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <FormLabel>Role</FormLabel>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value="">
              Select Role:
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
            <option value="1999">Product Manager</option>
          </Form.Select>
        </Form.Group>
        <button
          disabled={
            name.length > 1 &&
            email.length > 1 &&
            password.length > 6 &&
            role !== ""
              ? false
              : true
          }
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
}
