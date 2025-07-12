import React, { useState } from "react";
import {
  FaRegSmile,
  FaCamera,
  FaFileImage,
  FaMagic,
  FaUserCircle,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";

export default function Comments() {
  const [comment, setComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const formatDate = (date) =>
    date.toLocaleString(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!comment.trim() && !selectedImage) return;

    const newComment = {
      id: comments.length + 1,
      user: "You",
      avatar: null,
      text: comment.trim(),
      image: selectedImage,
      createdAt: new Date(),
      parentId: null,
    };

    setComments((prev) => [...prev, newComment]);
    setComment("");
    setSelectedImage(null);
  };

  const handleDelete = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
    // If we are editing this comment, cancel editing
    if (editingId === id) {
      setEditingId(null);
      setEditingText("");
    }
  };

  const handleEditStart = (c) => {
    setEditingId(c.id);
    setEditingText(c.text);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingText("");
  };

  const handleEditSave = (id) => {
    if (!editingText.trim()) return; // don't allow empty

    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              text: editingText.trim(),
              // Optionally update date
              createdAt: new Date(),
            }
          : c
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  // Render comments with simple nesting (if parentId used in future)
  const renderComments = (commentList, parentId = null, level = 0) => {
    return commentList
      .filter((c) => c.parentId === parentId)
      .map((c) => (
        <div
          key={c.id}
          style={{
            marginLeft: level * 20,
            borderLeft: level ? "2px solid #ddd" : "none",
            paddingLeft: 8,
            marginBottom: 12,
            backgroundColor: "#fafafa",
            borderRadius: 6,
            paddingTop: 6,
            paddingBottom: 6,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FaUserCircle size={20} color="#888" />
            <strong>{c.user}</strong>
            <span style={{ fontSize: 12, color: "#999" }}>
              {formatDate(c.createdAt)}
            </span>
            {/* Edit/Delete buttons visible only if user === "You" */}
            {c.user === "You" && (
              <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
                {editingId === c.id ? (
                  <>
                    <button
                      onClick={() => handleEditSave(c.id)}
                      style={styles.iconButton}
                      title="Save"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={handleEditCancel}
                      style={styles.iconButton}
                      title="Cancel"
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditStart(c)}
                      style={styles.iconButton}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      style={styles.iconButton}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <div style={{ marginLeft: 28, marginTop: 4 }}>
            {editingId === c.id ? (
              <textarea
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                rows={3}
                style={{ width: "100%", padding: 6, borderRadius: 6 }}
              />
            ) : (
              c.text
            )}
          </div>

          {c.image && (
            <div style={{ marginTop: 6, marginLeft: 28 }}>
              <img
                src={c.image}
                alt="Comment Attachment"
                style={{ maxWidth: "100%", borderRadius: 8 }}
              />
            </div>
          )}

          {renderComments(commentList, c.id, level + 1)}
        </div>
      ));
  };

  return (
    <div style={styles.page}>
      <div style={styles.postBox}>
        {/* Header */}
        <div style={styles.header}>
          <strong style={{ fontSize: 18 }}>MedBursts Feed</strong>
          <span style={{ color: "gray", fontSize: 14 }}>'s post</span>
        </div>

        {/* Image */}
        <img
          src="./assets/icon/user.jpg"
          alt="User Post"
          style={styles.postImage}
        />

        {/* Comment Input */}
        <div style={styles.commentBox}>
          <div style={styles.inputRow}>
            <FaUserCircle size={32} color="#888" style={{ marginRight: 10 }} />
            <input
              style={styles.input}
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              disabled={editingId !== null}
              // Disable input if editing another comment
            />
          </div>
          <div style={styles.iconRow}>
            <FaRegSmile size={20} title="Emoji" />
            <label style={{ cursor: editingId === null ? "pointer" : "not-allowed" }}>
              <FaCamera size={20} title="Camera" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                disabled={editingId !== null}
              />
            </label>
            <FaFileImage size={20} title="Add Image" />
            <FaMagic size={20} title="Magic" />
            {selectedImage && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginLeft: 10,
                }}
              >
                <img
                  src={selectedImage}
                  alt="preview"
                  style={{ width: 50, height: 50, borderRadius: 4 }}
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                    fontSize: 18,
                    lineHeight: 1,
                  }}
                  title="Remove Image"
                  aria-label="Remove selected image"
                  disabled={editingId !== null}
                >
                  ✕
                </button>
              </div>
            )}
            <button
              style={{
                ...styles.button,
                opacity:
                  (comment.trim() || selectedImage) && editingId === null ? 1 : 0.5,
                cursor:
                  (comment.trim() || selectedImage) && editingId === null
                    ? "pointer"
                    : "not-allowed",
              }}
              onClick={handleSubmit}
              disabled={!comment.trim() && !selectedImage || editingId !== null}
            >
              Post
            </button>
          </div>
        </div>

        {/* Render Comments */}
        <div style={{ padding: 10 }}>{renderComments(comments)}</div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#798775", // match background like image
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
    padding: 20,
  },
  postBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    maxWidth: 500,
    width: "100%",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  header: {
    textAlign: "center",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
  },
  postImage: {
    width: "100%",
    objectFit: "cover",
  },
  commentBox: {
    padding: 10,
    borderTop: "1px solid #ddd",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    padding: "8px 12px",
    borderRadius: 20,
    border: "1px solid #ccc",
  },
  iconRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 18,
    paddingLeft: 42,
  },
  button: {
    marginLeft: "auto",
    padding: "5px 12px",
    backgroundColor: "#1877f2",
    color: "white",
    border: "none",
    borderRadius: 20,
  },
  iconButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#555",
    fontSize: 16,
    padding: 4,
    display: "flex",
    alignItems: "center",
  },
};