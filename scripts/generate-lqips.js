import lqip from "lqip";
import fs from "fs";
import path from "path";

const imagesDir = path.join("public", "images");
const outputDir = path.join("public", "images", "lqip");

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const processImages = async () => {
  fs.readdir(imagesDir, async (error, files) => {
    if (error) {
      console.error("Error reading directory, error");
      return;
    }
    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      const outputFilePath = path.join(
        outputDir,
        `${path.parse(file).name}-lqip.jpg`
      );
      if (
        [".jpg", ".jpeg", ".png"].includes(path.extname(file).toLowerCase())
      ) {
        try {
          const base64Data = await lqip.base64(filePath);
          const base64Image = base64Data.replace(
            /^data:image\/png;base64,/,
            ""
          );
          const imageBuffer = Buffer.from(base64Image, "base64");
          fs.writeFileSync(outputFilePath, imageBuffer);
          console.log(`Processed and saved LQIP for ${file}`);
        } catch (error) {
          console.error(`Error processing ${file}:`, error);
        }
      }
    }
  });
};

processImages();
