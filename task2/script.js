const DATA = [
    { id: 1, nev: "Gárdonyi Lajos", varos: "Budapest", ferohely: 320 },
    { id: 2, nev: "Pécsi Sándor", varos: "Sárospatak", ferohely: 250 },
    { id: 3, nev: "Páger Antal", varos: "Szeged", ferohely: 303 },
    { id: 4, nev: "Dayka Margit", varos: "Szeged", ferohely: 150 },
    { id: 5, nev: "Csortos Gyula", varos: "Győr", ferohely: 220 },
    { id: 6, nev: "Latabár Kálmán", varos: "Szolnok", ferohely: 160 },
    { id: 7, nev: "Kabos Gyula", varos: "Nyíregyháza", ferohely: 180 },
    { id: 8, nev: "Jávor Pál", varos: "Eger", ferohely: 200 },
    { id: 9, nev: "Karády Katalin", varos: "Eger", ferohely: 175 },
    { id: 10, nev: "Gábor Gyula", varos: "Tatabánya", ferohely: 180 },
    { id: 11, nev: "Salamon Béla", varos: "Kaposvár", ferohely: 300 },
    { id: 12, nev: "Gertler Viktor", varos: "Győr", ferohely: 310 },
    { id: 13, nev: "Várkonyi Zoltán", varos: "Siklós", ferohely: 180 },
    { id: 14, nev: "Mály Gerő", varos: "Zalaegerszeg", ferohely: 210 },
    { id: 15, nev: "Székely István", varos: "Siófok", ferohely: 240 },
    { id: 16, nev: "Keleti Márton", varos: "Szombathely", ferohely: 195 },
    { id: 17, nev: "Ráday Imre", varos: "Kistelek", ferohely: 150 },
    { id: 18, nev: "Bilicsi Tivadar", varos: "Tiszafüred", ferohely: 145 },
    { id: 19, nev: "Szabó Sándor", varos: "Érd", ferohely: 175 },
    { id: 20, nev: "Blaha Lujza", varos: "Komárom", ferohely: 210 },
    { id: 21, nev: "Tolnay Klári", varos: "Balatonfüred", ferohely: 230 },
    { id: 22, nev: "Latinovits Zoltán", varos: "Békéscsaba", ferohely: 260 },
    { id: 23, nev: "Kiss Manyi", varos: "Pécs", ferohely: 150 },
    { id: 24, nev: "Somlay Artúr", varos: "Debrecen", ferohely: 180 },
    { id: 25, nev: "Fedák Sári", varos: "Keszthely", ferohely: 230 },
    { id: 26, nev: "Makláry Zoltán", varos: "Budapest", ferohely: 155 },
    { id: 27, nev: "Major Tamás", varos: "Pécs", ferohely: 140 },
    { id: 28, nev: "Gobbi Hilda", varos: "Budapest", ferohely: 300 },
    { id: 29, nev: "Törzs Jenő", varos: "Szekszárd", ferohely: 130 },
    { id: 30, nev: "Bajor Gizi", varos: "Budapest", ferohely: 120 },
    { id: 31, nev: "Ujházi Ede", varos: "Budapest", ferohely: 140 },
    { id: 32, nev: "Rózsahegyi Kálmán", varos: "Miskolc", ferohely: 210 },
    { id: 33, nev: "Honthy Hanna", varos: "Veszprém", ferohely: 120 },
    { id: 34, nev: "Márkus Emília", varos: "Sopron", ferohely: 160 },
    { id: 35, nev: "Varsányi Irén", varos: "Budapest", ferohely: 300 },
    { id: 36, nev: "Hegedűs Gyula", varos: "Budapest", ferohely: 155 },
    { id: 37, nev: "Rajnay Gábor", varos: "Gyöngyös", ferohely: 210 }
]

let editPending = null;

const renderTable = function() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    DATA.sort((lh, rh) => lh.id - rh.id);
    for (const item of DATA) {
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
}

renderTable();

const validate = function() {
    let idInput = document.getElementById("id");
    let nameInput = document.getElementById("name");
    let cityInput = document.getElementById("city");
    let capacityInput = document.getElementById("capacity");

    if (idInput.value.trim() === "" || isNaN(idInput.value) || parseInt(idInput.value) <= 0) {
        document.getElementById("_idValidationError").classList.remove("_hide");
        return false;
    } else {
        document.getElementById("_idValidationError").classList.add("_hide");
    }

    if (nameInput.value.trim() === "") {
        document.getElementById("_nameValidationError").classList.remove("_hide");
        return false;
    } else {
        document.getElementById("_nameValidationError").classList.add("_hide");
    }

    if (cityInput.value.trim() === "") {
        document.getElementById("_cityValidationError").classList.remove("_hide");
        return false;
    } else {
        document.getElementById("_cityValidationError").classList.add("_hide");
    }

    if (capacityInput.value.trim() === "" || isNaN(capacityInput.value) || parseInt(capacityInput.value) <= 0) {
        document.getElementById("_capacityValidationError").classList.remove("_hide");
        return false;
    } else {
        document.getElementById("_capacityValidationError").classList.add("_hide");
    }

    return true;
}

const submitForm = function() {
    if (!validate()) return;

    const idInput = document.getElementById("id");
    const nameInput = document.getElementById("name");
    const cityInput = document.getElementById("city");
    const capacityInput = document.getElementById("capacity");

    if (editPending != null) {
        //deleteItem(editPending);
        DATA.find(it => it.id === editPending).nev = nameInput.value.trim();
        DATA.find(it => it.id === editPending).varos = cityInput.value.trim();
        DATA.find(it => it.id === editPending).ferohely = parseInt(capacityInput.value);
        renderTable();

        idInput.value = "";
        nameInput.value = "";
        cityInput.value = "";
        capacityInput.value = "";
        editPending = null;
        return;
    }
    let flag = false;
    DATA.map(it => it.id).includes(parseInt(idInput.value)) && alert("Már létezik ilyen ID-vel rendelkező mozi!")  && (flag = true);
    if (flag) return;

    const newItem = {
        id: parseInt(idInput.value),
        nev: nameInput.value.trim(),
        varos: cityInput.value.trim(),
        ferohely: parseInt(capacityInput.value)
    };

    DATA.push(newItem);
    renderTable();

    idInput.value = "";
    nameInput.value = "";
    cityInput.value = "";
    capacityInput.value = "";
}

const editItem = function(id) {
    for (const it of DATA) {
        if (it.id === id) {
            document.getElementById("id").value = it.id;
            document.getElementById("name").value = it.nev;
            document.getElementById("city").value = it.varos;
            document.getElementById("capacity").value = it.ferohely;
            //deleteItem(id);
            editPending = id;
            break;
        }
    }
}

const deleteItem = function(id) {
    for (const it of DATA) {
        if (it.id === id) {
            DATA.splice(DATA.indexOf(it), 1);
            break;
        }
    }
    renderTable();
}
