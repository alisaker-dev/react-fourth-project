import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "./Pagination/Pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import TransformDate from "../../helpers/TransformDate";

export default function TableShow(props) {
  const currentUser = props.currentUser || { name: "" };
  const [search, setSearch] = useState("");
  const [filteredData, setFiltered] = useState([]);
  const [date, setDate] = useState("");
  console.log(date);
  const filteredDataByDate = props.data.filter(
    (item) => TransformDate(item.created_at) === date,
  );
  console.log(filteredDataByDate);
  const filteredSearchByDate = filteredData.filter(
    (item) => TransformDate(item.created_at) === date,
  );
  const showWhichData =
    search.length > 0 && !date
      ? filteredData
      : date && search.length === 0
        ? filteredDataByDate
        : search.length > 0 && date
          ? filteredSearchByDate
          : props.data;
  TransformDate("2026-02-06T20:23:39.000000Z");
  const [searchLoading, setSearchLoading] = useState(false);
  console.log(searchLoading);
  // pagination without back end:
  // const start = (props.page - 1) * props.limit;
  // const end = Number(start) + Number(props.limit);
  // const final = props.data.slice(start, end);

  async function getSearchedData() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`,
      );
      setFiltered(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }
  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);
    return () => clearTimeout(debounce);
  }, [search]);

  // header show
  const headerShow = props.header.map((item, key) => (
    <th key={key}>{item.name}</th>
  ));
  // body show
  const dataShow = showWhichData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((item2, key) => (
        <td key={key}>
          {item2.k === "image" ? (
            <img style={{ width: "50px" }} src={item[item2.k]} alt="img" />
          ) : item2.k === "images" ? (
            <div className="d-flex align-items-center justify-content-start gap-2 flex-wrap">
              {item[item2.k].map((img, key) => (
                <img
                  key={key}
                  className=""
                  width="50px"
                  src={img.image}
                  alt="img"
                />
              ))}
            </div>
          ) : item2.k === "created_at" || item2.k === "updated_at" ? (
            TransformDate(item[item2.k])
          ) : item[item2.k] === "1995" ? (
            "Admin"
          ) : item[item2.k] === "2001" ? (
            "User"
          ) : item[item2.k] === "1996" ? (
            "Writer"
          ) : item[item2.k] === "1999" ? (
            "Product Manager"
          ) : (
            item[item2.k]
          )}
          {currentUser && item[item2.k] === currentUser.name && "(You)"}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon size="x" icon={faPenToSquare} />
          </Link>
          {currentUser.name !== item.name && (
            <FontAwesomeIcon
              onClick={() => props.delete(item.id)}
              cursor="pointer"
              size="x"
              color="red"
              icon={faTrash}
            />
          )}
        </div>
      </td>
    </tr>
  ));
  // return data
  return (
    <>
      <div className="col-3">
        <Form.Control
          className="my-2"
          type="search"
          aria-label="input example"
          placeholder="SEARCH"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
        />
      </div>
      <div className="col-5">
        <Form.Control
          className="my-2"
          type="date"
          aria-label="input example"
          placeholder="SEARCH"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            {headerShow}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {((props.data.length === 0 && filteredData.length === 0) ||
            searchLoading) && (
            <tr className="text-center">
              <td colSpan={12}>Loading...</td>
            </tr>
          )}
          {dataShow}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-end flex-wrap">
        <div className="col-1">
          <Form.Select
            onChange={(e) => props.setLimit(e.target.value)}
            aria-label="Default select example"
          >
            <option>open this select menu</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems
          setPage={props.setPage}
          itemsPerPage={props.limit}
          total={props.total}
        />
      </div>
    </>
  );
}
