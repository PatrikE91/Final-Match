import "../style/Messages.css";

const PostForm = ({ handleSubmit, handleChange }) => {
  return (
    <div className="post-form">
      <form onSubmit={handleSubmit}>
        <input
          className="new-message-form"
          type="text"
          name="content"
          onChange={handleChange}
          placeholder="Write something"
        ></input>

        <button type="submit" className="submit-message">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
