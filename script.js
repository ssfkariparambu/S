/* ============================================
   SAHITYOTSAV BULK IMAGE GENERATOR
   script.js
   PART - 1
============================================ */

const sheet = document.querySelector(".sheet");
const tableBody = document.getElementById("tableBody");

/* -------------------------
   Default Rows
------------------------- */

window.addEventListener("load", () => {

    for (let i = 0; i < 9; i++) {

        createRow();

    }

    updateHeight();

});

/* -------------------------
   Create Row
------------------------- */

function createRow() {

    const row = document.createElement("tr");

    for (let i = 0; i < 8; i++) {

        const td = document.createElement("td");

        td.contentEditable = true;

        td.spellcheck = false;

        td.setAttribute("data-cell", i);

        td.addEventListener("focus", highlightCell);

        td.addEventListener("blur", removeHighlight);

        row.appendChild(td);

    }

    tableBody.appendChild(row);

}

/* -------------------------
   Add Row
------------------------- */

function addRow() {

    createRow();

    updateHeight();

}

/* -------------------------
   Delete Row
------------------------- */

function deleteRow() {

    if (tableBody.rows.length <= 1) return;

    tableBody.removeChild(tableBody.lastElementChild);

    updateHeight();

}

/* -------------------------
   Auto Height
------------------------- */

function updateHeight() {

    const rows = tableBody.rows.length;

    if (rows <= 9) {

        sheet.style.height = "14.85cm";

    } else {

        const extra = rows - 9;

        const newHeight = 14.85 + (extra * 1.02);

        sheet.style.height = newHeight + "cm";

    }

}

/* -------------------------
   Highlight Editing Cell
------------------------- */

function highlightCell(e) {

    e.target.style.background = "#fff6bf";

}

function removeHighlight(e) {

    e.target.style.background = "";

}

/* -------------------------
   Prevent Rich Text Paste
------------------------- */

document.addEventListener("paste", function(e){

    if(e.target.isContentEditable){

        e.preventDefault();

        const text =
        (e.clipboardData || window.clipboardData)
        .getData("text/plain");

        document.execCommand("insertText",false,text);

    }

});

/* ============================================
   SAHITYOTSAV BULK IMAGE GENERATOR
   script.js
   PART - 2
============================================ */

/* -------------------------
   All Editable Cells
------------------------- */

function getEditableCells() {

    return [...document.querySelectorAll("[contenteditable='true']")];

}

/* -------------------------
   Enter = Next Cell
------------------------- */

document.addEventListener("keydown", function (e) {

    if (!e.target.isContentEditable) return;

    if (e.key === "Enter") {

        e.preventDefault();

        const cells = getEditableCells();

        const index = cells.indexOf(document.activeElement);

        if (index < cells.length - 1) {

            cells[index + 1].focus();

        }

    }

});

/* -------------------------
   TAB = Next Cell
------------------------- */

document.addEventListener("keydown", function (e) {

    if (!e.target.isContentEditable) return;

    if (e.key === "Tab") {

        e.preventDefault();

        const cells = getEditableCells();

        const index = cells.indexOf(document.activeElement);

        if (e.shiftKey) {

            if (index > 0) {

                cells[index - 1].focus();

            }

        } else {

            if (index < cells.length - 1) {

                cells[index + 1].focus();

            }

        }

    }

});

/* -------------------------
   Arrow Navigation
------------------------- */

document.addEventListener("keydown", function (e) {

    if (!e.target.isContentEditable) return;

    const cells = getEditableCells();

    const current = document.activeElement;

    const index = cells.indexOf(current);

    if (index === -1) return;

    switch (e.key) {

        case "ArrowRight":

            e.preventDefault();

            if (cells[index + 1]) {

                cells[index + 1].focus();

            }

            break;

        case "ArrowLeft":

            e.preventDefault();

            if (cells[index - 1]) {

                cells[index - 1].focus();

            }

            break;

    }

});

/* -------------------------
   Double Click Select Text
------------------------- */

document.addEventListener("dblclick", function (e) {

    if (e.target.isContentEditable) {

        document.execCommand("selectAll", false, null);

    }

});

/* -------------------------
   Empty Cell Protection
------------------------- */

document.addEventListener("blur", function (e) {

    if (!e.target.isContentEditable) return;

    if (e.target.innerHTML === "<br>") {

        e.target.innerHTML = "";

    }

}, true);

/* -------------------------
   Trim Spaces
------------------------- */

document.addEventListener("input", function (e) {

    if (!e.target.isContentEditable) return;

    e.target.innerText = e.target.innerText.replace(/\s{2,}/g, " ");

});

/* -------------------------
   Prevent Drag
------------------------- */

document.addEventListener("dragstart", function (e) {

    e.preventDefault();

});

/* -------------------------
   CTRL + P
------------------------- */

document.addEventListener("keydown", function (e) {

    if (e.ctrlKey && e.key.toLowerCase() === "p") {

        e.preventDefault();

        printSheet();

    }

});

/* -------------------------
   Print
------------------------- */

function printSheet() {

    window.print();

}

/* ============================================
   SAHITYOTSAV BULK IMAGE GENERATOR
   PART - 3
============================================ */

/* -------------------------
   Clear All Cells
------------------------- */

function clearSheet() {

    if (!confirm("Clear all data?")) return;

    document.querySelectorAll("td[contenteditable='true']").forEach(cell => {
        cell.innerHTML = "";
    });

    document.querySelector(".event-name").innerHTML = "LP PENCIL DRAWING";

}

/* -------------------------
   Download PNG
------------------------- */

async function downloadPNG() {

    const canvas = await html2canvas(sheet, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true
    });

    const link = document.createElement("a");

    link.download = "Result Sheet.png";

    link.href = canvas.toDataURL("image/png");

    link.click();

}

/* -------------------------
   Download PDF
------------------------- */

async function downloadPDF() {

    const canvas = await html2canvas(sheet, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true
    });

    const img = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "cm",
        format: [21, 14.85]
    });

    pdf.addImage(img, "PNG", 0, 0, 21, 14.85);

    pdf.save("Result Sheet.pdf");

}

/* -------------------------
   Keyboard Shortcuts
------------------------- */

document.addEventListener("keydown", function(e){

    if(e.ctrlKey && e.key==="="){

        e.preventDefault();

        addRow();

    }

    if(e.ctrlKey && e.key==="-"){

        e.preventDefault();

        deleteRow();

    }

    if(e.ctrlKey && e.key.toLowerCase()==="d"){

        e.preventDefault();

        downloadPNG();

    }

    if(e.ctrlKey && e.key.toLowerCase()==="s"){

        e.preventDefault();

        downloadPDF();

    }

});

/* -------------------------
   Auto Focus First Cell
------------------------- */

window.addEventListener("load",()=>{

    setTimeout(()=>{

        const first=document.querySelector("td");

        if(first){

            first.focus();

        }

    },300);

});

/* -------------------------
   Prevent Image Drag
------------------------- */

document.querySelectorAll("img").forEach(img=>{

    img.setAttribute("draggable","false");

});

/* -------------------------
   Disable Context Menu
------------------------- */

document.addEventListener("contextmenu",function(e){

    e.preventDefault();

});

/* ============================================
   END OF SCRIPT
============================================ */
