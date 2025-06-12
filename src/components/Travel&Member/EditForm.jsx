import { apiPatch } from "../../api/fetch";
import FormInput from "../common/FormInput";
import FormTextarea from "../common/FormTextarea";
import FormButton from "../common/FormButton";
import { useForm } from "../../hooks/useForm";
import { MESSAGES } from "../../constants";
import "../../styles/form.css";
import "../../styles/modal.css";

export default function EditForm({ data, endpoint, heading, fields, onDone }) {
  const { values: formData, handleChangeDirect } = useForm(() => {
    const initial = {};
    fields.forEach(({ key }) => {
      initial[key] = data[key] || "";
    });
    return initial;
  });

  const handleUpdate = () => {
    apiPatch(endpoint, data.id, formData).then(() => {
      alert(MESSAGES.UPDATE_SUCCESS);
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
            <FormTextarea
              name={key}
              value={formData[key]}
              onChange={(e) => handleChangeDirect(key, e.target.value)}
            />
          ) : (
            <FormInput
              name={key}
              value={formData[key]}
              onChange={(e) => handleChangeDirect(key, e.target.value)}
            />
          )}
        </div>
      ))}

      <div className="button-group">
        <FormButton onClick={handleUpdate} className="add-button">
          💾 저장
        </FormButton>
        <FormButton onClick={() => onDone(data)} className="cancel-button">
          ❌ 취소
        </FormButton>
      </div>
    </div>
  );
}
