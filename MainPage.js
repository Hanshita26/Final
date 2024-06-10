const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector("#picSection .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    const groupSize = 4; 
    let currentGroupIndex = 0; 

    let intervalId; 

    const startSlideshow = () => {
        clearInterval(intervalId); 
        intervalId = setInterval(() => {
            const direction = 1; 
            const scrollAmount = imageList.clientWidth * direction * groupSize;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
            currentGroupIndex = (currentGroupIndex + 1) % Math.ceil(imageList.children.length / groupSize);
            updateText(); 
            if (currentGroupIndex === 0) {
                clearInterval(intervalId); 
                setTimeout(startSlideshow, 2000); 
            }
        }, 2000); 
    };

    
    const stopSlideshow = () => {
        clearInterval(intervalId);
    };

    
    startSlideshow();

    
    imageList.addEventListener("scroll", () => {
        stopSlideshow();
    });

    
    imageList.addEventListener("mouseup", () => {
        startSlideshow();
    });

    
    const updateText = () => {
        const imageItems = imageList.querySelectorAll(".col-md");
        imageItems.forEach((item, index) => {
            const newIndex = (currentGroupIndex * groupSize) + index;
            const text = getTextForIndex(newIndex); 
            const textElement = item.querySelector(".pic1"); 
            if (textElement) {
                textElement.textContent = text;
            }
        });
    };

    
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction * groupSize;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
            currentGroupIndex = (currentGroupIndex + direction + Math.ceil(imageList.children.length / groupSize)) % Math.ceil(imageList.children.length / groupSize);
            updateText(); 
        });
    });

    
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
