// import React from "react";
// import { Worker } from "@react-pdf-viewer/core";
// import { Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";

// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// type PdfModalProps = {
//     // setModal: (modal: boolean) => {};
//     pdfUrl: string | null;
// };

// export const Modal = ({ pdfUrl }: PdfModalProps) => {
//     const defaultLayoutPluginInstance = defaultLayoutPlugin();

//     return (
//         <div className="backshadow">
//             <div className="custom-modal">
//                 <div className="delete-icon">x</div>

//                 {pdfUrl !== null && (
//                     <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
//                         <Viewer
//                             fileUrl={pdfUrl}
//                             plugins={[defaultLayoutPluginInstance]}
//                         />
//                         ;
//                     </Worker>
//                 )}
//             </div>
//         </div>
//     );
// };
