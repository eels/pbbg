export interface ImageWebpOptimiserOptions {
  deviceSizes: number[];
  imageSizes: number[];
  images: string;
  output: string;
  quality: number;
}

export interface NextImagesConfig {
  imageWebpOptimiser?: ImageWebpOptimiserOptions;
  loader: string;
}
