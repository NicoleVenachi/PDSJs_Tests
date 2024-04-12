const url = "./test.pdf";

//
// The workerSrc property shall be specified.
//
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "./node_modules/pdfjs-dist/build/pdf.worker.mjs";

// pdf viewerEvents
var eventBus = new pdfjsViewer.EventBus();

const OptionKind = {
  BROWSER: 0x01,
  VIEWER: 0x02,
  API: 0x04,
  WORKER: 0x08,
  PREFERENCE: 0x80,
};

// var linkService = new pdfjsViewer.PDFLinkService({
//   eventBus,
//   externalLinkRel: {
//     /** @type {string} */
//     value: "noopener noreferrer nofollow",
//     kind: OptionKind.VIEWER,
//   },
//   externalLinkTarget: {
//     /** @type {number} */
//     value: 0,
//     kind: OptionKind.VIEWER + OptionKind.PREFERENCE,
//   },
// });

// pdf wiewer config options
var pdfViewer = new pdfjsViewer.PDFViewer({
  container: document.getElementById("viewerContainer"),
  eventBus: eventBus,
  // linkService: linkService,
  currentScaleValue: 1,
});

// linkService.setViewer(pdfViewer);

var viewerParentContainer = document.getElementById("viewerParentContainer");
console.log(viewerParentContainer.clientHeight);

eventBus.on("pagesinit", function () {
  pdfViewer.currentScaleValue = "page-width";

  var pageElements = document.querySelectorAll(".page");
  //   pageElements.
  //   let canvasWrappers =    pageElements.querySelectorAll(".canvasWrapper");

  console.log(pageElements.offsetHeight);
  pageElements.forEach(function (pageElement, index) {
    console.log(pageElement.offsetHeight);
    // console.log(
    //   "Altura de la página " + (index + 1) + ":"
    //   //   pageElement.offsetHeight
    // );
  });
  // test

  function onScroll(ev) {
    console.log(ev.target.scrollTop);
    // console.log(ev);
    // console.log("scrolling");
  }
  pdfViewer.container.addEventListener("scroll", onScroll);
});

eventBus.on("pagerendered", function () {
  // pdfViewer.currentScaleValue = "page-width";
});

eventBus.on("pagechanging", function (evt) {
  var page = evt.pageNumber;
  console.log("Evento para analytics", page);
});

// render the viewer
pdfjsLib.getDocument(url).promise.then((pdfDoc) => {
  pdfViewer.setDocument(pdfDoc);
  linkService.setDocument(pdfDoc);
});
