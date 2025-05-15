import type React from "react";

interface YouTubeProps {
  id: string;
}

const YouTube: React.FC<YouTubeProps> = ({ id }) => {
  return (
    <div className="w-full mb-4">
      <div
        className="border rounded-lg overflow-hidden"
        style={{
          position: "relative",
          paddingBottom: "56.25%", // 16:9 aspect ratio
          height: 0,
          maxWidth: "100%",
          background: "var(--card)",
        }}
      >
        <iframe
          title="YouTube video"
          src={`https://www.youtube.com/embed/${id}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default YouTube;
