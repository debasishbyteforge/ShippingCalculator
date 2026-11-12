function calculateShipping() {

    let weight = Number(document.getElementById("weight").value);
    let distance = Number(document.getElementById("distance").value);

    if (
        document.getElementById("weight").value === "" ||
        document.getElementById("distance").value === "" ||
        !Number.isFinite(weight) ||
        !Number.isFinite(distance) ||
        weight <= 0 ||
        distance <= 0
    ) {
        alert("Please enter valid weight and distance!");
        return;
    }

    let cost = (weight * 10) + (distance * 2);

    document.getElementById("result").innerHTML =
        "Shipping Cost: ₹" + cost.toFixed(2);
}