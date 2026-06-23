export type MaterialType = "pdf" | "slides" | "dataset" | "other";

export type Material = {
    id: string;
    title: string;
    description?: string;
    url: string;
    type: MaterialType;
    day?: number; // Course day number (1–12); omit for general materials
};

// To add a file:
// 1. Go to Vercel Dashboard → Storage → Blob → Upload
// 2. Copy the public URL
// 3. Add an entry below and push to git
export const materials: Material[] = [];
