import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
type ReportImage = { image_url: string; alt_text?: string | null; caption?: string | null };
export function ReportGallery({ images, title }: { images: ReportImage[]; title: string }) {
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const move = (direction: number) =>
    setActive((i) => (i === null ? 0 : (i + direction + images.length) % images.length));
  const image = active === null ? null : images[active];
  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <button
            key={img.image_url}
            className="gallery-button"
            onClick={(e) => {
              trigger.current = e.currentTarget;
              setActive(i);
            }}
            aria-label={`Enlarge ${title}, image ${i + 1}`}
          >
            <img
              src={img.image_url}
              alt={img.alt_text || `${title}, report page ${i + 1}`}
              width="1200"
              height="750"
              loading="lazy"
            />
            <span>
              {img.caption || `Report view ${i + 1}`} <span aria-hidden="true">↗</span>
            </span>
          </button>
        ))}
      </div>
      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      >
        <DialogContent
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            trigger.current?.focus();
          }}
          className="image-dialog"
          onKeyDown={(e) => {
            if (images.length > 1 && e.key === "ArrowRight") {
              e.preventDefault();
              move(1);
            }
            if (images.length > 1 && e.key === "ArrowLeft") {
              e.preventDefault();
              move(-1);
            }
          }}
        >
          <DialogTitle>
            {title} · {(active ?? 0) + 1} / {images.length}
          </DialogTitle>
          <DialogDescription>{image?.caption || "Report screenshot"}</DialogDescription>
          {image && (
            <img key={image.image_url} src={image.image_url} alt={image.alt_text || title} />
          )}
          <div className="gallery-navigation">
            {images.length > 1 && (
              <>
                <button
                  className="button button-outline button-small"
                  onClick={() => move(-1)}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>
                <span aria-live="polite">
                  {(active ?? 0) + 1} of {images.length}
                </span>
                <button
                  className="button button-outline button-small"
                  onClick={() => move(1)}
                  aria-label="Next screenshot"
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </>
            )}
            {image && (
              <a href={image.image_url} target="_blank" rel="noreferrer" className="text-link">
                Open full-size image ↗
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
