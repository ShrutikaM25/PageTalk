import axios from "axios";

const fetchAndConvertToBlob = async (url: string): Promise<File | null> => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = response.data;
      const fileName = 'your_pdf_file.pdf'; // Set the desired file name
  
      // Create a File object from the blob
      const file = new File([blob], fileName, { type: 'application/pdf' });
  
      return file;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      return null; // Handle the error as needed
    }
  };

export default fetchAndConvertToBlob;