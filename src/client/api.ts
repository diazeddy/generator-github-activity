import axios from "axios";

export const generate = async (start: Date, end: Date, commits: number, frequency: number) => {
    const res = await axios.post("/api/generate", {start, end, commits, frequency}, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data])); // Create a URL for the blob
    const a = document.createElement('a'); // Create a link element
    a.href = url; // Set the link's href to the URL
    a.download = 'archive.zip'; // Set the download attribute to specify the filename
    document.body.appendChild(a); // Append the link to the document body
    a.click(); // Simulate a click on the link to start the download
    window.URL.revokeObjectURL(url); // Clean up the URL object to free memory
}