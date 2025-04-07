document.getElementById("paymentMethod").addEventListener("change", function() {
    const paymentMethod = document.getElementById("paymentMethod").value;
    const bikashNumberDiv = document.getElementById("bikashNumber");
    const rocketNumberDiv = document.getElementById("rocketNumber");
    const upayNumberDiv = document.getElementById("upayNumber");

    // Hide all numbers first
    bikashNumberDiv.style.display = "none";
    rocketNumberDiv.style.display = "none";
    upayNumberDiv.style.display = "none";

    // Show the corresponding number based on selected payment method
    if (paymentMethod === "Bkash") {
        bikashNumberDiv.style.display = "block";
    } else if (paymentMethod === "Rocket") {
        rocketNumberDiv.style.display = "block";
    } else if (paymentMethod === "Upay") {
        upayNumberDiv.style.display = "block";
    }
});

document.getElementById("donationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const trxid = document.getElementById("trxid").value;
    const amount = document.getElementById("amount").value;
    const senderNumber = document.getElementById("senderNumber").value;
    const paymentMethod = document.getElementById("paymentMethod").value;

    const trxidRegex = /^[A-Za-z0-9]{6,}$/;
    const phoneRegex = /^01[3-9]\d{8}$/;

    if (!trxidRegex.test(trxid)) {
        document.getElementById("formStatus").textContent = "❌ Invalid Transaction ID";
        document.getElementById("formStatus").style.color = "red";
        return;
    }

    if (!phoneRegex.test(senderNumber)) {
        document.getElementById("formStatus").textContent = "❌ Invalid Phone Number";
        document.getElementById("formStatus").style.color = "red";
        return;
    }

    document.getElementById("formStatus").textContent = "✅ Submitting donation...";
    document.getElementById("formStatus").style.color = "green";

    const discordMessage = {
        content: `📥 **New Donation Received**\n👤 **Name**: ${name}\n📱 **Sender Number**: ${senderNumber}\n💸 **Amount**: ৳${amount}\n🧾 **Transaction ID**: ${trxid}\n💳 **Payment Method**: ${paymentMethod}\n⏰ **Time**: ${new Date().toLocaleString()}\n\n**Donation Summary**\nA new donation has been made to support Palestine.\n\n**Name**: ${name}\n**Sender Number**: ${senderNumber}\n**Amount**: ৳${amount}\n**Transaction ID**: ${trxid}\n**Payment Method**: ${paymentMethod}\n**Time**: ${new Date().toLocaleString()}`
    };

    fetch('https://discordapp.com/api/webhooks/1358756119291363340/aelfE_ct5VhKdRrPqF6rsFBhfjTDjyHKp8wMha-KbVFWOwzdAM8HBodnSfrbO7W7m5q0', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordMessage),
    })
    .then(response => {
        document.getElementById("formStatus").textContent = "🎉 Donation successfully submitted!";
        document.getElementById("formStatus").style.color = "green";
        document.getElementById("donationForm").reset();
        document.getElementById("bikashNumber").style.display = "none"; // Hide the number after submission
        document.getElementById("rocketNumber").style.display = "none"; 
        document.getElementById("upayNumber").style.display = "none"; 
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("formStatus").textContent = "⚠️ Failed to submit donation!";
        document.getElementById("formStatus").style.color = "red";
    });
});
