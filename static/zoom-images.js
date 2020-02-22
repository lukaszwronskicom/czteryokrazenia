

    class ZoomImages {

        constructor() {

            this.constants = Object.freeze({
                zoomGallery: document.querySelector('#zoomGallery'),
                zoomImage: document.querySelector(".image-zoom-container"),
                zoomPopupContainer: document.querySelector(".zoom-popup-container")
                
            })

        }

        clickListener() {
            let zoomGallery = this.constants.zoomGallery;
            let zoomImage = this.constants.zoomImage;

            zoomImage.addEventListener( 'click', (event)=>{
                event.stopPropagation();

                let urlFullSizeImage = event.target.getAttribute("data-full");
                this.openImage(urlFullSizeImage);

            });

            zoomGallery.addEventListener( 'click', (event)=>{
                this.closeImage();

            });

        }

        openImage(urlFullSizeImage) {
            let zoomGallery = this.constants.zoomGallery;
            var imageParent = this.constants.zoomPopupContainer;

            zoomGallery.style.display = 'flex'; 

            setTimeout(function(){ 
                zoomGallery.style.opacity = 1;
            }, 200);


            if( document.querySelectorAll(".zoom-popup-container img").length > 0 ) {
                var image = document.querySelector(".zoom-popup-container img");
                image.src = urlFullSizeImage; 

            } else {
                var image = document.createElement("img");
                image.src = urlFullSizeImage; 
                imageParent.appendChild(image);

            }

        }

        closeImage() {
            let zoomGallery = this.constants.zoomGallery;
            zoomGallery.style.opacity = 0;

            setTimeout(function(){  
                zoomGallery.style.display = 'none';
            }, 200);          
            
        }

    }

    var zoomImages = new ZoomImages();
    zoomImages.clickListener();
