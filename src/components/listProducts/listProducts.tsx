import { useEffect } from "react";
import { IoChevronUp, IoPencil } from "react-icons/io5";

interface ListProductsProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const HEADER_PEEK_PX = 75;

export default function ListProducts({
  isExpanded,
  onToggle,
}: ListProductsProps) {
  useEffect(() => {
    if (!isExpanded) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isExpanded]);

  // fechar no ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) onToggle();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isExpanded, onToggle]);

  return (
    <>
      <div
        onClick={onToggle}
        className={[
          "fixed inset-0 z-40 transition-opacity duration-300",
          isExpanded
            ? "bg-black/40 opacity-100"
            : "bg-black/0 opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden="true"
      />

      <section
        className={[
          "fixed bottom-0 left-0 z-50 w-full bg-[#f4efe4] rounded-t-2xl",
          "transition-transform duration-300 will-change-transform",
          "shadow-[0_-12px_30px_rgba(0,0,0,0.12)]",
          "h-[80vh]",
        ].join(" ")}
        style={{
          transform: isExpanded
            ? "translateY(0)"
            : `translateY(calc(100% - ${HEADER_PEEK_PX}px))`,
        }}
      >
        <div className="center-nav mx-auto px-4">
          <div className="pt-2 pb-1 flex justify-center">
            <div className="h-1 w-12 rounded-full bg-black/15" />
          </div>

          <div className="flex items-center py-3 gap-2">
            <input
              type="text"
              placeholder="List for Sunday dinner"
              className="outline-none border-none bg-transparent flex-1 font-medium"
            />

            <button
              type="button"
              className="p-1 rounded-md hover:bg-black/5"
              aria-label="Editar nome da lista"
            >
              <IoPencil />
            </button>

            <button
              type="button"
              onClick={onToggle}
              className="ml-1 p-2 rounded-md hover:bg-black/5 text-xl cursor-pointer"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Recolher lista" : "Expandir lista"}
            >
              <IoChevronUp
                className={[
                  "transition-transform duration-300",
                  isExpanded ? "rotate-180" : "rotate-0",
                ].join(" ")}
              />
            </button>
          </div>
        </div>

        <div className="px-4 pb-6">
          <p></p>
        </div>
      </section>
    </>
  );
}
