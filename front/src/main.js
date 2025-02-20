const baseUrl = import.meta.env.VITE_BASE_URL;

document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.querySelector("#email");
    const subscribeButton = document.querySelector("#subscribe-btn");

    subscribeButton.addEventListener("click", async () => {
        const email = emailInput.value.trim();

        if (!email) {
            alert("Por favor, ingresa un email válido.");
            return;
        }

        subscribeButton.disabled = true; // Desactiva el botón temporalmente

        try {
            const response = await fetch(`${baseUrl}/api/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }), // MongoDB solo necesita la clave "email"
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error:", errorText);
                alert("Falló la suscripción. Inténtalo de nuevo.");
            } else {
                alert("¡Suscripción exitosa!");
                emailInput.value = ""; // Limpia el campo de entrada
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error. Inténtalo nuevamente.");
        } finally {
            subscribeButton.disabled = false; // Reactiva el botón después de la solicitud
        }
    });
});
