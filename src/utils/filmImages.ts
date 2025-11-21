const images = import.meta.glob("../assets/films/*.png", { eager: true }) as Record<
  string,
  { default: string }
>;

const filmImages: Record<number, string> = {};

Object.keys(images).forEach((path) => {
  const fileName = path.split("/").pop() || "";
  const id = parseInt(fileName.replace(".png", ""), 10);
  if (!isNaN(id)) {
    filmImages[id] = (images[path] as any).default;
  }
});

const placeholder = "/assets/films/20.png";
export { filmImages as default, placeholder };