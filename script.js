const tableBody = document.getElementById("tableBody");
const sheet = document.querySelector(".sheet");

// Default 9 Rows
for (let i = 0; i < 9; i++) {
    createRow();
}

updateSheetHeight();

// ==========================
// Create Row
// ==========================

function createRow() {

    const tr = document.createElement("tr");

    for (let i = 0; i < 8; i++) {

        const td = document.createElement("td");

        td.contentEditable = "true";

        tr.appendChild(td);

    }

    tableBody.appendChild(tr);

}

// ==========================
// Add Row
// ==========================

function addRow() {

    createRow();

    updateSheetHeight();

}

// ==========================
// Delete Last Row
// ==========================

function deleteRow() {

    if (tableBody.rows.length > 1) {

        tableBody.deleteRow(tableBody.rows.length - 1);

        updateSheetHeight();

    }

}

// ==========================
// Auto Height
// ==========================

function updateSheetHeight() {

    const rows = tableBody.rows.length;

    if (rows <= 9) {

        sheet.style.height = "14.85cm";

    } else {

        const extra = rows - 9;

        sheet.style.height = (14.85 + (extra * 1.02)) + "cm";

    }

}

// ==========================
// Tab Navigation
// ==========================

document.addEventListener("keydown", function (e) {

    if (e.key === "Tab") {

        const cells = [...document.querySelectorAll("[contenteditable='true']")];

        const index = cells.indexOf(document.activeElement);

        if (index > -1) {

            e.preventDefault();

            if (cells[index + 1]) {

                cells[index + 1].focus();

            }

        }

    }

});

// ==========================
// Enter = Next Cell
// ==========================

document.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && e.target.isContentEditable) {

        e.preventDefault();

        const cells = [...document.querySelectorAll("[contenteditable='true']")];

        const index = cells.indexOf(document.activeElement);

        if (cells[index + 1]) {

            cells[index + 1].focus();

        }

    }

});

// ==========================
// Paste Plain Text
// ==========================

document.addEventListener("paste", function (e) {

    if (e.target.isContentEditable) {

        e.preventDefault();

        const text = (e.clipboardData || window.clipboardData).getData("text");

        document.execCommand("insertText", false, text);

    }

});

// ==========================
// Print
// ==========================

function printSheet() {

    window.print();

}
