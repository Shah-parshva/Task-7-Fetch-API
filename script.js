const container = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");
const errorMsg = document.getElementById("errorMsg");
const loader = document.getElementById("loader");
const searchInput = document.getElementById("searchInput");

let displayedUsers = [];

const indianNames = [
"Aarav Patel","Vivaan Shah","Aditya Mehta","Krishna Patel",
"Rohan Desai","Arjun Trivedi","Priya Shah","Ananya Patel",
"Neha Joshi","Rahul Parmar","Ishaan Bhatt","Kavya Patel",
"Mehul Shah","Sneha Desai","Yash Patel","Pooja Mehta",
"Dhruv Trivedi","Nidhi Shah","Harsh Patel","Komal Joshi",
"Aman Verma","Ritika Sharma","Siddharth Gupta","Tanvi Kulkarni",
"Manish Yadav","Sonal Agarwal","Karan Malhotra","Isha Kapoor",
"Deepak Singh","Preeti Choudhary","Mohit Bansal","Riya Arora",
"Ankit Jain","Shreya Nair","Varun Saxena","Palak Mishra",
"Rajat Khanna","Simran Kaur","Abhishek Tiwari","Muskan Gupta"
];


const indianEmails = [
"aarav.patel@gmail.com","vivaan.shah@gmail.com","aditya.mehta@gmail.com",
"krishna.patel@gmail.com","rohan.desai@gmail.com","arjun.trivedi@gmail.com",
"priya.shah@gmail.com","ananya.patel@gmail.com","neha.joshi@gmail.com",
"rahul.parmar@gmail.com","ishaan.bhatt@gmail.com","kavya.patel@gmail.com",
"mehul.shah@gmail.com","sneha.desai@gmail.com","yash.patel@gmail.com",
"pooja.mehta@gmail.com","dhruv.trivedi@gmail.com","nidhi.shah@gmail.com",
"harsh.patel@gmail.com","komal.joshi@gmail.com",
"aman.verma@gmail.com","ritika.sharma@gmail.com","siddharth.gupta@gmail.com",
"tanvi.kulkarni@gmail.com","manish.yadav@gmail.com","sonal.agarwal@gmail.com",
"karan.malhotra@gmail.com","isha.kapoor@gmail.com","deepak.singh@gmail.com",
"preeti.choudhary@gmail.com","mohit.bansal@gmail.com","riya.arora@gmail.com",
"ankit.jain@gmail.com","shreya.nair@gmail.com","varun.saxena@gmail.com",
"palak.mishra@gmail.com","rajat.khanna@gmail.com","simran.kaur@gmail.com",
"abhishek.tiwari@gmail.com","muskan.gupta@gmail.com"
];

