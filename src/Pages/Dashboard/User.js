import { useEffect, useState } from "react";
import { Form, FormLabel } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { replace, useNavigate, useParams } from "react-router-dom";

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  // id
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}/${id}`)
      .then((data) => {
        setLoading(true);
        setName(data.data.name);
        setEmail(data.data.email);
        setRole(data.data.role);
      })
      .then(() => setDisable(false))
      .then(() => setLoading(false))
      .catch(() => nav("/dashboard/users/page/404"), { replace: true });
  }, []);
  // handle submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });
      window.location.pathname = "/dashboard";
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
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
