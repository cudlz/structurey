document.addEventListener("DOMContentLoaded", () => {
    const toggles = document.querySelectorAll(".img-button-toggle");

    toggles.forEach(toggle => {
        const imgs = toggle.querySelectorAll("img");
        let state = 0;

        // Force default to 0 (off)
        imgs.forEach(img => img.style.display = "none");
        imgs[0].style.display = "block";
        toggle.dataset.state = state;

        toggle.addEventListener("click", () => {
            // flip state
            state = state === 0 ? 1 : 0;
            imgs[0].style.display = state === 0 ? "block" : "none";
            imgs[1].style.display = state === 1 ? "block" : "none";
            toggle.dataset.state = state;

            // Run the function from data-run
            const runAttr = imgs[state].dataset.run;
            if (runAttr) {
                // remove () if present and call the function
                const funcName = runAttr.replace(/\(\)$/, "");
                if (typeof window[funcName] === "function") {
                    window[funcName]();      
                }
                console.log(runAttr)   
            }
        });
    });
});