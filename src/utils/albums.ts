export async function getAlbumImages(albumId: string) {
	let images = import.meta.glob<{ default: ImageMetadata }>("/src/content/albums/**/*.{jpeg,jpg}");
	images = Object.fromEntries(Object.entries(images).filter(([key]) => key.includes(albumId)));

	return Promise.all(Object.values(images).map((image) => image().then((mod) => mod.default)));
}
