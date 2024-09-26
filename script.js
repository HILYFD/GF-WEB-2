let highestZ = 1;

class Paper {
    holdingPaper = false;

    prevMouseX = 0;
    prevMouseY = 0;

    mouseX = 0;
    mouseY = 0;

    velocityX = 0;
    velocityY = 0;

    currentpaperX = 0;
    currentpaperY = 0;

    init(paper) {
        let self = this; // Store the reference to the Paper instance

        paper.addEventListener('mousedown', (e) => {
            self.holdingPaper = true;

            paper.style.zIndex = highestZ;
            highestZ += 1;

            if (e.button === 0) {
                self.prevMouseX = self.mouseX;
                self.prevMouseY = self.mouseY;
            }
        });

        paper.addEventListener('touchstart', (e) => {
            self.holdingPaper = true;

            paper.style.zIndex = highestZ;
            highestZ += 1;

            self.prevMouseX = e.touches[0].clientX;
            self.prevMouseY = e.touches[0].clientY;

            e.preventDefault(); // Prevent default touch behavior
        });

        document.addEventListener('mousemove', (e) => {
            self.mouseX = e.clientX;
            self.mouseY = e.clientY;

            self.velocityX = self.mouseX - self.prevMouseX;
            self.velocityY = self.mouseY - self.prevMouseY;

            if (self.holdingPaper) {
                self.currentpaperX += self.velocityX;
                self.currentpaperY += self.velocityY;

                self.prevMouseX = self.mouseX;
                self.prevMouseY = self.mouseY;

                paper.style.transform = `translateX(${self.currentpaperX}px) translateY(${self.currentpaperY}px)`;
            }
        });

        document.addEventListener('touchmove', (e) => {
            self.mouseX = e.touches[0].clientX;
            self.mouseY = e.touches[0].clientY;

            self.velocityX = self.mouseX - self.prevMouseX;
            self.velocityY = self.mouseY - self.prevMouseY;

            if (self.holdingPaper) {
                self.currentpaperX += self.velocityX;
                self.currentpaperY += self.velocityY;

                self.prevMouseX = self.mouseX;
                self.prevMouseY = self.mouseY;

                paper.style.transform = `translateX(${self.currentpaperX}px) translateY(${self.currentpaperY}px)`;
            }

            e.preventDefault(); // Prevent default touch behavior
        });

        window.addEventListener('mouseup', (e) => {
            this.holdingPaper = false;
        });

        window.addEventListener('touchend', (e) => {
            this.holdingPaper = false;
        });
    }
}

const paper = Array.from(document.querySelectorAll('.paper'));

paper.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});
