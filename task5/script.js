const API = "api.php";

const renderTable = function () {
    fetch(API)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = "";

            for (const item of data) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.nev}</td>
                    <td>${item.varos}</td>
                    <td>${item.ferohely}</td>
                    <td>
                        <button onclick="editItem(${item.id})">Szerkeszt</button>
                        <button onclick="deleteItem(${item.id})">Töröl</button>
                    </td>
                `;
                tableBody.appendChild(row);
            }
        })
}

renderTable();

var editPending = null;

const submitForm = async function() {
    const nameInput = document.getElementById("name");
    const cityInput = document.getElementById("city");
    const capacityInput = document.getElementById("capacity");

    if (editPending != null) {
        await fetch(API, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: editPending,
                nev: nameInput.value.trim(),
                varos: cityInput.value.trim(),
                ferohely: parseInt(capacityInput.value)
            })
        });

        renderTable();
        editPending = null;
        nameInput.value = "";
        cityInput.value = "";
        capacityInput.value = "";
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nev: nameInput.value.trim(),
            varos: cityInput.value.trim(),
            ferohely: parseInt(capacityInput.value)
        })
    });

    renderTable();

    nameInput.value = "";
    cityInput.value = "";
    capacityInput.value = "";
}

const editItem = function(id) {
    const tableBody = document.getElementById("tableBody");
    const rows = tableBody.getElementsByTagName("tr");

    for (const row of rows) {
        if (row.firstElementChild.textContent == id) {
            document.getElementById("name").value = row.children[1].textContent;
            document.getElementById("city").value = row.children[2].textContent;
            document.getElementById("capacity").value = row.children[3].textContent;

            editPending = id;
        }
    }
}

const deleteItem = async function(id) {
    await fetch(API, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id})
    });

    renderTable();
}
