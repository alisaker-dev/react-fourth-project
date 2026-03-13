import { useEffect, useRef, useState } from "react";
import { Form, FormLabel } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { cat, USER } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";
import { replace, useNavigate, useParams } from "react-router-dom";

export default function Category() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  // id
  const { id } = useParams();
  // focus
  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${cat}/${id}`)
      .then((data) => {
        setLoading(true);
        setTitle(data.data.title);
        setImage(data.data.image);
      })
      .then(() => setDisable(false))
      .then(() => setLoading(false))
      .catch(() => nav("/dashboard/categories/page/404"), { replace: true });
  }, []);
  // handle submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${cat}/edit/${id}`, form);
      window.location.pathname = "/dashboard/categories";
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
          <FormLabel>Title</FormLabel>
          <Form.Control
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title..."
            ref={focus}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <FormLabel>Image</FormLabel>
          <Form.Control
            onChange={(e) => setImage(e.target.files.item(0))}
            type="file"
          />
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
