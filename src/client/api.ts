import axios from "axios";

export const generate = async (start: Date, end: Date, commits: number, frequency: number) => {
    const res = await axios.post("/api/generate", {start, end, commits, frequency}, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'archive.zip';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}