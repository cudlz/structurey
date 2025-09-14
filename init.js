window.onload = function () {
    // Extend custom classes
    const classes = [
        {
            name: "math",
            color: "#04e824"
        },
        {
            name: "control",
            color: "#FF1053"
        },
        {
            name: "variables",
            color: "#4056F4"
        },
        {
            name: "loops",
            color: "#FFA500"
        },
        {
            name: "functions",
            color: "#8A2BE2"
        },
        {
            name: "logic",
            color: "#00CED1"
        }
    ];

    // Extend custom blocks
    const blocks = [
        {
            class: "control",
            id: "if_statement",
            name: "If Abfrage",
            type: "choice",
            fields: [
                "if",
                "then"
            ],
            can_add_fields: true
        },
        {
            class: "control",
            id: "print",
            name: "Print to console",
            type: "default",
            fields: [
                "message"
            ],
            can_add_fields: false
        },
        {
            class: "math",
            id: "math_function",
            name: "Math function",
            type: "default",
            fields: [
                "input"
            ]
        },
        {
            class: "variables",
            id: "variables",
            name: "Variable create",
            type: "default",
            fields: [
                "name",
                "type",
                "input"
            ]
        },
        // New Blocks
        {
            class: "loops",
            id: "for_loop",
            name: "For Loop",
            type: "choice",
            fields: [
                "start",
                "end",
                "step"
            ],
            can_add_fields: true
        },
        {
            class: "loops",
            id: "while_loop",
            name: "While Loop",
            type: "choice",
            fields: [
                "condition"
            ],
            can_add_fields: true
        },
        {
            class: "functions",
            id: "function_create",
            name: "Create Function",
            type: "default",
            fields: [
                "name",
                "parameters",
                "body"
            ],
            can_add_fields: true
        },
        {
            class: "logic",
            id: "compare",
            name: "Comparison",
            type: "default",
            fields: [
                "value1",
                "operator",
                "value2"
            ],
            can_add_fields: false
        },
        {
            class: "logic",
            id: "boolean",
            name: "Boolean",
            type: "default",
            fields: [
                "true_or_false"
            ],
            can_add_fields: false
        }
    ];


    // Get container
    const container = document.getElementById("block-container");

    // Function to get class color
    function getClassColor(className) {
        const cls = classes.find(c => c.name === className);
        return cls ? cls.color : "#999"; // default gray
    }

    // Spawn blocks
    blocks.forEach(block => {
        const blockDiv = document.createElement("div");
        blockDiv.className = "block copyable";
        blockDiv.style.backgroundColor = getClassColor(block.class);
        blockDiv.innerHTML = "<span>" + block.name + "</span>";

        const fieldsDiv = document.createElement("div");
        fieldsDiv.className = "fields"

        block.fields.forEach(field => {
            const fieldDiv = document.createElement("div");
            fieldDiv.className = "field"
            fieldDiv.innerText = field;
            fieldsDiv.appendChild(fieldDiv);
        });

        blockDiv.appendChild(fieldsDiv);
        container.appendChild(blockDiv);
    });
};
