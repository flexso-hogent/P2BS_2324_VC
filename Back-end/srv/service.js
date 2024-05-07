const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
    const { Events, Sessions } = this.entities;

    // Validaties voor het aanmaken van Events
    this.before("CREATE", "Events", async (req) => {
        if (!req.data.name) {
            req.reject(400, "Event name is required.");
        }
        if (!req.data.date) {
            req.reject(400, "Event date is required.");
        }
        if (!req.data.location) {
            req.reject(400, "Event location is required.");
        }
    });

    // Logica na het aanmaken van een nieuw Event
    this.after("CREATE", "Events", async (event) => {
        console.log("Event created:", event.name);
    });

    // Validaties voor het aanmaken van Sessions
    this.before("CREATE", "Sessions", async (req) => {
        if (!req.data.name) {
            req.reject(400, "Session name is required.");
        }
        if (!req.data.date) {
            req.reject(400, "Session date is required.");
        }
    });

    // Aangepaste logica voor het lezen van Events
    this.on("READ", "Events", async (req) => {
        const results = await SELECT.from(Events);
        return results;
    });

    // Aangepaste logica voor het bijwerken van Events
    this.before("UPDATE", "Events", async (req) => {
        // Mogelijke validaties voordat een event wordt bijgewerkt
        if (req.data.name === "") {
            req.reject(400, "Event name cannot be empty.");
        }
    });

    this.after("UPDATE", "Events", async (event) => {
        console.log("Event updated:", event.name);
    });

    // Aangepaste logica voor het verwijderen van Events
    this.before("DELETE", "Events", async (req) => {
        // Controle of het event kan worden verwijderd (optioneel)
        if (req.data.protected) {
            req.reject(400, "Protected events cannot be deleted.");
        }
    });

    this.after("DELETE", "Events", async (event) => {
        console.log("Event deleted:", event.name);
    });

    // Optioneel: logica voor het lezen van Sessions
    this.on("READ", "Sessions", async (req) => {
        const results = await SELECT.from(Sessions);
        return results;
    });

    // Mogelijke uitbreiding: associaties tussen Events en Sessions
    this.on("READ", "Events/Sessions", async (req) => {
        const results = await SELECT.from(Sessions).where({ event_id: req.params[0].ID });
        return results;
    });
});
