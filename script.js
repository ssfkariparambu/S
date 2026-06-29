const tableBody = document.getElementById("tableBody");
const sheet = document.querySelector(".sheet");

// ===============================
// Create Default 9 Rows
// ===============================

window.onload = function () {
    for (let i = 0; i < 9; i++) {
        createRow();
    }
    updateSheetHeight();
};

// ===============================
// Create Row
// ===============================

function createRow() {

    const row = document.createElement("tr");

    for (let i = 0; i < 8; i++) {

        const cell = document.createElement("td");

        cell.contentEditable = "true";

        cell.spellcheck = false;

        row.appendChild(cell);

    }

    tableBody.appendChild(row);

}

// ===============================
// Add Row
// ===============================

function addRow() {

    createRow();

    updateSheetHeight();

}

// ===============================
// Delete Last Row
// ===============================

function deleteRow() {

    if (tableBody.rows.length > 1) {

        tableBody.removeChild(tableBody.lastElementChild);

        updateSheetHeight();

    }

}

// ===============================
// Auto Height
// ===============================

function updateSheetHeight() {

    let rows = tableBody.rows.length;

    if (rows <= 9) {

        sheet.style.height = "14.85cm";

    } else {

        let extraRows = rows - 9;

        let height = 14.85 + (extraRows * 1.02);

        sheet.style.height = height + "cm";

    }

}

// ===============================
// Enter Key → Next Cell
// ===============================

document.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && e.target.isContentEditable) {

        e.preventDefault();

        let editable = [...document.querySelectorAll("[contenteditable='true']")];

        let index = editable.indexOf(document.activeElement);

        if (index + 1 < editable.length) {

            editable[index + 1].focus();

        }

    }

});

// ===============================
// Tab Key → Next Cell
// ===============================

document.addEventListener("keydown", function (e) {

    if (e.key === "Tab") {

        let editable = [...document.querySelectorAll("[contenteditable='true']")];

        let index = editable.indexOf(document.activeElement);

        if (index !== -1) {

            e.preventDefault();

            if (index + 1 < editable.length) {

                editable[index + 1].focus();

            }

        }

    }

});

// ===============================
// Paste Plain Text
// ===============================

document.addEventListener("paste", function (e) {

    if (e.target.isContentEditable) {

        e.preventDefault();

        let text = (e.clipboardData || window.clipboardData).getData("text");

        document.execCommand("insertText", false, text);

    }

});

// ===============================
// Print
// ===============================

function printSheet() {

    window.print();

}
