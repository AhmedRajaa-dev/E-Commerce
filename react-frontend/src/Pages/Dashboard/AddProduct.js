import { useEffect, useRef, useState } from "react";
import { Axios } from "../../Api/Axios";
import { CATEGORIES, CATEGORY, PRODUCT } from "../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons";

export default function AddProduct() {
  const navigate = useNavigate();
  const progress = useRef([]);
  const [form, setForm] = useState({
    category: "select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [send, setSend] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [id, setId] = useState("");
  const temp = useRef(-1);
  const ids = useRef([]);
  //console.log(id)
  async function handleSubmitForm() {
    try {
      const res = await Axios.post(`${PRODUCT}/add`, dummyData);
      setId(res.data.id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  //handle delete image
  async function handleDeleteImage(index, img) {
    const find_id = ids.current[index];
    console.log(find_id);
    try {
      const res = await Axios.delete(`product-img/${find_id}`);
      setImages((prev) => prev.filter((image) => image !== img));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  //handleChange
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSend(1);
    if (send !== 1) {
      handleSubmitForm();
    }
    console.log(form);
  }
  async function handleImagesChange(e) {
    const imagesFiles = e.target.files;
    setImages((prev) => [...prev, ...e.target.files]);
    const startIndex = images.length;

    for (let i = 0; i < imagesFiles.length; i++) {
      temp.current++;
      const data = new FormData();
      data.append("image", imagesFiles[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post(`/product-img/add`, data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;

            const percent = Math.floor((loaded * 100) / total);
            // console.log(ProgressEvent.total);
            //console.log(ProgressEvent.loaded);
            // progress.current[temp.current].style.width=`${percent}%`
            progress.current[startIndex + i].style.width = `${percent}%`;
            progress.current[`text-${startIndex + i}`].innerText =
              `${percent}%`;
          },
        });
        ids.current[startIndex + i] = res.data.id;
      } catch (error) {
        console.log(error);
      }
    }
  }
  const dummyData = {
    category: null,
    title: "d",
    description: "d",
    price: "0",
    discount: "0",
    About: "d",
  };
  async function handleEdit(e) {
    e.preventDefault();
    try {
      const res = await Axios.post(`${PRODUCT}/edit/${id}`, form);
      console.log("the edit is done");
      navigate("dashboard/products");
    } catch (error) {
      console.log(error);
    }
  }
  //get all categories
  useEffect(() => {
    try {
      const res = Axios.get(`/${CATEGORIES}`).then((res) =>
        setCategories(res.data),
      );
    } catch (error) {
      console.log(error);
    }
  }, []);
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));
  const imagesShow = images.map((img, key) => (
    <div key={key} className="border p-2 w-screen">
      <div className="flex items-center justify-between gap-2 w-full">
        <div>
          <img src={URL.createObjectURL(img)} width="80px"></img>
          <p className="mb-1">{img.name}</p>
          <p>
            {img.size / 1024 < 900
              ? (img.size / 1024).toFixed(2) + "KB"
              : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
          </p>
        </div>
        <div>
          <button
            type="button"
            class="text-white bg-red-700 box-border border border-transparent hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-full text-sm px-8 py-2.5 focus:outline-none"
            onClick={() => handleDeleteImage(key, img)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-body">Flowbite</span>
        <span
          className="text-sm font-medium text-body"
          ref={(e) => (progress.current[`text-${key}`] = e)}
        ></span>
      </div>
      <div className="w-full bg-neutral-quaternary rounded-full h-2">
        <div
          className="bg-blue-700 h-2 rounded-full"
          ref={(e) => (progress.current[key] = e)}
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  ));

  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleEdit}>
        <div className="max-w-sm mx-auto">
          <label
            htmlFor="category"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Select Category
          </label>
          <select
            id="category"
            name="category"
            className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
            onChange={handleChange}
            value={form.Category}
          >
            <option disabled>select Category</option>
            {categoriesShow}
          </select>
        </div>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            disabled={!send}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
            value={form.title}
            onChange={handleChange}
            placeholder="Title..."
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            disabled={!send}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
            value={form.description}
            onChange={handleChange}
            placeholder="Description..."
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="price"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            disabled={!send}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
            value={form.price}
            onChange={handleChange}
            placeholder="Price..."
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="discount"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Discount:
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            disabled={!send}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
            value={form.discount}
            onChange={handleChange}
            placeholder="Discount..."
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="About"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            About:
          </label>
          <input
            type="text"
            id="About"
            name="About"
            disabled={!send}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
            value={form.About}
            onChange={handleChange}
            placeholder="About..."
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
          >
            <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              disabled={!send}
              multiple
              onChange={handleImagesChange}
            />
          </label>
        </div>
        {imagesShow}
        <button
          disabled={form.title.length > 1 ? false : true}
          type="submit"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
        >
          Save
        </button>
      </form>
    </div>
  );
}
