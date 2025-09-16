let snappingEnabled = true;

function toggleSnapping() {
    if (snappingEnabled) {
        snappingEnabled = false
    } else {
        snappingEnabled = true
    }
}

function toggleGrid() {
    const container = document.getElementById("block-container");
    container.classList.toggle("grid");
}

function toggleColors() {
    const blocks = document.querySelectorAll(".block");
    blocks.forEach(block => {
        block.classList.add("nocolor");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    toggleColors();

    const palette = document.getElementById("block-palette");
    const container = document.getElementById("block-container");

    let draggingBlock = null;
    let offsetX = 0;
    let offsetY = 0;
    let isResizing = false;

    function onMouseDown(e) {
        const target = e.target.closest(".block");
        if (!target) return;

        if (target.parentElement.classList.contains("field")) {
            // Remove the marker class before detaching
            const span = target.parentElement.querySelector("span");
            if (span) {
                span.classList.remove("field-contains-block");
            }

            // If it's already inside a field, re-attach to container for dragging
            target.classList.remove("in-field");
            container.appendChild(target);
        }


        if (target.parentElement.classList.contains("field")) {
            // If it's already inside a field, re-attach to container for dragging
            target.classList.remove("in-field")
            container.appendChild(target);
        }

        const rect = target.getBoundingClientRect();
        const handleSize = 15;
        const isOnHandle = e.clientX > rect.right - handleSize && e.clientY > rect.bottom - handleSize;

        if (isOnHandle) {
            isResizing = true;
            draggingBlock = target;
            e.preventDefault();
            return;
        }

        // Drag logic
        if (palette.contains(target) && target.classList.contains("copyable")) {
            draggingBlock = target.cloneNode(true);
            draggingBlock.classList.remove("copyable");
            container.appendChild(draggingBlock);

            // Set position at click location
            const containerRect = container.getBoundingClientRect();
            const clickX = e.clientX - containerRect.left;
            const clickY = e.clientY - containerRect.top;

            draggingBlock.style.position = "absolute";
            draggingBlock.style.left = clickX + "px";
            draggingBlock.style.top = clickY + "px";

            offsetX = e.clientX - clickX - containerRect.left;
            offsetY = e.clientY - clickY - containerRect.top;
        } else {
            draggingBlock = target;
            const containerRect = container.getBoundingClientRect();

            // Calculate offset relative to container
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            draggingBlock.style.position = "absolute";
            draggingBlock.style.pointerEvents = "none";

            // Set initial position relative to container
            draggingBlock.style.left = (rect.left - containerRect.left) + "px";
            draggingBlock.style.top = (rect.top - containerRect.top) + "px";
        }
    }

    let potentialField = null;

    function onMouseMove(e) {
        // Highlight fields
        const fields = container.querySelectorAll(".fields .field");
        potentialField = null;

        fields.forEach(field => {
            const rect = field.getBoundingClientRect();
            if (
                e.clientX > rect.left &&
                e.clientX < rect.right &&
                e.clientY > rect.top &&
                e.clientY < rect.bottom
            ) {
                if (!draggingBlock || field.closest(".block") === draggingBlock) {
                    field.classList.remove("highlighted");
                } else {
                    if (field.title.replace("Expected type: ", "") == draggingBlock.title.replace("Returns: ", "") ||
                    "any" == draggingBlock.title.replace("Returns: ", "") || "type_setable" == draggingBlock.title.replace("Returns: ", "")) {
                        potentialField = field;
                        field.classList.add("highlighted");   
                    }
                }
            } else {
                field.classList.remove("highlighted");
            }
        });


        if (!draggingBlock) return;

        draggingBlock.style.zIndex = "128";

        if (isResizing) {
            const rect = draggingBlock.getBoundingClientRect();
            const newWidth = e.clientX - rect.left;
            const newHeight = e.clientY - rect.top;

            if (snappingEnabled) {
                draggingBlock.style.width = Math.round((newWidth) / 45) * 45 + "px";
                //draggingBlock.style.height = Math.round((newHeight) / 45) * 45 + "px";
            } else {
                draggingBlock.style.width = newWidth + "px";
                //draggingBlock.style.height = newHeight + "px";
            }
        } else {
            const containerRect = container.getBoundingClientRect();
            const newX = e.clientX - containerRect.left - offsetX;
            const newY = e.clientY - containerRect.top - offsetY;

            if (snappingEnabled) {
                draggingBlock.style.left = Math.round(newX / 22.5) * 22.5 + "px";
                draggingBlock.style.top = Math.round(newY / 22.5) * 22.5 + "px";
            } else {
                draggingBlock.style.left = newX + "px";
                draggingBlock.style.top = newY + "px";
            }
        }
    }

    function onMouseUp() {
        if (draggingBlock) {
            draggingBlock.style.pointerEvents = "auto";

            if (potentialField) {
                console.log("e" + potentialField);
                potentialField.appendChild(draggingBlock);
                draggingBlock.classList.add("in-field");
                if (potentialField.querySelector("span")) {
                    console.log("e");
                }

                potentialField.querySelector("span").classList.add("field-contains-block");
                const block = potentialField.closest('.block');
            } else {
                draggingBlock.style.pointerEvents = "auto";
            }
            draggingBlock = null;
        }
        isResizing = false;
    }

    // Listen for mousedown on both palette and container
    palette.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousedown", onMouseDown);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});