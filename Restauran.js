const customerOrders = JSON.parse(localStorage.getItem("customerOrders")) || [];


class Customer {
    constructor(fullName, password, dob, gender, phone, orderType, orderOption, imageUrl) {
        Object.assign(this, { fullName, password, dob, gender, phone, orderType, orderOption, imageUrl });
    }
}


const renderCards = () => {
    const main = document.querySelector("main");
    document.querySelector(".cards-section")?.remove();

    const cardsSection = document.createElement("div");
    cardsSection.classList.add("cards-section");
    cardsSection.innerHTML = "<h2>Customer Orders</h2>";

    customerOrders.forEach(({ fullName, password, dob, gender, phone, orderType, orderOption, imageUrl }) => {
        cardsSection.innerHTML += `
            <div class="card">
                <img src="${imageUrl}" alt="Customer Image">
                <p><b>Full Name:</b> ${fullName}</p>
                <p><b>Password:</b> *****</p>
                <p><b>Date of Birth:</b> ${dob}</p>
                <p><b>Gender:</b> ${gender}</p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Order Type:</b> ${orderType.join(", ")}</p>
                <p><b>Order Option:</b> ${orderOption}</p>
            </div>`;
    });

    main.appendChild(cardsSection);
};


document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customer = new Customer(
        formData.get("fullName"),
        formData.get("password"),
        formData.get("dob"),
        formData.get("gender"),
        formData.get("phone"),
        formData.getAll("orderType"),
        formData.get("orderOption"),
        formData.get("imageUrl")
    );

    customerOrders.push(customer);
    localStorage.setItem("customerOrders", JSON.stringify(customerOrders));
    renderCards();
    e.target.reset();
});

renderCards();
