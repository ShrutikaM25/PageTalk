// import { useState, useEffect } from "react";
// import { pdfjs, Document, Page } from "react-pdf";
// import { Spinner } from "@nextui-org/react";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";

// import type { PDFDocumentProxy } from "pdfjs-dist";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.js",
//     import.meta.url
// ).toString();

// const options = {
//     cMapUrl: "/cmaps/",
//     standardFontDataUrl: "/standard_fonts/",
// };

// type PDFFile = string | File | null;

// interface Props {
//     pdfUrl: string;
// }

// export default function Sample({ pdfUrl }: Props) {
//     const [file, setFile] = useState<PDFFile>(null);
//     const [numPages, setNumPages] = useState<number>();

//     useEffect(() => {
//         fetch(pdfUrl)
//             .then((response) => response.blob())
//             .then((blob) => {
//                 setFile(new File([blob], "pdfFile.pdf"));
//             })
//             .catch((error) => {
//                 console.error("Error fetching PDF file:", error);
//             });
//     }, [pdfUrl]);

//     function onDocumentLoadSuccess({
//         numPages: nextNumPages,
//     }: PDFDocumentProxy): void {
//         setNumPages(nextNumPages);
//     }

//     return (
//         <div>
//             <div className="flex flex-col items-center mx-0 my-2.5 p-2.5 border-dashed">
//                 <div className="flex flex-col items-center">
//                     <Document
//                         file={file}
//                         onLoadSuccess={onDocumentLoadSuccess}
//                         options={options}
//                         className=""
//                     >
//                         {Array.from(new Array(numPages), (el, index) => (
//                             <Page
//                                 key={`page_${index + 1}`}
//                                 pageNumber={index + 1}
//                                 height={450}
//                                 loading={<Spinner />}
//                                 className="bg-yellow-500"
//                             />
//                         ))}
//                     </Document>
//                 </div>
//             </div>
//         </div>
//     );
// }
