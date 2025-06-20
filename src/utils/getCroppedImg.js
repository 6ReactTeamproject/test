// 유틸 함수만 사용한 코드로 jsx 문법을 사용하지 않았습니다
// JSX로 두면 React 컴포넌트로 오해의 소지가 있어 js형식으로 두었습니다

export default function getCroppedImg(imageSrc, cropAreaPixels) {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropAreaPixels.width;
      canvas.height = cropAreaPixels.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        cropAreaPixels.x,
        cropAreaPixels.y,
        cropAreaPixels.width,
        cropAreaPixels.height,
        0,
        0,
        cropAreaPixels.width,
        cropAreaPixels.height
      );

      resolve(canvas.toDataURL("image/jpeg"));
    };
  });
}
