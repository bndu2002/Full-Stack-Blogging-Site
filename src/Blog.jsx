import React, { useState } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Blog() {
  const [click, setclick] = useState(false);
  const [editingId, seteditingId] = useState("");
  const [yourBlogs, setyourBlogs] = useState([]);
  const [ClickEditBtn, setClickEditBtn] = useState(false);
  const [yourBlogClicked, setyourBlogClicked] = useState(false);
  const [filterdBlog, setfilterdBlog] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const [searchType, setSearchType] = useState("Tags");
  const [blogData, setblogData] = useState({
    title: "",
    body: "",
    tags: "",
    category: "",
    subcategory: "",
  });
  let navigate = useNavigate();

  const CommonfetchOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  function inputHandler(eve) {
    let { name, value } = eve.target;
    setblogData({ ...blogData, [name]: value });
  }

  const createBlog = async function () {
    try {
      let { title, body, tags, category, subcategory } = blogData;

      //the tags array contains a single string value with multiple tags separated by commas: "al,nsh,dsa". When this string is parsed by the server, it is interpreted as a single element in the tags array, which explains why you are seeing all the tags at the 0th index.

      //To fix this, you should split the string into separate tags before sending it to the server. For example, you could modify the createBlog function to split the tags and subcategory strings into arrays before sending the data:
      tags = tags.split(",");
      subcategory = subcategory.split(",");

      let fetchOptions = JSON.parse(JSON.stringify(CommonfetchOptions));

      fetchOptions.body = JSON.stringify({
        title,
        body,
        tags,
        category,
        subcategory,
      });

      const response = await fetch("/create-blog", fetchOptions);

      if (response.ok) {
        window.alert("all ok");
        setblogData({
          title: "",
          body: "",
          tags: "",
          category: "",
          subcategory: "",
        });
        setclick(false);
      } else {
        const errorMsg = await response.json();
        let { status, msg } = errorMsg;
        if (msg === "jwt must be provided") {
          window.alert(msg);
          navigate("/");
        } else {
          window.alert(msg);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  function buttonClicked() {
    setclick(true);
  }

  const ConvertFieldsToInput = (id) => {
    console.log("here is is", id);
    setClickEditBtn(!ClickEditBtn);
    seteditingId(id);
  };

  // ConvertFieldsToInput()

  const getYourBlogs = async () => {
    try {
      let fetchOptions = JSON.parse(JSON.stringify(CommonfetchOptions));

      fetchOptions.method = "GET";

      const response = await fetch("/getTheUserBlogs", fetchOptions);

      let fetchdata;

      if (response.ok) {
        fetchdata = await response.json();
        let Blogs = fetchdata.data;
        // const blogContainer = document.getElementById("blog-container");
        // blogContainer.innerHTML = Blogs.map(
        //   (blog) => `
        // <div className="blog-card" style="background: #fff; border-radius: 7px; box-shadow: 0px 2px 5px #ccc; padding: 10px; max-width: 300px; margin: 16px; float: none;" >
        //    <div style = "background: pink;  display:flex; padding-left: 200px">
        //    <h4 className="edit_btn" style="padding: 5px; cursor: pointer;transition: all 0.3s ease-in-out;" onMouseOver="this.style.background='#f9a7b0'" onMouseOut="this.style.background='pink'; this.style.color='pink'" >🖊</h4>
        //    <h4>✔</h4>
        //    </div>
        //    <h2>Title: ${blog.title}</h2>
        //    <p>Body: ${blog.body}</p>
        //    <p>Tags: ${blog.tags}</p>
        //    <p>Category: ${blog.category}</p>
        //    <p>Subcategory: ${blog.subcategory}</p>
        // </div>
        //   `
        // ).join("");

        // Blogs.forEach((blog) => {
        //   const blogCard = document.createElement("div");
        //   blogCard.className = "blog-card";
        //   blogCard.style =
        //     "background: #fff; border-radius: 7px; box-shadow: 0px 2px 5px #ccc; padding: 10px; width: 300px; margin: 16px; float: none;";

        //   const innerDiv = document.createElement("div");
        //   innerDiv.style =
        //     "background: pink;  display:flex; padding-left: 200px";

        //   const editBtn = document.createElement("h4");
        //   editBtn.className = "edit_btn";
        //   editBtn.style =
        //     "padding: 5px; cursor: pointer;transition: all 0.3s ease-in-out;";
        //   editBtn.innerHTML = "🖊";
        //   editBtn.addEventListener("mouseover", () => {
        //     editBtn.style.background = "#f9a7b0";
        //   });
        //   editBtn.addEventListener("mouseout", () => {
        //     editBtn.style.background = "pink";
        //     editBtn.style.color = "pink";
        //   });
        //   editBtn.addEventListener("click", () => {
        //     // Handle edit button click here
        //     alert(`editBtn value is ${ClickEditBtn}`)
        //     setClickEditBtn(ClickEditBtn ? false : true);
        //     //ConvertFieldsToInput()
        //   });

        //   const checkIcon = document.createElement("h4");
        //   checkIcon.innerHTML = "✔";

        //   innerDiv.appendChild(editBtn);
        //   innerDiv.appendChild(checkIcon);

        //   const title = document.createElement("h2")
        //   title.innerHTML = `Title: ${blog.title}`;

        //   const body = document.createElement("p");
        //   body.innerHTML = `Body: ${blog.body}`;

        //   const tags = document.createElement("p");
        //   tags.innerHTML = `Tags: ${blog.tags}`;

        //   const category = document.createElement("p");
        //   category.innerHTML = `Category: ${blog.category}`;

        //   const subcategory = document.createElement("p");
        //   subcategory.innerHTML = `Subcategory: ${blog.subcategory}`;

        //   blogCard.appendChild(innerDiv);
        //   blogCard.appendChild(title);
        //   blogCard.appendChild(body);
        //   blogCard.appendChild(tags);
        //   blogCard.appendChild(category);
        //   blogCard.appendChild(subcategory);
        //   blogContainer.appendChild(blogCard);

        // });
        setyourBlogs(() => {
          return [...Blogs];
        });
        console.log("youBlogs", yourBlogs);
        setyourBlogClicked(true);
      } else {
        let { status, msg } = fetchdata;
        alert(msg);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  function updateInputHandler(eve) {
    console.log(editingId);
    let { name, value } = eve.target;
    setblogData({ ...blogData, [name]: value });
  }

  const UpdateBlog = async () => {
    try {
      let { title, body, tags, category, subcategory } = blogData;

      //the tags array contains a single string value with multiple tags separated by commas: "al,nsh,dsa". When this string is parsed by the server, it is interpreted as a single element in the tags array, which explains why you are seeing all the tags at the 0th index.

      //To fix this, you should split the string into separate tags before sending it to the server. For example, you could modify the createBlog function to split the tags and subcategory strings into arrays before sending the data:
      tags = tags.split(",");
      subcategory = subcategory.split(",");

      let fetchOptions = JSON.parse(JSON.stringify(CommonfetchOptions));

      fetchOptions.body = JSON.stringify({
        title,
        body,
        tags,
        category,
        subcategory,
      });

      let blogId = editingId;

      fetchOptions.method = "PUT";

      const response = await fetch(`/updateBlog/${blogId}`, fetchOptions);

      if (response.ok) {
        alert("updated");
        // setClickEditBtn(false)
        // setblogData({
        //   title: "",
        //   body: "",
        //   tags: "",
        //   category: "",
        //   subcategory: "",
        // });
        window.location.reload();
      } else {
        let errmsg = await response.json();
        let { status, msg } = errmsg;
        alert(msg);
      }
    } catch (error) {
      return error.message;
    }
  };

  const DeleteBlog = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this blog?"
      );

      if (!confirmed) {
        return; // Abort delete operation
      }

      let fetchOptions = JSON.parse(JSON.stringify(CommonfetchOptions));

      fetchOptions.method = "DELETE";

      let blogId = id;

      let response = await fetch(`/deleteBlog/${blogId}`, fetchOptions);

      if (response.ok) {
        alert("Deleted");
        window.location.reload();
      } else {
        let errmsg = await response.json();
        let { status, msg } = errmsg;
        alert(msg);
      }
    } catch (error) {
      return console.log(error.message);
    }
  };
  function emptyBlogContainer() {
    document.getElementById("blog-container").innerHTML = "";
    setyourBlogClicked(false);
  }

  const handleSearchTypeChange = (event) => {
    const selectedSearchType = event.target.dataset.searchType;
    // console.log("here dataset",event.target.dataset.searchType)
    setSearchType(selectedSearchType);
  };

  const SearchInputHANDLER = (event) => {
    setsearchValue(event.target.value);
  };

  const getBlogByFilter = async () => {
    try {
      let fetchOptions = JSON.parse(JSON.stringify(CommonfetchOptions));

      fetchOptions.method = "GET";

      let url;

      if (searchType == "Tags") {
        url = `/getBlogByFilter?tags=${searchValue}`;
      }

      if (searchType == "Category") {
        url = `/getBlogByFilter?category=${searchValue}`;
      }

      if (searchType == "Subcategory") {
        url = `/getBlogByFilter?Subcategory=${searchValue}`;
      }

      if (searchType == "Title") {
        url = `/getBlogByFilter?title=${searchValue}`;
      }
      const response = await fetch(url, fetchOptions);

      let fetchData;

      if (response.ok) {
        fetchData = await response.json();
        let data = fetchData.data;
        setfilterdBlog(() => {
          return [...data];
        });
        console.log("filterblogs", filterdBlog);
      } else {
        let errmsg = await response.json();
        let { status, msg } = errmsg;
        alert(msg);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="blog_outer_div">
        <div className="blog_byyou" id="blog_data">
          {yourBlogClicked ? (
            <div id="blog-container">
              {yourBlogs.map((blog, ind) => (
                <div
                  className="blog-card"
                  style={{
                    background: "#fff",
                    borderRadius: "7px",
                    boxShadow: "0px 2px 5px #ccc",
                    padding: "10px",
                    width: "305px",
                    margin: "16px",
                    float: "none",
                  }}
                  key={ind}
                >
                  <div
                    style={{
                      background: "pink",
                      display: "flex",
                      paddingLeft: "200px",
                    }}
                  >
                    <h4
                      className="edit_btn"
                      style={{
                        padding: "5px",
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = "#e75480";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = "pink";
                      }}
                      onClick={() => ConvertFieldsToInput(blog._id)}
                    >
                      🖊
                    </h4>
                    {ClickEditBtn && editingId === blog._id ? (
                      <h4
                        style={{
                          padding: "5px",
                          cursor: "pointer",
                          transition: "all 0.3s ease-in-out",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.background = "#e75480";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = "pink";
                        }}
                        onClick={UpdateBlog}
                      >
                        ✔
                      </h4>
                    ) : null}
                  </div>
                  {ClickEditBtn && editingId === blog._id ? (
                    <>
                      <p>
                        Title:
                        <input
                          type="text"
                          name="title"
                          value={blogData.title}
                          onChange={updateInputHandler}
                          //  defaultValue={blog.title}
                        />
                      </p>
                      <p>
                        Body:
                        <input
                          type="text"
                          name="body"
                          value={blogData.body}
                          onChange={updateInputHandler}
                          // defaultValue={blog.body}
                        />
                      </p>
                      <p>
                        Tags:
                        <input
                          type="text"
                          name="tags"
                          value={blogData.tags}
                          onChange={updateInputHandler}
                          // defaultValue={blog.tags}
                        />
                      </p>
                      <p>
                        Category:
                        <input
                          type="text"
                          name="category"
                          value={blogData.category}
                          onChange={updateInputHandler}
                          // defaultValue={blog.category}
                        />
                      </p>
                      <p>
                        Subcategory:
                        <input
                          type="text"
                          name="subcategory"
                          value={blogData.subcategory}
                          onChange={updateInputHandler}
                          // defaultValue={blog.subcategory}
                        />
                      </p>
                    </>
                  ) : (
                    <>
                      <h2>Title: {blog.title}</h2>
                      <p>Body: {blog.body}</p>
                      <p>Tags: {blog.tags}</p>
                      <p>Category: {blog.category}</p>
                      <p>Subcategory: {blog.subcategory}</p>
                      <h5
                        style={{
                          padding: "5px",
                          cursor: "pointer",
                          transition: "all 0.3s ease-in-out",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.background = "crimson";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.background = "white";
                        }}
                        onClick={() => {
                          DeleteBlog(blog._id);
                        }}
                      >
                        ✂
                      </h5>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : null}
          {!yourBlogClicked ? (
            <div className="outer_your_blog_btn">
              <button className="your_blog_btn" onClick={getYourBlogs}>
                <p>Your Blogs</p>
              </button>
            </div>
          ) : (
            <div className="outer_hide_btn">
              <button onClick={emptyBlogContainer} className="hide_btn">
                <p>Hide Blogs</p>
              </button>
            </div>
          )}
        </div>
        <div className="blog_search_div">
          <div className="search_dropdown">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <span className="search_type">{searchType}</span>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    data-search-type="Tags"
                    onClick={handleSearchTypeChange}
                  >
                    Tags
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    data-search-type="Category"
                    onClick={handleSearchTypeChange}
                  >
                    Category
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    data-search-type="Subcategory"
                    onClick={handleSearchTypeChange}
                  >
                    Subcategory
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    data-search-type="Title"
                    onClick={handleSearchTypeChange}
                  >
                    Title
                  </a>
                </li>
              </ul>
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder={`Search By ${searchType}`}
                aria-label={`Search By ${searchType}`}
                aria-describedby="button-addon2"
                onChange={SearchInputHANDLER}
              />
              <button
                className="btn btn-primary"
                type="button"
                id="button-addon2"
                onClick={getBlogByFilter}
              >
                Search
              </button>
            </div>
          </div>
          <div className="search_result">
            {filterdBlog.map((value, ind) => {
              return (
                <div className="blog-card">
                  <h2>Title: {value.title}</h2>
                  <p>Body: {value.body}</p>
                  <p>Tags: {value.tags}</p>
                  <p>Category: {value.category}</p>
                  <p>Subcategory: {value.subcategory}</p>
                  <p>Author : {value.author}</p>
                </div>
              );
            })}
          </div>
        </div>
        <br />

        <div className="outer_blog_write">
          <div className="blog_write_div">
            {!click ? (
              <button className="write_btn" onClick={buttonClicked}>
                Click to write
              </button>
            ) : null}
            {click ? (
              <div>
                <input
                  type="text"
                  id="joininput"
                  name="title"
                  value={blogData.title}
                  onChange={inputHandler}
                  placeholder="Title"
                />
                <input
                  type="text"
                  id="joininput"
                  name="body"
                  value={blogData.body}
                  onChange={inputHandler}
                  placeholder="Body"
                />
                <input
                  type="text"
                  id="joininput"
                  name="tags"
                  value={blogData.tags}
                  onChange={inputHandler}
                  placeholder="tags"
                />
                <input
                  type="text"
                  id="joininput"
                  name="category"
                  value={blogData.category}
                  onChange={inputHandler}
                  placeholder="category"
                />
                <input
                  type="text"
                  id="joininput"
                  name="subcategory"
                  value={blogData.subcategory}
                  onChange={inputHandler}
                  placeholder="subcategory"
                />
                <div className="outer_search_btn">
                  <button className="search_btn" onClick={createBlog}>
                    Save
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
