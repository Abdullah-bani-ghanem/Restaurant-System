const customerOrders = JSON.parse(localStorage.getItem("customerOrders")) || [];

class Customer {
    constructor(fullName, email, password, dob, gender, phone, orderType, orderOption, imageUrl) {
        Object.assign(this, { fullName, email, password, dob, gender, phone, orderType, orderOption, imageUrl });
    }
}

const renderCards = () => {
    const main = document.querySelector("main");
    document.querySelector(".cards-section")?.remove();

    const cardsSection = document.createElement("div");
    cardsSection.classList.add("cards-section");
    cardsSection.innerHTML = "<h2>Customer Orders</h2>";
    customerOrders.forEach(({ fullName, email, dob, gender, phone, orderType, orderOption, imageUrl }) => {
        cardsSection.innerHTML += `
            <div class="card">
                <img src="${imageUrl}" alt="Customer Image">
                <p><b>Full Name:</b> ${fullName}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Date of Birth:</b> ${dob}</p>
                <p><b>Gender:</b> ${gender}</p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Order Type:</b> ${orderType.join(", ")}</p>
                <p><b>Order Option:</b> ${orderOption}</p>
            </div>`;
    });

    main.appendChild(cardsSection);
};





// Regex
const validateInput = (customer) => {
    const errors = [];

    const isInvalid = (condition, message) => condition && errors.push(message);

    isInvalid(/\s/.test(customer.fullName), "Username must not contain spaces.");
    isInvalid(
        !/^.{8,}$/.test(customer.password) ||
        !/[A-Z]/.test(customer.password) ||
        !/[0-9]/.test(customer.password) ||
        !/[!@#$%^&*]/.test(customer.password),
        "Password must be at least 8 characters long, include a number, an uppercase letter, and a special character."
    );
    isInvalid(!/^\d{4}-\d{2}-\d{2}$/.test(customer.dob), "Birthday must be in YYYY-MM-DD format.");
    isInvalid(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(customer.email), "Invalid email format.");
    isInvalid(!/^07\d{8}$/.test(customer.phone), "Phone number must be 10 digits and start with '07'.");
    isInvalid(customerOrders.some(order => order.email === customer.email), "User with this email already exists.");

    return errors;
};








document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customer = new Customer(
        formData.get("fullName"),
        formData.get("email"), // Add the email field
        formData.get("password"),
        formData.get("dob"),
        formData.get("gender"),
        formData.get("phone"),
        formData.getAll("orderType"),
        formData.get("orderOption"),
        formData.get("imageUrl")
    );

    // Validate the input
    const validationErrors = validateInput(customer);
    if (validationErrors.length > 0) {
        alert(validationErrors.join("\n")); // Show validation errors
        return;
    }

    customerOrders.push(customer);
    localStorage.setItem("customerOrders", JSON.stringify(customerOrders));
    renderCards();
    e.target.reset();
});

renderCards();