const indianAddresses = [
{house:"12-A", area:"Navrangpura", city:"Ahmedabad", state:"Gujarat", pin:"380009"},
{house:"45-B", area:"Adajan", city:"Surat", state:"Gujarat", pin:"395009"},
{house:"102", area:"Alkapuri", city:"Vadodara", state:"Gujarat", pin:"390007"},
{house:"78/2", area:"Yagnik Road", city:"Rajkot", state:"Gujarat", pin:"360001"},
{house:"221", area:"Andheri West", city:"Mumbai", state:"Maharashtra", pin:"400053"},
{house:"55", area:"Shivaji Nagar", city:"Pune", state:"Maharashtra", pin:"411005"},
{house:"D-14", area:"Karol Bagh", city:"Delhi", state:"Delhi", pin:"110005"},
{house:"88", area:"Malviya Nagar", city:"Jaipur", state:"Rajasthan", pin:"302017"},
{house:"19", area:"Vijay Nagar", city:"Indore", state:"Madhya Pradesh", pin:"452010"},
{house:"301", area:"BTM Layout", city:"Bangalore", state:"Karnataka", pin:"560076"},
{house:"27", area:"Gachibowli", city:"Hyderabad", state:"Telangana", pin:"500032"},
{house:"9", area:"T Nagar", city:"Chennai", state:"Tamil Nadu", pin:"600017"},
{house:"44", area:"Salt Lake", city:"Kolkata", state:"West Bengal", pin:"700091"},
{house:"17", area:"Hiran Magri", city:"Udaipur", state:"Rajasthan", pin:"313001"},
{house:"63", area:"Dharampeth", city:"Nagpur", state:"Maharashtra", pin:"440010"},
{house:"28", area:"Gomti Nagar", city:"Lucknow", state:"Uttar Pradesh", pin:"226010"},
{house:"90", area:"MP Nagar", city:"Bhopal", state:"Madhya Pradesh", pin:"462011"},
{house:"11", area:"Sector 62", city:"Noida", state:"Uttar Pradesh", pin:"201309"},
{house:"5", area:"Sector 21", city:"Gandhinagar", state:"Gujarat", pin:"382021"},
{house:"72", area:"Ranjit Avenue", city:"Amritsar", state:"Punjab", pin:"143001"},
{house:"33", area:"Lajpat Nagar", city:"Delhi", state:"Delhi", pin:"110024"},
{house:"14", area:"Baner", city:"Pune", state:"Maharashtra", pin:"411045"},
{house:"67", area:"Vastrapur", city:"Ahmedabad", state:"Gujarat", pin:"380015"},
{house:"89", area:"Bopal", city:"Ahmedabad", state:"Gujarat", pin:"380058"},
{house:"52", area:"Powai", city:"Mumbai", state:"Maharashtra", pin:"400076"},
{house:"18", area:"Whitefield", city:"Bangalore", state:"Karnataka", pin:"560066"},
{house:"73", area:"Miyapur", city:"Hyderabad", state:"Telangana", pin:"500049"},
{house:"26", area:"Anna Nagar", city:"Chennai", state:"Tamil Nadu", pin:"600040"},
{house:"91", area:"Howrah", city:"Kolkata", state:"West Bengal", pin:"711101"},
{house:"39", area:"Vaishali Nagar", city:"Jaipur", state:"Rajasthan", pin:"302021"},
{house:"64", area:"Civil Lines", city:"Nagpur", state:"Maharashtra", pin:"440001"},
{house:"21", area:"Aliganj", city:"Lucknow", state:"Uttar Pradesh", pin:"226024"},
{house:"77", area:"Arera Colony", city:"Bhopal", state:"Madhya Pradesh", pin:"462016"},
{house:"8", area:"Sector 18", city:"Noida", state:"Uttar Pradesh", pin:"201301"},
{house:"56", area:"Sargasan", city:"Gandhinagar", state:"Gujarat", pin:"382421"},
{house:"29", area:"Model Town", city:"Amritsar", state:"Punjab", pin:"143001"},
{house:"41", area:"Satellite", city:"Ahmedabad", state:"Gujarat", pin:"380015"},
{house:"66", area:"Kothrud", city:"Pune", state:"Maharashtra", pin:"411038"},
{house:"13", area:"Borivali West", city:"Mumbai", state:"Maharashtra", pin:"400092"},
{house:"95", area:"Electronic City", city:"Bangalore", state:"Karnataka", pin:"560100"}
];

async function fetchUsers() {
    loader.style.display = "block";
    errorMsg.textContent = "";

    try {
        await fetch("https://jsonplaceholder.typicode.com/users");
        buildIndianUsers();
    } catch (err) {
        errorMsg.textContent = "❌ Failed to load data.";
    } finally {
        loader.style.display = "none";
    }
}

function buildIndianUsers() {
    displayedUsers = indianNames.map((name, i) => ({
        name,
        email: indianEmails[i],
        address: indianAddresses[i]
    }));

    renderCards(displayedUsers);
}

function renderCards(list) {
    container.innerHTML = "";

    list.forEach(user => {
        const card = document.createElement("div");
        card.className = "user-card";

        card.innerHTML = `
            <h3>👤 ${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Address:</strong><br>
                House No. ${user.address.house}, ${user.address.area},<br>
                ${user.address.city}, ${user.address.state} - ${user.address.pin}, India
            </p>
        `;

        container.appendChild(card);
    });
}

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();

    const filtered = displayedUsers.filter(user =>
        user.name.toLowerCase().includes(value)
    );

    renderCards(filtered);
});

reloadBtn.addEventListener("click", fetchUsers);

fetchUsers();