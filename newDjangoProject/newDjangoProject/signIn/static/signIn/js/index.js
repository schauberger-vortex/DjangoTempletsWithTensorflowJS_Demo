const webcamElement = document.getElementById('webcam');
const classifier = knnClassifier.create();
let net;
async function app() {
  console.log('Loading mobilenet..');
  net = await mobilenet.load();
  console.log('Successfully loaded model');
  const webcam = await tf.data.webcam(webcamElement);
  const addExample = async classId => {
    const img = await webcam.capture();
    const activation = net.infer(img, 'conv_preds');
    classifier.addExample(activation, classId);
    img.dispose();
  };
  document.getElementById('class-default').addEventListener('click', () => addExample(0));
  document.getElementById('class-b').addEventListener('click', () => addExample(1));
  document.getElementById('class-c').addEventListener('click', () => addExample(2));
  document.getElementById('class-d').addEventListener('click', () => addExample(3));
  while (true) {
    if (classifier.getNumClasses() > 0) {
      const img = await webcam.capture();
      const activation = net.infer(img, 'conv_preds');
      const result = await classifier.predictClass(activation);
      const classes = ['Default', 'B', 'C', 'D'];
      document.getElementById('console').innerText = `
        prediction: ${classes[result.label]}\n
        probability: ${result.confidences[result.label]}
      `;
      img.dispose();
    }
    await tf.nextFrame();
  }
}
 app();