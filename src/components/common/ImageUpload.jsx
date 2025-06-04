import { useState } from "react";

export default function ImageUpload({ onLoad, name = "image", accept = "image/*" }) {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onLoad(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ width: "100%", margin: "12px 0" }}>
      <input type="file" name={name} accept={accept} onChange={handleChange} />
      {preview && (
        <img
          src={preview}
          alt="미리보기"
          style={{ marginTop: "12px", width: "100%", maxWidth: "400px", borderRadius: "8px" }}
        />
      )}
    </div>
  );
}
