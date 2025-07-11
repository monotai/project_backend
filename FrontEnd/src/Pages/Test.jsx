import { createComment, deleteComment } from '../control/index.js';
import React  from 'react';

export default function Test() {
    const comment = {
        post_id: 1,
        user_id: 1,
        parent_comment_id: 1,
        content_text: "Hello World!",
        content_image_url: "test.png",
        content_video_url: "none"
    }

    const [id, setId] = React.useState(0);

    const hanleComment = async () => {
        const response = await createComment(comment);
        setId(response.comment_id);
        if (response) {
            console.log("Comment created successfully");
        } else {
            console.error("Failed to create comment");
        }
    }

    const handleDelete = async () => {
        const response = await deleteComment(id);
        if (response) {
            console.log("Comment deleted successfully");
        }
        else {
            console.error("Failed to delete comment");
        }
    }
  return (
    <div>
      <h1>Test Component</h1>
      <p>This is a simple test component.</p>
      <button onClick={hanleComment}>comment</button>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}