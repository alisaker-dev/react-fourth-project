import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormLabel } from "react-bootstrap";
import { Axios } from "../../Api/Axios";
import { CAT, pro } from "../../Api/Api";
import LoadingSubmit from "../../Components/Loading/Loading";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    category: "select category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: "2",
    discount: "1",
    About: "About",
    stock: 0,
  };
  const [images, setImages] = useState([]);
  console.log(images);
  // id
  const [id, setId] = useState("");
  const ids = useRef([]);
  console.log(ids);

  const nav = useNavigate();
  const [categories, setCategories] = useState([]);
  const [sent, setSent] = useState(false);

  // upload
  const progress = useRef([]);
  console.log(progress);

  // foucs
  const focus = useRef("");
  const openImage = useRef("");
  useEffect(() => {
    focus.current.focus();
  }, []);
  function handleOpenImage() {
    openImage.current.click();
  }
  // get all categories
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  // handle edit
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${pro}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  // handle submit form
  async function handleSubmitForm() {
    try {
      const res = await Axios.post(`${pro}/add`, dummyForm);
      setId(res.data.id);
    } catch (err) {}
  }
  // handle change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(true);
    if (sent !== true) {
      handleSubmitForm();
    }
  }
  // handle images change
  const j = useRef(-1);
  async function handleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFiles = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imagesAsFiles.length; i++) {
      j.current++;
      data.append("image", imagesAsFiles[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`,
              );
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  // handle image delete
  async function handleImageDelete(id, img) {
    const findId = ids.current[id];
    try {
      const res = await Axios.delete(`product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((i) => i !== findId);
      j.current--;
    } catch (err) {
      console.log(err);
    }
  }

  // mapping
  const categoriesShow = categories.map((item, key) => (
    <option value={item.id} key={key}>
      {item.title}
    </option>
  ));

  const imagesShow = images.map((img, key) => (
    <div key={key} className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex aling-items-center justify-content-start gap-2">
          <img
            src={URL.createObjectURL(img)}
            width="80px"
            alt="product-image"
          ></img>
          <div>
            <p className="mb-1">{img.name}</p>
            <p>
              {img.size / 1024 < 900
                ? (img.size / 1024).toFixed(2) + "KB"
                : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <button
          onClick={() => handleImageDelete(key, img)}
          className="btn delete-btn"
        >
          Delete
        </button>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));
  return (
    <>
      {loading && <LoadingSubmit />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleEdit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <FormLabel>Category</FormLabel>
          <Form.Select
            name="category"
            value={form.category}
            onChange={handleChange}
            ref={focus}
          >
            <option disabled>select category</option>
            {categoriesShow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <FormLabel>Title</FormLabel>
          <Form.Control
            type="text"
            name="title"
            value={form.title}
            required
            onChange={handleChange}
            placeholder="Title..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <FormLabel>Description</FormLabel>
          <Form.Control
            type="text"
            name="description"
            value={form.description}
            required
            onChange={handleChange}
            placeholder="Description..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <FormLabel>Price</FormLabel>
          <Form.Control
            type="text"
            name="price"
            value={form.price}
            required
            onChange={handleChange}
            placeholder="Price..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
          <FormLabel>Discount</FormLabel>
          <Form.Control
            type="text"
            name="discount"
            value={form.discount}
            required
            onChange={handleChange}
            placeholder="Discount..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
          <FormLabel>About</FormLabel>
          <Form.Control
            type="text"
            name="About"
            value={form.About}
            required
            onChange={handleChange}
            placeholder="About..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
          <FormLabel>Stock</FormLabel>
          <Form.Control
            type="number"
            name="stock"
            value={form.stock}
            required
            onChange={handleChange}
            placeholder="Stock..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
          <FormLabel>Images</FormLabel>
          <Form.Control
            hidden
            multiple
            type="file"
            onChange={handleImagesChange}
            ref={openImage}
            disabled={!sent}
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className="d-flex align-items-center justify-content-center gap-2 py-2 rounded mb-2 w-100 flex-column"
          style={{
            border: !sent ? "2px dashed gray" : "2px dashed #0806fe",
            cursor: sent && "pointer",
          }}
        >
          <img
            src={require("../../Assets/upload.png")}
            alt="upload"
            width="100px"
            style={{ filter: !sent && "grayscale(1)" }}
          />
          <p
            className="fw-bold mb-0"
            style={{ color: !sent ? "gray" : "#0806fe" }}
          >
            Upload Images
          </p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {imagesShow}
        </div>
        <button
          disabled={form.title.length > 1 ? false : true}
          className="btn btn-primary mt-3"
        >
          Save
        </button>
      </Form>
    </>
  );
}
