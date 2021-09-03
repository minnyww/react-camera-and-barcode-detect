import "./App.css";

function App() {
  // const capture = async () => {
  //   const canvas = document.getElementById("canvas");
  //   const video = document.getElementById("camera");
  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;
  //   canvas
  //     .getContext("2d")
  //     .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

  //   await detectQR(canvas);
  // };

  const detectQR = async (canvasElement = {}) => {
    try {
      // eslint-disable-next-line no-undef
      const barcodeDetector = new BarcodeDetector({ formats: ["qr_code"] });
      const barcodes = await barcodeDetector.detect(canvasElement);
      console.log("barcodes", barcodes);

      if (barcodes.length === 0) {
        window.alert("no qr");
      } else {
        console.log("barcode :: ", barcodes?.[0]?.rawValue);
      }
    } catch (error) {
      throw error;
    }
  };

  const takePhoto = () => {
    var video = document.getElementById("video");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          //video.src = window.URL.createObjectURL(stream);
          video.srcObject = stream;
          video.play();
        });
    }
  };

  const snapPhoto = async () => {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var video = document.getElementById("video");
    context.drawImage(video, 0, 0, 640, 480);
    await detectQR(canvas);
    // canvas.toBlob((blob) => {
    //   var reader = new FileReader();
    //   reader.readAsDataURL(blob);
    //   reader.onloadend = function () {
    //     var base64data = reader.result;
    //     console.log("base64data : ", base64data);
    //   };
    // });
  };

  return (
    <div className="App">
      <button onClick={() => takePhoto()}>camera</button>
      <button onClick={() => snapPhoto()}>snapPhoto</button>
      <video id="video" width="640" height="480" autoplay></video>
      <canvas id="canvas" width="640" height="480"></canvas>
      <div id="result">Results will be here. 😎 or use up to 4 recents</div>
    </div>
  );
}

export default App;
