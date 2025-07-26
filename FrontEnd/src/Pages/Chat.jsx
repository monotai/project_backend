// import React from "react";
// import {
//   fetchAllData,
//   addUserData,
//   fetchAllUsers,
//   deleteUserData,
//   handleFileUpload,
//   handleDeleteFile,
// } from "../control.js";

// const API_BASE = '/api';

// function Chat({ userId }) {
//   const [messages, setMessages] = React.useState([]);
//   const [text, setText] = React.useState("");
//   const [file, setFile] = React.useState(null);
//   const [link, setLink] = React.useState("")
//   const [users, setUsers] = React.useState([]);
//   const [isLoading, setIsLoading] = React.useState(false);

//   // For audio recording
//   const [isRecording, setIsRecording] = React.useState(false);
//   const [mediaRecorder, setMediaRecorder] = React.useState(null);
//   const [audioChunks, setAudioChunks] = React.useState([]);

//   const fileInputRef = React.useRef(null);

//   const loadMessages = async () => {
//     if (isLoading) return;
//     setIsLoading(true);
//     try {
//       const [messagesData, usersData] = await Promise.all([
//         fetchAllData(),
//         fetchAllUsers(),
//       ]);
//       setMessages((messagesData || []).reverse());
//       setUsers(usersData || []);
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     loadMessages();
//     const intervalId = setInterval(loadMessages, 3000);
//     return () => clearInterval(intervalId);
//   }, []);

//   const handleFileUploadWithRandomName = async (file) => {
//     try {
//       const randomName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${file.type.split('/')[1]}`;
//       const renamedFile = new File([file], randomName, { type: file.type });

//       await handleFileUpload(renamedFile);

//       return randomName;
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       return null;
//     }
//   };

//   // Send message for text and file (existing)
//   const handleSendMessage = async (type) => {
//     let newMessage = null;

//     try {
//       switch (type) {
//         case "text":
//           if (!text.trim()) {
//             console.warn("Text message is empty.");
//             return;
//           }
//           newMessage = { type: "text", data: text };
//           break;

//         case "file":
//           if (!file) {
//             console.warn("No file selected.");
//             return;
//           }
//           const fileFilename = await handleFileUploadWithRandomName(file);
//           if (!fileFilename) {
//             console.error("Failed to upload file.");
//             return;
//           }
//           newMessage = { type: file.type.split('/')[0], data: `${fileFilename}` };
//           fileInputRef.current.value = ""; // Reset the file input
//           setFile(null);
//           break;
//         case "link":
//           if (text !== "") {
//             newMessage = {type: "link", data: text};
//           }
//           break;
//         default:
//           console.warn("Unsupported message type:", type);
//           return;
//       }

//       await addUserData(userId, newMessage, setMessages);

//       setText("");
//       setLink("");
//       await loadMessages();
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   // Delete message
//   const handleDeleteMessage = async (id, messageId, fileName) => {
//     try {
//       await deleteUserData(id, messageId, setMessages);
//       await handleDeleteFile(fileName)
//       loadMessages();
//     } catch (error) {
//       console.error("Failed to delete message:", error);
//     }
//   };

//   // Copy text to clipboard
//   const handleCopyText = (text) => {
//     navigator.clipboard.writeText(text).then(() => {
//       alert("Text copied to clipboard!");
//     }).catch((error) => {
//       console.error("Failed to copy text:", error);
//     });
//   };

//   // --- AUDIO RECORDING ---

//   const startRecording = async () => {
//     if (isRecording) return;

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const recorder = new MediaRecorder(stream);

//       recorder.ondataavailable = (e) => {
//         setAudioChunks((prev) => [...prev, e.data]);
//       };

//       recorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
//         setAudioChunks([]); // clear chunks for next recording

//         // Convert blob to File for upload
//         const file = new File([audioBlob], `recording-${Date.now()}.mp3`, { type: 'audio/mp3' });

//         const uploadedFilename = await handleFileUploadWithRandomName(file);
//         if (uploadedFilename) {
//           await addUserData(userId, { type: "audio", data: uploadedFilename }, setMessages);
//           await loadMessages();
//         }

//         // Stop all tracks to release mic permission
//         stream.getTracks().forEach(track => track.stop());
//       };

//       recorder.start();
//       setMediaRecorder(recorder);
//       setIsRecording(true);
//     } catch (err) {
//       console.error("Failed to start recording", err);
//       alert("Could not start audio recording. Please allow microphone access.");
//     }
//   };

//   const stopRecording = () => {
//     if (!isRecording || !mediaRecorder) return;
//     mediaRecorder.stop();
//     setIsRecording(false);
//   };

//   // --- SCREENSHOT (Screen Capture) ---

//   const takeScreenshot = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       const track = stream.getVideoTracks()[0];
//       const imageCapture = new ImageCapture(track);
//       const bitmap = await imageCapture.grabFrame();

//       // Create canvas to draw frame
//       const canvas = document.createElement('canvas');
//       canvas.width = bitmap.width;
//       canvas.height = bitmap.height;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(bitmap, 0, 0);

//       // Convert canvas to blob
//       canvas.toBlob(async (blob) => {
//         if (!blob) return;

//         const file = new File([blob], `screenshot-${Date.now()}.png`, { type: 'image/png' });

