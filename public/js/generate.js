
// Sample sales data (this would normally come from your sales system)
// const salesData = [
//     { item: "Beans", quantity: 2, price: 1200 },
//     { item: "Rice", quantity: 1, price: 3000 },
//     { item: "Maize", quantity: 3, price: 1500 }
// ];

// Function to generate receipt
function generateReceipt() {
    const itemsContainer = document.getElementById("produceName");
    const dateElement = document.getElementById("date");
    const receiptNoElement = document.getElementById("receipt-no");
    const grandTotalElement = document.getElementById("grand-total");

    // Set current date
    const currentDate = new Date().toLocaleDateString();
    dateElement.textContent = currentDate;

    // Generate a random receipt number
    const receiptNo = Math.floor(Math.random() * 1000000);
    receiptNoElement.textContent = receiptNo;

    // Clear previous items if any
    itemsContainer.innerHTML = "";

    // Calculate grand total
    let grandTotal = 0;

    // Add sales items to receipt
    salesData.forEach((sale) => {
        const total = sale.quantity * sale.price;
        grandTotal += total;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${sale.produceName}</td>
            <td>${sale.produceType} kg</td>
            <td>${sale.tonnage}</td>
            <th>${sale.price}</td>
            <td>${total}</td>
            <td>${sale.salesAgent}</td>
        `;
        itemsContainer.appendChild(row);
    });

    // Set grand total
    grandTotalElement.textContent = grandTotal;
}

// Generate receipt when the page loads
window.onload = generateReceipt
