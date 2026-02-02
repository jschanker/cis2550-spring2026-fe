import React, { useEffect, useState } from "react";
import "../directory-traversal-styles.css";

const IconGallery = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/dir-traversal/files?root=/var/www/images/icons/`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.tree && data.tree.files) {
          setFiles(data.tree.files);
        }
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching files:", err));
  }, []);

  if (loading) {
    return (
      <div className="lab-container" style={{ textAlign: "center" }}>
        Initializing Secure Protocol...
      </div>
    );
  }

  return (
    <div className="lab-container">
      <header className="lab-header">
        <h1 className="lab-title">Icon Gallery</h1>
      </header>

      <div className="icon-grid">
        {files.map((fileName) => (
          <div key={fileName} className="icon-card">
            <div className="img-wrapper">
              <img
                src={`${import.meta.env.VITE_API_URL}/dir-traversal/read?path=${fileName}`}
                alt={fileName}
                className="icon-img"
                onError={(e) => {
                  console.error("Image load error for:", fileName);
                }}
              />
            </div>
            <div className="file-name">{fileName}</div>
          </div>
        ))}
      </div>

      <footer className="lab-footer">
        <p>
          SECURE STORAGE SYSTEM v1.0.4 | STATUS:{" "}
          <span className="status-active">ONLINE</span>
        </p>
        <p style={{ marginTop: "10px" }}>FAULTY_FILTER_ENABLED: TRUE</p>
      </footer>
    </div>
  );
};

export default IconGallery;
