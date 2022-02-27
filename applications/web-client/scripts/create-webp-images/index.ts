import fs from 'fs';
import fsp from 'fs/promises';
import next from 'next.config.js';
import path from 'path';
import sharp from 'sharp';
import type { ImageWebpOptimiserOptions, NextImagesConfig } from 'create-webp-images/types';

function getDefaultConfig(): ImageWebpOptimiserOptions {
  return {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    images: 'public/images',
    output: 'out',
    quality: 75,
  };
}

async function getRecursiveFiles(directory: string) {
  const output = [] as string[];
  const files = await fsp.readdir(directory);
  const extensions = ['.jpeg', '.jpg', '.png'];

  for (const file of files) {
    const filepath = path.join(directory, file);
    const stat = await fsp.stat(filepath);
    const isDirectory = stat.isDirectory();
    const filepaths = isDirectory && (await getRecursiveFiles(filepath));

    Array.isArray(filepaths) ? output.push(...filepaths) : output.push(filepath);
  }

  return output.filter((file) => extensions.includes(path.parse(file).ext));
}

async function createWebpImages() {
  const nextImagesConfig = next.images as NextImagesConfig;
  const config = { ...getDefaultConfig(), ...nextImagesConfig.imageWebpOptimiser };
  const directories = [config.images, config.output];
  const widths = [...config.imageSizes, ...config.deviceSizes];

  for (const directory of directories) {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  }

  const images = await getRecursiveFiles(config.images);

  for (const image of images) {
    const filename = path.parse(image).name;
    const extension = path.parse(image).ext;
    const outputDirectory = path.dirname(image).split('public/').pop() as string;
    const output = path.join(config.output, outputDirectory);
    const original = path.join(output, `${filename}${extension}`);

    const buffer = fs.readFileSync(path.join(process.cwd(), image));
    const transformer = sharp(buffer);
    const { width: metaWidth } = await transformer.metadata();

    if (!fs.existsSync(output)) {
      fs.mkdirSync(output, { recursive: true });
    }

    for (const width of widths) {
      if (metaWidth && metaWidth > width) {
        transformer.resize(width);
      }

      transformer.webp({ quality: config.quality });
      await transformer.toFile(path.join(output, `${filename}-${width}.webp`));
    }

    if (fs.existsSync(original)) {
      fsp.unlink(original);
    }
  }
}

createWebpImages();
