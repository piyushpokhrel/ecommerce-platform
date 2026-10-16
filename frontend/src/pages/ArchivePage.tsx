import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";

// ✅ Vite auto-import all matching files in a folder
const photoModules = import.meta.glob("../assets/archive/photos/*.{png,jpg,jpeg,webp,gif}", {
    eager: true,
});
const videoModules = import.meta.glob("../assets/archive/videos/*.{mp4,webm,ogg,mov}", {
    eager: true,
});

// Convert modules -> array of urls
const photos = Object.entries(photoModules).map(([path, mod]: any) => ({
    type: "photo" as const,
    src: mod.default as string,
    filename: path.split("/").pop() ?? "photo",
}));

const videos = Object.entries(videoModules).map(([path, mod]: any) => ({
    type: "video" as const,
    src: mod.default as string,
    filename: path.split("/").pop() ?? "video",
}));

{
    photos.map((p) => (
        <img key={p.src} src={p.src} alt={p.filename} className="rounded-xl" />
    ))
}

{
    videos.map((v) => (
        <video key={v.src} src={v.src} controls className="rounded-xl w-full" />
    ))
}

export default function ArchivePage() {
    return (

        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Archive</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Curated records and media assets in one place.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Keywords</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                    <p>Digital Archiving • Media Management • Documentation • Asset Curation • Knowledge Retention</p>
                </CardContent>
            </Card>
        </div>
    );
}