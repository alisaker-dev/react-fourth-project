import { useEffect, useRef, useState } from "react";
import { Form, FormLabel } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { cat } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";

export default function AddCategories() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(false);
  // foucs
  const focus = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);

  // handle submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${cat}/add`, form);
      setLoading(false);
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
            placeholder="Title..."
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
        <button
          disabled={title.length > 1 ? false : true}
          className="btn btn-primary"
        >
          Save
        </button>
      </Form>
    </>
  );
}
