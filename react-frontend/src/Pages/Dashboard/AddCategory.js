import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { CATEGORY } from "../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";

export default function AddCategory() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const form = new FormData();
  form.append("title", title);
  form.append("image", image);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await Axios.post(`${CATEGORY}/add`, form);

      navigate("/dashboard/categories");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
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
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title..."
          />
        </div>

        <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
          >
            <div class="flex flex-col items-center justify-center text-body pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4"
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
              <p class="mb-2 text-sm">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              onChange={(e) => setImage(e.target.files.item(0))}
            />
          </label>
        </div>

        <button
          disabled={title.length > 1 ? false : true}
          type="submit"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
        >
          Save
        </button>
      </form>
    </div>
  );
}
