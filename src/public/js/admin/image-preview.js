const imagePreview = () => {
        const imageInput = document.getElementById('image-input');
        const imageDiv = document.getElementById('book-image');

        // Add an event listener to the input element
        imageInput.addEventListener('change', function () {
            // Check if a file is selected
            if (imageInput.files && imageInput.files[0]) {
                const reader = new FileReader();

                // Read the selected file as a data URL and display it in the image preview
                reader.onload = function (e) {
                    const imageUrl = e.target.result;
                    imageDiv.style.backgroundImage = `url(${imageUrl})`
                };

                reader.readAsDataURL(imageInput.files[0]);
            }
        });
}

imagePreview()