// Browser ES module - CLIENT-SAFE: no correct quiz answers.
// All rooms ported from learn-ai.london origin/main, 2026-09-04.
// Slug renames: default -> deca, valley-michel -> michel.

export const ROOMS = {

  // --- deca (original /valley, The Market the State and the Commons) ---
  "deca": {
    slug: "deca",
    meta: {
      eyebrow: "The Market, the State and the Commons",
      speaker: "Deca",
      socials: [
        { label: "X @deca12x", url: "https://x.com/deca12x" },
        { label: "Substack", url: "https://agartha1.substack.com/" },
      ],
      metaTitle: "The Market, the State and the Commons \xb7 Learn AI London",
      metaDescription:
        "Companion to the talk at the London School of Solarpunk: the argument in seven beats, the full reading list, and the live session.",
    },
    beats: [
      {
        n: 1,
        title: "The Metacrisis",
        body: "A convergence, not a single problem: environmental breakdown, economic fragility, geopolitical bipolarisation, a mental-health epidemic, with AI as the catalyst accelerating all of them at once. Underneath it all sits a crisis of meaning (John Vervaeke, Awakening from the Meaning Crisis).",
        links: [
          { label: "Awakening from the Meaning Crisis (Vervaeke)", url: "https://johnvervaeke.com/series/awakening-from-the-meaning-crisis/" },
        ],
      },
      {
        n: 2,
        title: "The Market, the State and the Commons",
        body: "The State, the Market and the Commons are the three pillars of civilisation (Michel Bauwens, building on Karatani and Fiske). The Commons is the third thing that holds when the other two overreach: fishing and grazing commons, and monasteries that weathered the collapse of Rome and of Han China, preserving knowledge, feeding people and holding meaning.",
        links: [
          { label: "P2P Foundation (Bauwens)", url: "https://p2pfoundation.net/" },
          { label: "4th Generation Civilization", url: "https://4thgenerationcivilization.substack.com/" },
          { label: "Governing the Commons (Ostrom)", url: "https://www.cambridge.org/core/books/governing-the-commons/A8BB63BC4A1433A50A3FB92EDBBB97D5" },
          { label: "Cosmolocal Foundation", url: "https://www.cosmolocal.world/" },
        ],
      },
      {
        n: 3,
        title: "A snapshot of today",
        body: "State and Market are weakening: slow-burning proxy wars, deglobalisation, capital rising while labour falls (Yanis Varoufakis, Technofeudalism), platforms decaying as they capture us (Cory Doctorow, enshittification). Social media was the first wave of AI, and we still cannot extricate ourselves from that Shoggoth. Meanwhile the Commons re-emerges to fill the void: Wikipedia as a knowledge commons, Bitcoin as a monetary one.",
        links: [
          { label: "Technofeudalism (Varoufakis)", url: "https://www.yanisvaroufakis.eu/category/books/technofeudalism-what-killed-capitalism/" },
          { label: "Enshittification (Doctorow, Wired)", url: "https://www.wired.com/story/tiktok-platforms-cory-doctorow/" },
          { label: "Shoggoth with a smiley face (explainer)", url: "https://knowyourmeme.com/memes/shoggoth-with-smiley-face-artificial-intelligence" },
          { label: "Bitcoin whitepaper", url: "https://bitcoin.org/bitcoin.pdf" },
          { label: "Bitcoin genesis block", url: "https://en.bitcoin.it/wiki/Genesis_block" },
        ],
      },
      {
        n: 4,
        title: "The counterculture to the Metacrisis",
        body: "The so-called doomers are the real optimists (Tristan Harris): first be aware of the metacrisis, then believe we can solve it and refuse the slide into apathy. A grassroots network is forming, cosmo-local (Bauwens): what is heavy stays local, what is light is global and shared. Third spaces, ecovillages, popup cities and residencies, curated on three criteria at Agartha: heart-centered, maximally truth-seeking, in the arena.",
        links: [
          { label: "Center for Humane Technology (Harris)", url: "https://www.humanetech.com/" },
          { label: "Agartha", url: "https://www.agartha.one/" },
          { label: "Agartha map", url: "https://www.agartha.one/map" },
        ],
      },
      {
        n: 5,
        title: "Solarpunk and Lunarpunk",
        body: "Cypherpunk (privacy through cryptography, 1990s) evolved into neo-cypherpunk and split, as a yin-yang, into Solarpunk and Lunarpunk. Solarpunk is the world I want: community, governance, contact with nature, circular supply chains. Lunarpunk protects the movement: cryptography, privacy tech, local AI inference, and the self-sovereignty (including cognitive sovereignty) it defends (Nita Farahany, Daniel Schmachtenberger).",
        links: [
          { label: "A Cypherpunk's Manifesto (Hughes, 1993)", url: "https://www.activism.net/cypherpunk/manifesto.html" },
          { label: "The Crypto Anarchist Manifesto (May, 1992)", url: "https://www.activism.net/cypherpunk/crypto-anarchy.html" },
          { label: "d/acc: My Techno-Optimism (Vitalik, 2023)", url: "https://vitalik.eth.limo/general/2023/11/27/techno_optimism.html" },
          { label: "d/acc: one year later (Vitalik, 2025)", url: "https://vitalik.eth.limo/general/2025/01/05/dacc2.html" },
          { label: "Web3 Privacy Now", url: "https://web3privacy.info/" },
        ],
      },
      {
        n: 6,
        title: "Valley of the Commons",
        body: "Commons Hub is a permanent community and venue in the Austrian Alps, bridging web3 and the commons movement. Valley of the Commons is its four-week pop-up village, 24 Aug to 20 Sep 2026, across four themed weeks. The Tech Track runs one arc in two steps: gain the superpowers of modern software and AI, then regain self-sovereignty over the stack underneath while keeping them.",
        links: [
          { label: "Valley of the Commons", url: "https://valleyofthecommons.com/" },
          { label: "Commons Hub Austria", url: "https://www.commons-hub.at/" },
          { label: "Edge City", url: "https://www.edgecity.live/" },
          { label: "Zuitzerland", url: "https://zuitzerland.ch/" },
          { label: "Urbe", url: "https://urbe.build/" },
          { label: "AKASHA Foundation", url: "https://akasha.org/" },
          { label: "Akasha Hub Barcelona", url: "https://akasha.barcelona/en/" },
          { label: "Fools' Valley", url: "https://foolsvalley.com/" },
          { label: "Zuzalu (lineage)", url: "https://www.zuzalu.city/" },
        ],
      },
      {
        n: 7,
        title: "You are not alone",
        body: "Wherever you are on this journey, there is a next step and there are people already walking it. London keeps sprouting these spaces, and they connect to a wider movement sharing the same values, each community a node in the same emerging network.",
        links: [
          { label: "London School of Solarpunk", url: "https://solarpunk.london/" },
          { label: "Newspeak House", url: "https://newspeak.house/" },
          { label: "London Night Cafe", url: "https://www.londonnightcafe.co.uk/" },
          { label: "Critical Hedonism(s)", url: "https://www.criticalhedonisms.com/" },
          { label: "Deca on Substack (Agartha)", url: "https://agartha1.substack.com/" },
          { label: "The Metacrisis and the Metasolution", url: "https://agartha1.substack.com/p/the-metacrisis-and-the-metasolution" },
          { label: "Web3 vs AI: The Battle for Society's Soul (Deca)", url: "https://paragraph.com/@urbe.eth/ai" },
        ],
      },
    ],
    items: [
      {
        type: "quiz",
        prompt: "According to Michel Bauwens, the three pillars of civilisation are?",
        options: [
          "Faith, Trade and War",
          "The Market, the State and the Commons",
          "Land, Labour and Capital",
          "The Individual, the Family and the Nation",
        ],
      },
      {
        type: "quiz",
        prompt: "When in history did monasteries arise and thrive?",
        options: [
          "When the Market was booming",
          "When empires were at their peak",
          "When the Market and the State were failing",
          "When democracy spread",
        ],
      },
      {
        type: "quiz",
        prompt: "Solarpunk and lunarpunk evolved from which movement?",
        options: [
          "The Cyberpunks",
          "The Steampunks",
          "The Cypherpunks",
          "The Hacktivists",
        ],
      },
      {
        type: "quiz",
        prompt: "In Yanis Varoufakis's 'Technofeudalism', what has replaced capitalism?",
        options: [
          "A post-scarcity economy where automation has largely ended material want",
          "Cloud fiefs that collect rent from us like digital serfs, not a market of firms",
          "A decentralised web3 economy that has cut out the middlemen",
          "A gig economy of free-agent micro-entrepreneurs",
        ],
      },
      {
        type: "quiz",
        prompt: "Cory Doctorow coined 'enshittification' for one specific way platforms decay. Which?",
        options: [
          "They scale so fast that reliability and support buckle under the load",
          "Rivals copy their best features until they lose their edge and fade",
          "They win users over, then squeeze users, then squeeze the platform's businesses, until it dies",
          "Regulators step in and break them up before they mature",
        ],
      },
      {
        type: "quiz",
        prompt: "Why does the talk call the 'doomers' the real optimists?",
        options: [
          "They trust technology and markets to fix it on their own",
          "They've made peace with collapse, so they've stopped fearing it",
          "They expect the worst, so any good news feels like a win",
          "They face the crisis squarely, yet still believe we can solve it",
        ],
      },
      {
        type: "poll",
        prompt: "When you look at the future, you feel...",
        options: ["mostly hope", "mostly dread", "both, intensely", "numb"],
      },
      {
        type: "poll",
        prompt: "Solarpunk or lunarpunk - which pulls you more?",
        options: [
          "Solarpunk (build the world I want)",
          "Lunarpunk (protect it)",
          "Both",
          "Still deciding",
        ],
      },
      {
        type: "poll",
        prompt: "What are you most hungry for right now?",
        options: [
          "community",
          "meaning",
          "sovereignty & agency",
          "superpowers (AI & tech)",
          "contact with nature",
        ],
      },
      {
        type: "poll",
        prompt: "Where are you on this journey right now?",
        options: [
          "just discovered this tonight",
          "curious, circling the edges",
          "one foot in (part of a space or two)",
          "all in, it's my life",
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },

  // --- w1-d1: Felix Fritsch - Opening Day ---
  "w1-d1": {
    slug: "w1-d1",
    meta: {
      eyebrow: "Opening Day",
      speaker: "Felix Fritsch",
      socials: [
        { label: "X @FelixFritsch2", url: "https://x.com/FelixFritsch2" },
        { label: "Commons Hub", url: "https://www.commons-hub.at/about" },
      ],
      livestream: "https://www.youtube.com/watch?v=ISC6bGORTcs",
      metaTitle: "Opening Day \xb7 Felix Fritsch",
      metaDescription:
        "Felix Fritsch opens Valley of the Commons: the Commons Hub story, the commons wager, cosmo-local production, and the four-week arc. Plus the reading.",
    },
    items: [],
    beats: [
      {
        n: 1,
        title: "From talking to doing",
        body: "Felix opens by admitting the surreal fact that Valley is finally happening. The vision was first voiced three years ago: an eco-village here, permanent structures for living and production. The Commons Hub itself grew from a 2020 first event and the 2021 Crypto Commons Gathering into years of programming. Valley is the step from a rented events business toward common ownership of the valley itself.",
        links: [
          { label: "Valley of the Commons", url: "https://www.valleyofthecommons.com/" },
          { label: "Commons Hub: About", url: "https://www.commons-hub.at/about" },
        ],
      },
      {
        n: 2,
        title: "A village with wounds",
        body: "The setting is load-bearing, not scenery. The Hirschwangerhof was an inn for 150 years beside a factory that shrank from over 2,000 workers to under 100. Land is lead-poisoned from a 19th-century battery works, and over 80% of housing was factory-owned and demolished. Some 200 people remain, average age above 70. The valley shows how economic processes scar the earth, and offers cheap real estate for rebuilding.",
        links: [
          { label: "Valley pop-up event page", url: "https://www.commons-hub.at/events/valley-26" },
        ],
      },
      {
        n: 3,
        title: "The commons wager",
        body: "Felix names a historical opening: an old order failing, a new one not yet formed, under converging pressures of a multipolar world, climate crisis, and the end of cheap nature. For two decades commoners refined theory on shared resources, rights, and rules, but lacked practice and integrated systems. Housing and production are his two chokepoints for extraction. Building them as commons would open space for experiments without capital's full pressure.",
        links: [
          { label: "Cosmo-Localism (P2P Foundation)", url: "https://wiki.p2pfoundation.net/Cosmo-Localism" },
          { label: "Felix Fritsch (P2P Foundation)", url: "https://wiki.p2pfoundation.net/index.php/Felix_Fritsch" },
        ],
      },
      {
        n: 4,
        title: "The four-week arc",
        body: "The program moves in sequence. Week one, Return of the Commons, opens with Michel Bauwens' visionary framing, then Adam Arvidsson's more critical, pragmatic account. Week two turns to cosmo-local production and its revenue potential. Week three addresses future living in community, both social and architectural, renegotiating public, common, and private space. Week four focuses on governance and funding to reach a first concrete case study.",
        links: [
          { label: "Valley of the Commons", url: "https://www.valleyofthecommons.com/" },
          { label: "Design Global, Manufacture Local", url: "https://wiki.p2pfoundation.net/Design_Global,_Manufacture_Local" },
        ],
      },
      {
        n: 5,
        title: "Not a silo, a federation",
        body: "The aim is not isolated intentional communities but a network. Prior waves exist: the Global Ecovillage Network, network states and nations. Felix's crew wants to take stock of what worked and grow a federation of locally rooted, globally connected hubs, the cosmo-local vision where light knowledge travels and heavy production stays local. He and Jeff Emmett set out this 'monasteries of the twenty-first century' argument on Bauwens' newsletter.",
        links: [
          { label: "The Valley of the Commons (Fritsch and Emmett)", url: "https://4thgenerationcivilization.substack.com/p/the-valley-of-the-commons" },
          { label: "Cosmo-Local Production", url: "https://wiki.p2pfoundation.net/Cosmo-Local_Production" },
        ],
      },
      {
        n: 6,
        title: "Places, not petitions",
        body: "Felix closes on politics. He calls the Hub a group of post-leftists who still carry leftist values but are frustrated with conventional politics, so they build rather than petition. The month is an explicit experiment with no blueprint, expecting contradictions and failures. The end goal is real: refined association statutes, a functioning legal body, and a property to plan in detail. The future is built through places and experiments.",
        links: [
          { label: "Opening Day (talk video)", url: "https://www.youtube.com/watch?v=ISC6bGORTcs" },
          { label: "Valley pop-up event page", url: "https://www.commons-hub.at/events/valley-26" },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },

  // --- w1-d2: Michel Bauwens - The Return of the Commons ---
  "w1-d2": {
    slug: "w1-d2",
    meta: {
      eyebrow: "The Return of the Commons",
      speaker: "Michel Bauwens",
      socials: [
        { label: "X @mbauwens", url: "https://x.com/mbauwens" },
        { label: "Substack", url: "https://4thgenerationcivilization.substack.com/" },
      ],
      livestream: "https://www.youtube.com/watch?v=J97geZeThFo",
      metaTitle: "The Return of the Commons \xb7 Michel Bauwens",
      metaDescription:
        "Bauwens on the commons through history, Karatani's modes of exchange, the pulsation of the commons, and the cosmo-local transition. With primary reading.",
    },
    items: [],
    beats: [
      {
        n: 1,
        title: "Four ways to exchange",
        body: "Bauwens opens through Kojin Karatani, who reframes history not by modes of production but by modes of exchange. Mode A is commoning and gifting (give a brick, get a house), the tribal system. Mode B is the state, protection paid for in taxes. Mode C is the market. Mode D is the permanent attempt to recreate mode A at a higher level of complexity, the thread he traces across every era.",
        links: [
          { label: "Modes of Exchange (P2P wiki)", url: "https://wiki.p2pfoundation.net/Modes_of_Exchange" },
          { label: "Placing the Commons in a Temporal Framework", url: "https://wiki.p2pfoundation.net/Placing_the_Commons_in_a_Temporal_Framework" },
        ],
      },
      {
        n: 2,
        title: "The commons were normal",
        body: "Before capitalism the commons were not marginal or anti-feudal, they were part of how societies worked. The medieval peasant held a plot, worked the lord's land, and shared common land. Even conquering Ottomans sent dervish communities and guilds to reorganize captured land. The English 'beating the bounds' procession reconfirmed the commons each year, central to a village's identity.",
        links: [
          { label: "Role of the Commons in Civilizational Transitions", url: "https://wiki.p2pfoundation.net/Role_of_the_Commons_in_Civilizational_Transitions" },
        ],
      },
      {
        n: 3,
        title: "The enclosures, a new idea",
        body: "Then something unprecedented: a political economy that declared the commons unproductive and bad. Feudal property was never purely individual, it was held by a lineage on behalf of duties. Pure private property changed that. 'I can make more money with sheep than with men,' so the men were driven off. From the 16th century the enclosures ran at massive scale, and the state was set up to replace the commons.",
        links: [
          { label: "The Return of the Commons keynote (video)", url: "https://www.youtube.com/watch?v=J97geZeThFo" },
        ],
      },
      {
        n: 4,
        title: "The pulsation of the commons",
        body: "Bauwens' core historical claim: the commons ebbs and flows. When market and state function well, the commons weakens, people feel less need to band together. In dark ages, when market and state collapse, common institutions become hegemonic. The monasteries kept farmers, craftsmen and intellectuals in one body, returned all surplus to the collective, and so out-grew everyone, reseeding civilization.",
        links: [
          { label: "Pulsation of the Commons (P2P wiki)", url: "https://wiki.p2pfoundation.net/Pulsation_of_the_Commons" },
          { label: "Culture of the Commons in a Time of Civilizational Transition", url: "https://wiki.p2pfoundation.net/Culture_of_the_Commons_in_a_Time_of_Civilizational_Transition" },
        ],
      },
      {
        n: 5,
        title: "Why this transition is different",
        body: "Past collapses were regional: Rome fell, Byzantium lasted another thousand years, so extraction never threatened the whole planet. Now Bauwens sees a serial exhaustion of everything at planetary scale, a system that structurally favours extraction over regeneration since the Neolithic. His wager is that a third information barrier, internet and AI, finally lets us coordinate commons at global scale, as writing and print once expanded coordination before.",
        links: [
          { label: "Peer to Peer: The Commons Manifesto (free ebook)", url: "https://www.uwestminsterpress.co.uk/site/books/m/10.16997/book33/" },
          { label: "Commons-Based Peer Production (P2P wiki)", url: "https://wiki.p2pfoundation.net/Commons-Based_Peer_Production" },
        ],
      },
      {
        n: 6,
        title: "Cosmo-local, don't wait",
        body: "The transition's shape is cosmo-local: locally rooted, feet in the mud doing permaculture, while learning, funding and designs flow from a global commons. What is light (knowledge, design) is global, what is heavy (production) is local. His image is an archipelago of regenerative villages, connected by open designs, distributed manufacturing and web3 ledgers that could tie money to thermodynamic and biological reality. The refrain: you do not have to wait.",
        links: [
          { label: "Introduction to Cosmo-Localism", url: "https://wiki.p2pfoundation.net/Introduction_to_Cosmo-Localism" },
          { label: "Cosmo-Local Commoning with Web3", url: "https://wiki.p2pfoundation.net/Michel_Bauwens_on_Cosmo-Local_Commoning_with_Web3" },
        ],
      },
      {
        n: 7,
        title: "Modern monasteries",
        body: "Bauwens closes on the monastery as model, spaces disciplined and serious enough to preserve knowledge and produce surplus through the unraveling, then seed what comes after. Politics of the old conflict, he argues, is not where the solution lies, communities implementing their future now are. He calls for a politics of paradise, positive rather than merely defensive, and names the Valley of the Commons itself as a place to build it.",
        links: [
          { label: "The Valley of the Commons (essay)", url: "https://4thgenerationcivilization.substack.com/p/the-valley-of-the-commons" },
          { label: "Partner State (P2P wiki)", url: "https://wiki.p2pfoundation.net/Partner_State" },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },

  // --- w1-d3: Adam Arvidsson - Industrious Modernity ---
  "w1-d3": {
    slug: "w1-d3",
    meta: {
      eyebrow: "Industrious Modernity",
      speaker: "Adam Arvidsson",
      socials: [
        { label: "Academia.edu", url: "https://unina.academia.edu/AdamArvidsson" },
      ],
      metaTitle: "Industrious Modernity \xb7 Adam Arvidsson",
      metaDescription:
        "A grounded reconstruction of Adam Arvidsson's Industrious Modernity keynote at Valley of the Commons Week 1, built from his books and papers.",
    },
    items: [],
    beats: [
      {
        n: 1,
        title: "Industrial modernity in crisis",
        body: "Arvidsson's work starts from a diagnosis: the industrial-capitalist order that organised the twentieth century is in prolonged crisis and is becoming, in his phrase, ever less relevant to most people's lives. Fewer people find a stable place inside it. The talk most likely opens here, framing the return of the commons not as nostalgia but as what people build when the old wage economy stops including them.",
        links: [
          { label: "Changemakers (Polity / Wiley)", url: "https://www.wiley.com/en-fr/Changemakers:+The+Industrious+Future+of+the+Digital+Economy-p-9781509538904" },
        ],
      },
      {
        n: 2,
        title: "What industrious modernity means",
        body: "In his book Changemakers, Arvidsson names the emerging paradigm 'industrious modernity': small-scale, commons-based and market-oriented entrepreneurship pioneered by the outcasts of a crumbling industrial modernity. Its actors are labour-intensive and capital-poor, leaning on shared knowledge, resources and tools, and driven by endogenous motives like creativity, impact and self-realisation rather than wages alone. This is the concept the title points to.",
        links: [
          { label: "Changemakers (book overview)", url: "https://books.google.com/books/about/Changemakers.html?id=GGtFyAEACAAJ" },
        ],
      },
      {
        n: 3,
        title: "Two planetary commons",
        body: "Arvidsson argues industrious modernity draws on new commons that global capitalism itself produced. Outsourcing material production to global supply chains made manufacturing skills generic and widely available. The internet and global media culture built a vast knowledge commons. Together these slashed the capital needed to start producing and handed newcomers cheap, powerful tools of organisation. The commons here are an input, not a slogan.",
        links: [
          { label: "Capitalism and the Commons (2019)", url: "https://doi.org/10.1177/0263276419868838" },
        ],
      },
      {
        n: 4,
        title: "Not de Vries's industrious revolution",
        body: "Arvidsson borrows the historical echo deliberately, but the terms differ. Jan de Vries's 'industrious revolution' (roughly 1650 to 1800) described households working longer and harder to buy new consumer goods before industrialisation. Arvidsson's 'industrious modernity' is a contemporary, post-industrial claim: capital-poor, commons-reliant producers emerging after mass production, not before it. Same adjective, opposite point in history.",
        links: [
          { label: "Changemakers (Polity / Wiley)", url: "https://www.wiley.com/en-fr/Changemakers:+The+Industrious+Future+of+the+Digital+Economy-p-9781509538904" },
        ],
      },
      {
        n: 5,
        title: "Value beyond labour time",
        body: "This connects to his long-running project. Across the ethical-economy work, Arvidsson holds that in social and networked production, value stops tracking labour time and starts tracking the quality of social relations and the ability to organise diffuse cooperation. Industrious modernity inherits that logic: worth is measured in reputation, impact and community, which is why it can point beyond the capitalist mode of production itself.",
        links: [
          { label: "The ethical economy: a post-capitalist theory of value (2009)", url: "https://doi.org/10.1177/030981680909700102" },
          { label: "Value and virtue in the sharing economy (2018)", url: "https://doi.org/10.1177/0038026118758531" },
        ],
      },
      {
        n: 6,
        title: "Why it fits the commons",
        body: "Week one asks why the commons are returning. Arvidsson's answer is structural, not moral: the commons return because they have become the cheapest and most available basis for production once industrial capitalism recedes. That dovetails with the gathering's cosmo-local frame, design shared globally and made locally, though the cosmo-local and maker-movement labels are the organisers' framing more than his exact words.",
        links: [
          { label: "Changemakers (book overview)", url: "https://books.google.com/books/about/Changemakers.html?id=GGtFyAEACAAJ" },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },

  // --- w1-d4: Amber Case - Introduction to Calm Technology ---
  "w1-d4": {
    slug: "w1-d4",
    meta: {
      eyebrow: "Introduction to Calm Technology",
      speaker: "Amber Case",
      socials: [
        { label: "caseorganic.com", url: "https://www.caseorganic.com/" },
        { label: "X @caseorganic", url: "https://x.com/caseorganic" },
      ],
      livestream: "https://www.youtube.com/watch?v=K_TlFG_DmEU",
      metaTitle: "Introduction to Calm Technology \xb7 Amber Case",
      metaDescription:
        "Amber Case on calm technology at Valley of the Commons: designing for attention, its Xerox PARC lineage, and a calm-tech certification standard.",
    },
    items: [],
    beats: [
      {
        n: 1,
        title: "The stolen kind of time",
        body: "Case opens with two Greek words for time. Chronos is industrial, quantitative time: waiting for a software update, swatting away alerts to reach the task you actually wanted. Kairos is lived time: a sunset, a child's first steps, the hours you remember on your deathbed. Technology promised us more free time but keeps handing back low-quality Chronos time. Calm tech's goal, she says, is to minimize Chronos and maximize Kairos.",
        links: [
          { label: "The talk (video)", url: "https://www.youtube.com/watch?v=K_TlFG_DmEU" },
        ],
      },
      {
        n: 2,
        title: "A philosophy that does not age",
        body: "Writing her iPhone thesis in 2007, Case wanted a philosophy of technology that would not become obsolete. She found it at Xerox PARC, where Mark Weiser coined 'ubiquitous computing' and argued the scarcest future resource would be attention, not technology. His paper with John Seely Brown reads as if written today. Weiser died at 46, and Case took up expanding his sparse principles into a working framework.",
        links: [
          { label: "The Coming Age of Calm Technology (Weiser & Brown)", url: "https://calmtech.com/papers/coming-age-calm-technology" },
        ],
      },
      {
        n: 3,
        title: "Look through, not at",
        body: "Calm tech is not a yoga mat or Zen aesthetics. It means you stay calm using the tool and can still do the original task. Case's test: you look through glasses, not at them, through a window, not at it. Good technology is a pass-through that dissolves into the task, focusing you on the nail rather than the hammer, so you attend to your humanness and not the machine.",
        links: [
          { label: "calmtech.com", url: "https://calmtech.com" },
          { label: "Calm Technology (the book)", url: "https://calmtech.com/book" },
        ],
      },
      {
        n: 4,
        title: "Two brains, wrong sensor",
        body: "We can physically multitask but not mentally multitask. Case calls this the 'back brain': fast, early, proprioceptive, the reason you can work a car's radio dial at speed without looking. Touchscreens and voice assistants force everything into the slow prefrontal cortex, where you must recall what you named your lights and their percentage. Physical affordances, a raised dot on a button, a light switch you slap, keep interaction in the faster brain.",
        links: [
          { label: "The talk (video)", url: "https://www.youtube.com/watch?v=K_TlFG_DmEU" },
        ],
      },
      {
        n: 5,
        title: "Five principles, briefly",
        body: "From her eight principles, Case walks five: technology should require attention only when necessary (a fire alarm shouts, a toilet should not), it should inform and stay calm, it should use peripheral attention, it should communicate without needing to speak (a color-changing faucet, a weather-colored bulb, what she calls infosynesthesia), and it should work even when it fails, the way a broken escalator becomes stairs.",
        links: [
          { label: "The 8 principles of calm technology", url: "https://calmtech.com" },
        ],
      },
      {
        n: 6,
        title: "A Victorian-style standard",
        body: "The lever Case chose is certification, modeled on Underwriters Laboratories (the UL stamp, born from Chicago fire-era electrical danger in 1893) and the Good Housekeeping Seal. Her Calm Tech Institute runs an 81-point specification covering primary attention, peripheral attention, robustness, light, sound, and materials. It gives CEOs a marketable reason to remove the blue LED. In roughly two years it has certified around 80 products, including reMarkable and Time Timer.",
        links: [
          { label: "Calm Tech Institute", url: "https://calmtech.institute" },
        ],
      },
      {
        n: 7,
        title: "Plant the tree, wait like a glacier",
        body: "Case is candid that a standard takes about a decade to matter. LEED green-building certification sat ignored from 1989 until the mid-2000s, then took off. Her strategy is patience: spend little, grow mass, go as long as you can like a glacier. A standard, she says, is like planting a tree, you do not yell at it after three years for not being lumber. The endgame is durable, family-run companies whose products last for decades.",
        links: [
          { label: "Calm Tech Institute", url: "https://calmtech.institute" },
          { label: "The talk (video)", url: "https://www.youtube.com/watch?v=K_TlFG_DmEU" },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },

  // --- w1-d5: Jeff Emmett - From P2P to P4P ---
  "w1-d5": {
    slug: "w1-d5",
    meta: {
      eyebrow: "From P2P to P4P",
      speaker: "Jeff Emmett",
      socials: [
        { label: "X @jeffemmett", url: "https://x.com/jeffemmett" },
        { label: "Medium", url: "https://medium.com/@jeffemmett" },
      ],
      livestream: "https://www.youtube.com/watch?v=rLwA7XieXkg",
      metaTitle: "From P2P to P4P \xb7 Jeff Emmett",
      metaDescription:
        "Jeff Emmett on the shift from peer-to-peer to peer-for-peer: recording contribution, self-infrastructuring tools, and funding the commons. With reading.",
    },
    items: [],
    beats: [
      {
        n: 1,
        title: "P2P proved the point",
        body: "Peer-to-peer means people connecting directly, with no company in the middle. Emmett notes it is over twenty years old (the P2P Foundation dates to 2005) and already built enormous value with no boss and no profit motive: Wikipedia, Linux, OpenStreetMap, and the open-source code most of the internet runs on. His starting claim is that this model works, and the next step is to extend it from talking to coordinating.",
        links: [
          { label: "P2P Foundation", url: "https://www.p2pfoundation.net/" },
          { label: "Rewriting the Story of Human Collaboration (Emmett)", url: "https://medium.com/commonsstack/rewriting-the-story-of-human-collaboration-652cfa423588" },
        ],
      },
      {
        n: 2,
        title: "From message to record",
        body: "If peer-to-peer carries the message, peer-for-peer carries the record. Encrypted chat is only the tip of the iceberg. Emmett wants the same channels to track provenance: who made a tool, who used it, what value it produced. He borrows Resource-Event-Agent accounting (an agent performs an event affecting a resource) so a shared task, license, or contribution rides along with the message instead of vanishing. Communication becomes an auditable ledger of collaboration.",
        links: [
          { label: "Architecting the Cyber-Physical Commons (Emmett)", url: "https://medium.com/commonsstack/architecting-the-cyber-physical-commons-a294d88b5415" },
        ],
      },
      {
        n: 3,
        title: "Design global, make local",
        body: "Emmett builds on Michel Bauwens' cosmo-localism: what is light goes global, what is heavy stays local. Ideas, designs, and code are shared freely worldwide at near-zero cost, while manufacturing, energy, and food stay local and circular. A design uploaded once may be 3D-printed in maker spaces everywhere, yet the creator never learns it mattered. P4P aims to close that feedback loop between the global light commons and its local heavy uses.",
        links: [
          { label: "Cosmo-Localism (P2P Foundation wiki)", url: "https://wiki.p2pfoundation.net/Cosmo-Localism" },
        ],
      },
      {
        n: 4,
        title: "Recognition without wages",
        body: "Once contribution is recorded, a community can value effort without turning everything into a salary. Emmett argues commons usually break in one of two ways: a hard worker feels unseen and leaves, or a free-rider drains the shared fabric. Making contribution legible, separate from money, addresses both. The design goal borrows from mushrooms: resilient, redundant, cooperative networks rather than the brittle, hyper-efficient monocultures of ordinary markets.",
        links: [
          { label: "MycoFi (Emmett and Zartler)", url: "https://mycofi.earth/" },
        ],
      },
      {
        n: 5,
        title: "Tools from the Commons Stack",
        body: "Emmett co-founded the Commons Stack to make DAO tooling (software for running a shared online organization) warmer and more human, aligned with Elinor Ostrom's rules for governing commons. Two components recur: the augmented bonding curve, an automated market that turns token buys into a shared funding pool for public goods, and conviction voting, where support for a proposal accrues the longer people back it. Both let a commons fund and steer itself.",
        links: [
          { label: "Commons Stack", url: "https://commonsstack.org/" },
          { label: "Conviction Voting (Emmett)", url: "https://medium.com/commonsstack/conviction-voting-a-novel-continuous-decision-making-alternative-to-governance-62e215ad2b3d" },
        ],
      },
      {
        n: 6,
        title: "Threshold-based flow funding",
        body: "For resourcing projects, Emmett proposes flow funding shaped like a mycelial network. Everyone draws a stream from a shared pot, and each cup has a threshold, a notion of 'enoughness'. Once you have comfortable runway, the overflow routes onward to projects you have pre-chosen. Under-resourced cups fill faster, over-resourced ones spill outward. It extends tools like Drips by adding the overflow rule, so funders back an ecosystem rather than picking single winners.",
        links: [
          { label: "Commons Stack", url: "https://commonsstack.org/" },
        ],
      },
      {
        n: 7,
        title: "Self-infrastructuring, not another app",
        body: "The point is not to build another product or make a million and give it away, which just plays the incumbents' game. Emmett wants communities to build their own tools better than the platform monopolies can, because those firms' business models forbid opening their data. Real risks remain: any metric will be gamed, and if everyone builds a private net there is no shared internet. His answer is a polycentric mesh of diverse, forkable tools, stress-tested in simulation before real communities depend on them.",
        links: [
          { label: "From P2P to P4P (talk video)", url: "https://www.youtube.com/watch?v=rLwA7XieXkg" },
          { label: "BlockScience", url: "https://block.science/" },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },

  // --- w2-d1: Roberto Valenti - A socio-techno-legal stack for a regenerative commons ---
  "w2-d1": {
    slug: "w2-d1",
    meta: {
      eyebrow: "A socio-techno-legal stack for a regenerative commons",
      speaker: "Roberto Valenti",
      socials: [
        { label: "X @robertovalenti", url: "https://x.com/robertovalenti" },
        { label: "Regenerativa", url: "https://regenerativa.earth/sites/liminalvillage/" },
      ],
      livestream: "https://www.youtube.com/watch?v=cH179Qj0FsQ",
      metaTitle: "A socio-techno-legal stack for a regenerative commons \xb7 Roberto Valenti",
      metaDescription:
        "Companion to Roberto Valenti's talk at Valley of the Commons: economy as household management, translocal empowerment, the 8 forms of capital, community, Holons, and Regenerativa / Liminal Village, in beats with sources, plus the live session.",
    },
    items: [
      {
        type: "quiz",
        prompt: "The talk traces 'economy' to two Greek roots. What do they mean?",
        options: [
          "Money and power",
          "House and manage: 'household management'",
          "Trade and city",
          "Land and labour",
        ],
      },
      {
        type: "quiz",
        prompt: "The '8 forms of capital' widen wealth beyond money. Which is NOT one of the eight?",
        options: ["Social", "Spiritual", "Political", "Cultural"],
      },
      {
        type: "quiz",
        prompt: "In Holons, what happens to value (money or tokens) sent to a holon's address?",
        options: [
          "It is locked in a treasury vote",
          "It is automatically split across its members by a dynamic weight",
          "It becomes a single governance token",
          "It is burned to reduce supply",
        ],
      },
      {
        type: "quiz",
        prompt: "What is 'stigmergy', the coordination principle the talk borrows from ants?",
        options: [
          "A top-down chain of command",
          "Coordination through signals left in a shared environment, with no central boss",
          "Voting on every decision",
          "A blockchain consensus algorithm",
        ],
      },
      {
        type: "quiz",
        prompt: "The 'Integral Human' frame invites you to act at three scales. Which three?",
        options: [
          "Mind, Body, Spirit",
          "Personal, Local, Global",
          "Past, Present, Future",
          "Self, Family, Nation",
        ],
      },
      {
        type: "poll",
        prompt: "Economy as 'household management': how much does your economic life feel like caring for a shared home?",
        options: ["Not at all", "A little", "Fairly well", "It's my whole approach"],
      },
      {
        type: "poll",
        prompt: "Of the 8 forms of capital, which feels most scarce in your life right now?",
        options: [
          "Financial",
          "Social",
          "Natural / living",
          "Spiritual / experiential",
        ],
      },
      {
        type: "poll",
        prompt: "When you picture regeneration, where are you most called to act?",
        options: [
          "Personal (heal yourself)",
          "Local (your place)",
          "Global (the planet)",
          "All three at once",
        ],
      },
      {
        type: "poll",
        prompt: "Do temporary communities (pop-up villages that gather, then part) work for you?",
        options: [
          "Yes, they're my lifeblood",
          "Good in doses",
          "I prefer permanence",
          "Haven't tried one",
        ],
      },
      {
        type: "poll",
        prompt: "Would you trust software (like Holons) to coordinate a community's tasks and money?",
        options: ["Yes, fully", "With humans in the loop", "Skeptical", "No"],
      },
    ],
    beats: [
      {
        n: 1,
        title: "Economy is household management",
        body: "Bill Mollison: without the freedom to choose which economic systems we join, and a voice in governing them, we are not free. And 'economy' comes from oikos (house) + nemein (manage): oikonomia, the management of the home. The talk reclaims economy as care for our shared home.",
        links: [
          {
            label: "Permaculture: A Designers' Manual (Mollison)",
            url: "https://www.tagari.com/store/books/permaculture-a-designers-manual/",
          },
        ],
      },
      {
        n: 2,
        title: "Regeneration on the far side of collapse",
        body: "The pilgrim standing between a burning city and a terraced, regenerative future. Resilient, regenerative villages against fragile, extractive cities. The work is to build the next system while the old one falters.",
        links: [],
      },
      {
        n: 3,
        title: "Translocal empowerment",
        body: "Locally embedded and globally connected. A whole ecosystem of movements already lives this way, each a node in the same emerging network.",
        links: [
          { label: "Transition Network", url: "https://transitionnetwork.org/" },
          { label: "Global Ecovillage Network", url: "https://ecovillage.org/" },
          { label: "Fearless Cities", url: "https://fearlesscities.com/" },
          { label: "Fab Foundation (Fab Labs)", url: "https://fabfoundation.org/" },
          { label: "Impact Hub", url: "https://impacthub.net/" },
          { label: "Atlas of Utopias", url: "https://transformativecities.org/atlas-of-utopias/" },
        ],
      },
      {
        n: 4,
        title: "Eight forms of capital",
        body: "Wealth is more than money. Eight forms of capital, social, material, financial, living (natural), intellectual, experiential, spiritual, and cultural, that a healthy community grows together.",
        links: [
          {
            label: "The 8 Forms of Capital (Roland & Landua, Appleseed Permaculture)",
            url: "http://www.appleseedpermaculture.com/8-forms-of-capital/",
          },
        ],
      },
      {
        n: 5,
        title: "Community: 'Common Unity'",
        body: "Communities meet the human need for connection and cooperation. Build it up: a community of one, of two (me and you, overlapping), of many, held by shared values and, above all, communication. Like ecological succession, a community matures through stages, and nothing exists in isolation.",
        links: [
          { label: "H3Uni, the World Mandala", url: "https://www.h3uni.org/" },
        ],
      },
      {
        n: 6,
        title: "Computers are good at communicating",
        body: "At scale, human communication breaks down (the Tower of Babel; the blind men and the elephant). Can computers carry us over the human-communication hump? 'Mediated telepathy', an information system for the planet, coordinating by stigmergy the way ants leave signals in a shared environment, and meeting people where they are.",
        links: [
          { label: "Open Space Technology", url: "https://openspaceworld.org/" },
        ],
      },
      {
        n: 7,
        title: "Holons: stackable organizations",
        body: "Holons is a digital infrastructure for 'liquid remuneration': nested organizations where each holon has its own Ethereum address, and any value it receives is split automatically across its members by a dynamic weight. Composable communities that can federate or separate, a commons as an app-store for the collective's goods and services.",
        links: [{ label: "Holons", url: "https://www.holons.io/" }],
      },
      {
        n: 8,
        title: "Regenerativa and Liminal Village",
        body: "Regenerativa.earth: a gLocal network of interdependent individuals, communities and projects for integral regeneration, governed by shared agreements and organised as a DAO. Liminal Village is its home node in the Marche bioregion of Italy, part of the Regen Civics Alliance: an integral-human practice at three scales, personal, local, and global.",
        links: [
          { label: "Regenerativa.earth", url: "https://regenerativa.earth/" },
          { label: "Shared Agreements (docs)", url: "https://docs.regenerativa.earth/" },
          { label: "Liminal Village", url: "https://www.liminalvillage.com/" },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },

  // --- w2-d2: Kilian Joerg - Reclaiming the Commons ---
  "w2-d2": {
    slug: "w2-d2",
    meta: {
      eyebrow: "Reclaiming the Commons",
      speaker: "Kilian Jörg",
      socials: [
        { label: "kilianj.org", url: "https://www.kilianj.org/" },
        { label: "Bluesky", url: "https://bsky.app/profile/kilianjoerg.bsky.social" },
      ],
      livestream: "https://www.youtube.com/watch?v=5sFrGOa69NM",
      metaTitle: "Reclaiming the Commons \xb7 Kilian Jörg",
      metaDescription:
        "Companion to Kilian Jörg's talk, Reclaiming the Commons, at Valley of the Commons: the argument in beats, a reading list from his own work, and the live session.",
    },
    items: [
      {
        type: "quiz",
        prompt: "In Ecological Reasonings (2024), what is Jörg's central move for salvaging reason?",
        options: [
          "Return to classical Enlightenment rationality",
          "Pluralise 'reason' into many situated 'reasonings'",
          "Abolish reason entirely as a colonial tool",
          "Replace reason with pure emotion",
        ],
      },
      {
        type: "quiz",
        prompt: "In the Toxic Temple project, how are plastic, cement and nuclear waste framed?",
        options: [
          "As problems to be fully recycled away",
          "As economically valuable raw materials",
          "As sacred artifacts, 'messages to the afterlife' that outlive humanity",
          "As proof that technology will save us",
        ],
      },
      {
        type: "quiz",
        prompt: "What does Jörg use the automobile as, in Das Auto und die ökologische Katastrophe?",
        options: [
          "A neutral piece of transport technology",
          "A metaphor for our toxic entanglement with modern life",
          "The single solution to urban ecology",
          "A symbol of successful green transition",
        ],
      },
      {
        type: "quiz",
        prompt: "Toxic Temple rejects which stance in favour of engaging with toxicity?",
        options: [
          "Naive, purity-based conservation environmentalism",
          "Degrowth economics",
          "Renewable-energy investment",
          "Indigenous land rights",
        ],
      },
      {
        type: "quiz",
        prompt: "Which collective did Jörg found for 'performative philosophy'?",
        options: [
          "Toxic Temple",
          "philosophy unbound",
          "Critical Hedonism",
          "Newspeak House",
        ],
      },
      {
        type: "poll",
        prompt: "When you hear 'ecological crisis', what feels closest to true?",
        options: [
          "A technical problem we can engineer our way out of",
          "A political-economic problem of power and ownership",
          "A crisis of how we think and perceive",
          "A spiritual or existential rupture",
        ],
      },
      {
        type: "poll",
        prompt: "'Reclaiming the commons' means, to you, mostly:",
        options: [
          "Taking back shared resources from private owners",
          "Rebuilding collective ways of living and deciding",
          "Restoring damaged land and ecosystems",
          "Something else",
        ],
      },
      {
        type: "poll",
        prompt: "How do you relate to your own toxic entanglements (car, plastic, energy)?",
        options: [
          "I try to stay as clean as possible",
          "I accept I'm implicated and work from there",
          "I mostly feel guilt",
          "I hadn't thought about it this way",
        ],
      },
      {
        type: "poll",
        prompt: "One universal reason, or many situated reasonings?",
        options: [
          "One universal reason",
          "Many plural reasonings",
          "Unsure",
        ],
      },
      {
        type: "poll",
        prompt: "A car-free version of your own neighbourhood feels:",
        options: [
          "Liberating",
          "Impractical",
          "Frightening",
          "I've never let myself imagine it",
        ],
      },
    ],
    beats: [
      {
        n: 1,
        title: "The trouble is reason, not just carbon",
        body: "The ecological crisis is not only a technical problem to optimise away: it is a crisis of a Western reason built on separation (subject from world, human from nature, clean from dirty) that makes ecocide feel normal.",
        links: [
          {
            label: "Ecological Reasonings (Jörg, Bloomsbury, 2024)",
            url: "https://www.bloomsbury.com/us/ecological-reasonings-9781350372115/",
          },
        ],
      },
      {
        n: 2,
        title: "How modernity enclosed the world",
        body: "The enclosures of land, of public space, of the more-than-human, that turned a shared world into private, extractable resource. The car and the car-shaped city are his signature illustration.",
        links: [
          {
            label: "Das Auto und die ökologische Katastrophe (Jörg, transcript, 2024)",
            url: "https://www.transcript-verlag.de/978-3-8376-7408-8/das-auto-und-die-oekologische-katastrophe/",
          },
        ],
      },
      {
        n: 3,
        title: "We are already toxic",
        body: "Rather than a clean 'nature' to protect, we live inside pollution and waste. A mature ecological politics starts by owning our toxic entanglements instead of denying them.",
        links: [
          {
            label: "Toxic Temple (Lerchbaumer & Jörg, De Gruyter, 2022)",
            url: "https://www.degruyter.com/document/doi/10.1515/9783110769241/html",
          },
          { label: "Toxic Temple (project)", url: "https://www.kilianj.org/toxic-temple" },
        ],
      },
      {
        n: 4,
        title: "Pluralise reason into reasonings",
        body: "Reclaiming the commons means reclaiming ways of knowing: embodied, situated, more-than-human reasonings, freed from the monopoly of a single abstract Reason.",
        links: [{ label: "kilianj.org", url: "https://www.kilianj.org/" }],
      },
      {
        n: 5,
        title: "Reclaiming space and land",
        body: "From theory to practice: diverting public space, imagining the car-free world, radical land reclamation. The commons as something re-composed in matter and habit.",
        links: [
          {
            label: "Trash as a Means of Religious Communication (Jörg, On_Culture, 2024)",
            url: "https://www.on-culture.org/journal/perspectives/trash-as-a-means-of-religious-communication/",
          },
        ],
      },
      {
        n: 6,
        title: "Commoning as staying-with",
        body: "Reclaiming the commons is ongoing entanglement and repair with a damaged world, including its trash and toxicity, not a return to a lost, pristine state.",
        links: [
          { label: "binge-thinking (Jörg's blog)", url: "http://kilianjoerg.blogspot.com/" },
        ],
      },
      {
        n: 7,
        title: "An invitation to think-with",
        body: "The frame handed to the room: performative philosophy, collective experiment, the gathering itself as a practice of commoning.",
        links: [],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },

  // --- w2-d3: Lorenzo Patuzzo - Monasteries of the 21st Century ---
  "w2-d3": {
    slug: "w2-d3",
    meta: {
      eyebrow: "Monasteries of the 21st Century",
      speaker: "Lorenzo Patuzzo",
      socials: [
        { label: "X @lorenzopatuzzo", url: "https://x.com/lorenzopatuzzo" },
        { label: "Hubs Network", url: "https://www.hubsnetwork.org/about" },
      ],
      livestream: "https://www.youtube.com/watch?v=I7QMfrCh1ug",
      metaTitle: "Monasteries of the 21st Century \xb7 Lorenzo Patuzzo",
      metaDescription:
        "Companion to Lorenzo Patuzzo's talk, Monasteries of the 21st Century, at Valley of the Commons: the long arc of human cooperation, collective consciousness, and hubs as the monasteries of our era, in beats with sources, plus the live session.",
    },
    items: [
      {
        type: "quiz",
        prompt: "More than fire or tools, what let humans cooperate in huge numbers?",
        options: [
          "Sheer physical strength",
          "Shared stories and beliefs",
          "Bigger brains, on their own",
          "Farming",
        ],
      },
      {
        type: "quiz",
        prompt: "The agricultural revolution, some 12,000 years ago, set off which chain?",
        options: [
          "Surplus, specialisation, and the first cities",
          "The printing press and mass literacy",
          "Global trade and money",
          "The internet",
        ],
      },
      {
        type: "quiz",
        prompt: "Why does the talk look back to the medieval monasteries?",
        options: [
          "They ran the markets of their day",
          "They conquered and held territory",
          "They preserved the books, the seeds, and the craft through the collapse after Rome",
          "They invented writing",
        ],
      },
      {
        type: "quiz",
        prompt: "Which is one of the seven properties of a 21st-century monastery in the talk?",
        options: [
          "Total secrecy and isolation",
          "Maximising profit",
          "A semi-permeable membrane: open enough to teach and host, closed enough to protect its culture",
          "A single charismatic leader",
        ],
      },
      {
        type: "quiz",
        prompt: "AKASHA Hub Barcelona, the talk's living example, is...",
        options: [
          "A venture-funded startup",
          "A government innovation agency",
          "A university research lab",
          "A self-funded, community-run hub, the first node of the network",
        ],
      },
      {
        type: "poll",
        prompt: "Which 'monastery' property matters most to a community you'd join?",
        options: [
          "Shared values and devotion",
          "Clear rules and discipline",
          "Knowledge and teaching",
          "A semi-permeable membrane (open yet protected)",
        ],
      },
      {
        type: "poll",
        prompt: "Where do you sit on the local-versus-global tension?",
        options: [
          "Root deeply in one place",
          "A node in a global federation",
          "Fully nomadic",
          "Somewhere in between",
        ],
      },
      {
        type: "poll",
        prompt: "How much shared life would you want in such a hub?",
        options: [
          "Live there full-time",
          "A regular in-person rhythm",
          "Occasional visits",
          "Purely digital participation",
        ],
      },
      {
        type: "poll",
        prompt: "What most needs preserving through the years ahead?",
        options: [
          "Open technologies and code",
          "Seeds, soil, and food knowledge",
          "Crafts and making skills",
          "Social trust and governance",
        ],
      },
      {
        type: "poll",
        prompt: "Right now, are you more a builder or a pilgrim?",
        options: [
          "Building a node of my own",
          "A pilgrim, visiting the nodes",
          "Just curious tonight",
          "A bit of everything",
        ],
      },
    ],
    beats: [
      {
        n: 1,
        title: "The long arc of cooperation",
        body: "The talk opens deep in time: our line splits from the other apes, we learn to keep fire, and then comes the real leap. Not tools, but language, and with it shared belief. Myths, gods, money, and law are things we all agree to treat as real, and that shared fiction is what lets strangers cooperate in the millions. It is the thread the whole talk follows.",
        links: [
          {
            label: "Sapiens: power and imagination (Yuval Noah Harari)",
            url: "https://www.ynharari.com/topic/power-and-imagination/",
          },
        ],
      },
      {
        n: 2,
        title: "Surviving to thriving",
        body: "Roughly 12,000 years ago, agriculture produces surplus, and surplus buys specialisation: people freed from growing food to make, trade, teach, and govern. Cities and centralised organisations follow. Writing arrives around 5,000 years ago as memory kept outside the head. Then, as Rome falls, the monasteries hold: from about 500 to 1200 their scriptoria copy and keep the books alive. Science emerges around 1500, and by 1789 the printing press has matured into a force that spreads ideas fast enough to help topple a monarchy.",
        links: [
          {
            label: "The Neolithic (Agricultural) Revolution",
            url: "https://www.nationalgeographic.com/culture/article/neolithic-agricultural-revolution",
          },
          {
            label: "The monastic scriptorium",
            url: "https://en.wikipedia.org/wiki/Scriptorium",
          },
        ],
      },
      {
        n: 3,
        title: "The double edge of communication",
        body: "Every jump in how we share knowledge has cut both ways. Modern communications connect the whole species at once, and the same channels carry misinformation and the deliberate manipulation of cultures. The tool that lets us coordinate is the tool that lets us be captured.",
        links: [],
      },
      {
        n: 4,
        title: "Collective consciousness and coordination",
        body: "The frontier the talk points to: a species that can actually see itself. Who are we, what do we want, what are our resources, what is happening, who is deciding? And, past seeing, acting together. The early forms are already here, in three layers. Online: Wikipedia, peer-to-peer, open source on GitHub. Infrastructure: Bitcoin. Physical: fablabs. Commons that no single owner controls.",
        links: [
          {
            label: "The Wealth of Networks: commons-based peer production (Yochai Benkler)",
            url: "https://cyber.harvard.edu/wealth_of_networks/Main_Page",
          },
          {
            label: "Bitcoin: a peer-to-peer electronic cash system (Nakamoto)",
            url: "https://bitcoin.org/bitcoin.pdf",
          },
          {
            label: "The Fab Lab network (Fab Foundation)",
            url: "https://fabfoundation.org/",
          },
        ],
      },
      {
        n: 5,
        title: "The 21st-century monastery: the value concept",
        body: "The core proposal. When the centre fails, small, grounded communities carry the flame, as the monasteries did. A 21st-century version needs seven properties: value alignment and devotion; clear rules and discipline; knowledge; a multidisciplinary breadth; a semi-permeable membrane, open enough to teach and host, closed enough to hold its culture; local support and teaching; and pilgrims who travel between them.",
        links: [
          {
            label: "The Valley of the Commons: hubs as monasteries (Michel Bauwens)",
            url: "https://4thgenerationcivilization.substack.com/p/the-valley-of-the-commons",
          },
          {
            label: "The Rule of Saint Benedict (the original 'rule and discipline')",
            url: "https://en.wikipedia.org/wiki/Rule_of_Saint_Benedict",
          },
        ],
      },
      {
        n: 6,
        title: "AKASHA Hub, a lived example",
        body: "The concept, already running. Founded in Barcelona in 2017, AKASHA Hub is self-funded and community-run on a small yearly membership, with no strings from public money. Two warehouses in the El Clot neighbourhood hold a wood and metal workshop, a biological garden, and co-working. The scriptorium, the garden, and the workshop of a monastery, reincarnated: research and innovation clusters, worldwide connection, state-of-the-art work, and local application.",
        links: [
          {
            label: "AKASHA Hub Barcelona",
            url: "https://akasha.barcelona/en/",
          },
          {
            label: "The space and its services",
            url: "https://akasha.barcelona/en/space-and-services/",
          },
        ],
      },
      {
        n: 7,
        title: "The Pulsin Network",
        body: "One hub is not enough. The close is federation: sister hubs woven together by shared protocols, so knowledge is global and production stays local, and no single site can be captured or made to fail. Bauwens calls it hubs 'federated into something like an order'. Lorenzo's federation, initiated from AKASHA Hub Barcelona, is the Pulsin Network, the new name for what has run so far as the Hubs Network.",
        links: [
          {
            label: "The Pulsin Network (currently the Hubs Network site)",
            url: "https://www.hubsnetwork.org/",
          },
          {
            label: "The network's Manifesto",
            url: "https://www.hubsnetwork.org/manifesto",
          },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },

  // --- w2-d4: Stefan Schutz - Working alternatives in regional money and production ---
  "w2-d4": {
    slug: "w2-d4",
    meta: {
      eyebrow: "Working alternatives in regional money and production",
      speaker: "Stefan Schütz",
      socials: [
        { label: "chiemgauer.info", url: "https://www.chiemgauer.info/" },
      ],
      metaTitle: "Working alternatives in regional money and production \xb7 Stefan Schütz",
      metaDescription:
        "Companion to Stefan Schütz's talk at Valley of the Commons: the Chiemgauer regional currency and its climate bonus, and open-source distributed local production at the Impulsraum Neubeuern, in beats with sources, plus the live session.",
    },
    items: [
      {
        type: "quiz",
        prompt: "The Chiemgauer is pegged 1:1 to the euro, but with one unusual feature. Which?",
        options: [
          "It earns interest the longer you hold it",
          "It floats freely against the euro",
          "It loses value if hoarded, so it keeps circulating",
          "It can only be spent online",
        ],
      },
      {
        type: "quiz",
        prompt: "When a business changes Chiemgauer back into euros, part of the fee goes where?",
        options: [
          "To the government as tax",
          "To the currency's founders",
          "Nowhere: converting is free",
          "To a nonprofit that the user chooses",
        ],
      },
      {
        type: "quiz",
        prompt: "'Money that loses value if hoarded' was famously tested in 1932 in which town?",
        options: [
          "Zurich, Switzerland",
          "Wörgl, Austria",
          "Detroit, USA",
          "Lake Chiemsee, Germany",
        ],
      },
      {
        type: "quiz",
        prompt: "Frithjof Bergmann's 'New Work' is built around which question?",
        options: [
          "What do you really, really want?",
          "What pays the most?",
          "What would a machine do instead?",
          "What does the market need?",
        ],
      },
      {
        type: "quiz",
        prompt: "The Fab City / cosmo-local principle behind the maker space is best summed up as?",
        options: [
          "Mass-produce centrally, then ship everywhere",
          "Keep every design secret and patented",
          "Global knowledge, local production",
          "Import finished goods, export the waste",
        ],
      },
      {
        type: "poll",
        prompt: "Would you use a local currency that gently loses value if you hoard it?",
        options: [
          "Yes, I love the idea",
          "Maybe, depends where I can spend it",
          "No, I want my money to hold value",
          "Not sure",
        ],
      },
      {
        type: "poll",
        prompt: "What would most get you to spend in a regional currency?",
        options: [
          "Supporting local businesses",
          "Funding local nonprofits",
          "Climate rewards",
          "Convenience (card and app)",
        ],
      },
      {
        type: "poll",
        prompt: "Which climate-friendly choice would you most want rewarded?",
        options: [
          "Home insulation",
          "Balcony solar panels",
          "Carsharing",
          "A local veg box (Solawi)",
        ],
      },
      {
        type: "poll",
        prompt: "If your neighbourhood had a maker space, what would you do first?",
        options: [
          "Build furniture",
          "Repair or upcycle something broken",
          "Make electronics or a tool",
          "Come to learn more than to make",
        ],
      },
      {
        type: "poll",
        prompt: "When the system feels stuck, you are more likely to...",
        options: [
          "Light a candle (build an alternative)",
          "Name what is broken",
          "Wait for someone else to fix it",
          "A bit of both",
        ],
      },
    ],
    beats: [
      {
        n: 1,
        title: "Money that has to move: the Chiemgauer",
        body: "From the Chiemgau in Bavaria (780 km², about 500,000 people) comes a regional currency that actually works. Started in 2003 by a teacher and his Waldorf-school students, the Chiemgauer is now Germany's largest regional money. It is pegged one-to-one to the euro, but with a twist: it carries a small holding fee, so it loses value if you sit on it. That 'circulation pulse' keeps it moving through local shops rather than pooling in accounts.",
        links: [
          { label: "Chiemgauer Regiogeld", url: "https://www.chiemgauer.info" },
          {
            label: "Complementary currencies (overview)",
            url: "https://en.wikipedia.org/wiki/Complementary_currency",
          },
        ],
      },
      {
        n: 2,
        title: "An old idea, proven: Gesell and Wörgl",
        body: "The holding fee is 'demurrage', from Silvio Gesell's idea of money that ages like goods do. Its most famous test was Wörgl, Austria, in 1932: in the depths of the Depression the mayor issued local scrip that had to be re-stamped to stay valid, and it revived the town's economy, until the central bank shut it down in 1933. When a business changes Chiemgauer back to euros it pays a small fee, and a share of that goes to a nonprofit the user chooses.",
        links: [
          {
            label: "The Wörgl experiment (1932)",
            url: "https://en.wikipedia.org/wiki/W%C3%B6rgl",
          },
        ],
      },
      {
        n: 3,
        title: "From money to climate: the Klimabonus",
        body: "The currency grew into a climate tool. The pattern is simple: inform and measure, reduce what you can, then voluntarily offset the rest into a local climate fund. Climate-friendly choices, home insulation, a balcony solar panel, carsharing, a local veg box, are rewarded in Chiemgauer. The KlimaKlub runs free workshops so a local climate club can mirror the international one.",
        links: [
          {
            label: "Chiemgauer KlimaFonds and KlimaKlub (hier wirken)",
            url: "https://www.hier-wirken.de/chiemgau",
          },
        ],
      },
      {
        n: 4,
        title: "What helps, what stands in the way",
        body: "Twenty years of running it teach the honest lessons. What helps: a dedicated, stable core team and a lot of voluntary work, clear rules and a mission, attractive public events, donations, cooperation with regional banks and local authorities, university evaluations, and, a must, convenient card and app payment. What stands in the way: platforms and AI cross-selling, sheer customer convenience, an economy that feels 'too good', administrative overload for small shops, political resistance, legal hurdles, and the exhaustion of volunteers.",
        links: [],
      },
      {
        n: 5,
        title: "The other alternative: distributed production",
        body: "The second half of the talk turns from money to making. The Impulsraum Neubeuern is a small maker space, run as an association for the common good, headquartered at the commons hub. Two ideas guide it. Frithjof Bergmann's New Work asks 'what do you really, really want?'. And the Fab City principle flips the industrial model: data in, data out, not products in and trash out, so knowledge is global and production is local.",
        links: [
          {
            label: "Frithjof Bergmann, 'New Work, New Culture'",
            url: "https://www.context.org/iclib/ic37/bergmann/",
          },
          { label: "The Fab City Manifesto", url: "https://fab.city/resources/manifesto/" },
        ],
      },
      {
        n: 6,
        title: "Open-source, made locally",
        body: "It is not theory. Leka in Barcelona was the world's first open-source restaurant, its furniture cut on a CNC router from shared design files by Fab Lab Barcelona. Low-cost open machines (Maslow, LowRider) put that workshop within reach, and a scrapyard becomes a place of resources for upcycling. The Chiemgau shows the regenerative side too: living soil (EM), earthen architecture (Anna Heringer), and social textiles (Manomama).",
        links: [
          {
            label: "Leka, the open-source restaurant (Fab Lab Barcelona)",
            url: "https://www.archdaily.com/868172/leka-open-source-restaurant-iaac-fab-lab-barcelona",
          },
          {
            label: "EM regenerative agriculture (Chiemgau)",
            url: "https://chiemgau-agrar.de/anwendungen/regenerative-landwirtschaft/",
          },
          { label: "Anna Heringer, 'Form follows love'", url: "https://www.anna-heringer.com/" },
          { label: "Manomama (Sina Trinkwalder)", url: "https://www.manomama.de/" },
        ],
      },
      {
        n: 7,
        title: "Go light a candle",
        body: "The stance is optimism with evidence: working alternatives already exist, in money and in production, and the task is to build and connect them, not to wait. What is light (designs, knowledge) travels the world; what is heavy (making, growing, living) stays local. As Don Bosco put it, what good is cursing the darkness? Go light a candle.",
        links: [
          {
            label: "Cosmo-localism: light is global, heavy is local",
            url: "https://wiki.p2pfoundation.net/Cosmo-Localism",
          },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },

  // --- w2-d5: Silvia Brandi - International FabLab Networks ---
  "w2-d5": {
    slug: "w2-d5",
    meta: {
      eyebrow: "International FabLab Networks",
      speaker: "Silvia Brandi",
      socials: [
        { label: "FarmLab", url: "https://www.farmlab.at/" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/silvia-brandi/" },
      ],
      livestream: "https://www.youtube.com/watch?v=TGMZibzqVb0",
      metaTitle: "International FabLab Networks · Silvia Brandi",
      metaDescription:
        "Companion to Silvia Brandi's talk at Valley of the Commons: FarmLab, a fab lab on a working farm in rural Styria, the networks that connect it, and a year of situated, seasonal making.",
    },
    items: [
      { type: "quiz", prompt: "What is FarmLab, the project at the heart of Silvia's talk?", options: ["A tech startup in Vienna", "A university research lab", "A creative lab on a working farm in rural Styria", "A government agency"] },
      { type: "quiz", prompt: "What is a 'fab lab', the kind of workshop FarmLab is?", options: ["A factory for mass production", "A node in a worldwide digital-fabrication network, sharing a common inventory", "A private members' club", "A recycling plant"] },
      { type: "quiz", prompt: "At FarmLab, the making follows what?", options: ["The stock market", "A fixed factory shift", "Global shipping schedules", "The seasons, a yearly rhythm of making"] },
      { type: "quiz", prompt: "In Silvia's framing, what is 'agency'?", options: ["The capacity to act: the tools, knowledge, relationships and confidence to do something", "A marketing agency", "A government department", "A type of 3D printer"] },
      { type: "quiz", prompt: "Her closing principle on situated resources and shared knowledge is:", options: ["Everything should be centralised in cities", "Nothing should be shared openly", "Knowledge can travel, but materials stay local and situated", "Only global mass production can scale"] },
      { type: "poll", prompt: "Which season of making pulls you most?", options: ["Winter: slow making, baskets and wood", "Spring: the wool cycle, shearing to felting", "Summer: colours, dyes and ceramics", "Autumn: foraging and biomaterials"] },
      { type: "poll", prompt: "Would you rather learn a traditional craft or a digital tool?", options: ["A traditional craft", "A digital tool (3D print, laser, CNC)", "Both together, the FarmLab way", "Neither right now"] },
      { type: "poll", prompt: "For your own place, what is most missing?", options: ["Tools and a workshop", "Shared knowledge and teachers", "A community to make with", "The confidence to start"] },
      { type: "poll", prompt: "A maker future feels more real to you as:", options: ["Rural and regenerative", "Urban and dense", "Both, connected", "Not sure yet"] },
      { type: "poll", prompt: "What would most draw you to a place like FarmLab?", options: ["A hands-on workshop", "An artist residency", "The farm and the food", "The network of people"] },
    ],
    beats: [
      { n: 1, title: "Twenty years before FarmLab", body: "Silvia opens with the path that led here: two decades in Barcelona at the frontier of digital fabrication, at IAAC and Fab Lab Barcelona, robotic construction, and directing the Fixing the Future festival. The turning question was simple: why not start applying these ideas in real life?", links: [{ label: "Silvia Brandi: optimism as activism (shemakes)", url: "https://shemakes.eu/blog/silvia-brandi" }] },
      { n: 2, title: "FarmLab: a lab on a farm", body: "FarmLab is a creative living lab in rural Styria, Austria, at the intersection of traditional craft, digital fabrication, and sustainable agriculture. It is four things at once: a fab lab (a node of the global Fab Lab Network), a semi-self-sufficient small farm with a heritage orchard and a flock of sheep, a rural creative hub open to local and international communities, and a living testbed for how we make, produce and live together.", links: [{ label: "FarmLab", url: "https://www.farmlab.at/" }, { label: "FarmLab in the Fab Lab directory", url: "https://www.fablabs.io/labs/farmlab" }] },
      { n: 3, title: "Revitalising rural life", body: "The mission: revitalise rural contexts as places of encounter, exchange and diversity, connect inherited knowledge with contemporary technologies and local resources, and explore circular, regenerative ways of producing and living. The labs span digital fabrication, ceramics, wool and textiles, woodworking, and a bio-corner of natural dyes and biomaterials. In 2026 FarmLab won first prize in the crafts category of the Styrian Vulkanland Innovation Award.", links: [{ label: "From a small farm to an open creative hub", url: "https://creativesunite.eu/article/from-small-farm-to-open-creative-hub-the-model-of-farmlab" }, { label: "The FarmLab labs", url: "https://www.farmlab.at/labs" }] },
      { n: 4, title: "The power of networks", body: "A small rural place, plugged into the world. FarmLab is a node between scales, an active member of the Fab Lab Network (over 3,000 labs worldwide, instigated by MIT, sharing one inventory and the Fab Academy), alongside Vulca (European makerspaces), the European Creative Hubs Network, and CRAB, the Creative Rural Hubs community. Her question runs both ways: how can a network become a place, and a place become a network?", links: [{ label: "The Fab Lab network (Fab Foundation)", url: "https://fabfoundation.org/about/" }, { label: "Vulca, European makerspaces", url: "https://vulca.eu/" }] },
      { n: 5, title: "Translating scales", body: "Networks let ideas, knowledge and experience travel and take new forms somewhere else. Silvia's MitMachRäume project brings the model home: a local network of makerspaces across a rural area of 30,000 people in southeast Styria, connected by a digital platform, so tools, knowledge and a wider international community come within reach of the neighbourhood.", links: [{ label: "FarmLab", url: "https://www.farmlab.at/" }] },
      { n: 6, title: "Building local agency", body: "Agency is the capacity to act: not only access to resources, but to the tools, knowledge, relationships and confidence needed to do something with them. It is the question that drives the whole project: how can a rural community today build the agency to make, learn and act, in a sustainable way?", links: [] },
      { n: 7, title: "A year of situated making", body: "The talk closes on 'one year at the FarmLab', where making follows the seasons: winter is slow making (baskets, wood, forge), spring brings the shearers and the wool cycle from spinning to felting, summer is colours and ceramics with natural dyes, raku and 3D-printed clay, and autumn readies for the cold. The principle underneath: knowledge can travel, materials remain situated, and shared knowledge increases the capacity of situated communities to act.", links: [{ label: "FarmLab", url: "https://www.farmlab.at/" }] },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },

  // --- michel (evergreen, slug was valley-michel): Michel Bauwens - Cosmo-Localism ---
  "michel": {
    slug: "michel",
    meta: {
      eyebrow: "Cosmo-Localism",
      speaker: "Michel Bauwens",
      socials: [
        { label: "X @mbauwens", url: "https://x.com/mbauwens" },
        { label: "Substack", url: "https://4thgenerationcivilization.substack.com/" },
      ],
      livestream: "https://www.youtube.com/watch?v=9RID8x9F7hY",
      metaTitle: "Cosmo-Localism \xb7 Michel Bauwens",
      metaDescription:
        "Companion to Michel Bauwens's talk on Cosmo-Localism at Valley of the Commons: the argument in beats, a reading list from his own work, and the live session.",
    },
    items: [
      {
        type: "quiz",
        prompt: "What is the core principle of cosmo-localism?",
        options: [
          "All production should be fully localised and self-sufficient",
          "What is heavy should be local, and what is light should be global and shared",
          "Knowledge and matter should both be globalised",
          "What is light should be local; what is heavy should be global",
        ],
      },
      {
        type: "quiz",
        prompt: "What does 'DGML' stand for?",
        options: [
          "Distributed Governance, Manufacture Locally",
          "Design Global, Manufacture Local",
          "Digital Goods, Material Logistics",
          "Design Growth, Manage Locally",
        ],
      },
      {
        type: "quiz",
        prompt: "The deck calls the extractive system thermodynamically wasteful: it uses how much more matter and energy moving things than making them?",
        options: [
          "The same amount",
          "Twice as much",
          "Three times as much",
          "Ten times as much",
        ],
      },
      {
        type: "quiz",
        prompt: "Which of Kojin Karatani's four modes does Bauwens frame as the goal of the transition?",
        options: [
          "Mode A: gift and reciprocity",
          "Mode B: submission and protection (the state)",
          "Mode C: commodity exchange (capitalism)",
          "Mode D: associationism, reciprocity regained at higher complexity",
        ],
      },
      {
        type: "quiz",
        prompt: "What double error does the dominant economy make about resources?",
        options: [
          "It treats both knowledge and matter as scarce",
          "It treats abundant knowledge as scarce, and scarce materials as abundant",
          "It treats both knowledge and matter as abundant",
          "It treats scarce knowledge as abundant, and abundant matter as scarce",
        ],
      },
      {
        type: "poll",
        prompt: "Where should most of the physical things you use be made?",
        options: [
          "Entirely local / bioregional",
          "Mostly local",
          "A mix",
          "Mostly global supply chains",
        ],
      },
      {
        type: "poll",
        prompt: "How should designs, software and know-how be governed?",
        options: [
          "A fully open commons",
          "Mostly open, with some protection",
          "A balance of open and private",
          "Mostly private / proprietary",
        ],
      },
      {
        type: "poll",
        prompt: "Your view on material throughput?",
        options: [
          "We must degrow it",
          "Steady-state / circular",
          "Selective green growth",
          "Keep growing, technology will fix it",
        ],
      },
      {
        type: "poll",
        prompt: "Between local self-reliance and trans-local coordination, where do you sit?",
        options: [
          "Radically autonomous communities",
          "Autonomous but networked",
          "A coordinated federation",
          "Strong central coordination",
        ],
      },
      {
        type: "poll",
        prompt: "Which best describes your role in the transition?",
        options: [
          "Regenerative village / bioregional",
          "Open-source technologist",
          "Web3 / regenerative finance",
          "Researcher / policymaker",
          "Here to learn",
        ],
      },
    ],
    beats: [
      {
        n: 1,
        title: "A civilisation at its limits",
        body: "We live through planetary overshoot: a culmination of polycrises. The system is extractive and thermodynamically wasteful, using far more matter and energy moving things than making them, treating abundant knowledge as scarce and scarce matter as abundant.",
        links: [
          { label: "Cosmo-Localism (the deck)", url: "https://deck.cosmolocal.world/" },
        ],
      },
      {
        n: 2,
        title: "The metacrisis, through Karatani's modes",
        body: "Using Kojin Karatani's four modes (gift, state, market, and associationism), we are at an inflection point: the task is to transcend into Mode D, reciprocity regained at a higher level of complexity and integration.",
        links: [],
      },
      {
        n: 3,
        title: "What cosmo-localism is",
        body: "Resilient, regenerative local production combined with a globally shared knowledge commons, trans-local protocols of cooperation, and commons-compatible capital. Distilled: what is heavy should be local, what is light should be global. Operationalised as DGML, Design Global, Manufacture Local.",
        links: [
          {
            label: "Design Global, Manufacture Local (Kostakis, Niaros, Dafermos & Bauwens, Futures 2015)",
            url: "https://zenodo.org/records/996189",
          },
          {
            label: "Peer to Peer: The Commons Manifesto (Bauwens, Kostakis & Pazaitis, 2019)",
            url: "https://library.oapen.org/bitstream/id/2e3f561d-b1f5-4e7c-8da3-ccab0f00501d/UWP-033-REVISED.pdf",
          },
        ],
      },
      {
        n: 4,
        title: "Why now",
        body: "The crisis is planetary. We have everything we need, but lack an integrated system. Building that integration is the Initiative's reason to exist.",
        links: [{ label: "cosmolocal.world", url: "https://cosmolocal.world" }],
      },
      {
        n: 5,
        title: "The Cosmolocal Initiative",
        body: "After 20+ years of P2P Foundation research, a coordinated effort to bridge the on-the-ground (bioregional, regenerative communities) with the noosphere (the global knowledge commons), enabling a new trans-local social power.",
        links: [
          { label: "P2P Foundation Wiki", url: "https://wiki.p2pfoundation.net" },
          {
            label: "4th Generation Civilization (Bauwens' Substack)",
            url: "https://4thgenerationcivilization.substack.com/",
          },
        ],
      },
      {
        n: 6,
        title: "The reconstruction toolbox",
        body: "Concrete technologies and protocols: open source, REA/NRP accounting for networked supply chains, Web3 public-goods funding, distributed manufacturing and 3D printing, and circularity.",
        links: [],
      },
      {
        n: 7,
        title: "Join the transition",
        body: "Who is needed: regenerative villages, bioregional practitioners, open-source technologists, Web3 communities, researchers, policymakers, funders. A closing note: Michel is facing significant medical costs.",
        links: [
          { label: "@mbauwens on X", url: "https://x.com/mbauwens" },
          { label: "Support Michel", url: "https://support-michel.cosmolocal.world" },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },

};

export const WEEKS = [
  {
    label: "Week 1 \xb7 24 - 30 Aug",
    theme: "Return of the Commons",
    slugs: ["w1-d1", "w1-d2", "w1-d3", "w1-d4", "w1-d5"],
  },
  {
    label: "Week 2 \xb7 31 Aug - 6 Sep",
    theme: "Local Production & Value Accounting",
    slugs: ["w2-d1", "w2-d2", "w2-d3", "w2-d4", "w2-d5"],
  },
];

export const MORE = ["michel", "deca"];

// Announced but not yet published (no companion pages). Rendered on the index as
// normal-looking cards that show "Coming soon" on click instead of navigating.
export const COMING = [
  {
    label: "Week 3 · 7 - 11 Sep",
    theme: "Future Living in Community",
    talks: [
      { speaker: "Una Wang", talk: "Infrastructure for the Commons" },
      { speaker: "Mathias Fensterer", talk: "Stable intentional communities" },
      { speaker: "Samuel and Luna", talk: "Building Traditional Dream Factory" },
      { speaker: "Clara Gromaches", talk: "Housing as a Commons" },
      { speaker: "Charlie Fischer", talk: "Knowing at the boundaries: land mapping ownership as a design approach" },
    ],
  },
  {
    label: "Week 4 · 14 - 18 Sep",
    theme: "Governance & Funding Models",
    talks: [
      { speaker: "Jessy Kate Schingler", talk: "Operating commons infrastructure for intentional communities" },
      { speaker: "Daniela Gandorfer", talk: "Legal systems in transformation" },
      { speaker: "Rashmi · Metagov", talk: "DAO governance models, research with the DAOstar group" },
      { speaker: "Open slot", talk: "" },
      { speaker: "Open slot", talk: "" },
    ],
  },
];