//         const uploadedFilename = await handleFileUploadWithRandomName(file);
//         if (uploadedFilename) {
//           await addUserData(userId, { type: "image", data: uploadedFilename }, setMessages);
//           await loadMessages();
//         }

//         // Stop the screen capture track to release permission
//         track.stop();
//       });
//     } catch (err) {
//       console.error("Failed to capture screenshot:", err);
//       alert("Could not capture screen. Please allow screen sharing permission.");
//     }
//   };

//   // --- Styles ---
//   const styles = {
//     container: { fontFamily: "Arial, sans-serif", padding: "20px" },
//     inputContainer: { marginBottom: "20px" , display: "flex"},
//     inputButton: { margin: "auto", padding: "10px 5px",},
//     messageList: { listStyleType: "none", padding: 0 },
//     messageItem: {
//       display: "grid",
//       gridTemplateColumns: "auto 1fr auto auto",
//       marginBottom: "10px",
//     },
//     deleteButton: {
//       backgroundColor: "#f44336",
//       color: "white",
//       border: "none",
//       padding: "5px 10px",
//       cursor: "pointer",
//       borderRadius: "5px",
//       margin: "auto",
//     },
//     deleteButtonHover: { backgroundColor: "#d32f2f" },
//     image: { maxWidth: "300px", maxHeight: "300px", borderRadius: "5px" },
//     audio: { marginLeft: "10px" },
//     video: { maxWidth: "300px", maxHeight: "300px", borderRadius: "5px" },
//     embed: { width: "300px", height: "400px" },
//     downloadButton: {
//       marginLeft: "10px",
//       backgroundColor: "#4CAF50",
//       color: "white",
//       border: "none",
//       padding: "5px 10px",
//       cursor: "pointer",
//       borderRadius: "5px",
//       margin: "auto",
//     },
//     copyButton: {
//       marginRight: "10px",
//       backgroundColor: "#2196F3",
//       color: "white",
//       border: "none",
//       padding: "5px 10px",
//       cursor: "pointer",
//       borderRadius: "5px",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Chat Page</h1>
//       <p>
//         {"Welcome to the chat page! " +
//           (users.find((u) => u.user_id == userId)?.name || "Unknown User")}
//       </p>
//       <div style={styles.inputContainer}>
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Type your message here..."
//         />
//         <button style={styles.inputButton} onClick={() => handleSendMessage("text")}>Send Text</button>
//         <button style={styles.inputButton} onClick={() => handleSendMessage("link")}>Send Link</button>
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//         <button style={styles.inputButton} onClick={() => handleSendMessage("file")}>Send File</button>

//         {/* Audio Recording Controls */}
//         <div style={{ marginTop: 10 }}>
//           {!isRecording ? (
//             <button style={styles.inputButton} onClick={startRecording}>Start Audio Recording</button>
//           ) : (
//             <button style={styles.inputButton} onClick={stopRecording}>Stop Audio Recording</button>
//           )}
//           <button onClick={takeScreenshot} style={styles.inputButton}>
//             Take Screenshot
//           </button>
//         </div>
//       </div>

//       <ul style={styles.messageList}>
//         {messages.map((message, index) => {
//           const userName =
//             users.find((u) => u.user_id === message.user_id)?.name ||
//             "Unknown User";

//           return (
//             <li key={index} style={styles.messageItem}>
//               <strong>{userName}:</strong>
//               {message.type === "text" && (
//                 <>
//                   <span>{message.data}</span>
//                   <button
//                     style={styles.copyButton}
//                     onClick={() => handleCopyText(message.data)}
//                   >
//                     Copy
//                   </button>
//                 </>
//               )}
//               {message.type === "image" && (
//                 <img
//                   src={`${API_BASE}/upload/${message.data}`}
//                   alt={`Message ${index}`}
//                   style={styles.image}
//                 />
//               )}
//               {message.type === "audio" && (
//                 <audio controls style={styles.audio}>
//                   <source
//                     src={`${API_BASE}/upload/${message.data}`}
//                     type="audio/mp3"
//                   />
//                   Your browser does not support the audio element.
//                 </audio>
//               )}
//               {message.type === "video" && (
//                 <video controls style={styles.video}>
//                   <source
//                     src={`${API_BASE}/upload/${message.data}`}
//                     type="video/mp4"
//                   />
//                   Your browser does not support the video element.
//                 </video>
//               )}
//               {message.type === "application" && (
//                 <>
//                   <embed
//                     src={`${API_BASE}/upload/${message.data}`}
//                     style={styles.embed}
//                   />
//                   <a
//                     href={`${API_BASE}/upload/${message.data}`}
//                     download
//                     style={styles.downloadButton}
//                   >
//                     Download
//                   </a>
//                 </>
//               )}
//               {
//                 message.type === "link" && (
//                   <>
//                     <a href={message.data}>{message.data}</a>
//                     <button
//                       style={styles.copyButton}
//                       onClick={() => handleCopyText(message.data)}
//                     >Copy</button>
//                   </>
//                 )
//               }
//               <button
//                 style={styles.deleteButton}
//                 onMouseOver={(e) =>
//                   (e.target.style.backgroundColor = styles.deleteButtonHover.backgroundColor)
//                 }
//                 onMouseOut={(e) =>
//                   (e.target.style.backgroundColor = styles.deleteButton.backgroundColor)
//                 }
//                 onClick={() => handleDeleteMessage(message.user_id, message.id, message.data)}
//               >
//                 Delete
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default Chat;
