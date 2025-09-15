window.onload = function () {
    // Extend custom classes
    // Define custom classes
    const classes = [
        { name: "math", color: "#04e824" },
        { name: "control", color: "#FF1053" },
        { name: "variables", color: "#4056F4" },
        { name: "statements", color: "#FFA500" },
        { name: "functions", color: "#8A2BE2" },
        { name: "logic", color: "#00CED1" }
    ];

    const types = [
        "string",
        "float",
        "int",
        "number",
        "variable",
        "blocks",
        "boolean",
        "operator_logic",
        "operator_math",
        "type",
        "any",
        "array",
        "input",
        "select",
        "none"
    ]

    // Define custom blocks
    const blocks = [
        // Control
        {
            class: "control",
            id: "print",
            name: "Print to Console",
            one_lined: true,
            custom_fields: false,
            fields: ["message"],
            field_types: ["string"],
            returns: "blocks"
        },
        {
            class: "control",
            id: "start",
            name: "Run on Program Start",
            one_lined: true,
            custom_fields: false,
            fields: ["body"],
            field_types: ["blocks"],
            returns: "blocks"
        },
        // Variables
        {
            class: "variables",
            id: "variable_create",
            name: "Create Variable",
            one_lined: true,
            custom_fields: false,
            fields: ["name", "type", "input"],
            field_types: ["string", "type", "string"],
            returns: "blocks"
        },
        {
            class: "variables",
            id: "variable_set",
            name: "Set Variable",
            one_lined: true,
            custom_fields: false,
            fields: ["name", "value"],
            field_types: ["variable", "string"],
            returns: "blocks"
        },
        // Loops
        {
            class: "statements",
            id: "for_loop",
            name: "For Loop",
            one_lined: true,
            custom_fields: true,
            fields: ["start at", "do", "end at", "step"],
            field_types: ["int", "blocks", "int", "number"],
            returns: "blocks"
        },
        {
            class: "statements",
            id: "while_loop",
            name: "While Loop",
            one_lined: true,
            custom_fields: true,
            fields: ["condition", "do"],
            field_types: ["boolean", "blocks"],
            returns: "blocks"
        },
        {
            class: "statements",
            id: "if_statement",
            name: "If Statement",
            one_lined: true,
            custom_fields: true,
            fields: ["if", "then", "else", "then"],
            can_add_fields: true,
            field_types: ["boolean", "blocks", "boolean", "blocks"],
            returns: "blocks"
        },
        // Functions
        {
            class: "functions",
            id: "function_create",
            name: "Create Function",
            one_lined: true,
            custom_fields: false,
            fields: ["name", "parameters", "body"],
            field_types: ["string", "string", "blocks"],
            returns: "blocks"
        },
        {
            class: "functions",
            id: "function_call",
            name: "Call Function",
            one_lined: true,
            custom_fields: false,
            fields: ["name", "arguments"],
            field_types: ["string", "array"],
            returns: "blocks"
        },
        // Logic
        {
            class: "logic",
            id: "compare",
            name: "Comparison",
            one_lined: true,
            custom_fields: false,
            fields: ["value1", "operator_logic", "value2"],
            field_types: ["any", "operator_logic", "any"],
            returns: "boolean"
        },
        {
            class: "logic",
            id: "logic_operator",
            name: "Logic Operator",
            one_lined: true,
            custom_fields: false,
            fields: ["operator"],
            field_types: ["select"],
            select: ["==", "!=", "&&", "||"],
            returns: "operator_logic"
        },
        // Flexible User Input
        {
            class: "input",
            id: "user_input",
            name: "User Input",
            one_lined: true,
            custom_fields: false,
            fields: ["value"],
            field_types: ["input"],
            returns: "any"
        },
        // Math Operators
        {
            class: "math",
            id: "math",
            name: "Math",
            one_lined: true,
            custom_fields: false,
            fields: ["value1", "operator_math", "value2"],
            field_types: ["number", "operator_math", "number"],
            returns: "number"
        },
        {
            class: "math",
            id: "math_operator",
            name: "Math Operator",
            one_lined: true,
            custom_fields: false,
            fields: ["operator"],
            field_types: ["select"],
            select: ["+", "-", "*", "/", "**", "//", "%"],
            returns: "operator_math"
        },
    ];

    // Get palette
    const palette = document.getElementById("block-palette");

    // Function to get class color
    function getClassColor(className) {
        const cls = classes.find(c => c.name === className);
        return cls ? cls.color : "#999"; // default gray
    }

    let lastClass = "";

    // Spawn blocks
    blocks.forEach(block => {
        if (block.class != lastClass) {
            const classTitle = document.createElement("p");
            classTitle.innerText = block.class;
            classTitle.className = "class-title";
            palette.appendChild(classTitle);
            lastClass = block.class;
        }

        const blockDiv = document.createElement("div");
        blockDiv.className = "block copyable";
        blockDiv.style.backgroundColor = getClassColor(block.class);
        const span = this.document.createElement("span");
        span.textContent = block.name;
        blockDiv.title = "Returns: "+block.returns;
        blockDiv.appendChild(span);

        const fieldsDiv = document.createElement("div");
        fieldsDiv.className = "fields";

        block.fields.forEach((field, index) => {
            const type = block.field_types ? block.field_types[index] : "any";
            let fieldDiv;

            // Use <input> for user input blocks or keep <div> for others
            if (block.field_types[index] == "input") {
                fieldDiv = document.createElement("input");
                fieldDiv.placeholder = field; // optional
            } else if (block.field_types[index] == "select") {
                fieldDiv = document.createElement("select");
                block.select.forEach(optionValue => {
                    const option = document.createElement("option");
                    option.value = optionValue;
                    option.textContent = optionValue;
                    fieldDiv.appendChild(option);
                });
            } else {
                fieldDiv = document.createElement("div");
                fieldDiv.innerHTML = "<span>" + field + "</span>";
            }

            // Add type info as a tooltip
            fieldDiv.title = "Expected type: " + type;
            fieldDiv.className = "field";

            fieldsDiv.appendChild(fieldDiv);
        });

        blockDiv.appendChild(fieldsDiv);
        palette.appendChild(blockDiv);
    });

};
