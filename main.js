const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let img = new Image();
let fileName = '';

const downloadBtn = document.getElementById('download-btn');
const uploadFile = document.getElementById('upload-file');
const revertBtn = document.getElementById('revert-btn');

// TODO FILTERS

// Add Filters & Effects
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('filter-btn')) {
		if (e.target.classList.contains('exposure-add')) {
			Caman('#canvas', img, function () {
				this.exposure(5).render();
			});
		} else if (e.target.classList.contains('exposure-remove')) {
			Caman('#canvas', img, function () {
				this.exposure(-5).render();
			});
		} else if (e.target.classList.contains('contrast-add')) {
			Caman('#canvas', img, function () {
				this.contrast(5).render();
			});
		} else if (e.target.classList.contains('contrast-remove')) {
			Caman('#canvas', img, function () {
				this.contrast(-5).render();
			});
		} else if (e.target.classList.contains('vibrance-add')) {
			Caman('#canvas', img, function () {
				this.vibrance(5).render();
			});
		} else if (e.target.classList.contains('vibrance-remove')) {
			Caman('#canvas', img, function () {
				this.vibrance(-5).render();
			});
		} else if (e.target.classList.contains('gamma-add')) {
			Caman('#canvas', img, function () {
				this.gamma(1.4).render();
			});
		} else if (e.target.classList.contains('gamma-remove')) {
			Caman('#canvas', img, function () {
				this.gamma(0.5).render();
			});
		} else if (e.target.classList.contains('greyscale-add')) {
			Caman('#canvas', img, function () {
				this.greyscale().render();
			});
		} else if (e.target.classList.contains('lomo-add')) {
			Caman('#canvas', img, function () {
				this.lomo().render();
			});
		} else if (e.target.classList.contains('clarity-add')) {
			Caman('#canvas', img, function () {
				this.clarity().render();
			});
		} else if (e.target.classList.contains('sincity-add')) {
			Caman('#canvas', img, function () {
				this.sincity().render();
			});
		} else if (e.target.classList.contains('crossprocess-add')) {
			Caman('#canvas', img, function () {
				this.crossprocess().render();
			});
		} else if (e.target.classList.contains('pinhole-add')) {
			Caman('#canvas', img, function () {
				this.pinhole().render();
			});
		} else if (e.target.classList.contains('concentrate-add')) {
			Caman('#canvas', img, function () {
				this.concentrate().render();
			});
		} else if (e.target.classList.contains('hazydays-add')) {
			Caman('#canvas', img, function () {
				this.hazydays().render();
			});
		}
	}
});

// Revert filters
revertBtn.addEventListener('click', (e) => {
	Caman('#canvas', img, function () {
		this.revert();
	});
});

// Upload file
uploadFile.addEventListener('change', (e) => {
	// get file
	const file = document.getElementById('upload-file').files[0];

	// Init FileReader
	const reader = new FileReader();

	if (file) {
		// Set file name
		fileName = file.name;
		// Read the data as URL
		reader.readAsDataURL(file);
	}

	// Add image to canvas
	reader.addEventListener(
		'load',
		() => {
			// Create img
			img = new Image();
			// Set src
			img.src = reader.result;
			// On image load, add to canvas
			img.onload = function () {
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0, img.width, img.height);
				canvas.removeAttribute('data-caman-id');
			};
		},
		false
	);
});

// Download Event
downloadBtn.addEventListener('click', (e) => {
	// Get file ext
	const fileExtension = fileName.slice(-4);

	// Initialize a new filename variable
	let newFileName;

	// Check image type
	if (fileExtension === '.jpg' || fileExtension === '.png') {
		newFileName = fileName.substring(0, fileName.length - 4) + '-edited.jpg';
	}

	// Call download
	download(canvas, newFileName);
});

// Download function
function download(canvas, filename) {
	// Init event
	let e;
	// Create link
	const link = document.createElement('a');

	// Set props
	link.download = filename;
	link.href = canvas.toDataURL('image/jpeg', 0.8);

	// New mouse event
	e = new MouseEvent('click');
	// Dispatch event
	link.dispatchEvent(e);
}
