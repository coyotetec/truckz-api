export function evaluatesNewImages(
  urlImagesDb: Set<string>,
  imagesPayload: Express.Multer.File[],
) {
  const newImages: Express.Multer.File[] = [];

  imagesPayload.forEach((image) => {
    const formatImageName = image.originalname.split('.');

    if (!urlImagesDb.has(formatImageName[0])) {
      newImages.push(image);
    }
  });

  return newImages;
}
