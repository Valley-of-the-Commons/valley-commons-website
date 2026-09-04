// SERVER-ONLY: correct quiz answer indices per room.
// Never ship this to the client.
// Slug renames from source: default -> deca, valley-michel -> michel.
// Key: room slug. Value: object mapping item index -> correct option index.
// Only quiz items have entries; poll items are omitted.

module.exports = {
  CORRECT_BY_SLUG: {
    // Deca - The Market, the State and the Commons (was "default")
    "deca":         { 0: 1, 1: 2, 2: 2, 3: 1, 4: 2, 5: 3 },
    // Roberto Valenti - socio-techno-legal stack for a regenerative commons
    "w2-d1":        { 0: 1, 1: 2, 2: 1, 3: 1, 4: 1 },
    // Michel Bauwens - Cosmo-Localism (was "valley-michel")
    "michel":       { 0: 1, 1: 1, 2: 2, 3: 3, 4: 1 },
    // Kilian Jörg - Reclaiming the Commons
    "w2-d2":        { 0: 1, 1: 2, 2: 1, 3: 0, 4: 1 },
    // Lorenzo Patuzzo - Monasteries of the 21st Century
    "w2-d3":        { 0: 1, 1: 0, 2: 2, 3: 2, 4: 3 },
    // Stefan Schütz - Working alternatives in regional money and production
    "w2-d4":        { 0: 2, 1: 3, 2: 1, 3: 0, 4: 2 },
    // Silvia Brandi - International FabLab Networks
    "w2-d5":        { 0: 2, 1: 1, 2: 3, 3: 0, 4: 2 },
  },
};
