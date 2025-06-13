export default function SelectImage({ setInputs }) {
  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const img = new Image();
            img.onload = () => {
              const MAX_WIDTH = 900;
              const MAX_HEIGHT = 700;

              let width = img.width;
              let height = img.height;

              if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                const widthRatio = MAX_WIDTH / width;
                const heightRatio = MAX_HEIGHT / height;
                const ratio = Math.min(widthRatio, heightRatio);
                width = width * ratio;
                height = height * ratio;
              }

              const canvas = document.createElement("canvas");
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0, width, height);
              const resizedDataUrl = canvas.toDataURL("image/jpeg");

              setInputs((prev) => ({
                ...prev,
                imageUrl: resizedDataUrl,
              }));
            };
            img.src = reader.result;
          };
          reader.readAsDataURL(file);
        }
      }}
    />
  );
}
