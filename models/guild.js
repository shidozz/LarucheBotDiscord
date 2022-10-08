const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    id: String,
   prefix: { type: String, default: "!" },
   logChannel: { type: String, default: "906644723144491008" },
   ticketCategory: { type: String, default: "1020111067973693460" },
   ticketChannel: { type: String, default: "1020112416656343041" },
   testChannel: { type: String, default: "1020097935461064836" }
});

module.exports = mongoose.model("Guild", guildSchema);
