const fs = require("fs");
const path = require("path");

const sharp = require("sharp");

// Chemin du dossier contenant les images JPG
const dossierImages = "imageSource";

// Fonction pour encoder une image en base64
function encodeImageToBase64(imagePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(imagePath, (error, data) => {
			if (error) {
				reject(error);
			} else {
				const base64 = data.toString("base64");
				resolve(base64);
			}
		});
	});
}

// Fonction principale pour convertir les images en base64 et créer le fichier JSON
async function convertImagesToBase64() {
	try {
		// Liste pour stocker les informations des images encodées en base64
		const imagesBase64 = [];

		// Regex pour suprimmer l'extension .jpg du nom du fichier
		let regex = /\.jpg/g;
		// Lecture des fichiers dans le dossier images
		const fichiers = fs.readdirSync(dossierImages);

		for (const fichier of fichiers) {
			if (path.extname(fichier).toLowerCase() === ".jpg") {
				// Chemin complet du fichier image

				const cheminImage = path.join(dossierImages, fichier);

				// Encodage de l'image en base64
				const base64Image = await encodeImageToBase64(cheminImage);

				// Création de l'objet d'informations pour l'image
				const infoImage = {
					id: fichier.replace(regex, ""),
					base64: base64Image,
				};

				// Ajout de l'objet à la liste des images encodées en base64
				console.log(infoImage);
				imagesBase64.push(infoImage);
			}
		}

		// Chemin du fichier de sortie JSON
		const cheminSortieJson = "imageOutput.json";

		// Écriture de la liste d'images encodées en base64 dans le fichier JSON
		fs.writeFileSync(cheminSortieJson, JSON.stringify(imagesBase64, null, 2));
		console.log("Conversion terminée.");
	} catch (error) {
		console.error("Une erreur s'est produite :", error);
	}
}

// Appel de la fonction principale
convertImagesToBase64();
