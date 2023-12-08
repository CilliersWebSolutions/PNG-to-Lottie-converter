 //const radioBtns = document.querySelector('input[type="radio"]:checked');

  const newToOld = document.getElementById('dateaz');
  const oldToNew = document.getElementById('dateza');
  const fileNameAZ = document.getElementById('az');
  const fileNameZA = document.getElementById('za');

  const sortFilesEles = document.querySelectorAll('.sort_files');
  const convertEle = document.getElementById('convert');
  const uploadFormBtn = document.getElementById('file');
  const uploadBtn = document.getElementById('upload-button');
  const widthInput = document.getElementById('width');
  const heightInput = document.getElementById('height');
  let outputFrameRate = 30;

  uploadBtn.addEventListener('click', () => {
    uploadFormBtn.click();
    console.log('form file button clicked');
  });

  function download(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function addDownloadLink() {
    const jsonString = JSON.stringify(lottieJson);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const downloadEle = document.querySelector('#lottie-download');
    downloadEle.href = url;
    downloadEle.download = 'mshk-image-to-lottie.json';
    downloadEle.style.display = 'inline-block';
    downloadEle.style.opacity = 1;
  }

  convertEle.addEventListener('click', (e) => {
    if (lottieJson) {
      addDownloadLink();
    }
  });

  // predefined variable from sample code

  // predefined variable from sample code
  const fileUploadEle = document.getElementById('file');
  let submittedFiles;
  const reader = new FileReader();
  let index = 0;
  let fileData = [];
  let frames = [];
  let lottieJson = null;

  reader.onloadend = (e) => {
    // console.log(e)

    fileData.push(e.target.result);
    index += 1;
    if (index >= submittedFiles.length) {
      console.log('submitted file data');
      // console.log(fileData)
      console.log('adding file data to frames variable');
      fileData.forEach((data) => {
        frames.push({ data: data });
      });

      outputFrameRate = frames.length;

      console.log('final frames...');
      // console.log(frames)
      let outputWidth = widthInput.value;
      console.log(outputWidth);
      let outputHeight = heightInput.value;
      console.log(outputHeight);
      //converting to lottie json
      lottieJson = frames.reduce(
        function (lottie, frame, index) {
          const id = 'fr_' + index;
          const width = outputWidth;
          const width2 = Math.floor(width / 2);
          const height = outputHeight;
          const height2 = Math.floor(height / 2);

          lottie.assets.push({
            id,
            w: width,
            h: height,
            u: '',
            p: frame.data,
            e: 1,
          });

          lottie.layers.push({
            ddd: 0,
            ind: index + 1,
            ty: 2,
            nm: id + '.jpg',
            cl: 'jpg',
            refId: id,
            sr: 1,
            ks: {
              o: { a: 0, k: 100, ix: 11 },
              r: { a: 0, k: 0, ix: 10 },
              p: { a: 0, k: [width2, height2, 0], ix: 2 },
              a: { a: 0, k: [width2, height2, 0], ix: 1 },
              s: { a: 0, k: [100, 100, 100], ix: 6 },
            },
            ao: 0,
            ip: index,
            op: index + 1,
            st: index,
            bm: 0,
          });

          return lottie;
        },
        {
          v: '5.5.2',
          fr: outputFrameRate,
          ip: 0,
          op: outputFrameRate,
          w: outputWidth,
          h: outputHeight,
          nm: '@forresto/movie-to-lottie',
          ddd: 0,
          assets: [],
          layers: [],
          markers: [],
        }
      );
      console.log('lottie json file...');
      console.log(lottieJson);

      convertEle.style.pointerEvents = 'auto';
      convertEle.style.opacity = 1;
      // create download link
      const outputFilename = 'test' + '.lottie.json';
      // download(url)
      // addDownloadLink(url)
      return;
    }
    reader.readAsDataURL(submittedFiles[index]);
  };

  fileNameZA.addEventListener('click', (e) => {
    index = 0;
    fileData = [];
    lottieJson = null;
    frames = [];
    submittedFiles = fileUploadEle.files;
    console.log(submittedFiles);

    const tempFiles = [];
    for (const file of submittedFiles) {
      tempFiles.push(file);
    }

    tempFiles.sort(function (a, b) {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });
    submittedFiles = tempFiles;

    console.log('sorting z-a complete');
    console.log(tempFiles);
    console.log('frame for current');
    console.log(frames);
    reader.readAsDataURL(submittedFiles[0]);
  });
  fileNameAZ.addEventListener('click', (e) => {
    index = 0;
    fileData = [];
    lottieJson = null;
    frames = [];
    submittedFiles = fileUploadEle.files;
    console.log(submittedFiles);

    const tempFiles = [];
    for (const file of submittedFiles) {
      tempFiles.push(file);
    }

    tempFiles.sort(function (a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    submittedFiles = tempFiles;

    console.log('sorting z-a complete');
    console.log(tempFiles);
    console.log('frame for current');
    console.log(frames);
    reader.readAsDataURL(submittedFiles[0]);
  });

  oldToNew.addEventListener('click', (e) => {
    index = 0;
    fileData = [];
    lottieJson = null;
    frames = [];
    submittedFiles = fileUploadEle.files;
    console.log(submittedFiles);

    const tempFiles = [];
    for (const file of submittedFiles) {
      tempFiles.push(file);
    }

    tempFiles.sort(function (a, b) {
      if (a.lastModified < b.lastModified) return -1;
      if (a.lastModified > b.lastModified) return 1;
      return 0;
    });
    submittedFiles = tempFiles;

    console.log('sorting z-a complete');
    console.log(tempFiles);
    console.log('frame for current');
    console.log(frames);
    reader.readAsDataURL(submittedFiles[0]);
  });

  newToOld.addEventListener('click', (e) => {
    index = 0;
    fileData = [];
    lottieJson = null;
    frames = [];
    submittedFiles = fileUploadEle.files;
    console.log(submittedFiles);

    const tempFiles = [];
    for (const file of submittedFiles) {
      tempFiles.push(file);
    }

    tempFiles.sort(function (a, b) {
      if (a.lastModified < b.lastModified) return 1;
      if (a.lastModified > b.lastModified) return -1;
      return 0;
    });
    submittedFiles = tempFiles;

    console.log('sorting z-a complete');
    console.log(tempFiles);
    console.log('frame for current');
    console.log(frames);
    reader.readAsDataURL(submittedFiles[0]);
  });

  // for radio buttons
  fileUploadEle.addEventListener('change', (e) => {
    index = 0;
    fileData = [];

    submittedFiles = e.target.files;
    // console.log(submittedFiles)

    // sort files by number from file name
    const tempFiles = [];
    for (const file of e.target.files) {
      tempFiles.push(file);
    }

    tempFiles.sort(function (a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    console.log('initially sorting files to filename az order');
    submittedFiles = tempFiles;
    console.log(submittedFiles);

    reader.readAsDataURL(submittedFiles[0]);
  });