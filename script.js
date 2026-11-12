const form = document.getElementById("shippingForm");
const result = document.getElementById("result");
const savedRecords = document.getElementById("savedRecords");

// Get saved records from browser storage
function getRecords() {
    try {
        return JSON.parse(localStorage.getItem("shipments") || "[]");
    } catch (error) {
        return [];
    }
}

// Save records in browser storage
function saveRecords(records) {
    localStorage.setItem("shipments", JSON.stringify(records));
}

// Display saved shipment records
function displayRecords() {

    const records = getRecords();

    savedRecords.replaceChildren();

    if (records.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent = "No shipment records available.";
        savedRecords.appendChild(message);
        return;
    }

    records.forEach((record, index) => {

        const card = document.createElement("div");
        card.className = "saved-record";

        const heading = document.createElement("h3");
        heading.textContent = "Shipment #" + (index + 1);

        const details = document.createElement("div");

        const information = [
            "Sender: " + record.senderName,
            "Sender Address: " + record.senderAddress,
            "Sender Phone: " + record.senderPhone,
            "Receiver: " + record.receiverName,
            "Receiver Address: " + record.receiverAddress,
            "Receiver Phone: " + record.receiverPhone,
            "Weight: " + record.weight + " kg",
            "Distance: " + record.distance + " km",
            "Shipping Method: " + record.method,
            "Total Cost: ₹" + record.totalCost.toFixed(2)
        ];

        information.forEach(item => {
            const paragraph = document.createElement("p");
            paragraph.textContent = item;
            details.appendChild(paragraph);
        });

        card.append(heading, details);
        savedRecords.appendChild(card);
    });
}

// Calculate shipping
form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Sender information
    const senderName = document.getElementById("senderName").value.trim();
    const senderAddress = document.getElementById("senderAddress").value.trim();
    const senderPhone = document.getElementById("senderPhone").value;

    // Receiver information
    const receiverName = document.getElementById("receiverName").value.trim();
    const receiverAddress = document.getElementById("receiverAddress").value.trim();
    const receiverPhone = document.getElementById("receiverPhone").value;

    // Package information
    const weight = Number(document.getElementById("weight").value);
    const distance = Number(document.getElementById("distance").value);

    // Shipping method
    const method = document.getElementById("shippingMethod").value;

    // Calculate total cost using the same formula
    const totalCost = (weight * 10) + (distance * 2);

    // Create shipment object
    const shipment = {
        senderName,
        senderAddress,
        senderPhone,
        receiverName,
        receiverAddress,
        receiverPhone,
        weight,
        distance,
        method,
        totalCost
    };

    // Save shipment record
    const records = getRecords();
    records.push(shipment);

    try {
        saveRecords(records);
    } catch (error) {
        alert("Unable to save shipment. Browser storage may be full.");
        return;
    }

    // Display shipping summary safely
    result.replaceChildren();

    const summary = document.createElement("div");
    summary.className = "summary";

    function addHeading(text) {
        const heading = document.createElement("h3");
        heading.textContent = text;
        summary.appendChild(heading);
    }

    function addDetail(label, value) {
        const paragraph = document.createElement("p");
        paragraph.textContent = label + ": " + value;
        summary.appendChild(paragraph);
    }

    const title = document.createElement("h2");
    title.textContent = "Shipping Summary";
    summary.appendChild(title);

    addHeading("Sender Information");
    addDetail("Name", senderName);
    addDetail("Address", senderAddress);
    addDetail("Phone", senderPhone);

    addHeading("Receiver Information");
    addDetail("Name", receiverName);
    addDetail("Address", receiverAddress);
    addDetail("Phone", receiverPhone);

    addHeading("Package Information");
    addDetail("Weight", weight + " kg");
    addDetail("Distance", distance + " km");
    addDetail("Shipping Method", method);

    const cost = document.createElement("div");
    cost.className = "total-cost";
    cost.textContent = "Total Shipping Cost: ₹" + totalCost.toFixed(2);

    summary.appendChild(cost);
    result.appendChild(summary);

    // Refresh saved records
    displayRecords();

});

// Reset form
form.addEventListener("reset", function() {

    result.replaceChildren();

    // Return page to the top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// Load previously saved records
displayRecords();