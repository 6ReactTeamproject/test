import { useState } from "react";
import "./travel.css";
import { apiPatch } from "../../api/fetch";
import ImageUpload from "../common/ImageUpload";

export default function EditForm({
  data,
  endpoint,
  heading,
  fields,
  onDone
}) {
  const [formData, setFormData] = useState(() => {
    const initial = {};
    fields.forEach(({ key }) => {
      initial[key] = data[key] || "";
    });
    return initial;
  });

  const isFilled = (data) =>
    fields.every(({ key }) => {
      const value = data[key];
      return typeof value === "string" ? value.trim() !== "" : Boolean(value);
    });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = () => {
    if (!isFilled(formData)) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    apiPatch(endpoint, data.id, formData).then(() => {
      alert("수정이 완료되었습니다.");
      onDone({ ...data, ...formData });
    });
  };

  return (
    <div className="form-container">
      <h2>{heading}</h2>
      {fields.map(({ label, key, type }) => (
        <div key={key}>
          <label>{label}</label>
          {type === "textarea" ? (
            <textarea
              value={formData[key]}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          ) : type === "image" ? (
            <ImageUpload
              name={key}
              onLoad={(result) => handleChange(key, result)}
            />
          ) : (
            <input
              value={formData[key]}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          )}
        </div>
      ))}

      <div className="button-group">
        <button onClick={handleUpdate} className="add-button">💾 저장</button>
        <button onClick={() => onDone(data)} className="cancel-button">❌ 취소</button>
      </div>
    </div>
  );
}
