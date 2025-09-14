document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("block-container");
    let draggingBlock = null;
    let offsetX = 0;
    let offsetY = 0;
    let isResizing = false;

    container.addEventListener("mousedown", function (e) {
        const target = e.target.closest(".block");
        if (!target || !container.contains(target)) return;

        // Check if the click is on the resize handle (top-right corner)
        const rect = target.getBoundingClientRect();
        const handleSize = 10; // same as ::after width/height
        const isOnHandle = e.clientX > rect.right - handleSize && e.clientY < rect.top + handleSize;

        if (isOnHandle) {
            isResizing = true;
            draggingBlock = target;
            e.preventDefault(); // prevent text selection while resizing
            return;
        }

        // Drag logic
        if (target.classList.contains("copyable")) {
            draggingBlock = target.cloneNode(true);
            draggingBlock.classList.remove("copyable");
            container.appendChild(draggingBlock);
        } else {
            draggingBlock = target;
        }

        draggingBlock.style.position = "absolute";
        draggingBlock.style.pointerEvents = "none";

        offsetX = e.pageX - draggingBlock.offsetLeft;
        offsetY = e.pageY - draggingBlock.offsetTop;

        draggingBlock.style.left = e.pageX - offsetX + "px";
        draggingBlock.style.top = e.pageY - offsetY + "px";
    });

    document.addEventListener("mousemove", function (e) {
        if (isResizing && draggingBlock) {
            // Resize based on mouse position
            const rect = draggingBlock.getBoundingClientRect();
            draggingBlock.style.width = e.clientX - rect.left + "px";
            draggingBlock.style.height = rect.top - e.clientY; // optional if you want height
        } else if (draggingBlock) {
            // Drag
            draggingBlock.style.left = e.pageX - offsetX + "px";
            draggingBlock.style.top = e.pageY - offsetY + "px";
        }
    });

    document.addEventListener("mouseup", function () {
        if (draggingBlock) {
            draggingBlock.style.pointerEvents = "auto";
            draggingBlock.focus();
            draggingBlock = null;
        }
        isResizing = false;
    });
});
