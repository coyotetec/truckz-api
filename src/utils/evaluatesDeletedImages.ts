interface IimagesDb {
  id: string;
  url: string;
  loadId: string;
}

export function evaluatesDeletedImages(
  namesImages: Set<string>,
  imagesDB: IimagesDb[],
) {
  const imagesNameDeleted: string[] = [];

  imagesDB.forEach((image) => {
    if (!namesImages.has(image.url)) {
      imagesNameDeleted.push(image.url);
    }
  });

  return imagesNameDeleted;
}
