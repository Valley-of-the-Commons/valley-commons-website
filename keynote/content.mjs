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
    // Additional thoughts and literature that grew out of the talk. Rendered in its
    // own card. Structured by section kind so the renderer can lay each out well.
    readings: [
      {
        eyebrow: "A read, on the theme of your talk",
        title: "How intense physical gatherings facilitate productivity",
        lede: "A deeper dive into the case studies and the mechanisms behind them: how being in the same room produced breakthroughs.",
        sections: [
          {
            kind: "cases",
            heading: "Deeper dive into key examples",
            items: [
              { title: "The Florentine Camerata", era: "c. 1573-1587", body: `A lesser-known but remarkably illustrative example beyond Renaissance Florence at large: a group of humanists, musicians, poets, and intellectuals who met at Count Giovanni de' Bardi's home. Their discussions, reviving ancient Greek drama's supposed fusion of music and speech, led directly to the invention of monody and, ultimately, opera. Jacopo Peri's Dafne (1598) and Monteverdi's Orfeo emerged from these salon debates. An entire art form literally originated in a living room conversation.` },
              { title: "Vienna Circle", era: "1924-1936", body: `In science and philosophy, the Thursday evening meetings at the University of Vienna brought together Moritz Schlick, Rudolf Carnap, Otto Neurath, Kurt Godel (as a visitor), and others. These regular physical sessions forged logical positivism, a movement that reshaped philosophy of science, linguistics, and analytic philosophy worldwide. The circle's intense face-to-face argumentation, and Godel's devastating critiques delivered in person, changed the course of 20th-century mathematics and epistemology.` },
              { title: "Manchester Literary and Philosophical Society", era: "1781 onward", body: `Weekly dinner meetings where scientists and industrialists mingled. John Dalton presented his atomic theory here in 1803; James Prescott Joule reported his experiments on the mechanical equivalent of heat at these gatherings. The direct proximity of instrument-makers, brewers-turned-physicists (Joule), and academics created a uniquely productive collision of practical craft and theoretical inquiry.` },
              { title: "Royal Society, London", era: "1660 onward", body: `The weekly meetings of the Royal Society in London, where Christopher Wren, Robert Hooke, Isaac Newton, Robert Boyle, and Samuel Pepys demonstrated experiments together, established modern peer review and collaborative empirical science. The famous "Nullius in verba" motto embodied the group's insistence on shared physical demonstration: seeing was believing.` },
              { title: "Homebrew Computer Club", era: "1975", body: `Perhaps the most cited modern example: the Homebrew Computer Club met in a Menlo Park garage auditorium. Its newsletter and meetings directly spawned Apple, and attendees founded roughly two dozen companies. Steve Wozniak described showing the Apple I prototype at a meeting as a pivotal moment: the crowd's enthusiasm convinced him and Jobs the product mattered.` },
            ],
          },
          {
            kind: "mechanisms",
            heading: "Why physical presence works",
            items: [
              { title: "Collision frequency", body: `Innovation is partly probabilistic: the more unplanned encounters between diverse minds, the higher the chance of a recombinant breakthrough. Jane Jacobs argued this is why cities innovate; Richard Florida later formalized it in his work on creative clusters. A medieval monastery, a Viennese cafe, and a Stanford hallway all maximize serendipitous contact.` },
              { title: "Low-bandwidth-but-high-trust channels", body: `Face-to-face interaction carries enormous nonverbal bandwidth, skepticism, excitement, hesitation, which accelerates trust. Trust enables risk-taking: sharing half-formed ideas before they're defensible. Informal settings lower the cost of being wrong, which raises the rate of experimentation.` },
              { title: "Demonstration and tacit knowledge", body: `Michael Polanyi called it "tacit knowledge": skills and intuitions that can't be written down, only absorbed by proximity. A violin student learns more watching a master's bow arm than reading any text. The Bauhaus workshops institutionalized exactly this. Peter Galison showed that laboratory breakthroughs (like radar at MIT's Rad Lab) depended on engineers and physicists physically observing each other's work.` },
              { title: "Cross-disciplinary translation", body: `Breakthroughs frequently occur when an outsider's metaphor meets an insider's problem. Parisian cafes put painters next to poets next to mathematicians; the Medicis deliberately collected diverse geniuses. Frans Johansson later branded this "the Medici effect." Physical spaces where disciplines casually mixed acted as translation engines.` },
              { title: "Group energy and momentum", body: `There's a documented social facilitation effect: the presence of peers performing similar work intensifies effort. Edison's Menlo Park lab ("the invention factory") deliberately ran night shifts where teams could watch each other succeed, creating competitive camaraderie. Eleven hundred patents in roughly a decade followed.` },
              { title: "Critical mass and talent migration", body: `Once a cluster gains momentum, it attracts ambitious newcomers who'd rather compete with the best than dominate mediocrity. Silicon Valley's migration of Shockley's "traitorous eight" shows the mechanism: talent follows talent, density increases further, and flywheel dynamics take over.` },
            ],
          },
          {
            kind: "prose",
            heading: "The modern question",
            body: `Post-pandemic research on remote work finds a nuanced picture: collaboration stayed functional but became more siloed and less likely to produce novel combinations. A 2022 study of Microsoft's internal networks found formal communication strengthened while informal cross-group ties weakened significantly. One open debate today is whether deliberate design (hackathons, residencies, offsites) can reproduce the serendipity of cafe culture in distributed organizations.`,
          },
          {
            kind: "quote",
            body: `Genius clusters don't just happen where talented individuals accidentally co-locate. They happen where structural conditions (patronage, density, informality, cross-discipline mixing) turn co-location into constant, low-friction exchange.`,
          },
          {
            kind: "cases",
            heading: "Three more cases",
            intro: "Der Blaue Reiter in Munich, the Cubists in Paris, and the musicians around Miles Davis. All three are textbook cases of how proximity and intense collaboration produced historic breakthroughs.",
            items: [
              { title: "Der Blaue Reiter, Munich", era: "1911-1914", body: `The group ran from 1911 until WWI in 1914 scattered its members (Kandinsky had to leave Germany as a Russian national). In roughly three years it changed the trajectory of modern art. It grew out of the Neue Kunstlervereinigung Munchen (1909), which admitted women artists like Marianne Werefkin and Gabriele Munter and drew in musicians. When that proved too conservative, Kandinsky and Franz Marc split off. The crucible was domestic and social: Munter's house in Murnau and the Munich circles where Kandinsky, Marc, Macke, Munter, Jawlensky, and Werefkin debated art. Their 1912 Almanach mixed theoretical essays (one by Arnold Schonberg) with 140 reproductions from Bavarian folk glass to children's drawings, decades ahead of its time. The conviction that colour and form could carry spiritual content fed Kandinsky's leap to pure abstraction, arguably the birth of abstract painting in Europe.` },
              { title: "The Cubists in Paris, the Bateau-Lavoir", era: "c. 1904-WWI", body: `Cubism was born not in an academy but in a squalid former piano factory at 13 Rue Ravignan, Montmartre, nicknamed the "Bateau-Lavoir" for the way it creaked in bad weather, with one shared water point and toilet for all tenants. Around 1904 Picasso moved in; soon it housed a colony of painters and poets including Juan Gris and the critics Apollinaire and Salmon. In November 1907 Apollinaire introduced Georges Braque to Picasso, whose Les Demoiselles d'Avignon was barely dry. From that moment the two worked side by side, studios two blocks apart, developing Analytical Cubism in such tandem that Braque compared them to "two mountaineers roped together." A critic's mockery of Braque's 1908 "cubes" gave the movement its name.` },
              { title: "The Miles Davis Circle", era: "1955-1970", body: `Davis ran his bands as continuous working groups, turning them into apprenticeship systems. The First Great Quintet (1955-61: Coltrane, Garland, Chambers, Philly Joe Jones, Cannonball Adderley) moved away from standard chord changes, producing Kind of Blue (1959), the best-selling jazz album ever. The Second Great Quintet (1964-68: Wayne Shorter, Herbie Hancock, Ron Carter, and 17-year-old Tony Williams) invented "time, no changes" with extraordinary telepathy. Then came the fusion of In a Silent Way and Bitches Brew. The alumni effect is the thesis in its purest form: each sideman left to found a major school of jazz, from Weather Report to the Headhunters to Return to Forever.` },
            ],
          },
          {
            kind: "quote",
            body: `Short duration, enormous yield. The Blaue Reiter lasted ~3 years; the Picasso-Braque tandem ~6; the Second Great Quintet ~5. The intensity of daily proximity, Murnau kitchens, a leaky Montmartre garret, a tour bus, matters more than longevity.`,
          },
          {
            kind: "prose",
            body: `Each group featured a mixed-discipline gravitational core (painters plus composers; painters plus poets; or in Miles's case, a leader importing outside influences) that translated across domains. And each functioned as a multiplier rather than a destination: the alumni dispersed and seeded entire subsequent movements.`,
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

  // --- w3-d1: Una Wang - As Above, So Below (infrastructure as a precondition for the commons) ---
  "w3-d1": {
    slug: "w3-d1",
    meta: {
      eyebrow: "As Above, So Below: infrastructure as a precondition for the commons",
      speaker: "Una Wang",
      socials: [
        { label: "Una Wang on LinkedIn", url: "https://www.linkedin.com/in/una-wang-36b56b22/" },
        { label: "Google Scholar", url: "https://scholar.google.com/citations?user=f2caMZwAAAAJ" },
      ],
      metaTitle: "As Above, So Below \xb7 Una Wang",
      metaDescription:
        "Companion to Una Wang's talk at Valley of the Commons: physical infrastructure as the hidden precondition for institutions, political power, settlement and place, how centralised infrastructure enclosed the commons, and how a self-owning house (no1s1) points to re-commoning it from below. In beats with sources, plus the live session.",
    },
    items: [
      {
        type: "quiz",
        prompt: "Infrastructure comes from the Latin infra. What does infra mean?",
        options: [
          "Around, surrounding",
          "Above and over",
          "Below, beneath, under",
          "Beside, alongside",
        ],
      },
      {
        type: "quiz",
        prompt: "In Timothy Mitchell's Carbon Democracy, what won mass democracy for workers between roughly 1880 and 1940?",
        options: [
          "A widely shared political doctrine",
          "Coal's narrow chokepoints, where a few workers could halt the flow",
          "Oil tankers that crossed the oceans",
          "Universal access to electricity",
        ],
      },
      {
        type: "quiz",
        prompt: "Wang argues the shift from coal to oil was also a shift in what?",
        options: [
          "The price of bread",
          "The size of the largest cities",
          "The number of political parties",
          "Who could interrupt the energy flow",
        ],
      },
      {
        type: "quiz",
        prompt: "Which two Swiss institutions does the talk trace to the same 19th-century railway push, via Alfred Escher?",
        options: [
          "ETH Zurich and Credit Suisse (Schweizerische Kreditanstalt)",
          "The United Nations and the Red Cross",
          "CERN and Nestle",
          "The Swiss Federal Railways and UBS",
        ],
      },
      {
        type: "quiz",
        prompt: "In Wang's ETH case study, what is no1s1?",
        options: [
          "A cryptocurrency token",
          "A city-planning software suite",
          "A small cabin that owns and governs itself through a blockchain treasury",
          "A map of the internet's backbone",
        ],
      },
      {
        type: "poll",
        prompt: "Which of infrastructure's hidden effects surprised you most?",
        options: [
          "That it builds our institutions",
          "That it shapes political power",
          "That it sets our settlement patterns",
          "That it makes our sense of place",
        ],
      },
      {
        type: "poll",
        prompt: "Who should hold core infrastructure, energy, water, connectivity?",
        options: [
          "A commons, locally held",
          "The state, centrally run",
          "Private operators, by market",
          "A hybrid of all three",
        ],
      },
      {
        type: "poll",
        prompt: "Could you trust a building that owns and governs itself?",
        options: [
          "Yes, enthusiastically",
          "Maybe, with human oversight",
          "No, ownership needs a person",
          "I would need to see it first",
        ],
      },
      {
        type: "poll",
        prompt: "Is ownership a natural fact or an engineerable construct?",
        options: [
          "A natural, almost sacred fact",
          "A social construct we inherited",
          "A programmable bundle of rights",
          "I am not sure",
        ],
      },
      {
        type: "poll",
        prompt: "Where should a new commons start building first?",
        options: [
          "The physical layer: land, energy, water",
          "The digital layer: data, protocols",
          "The governance layer: rules, institutions",
          "All of it at once",
        ],
      },
    ],
    beats: [
      {
        n: 1,
        title: "As above, so below",
        body: "The city you see, its institutions, its markets, its public life, rests on a layer you do not: pipes, cables, rails, grids. Infrastructure, from the Latin infra ('below') and structura ('a fitting together'), is literally the below-structure. Wang's claim is that the visible commons above is only ever as strong as the physical infrastructure below it. The word was reserved for concrete and steel until the 1980s and 1990s, when 'IT infrastructure', fibre, server rooms, routers, stretched it toward the digital, where it now mostly lives.",
        links: [],
      },
      {
        n: 2,
        title: "Serious about the commons? Make the hardware",
        body: "Alan Kay's 1982 line, 'People who are really serious about software should make their own hardware', becomes a warning. You cannot build a serious commons at the software layer, the rules, the governance, the community, while renting the hardware layer, the land, energy, water and connectivity, from someone else. Attend to the physical substrate, or it will quietly decide your limits.",
        links: [
          {
            label: "Alan Kay, the source of the line (Wikiquote)",
            url: "https://en.wikiquote.org/wiki/Alan_Kay",
          },
        ],
      },
      {
        n: 3,
        title: "A precondition for institutions",
        body: "Institutions do not float free; they are poured onto infrastructure. Wang's Swiss example: the railway financier and politician Alfred Escher helped found the Eidgenoessische Polytechnikum, today ETH Zurich, in 1855, and the Schweizerische Kreditanstalt, today Credit Suisse, in 1856. The school and the bank, two pillars of modern Switzerland, grew out of the same railway-building push. Build the rails and you build the institutions that ride on them.",
        links: [
          {
            label: "Alfred Escher, railways, bank and polytechnic",
            url: "https://en.wikipedia.org/wiki/Alfred_Escher",
          },
          {
            label: "ETH Zurich, founded 1855",
            url: "https://en.wikipedia.org/wiki/ETH_Zurich",
          },
        ],
      },
      {
        n: 4,
        title: "A precondition for political power",
        body: "Timothy Mitchell's Carbon Democracy argues that mass democracy in the industrial West arrived on coal. Coal had to be cut by hand and hauled through a few narrow chokepoints, pits, single rail lines, ports, and a small number of workers at any one of them could stop the flow. That physical leverage, not any doctrine, won the vote and the welfare state between roughly 1880 and 1940. Oil then dissolved the chokepoints: it flows through pipes, needs far less labour, and reroutes around any blockage. The energy transition was also a transition in who could interrupt. As Wang puts it: 'Nobody voted for this. It was decided in the pipe diameter.'",
        links: [
          {
            label: "Carbon Democracy: Political Power in the Age of Oil (Timothy Mitchell)",
            url: "https://www.versobooks.com/products/2222-carbon-democracy",
          },
        ],
      },
      {
        n: 5,
        title: "A precondition for settlement",
        body: "Every form of human settlement is paired with the infrastructure that made it possible. Nomadic camps had paths, hearths and shelters; Neolithic villages had wells, granaries and irrigation; classical cities of up to a million rested on aqueducts, roads and sewers; the digital megacity runs on fibre, data centres and transit. The settlement is the 'above'; the infrastructure is the 'below'. Change what is below and you change what can stand above it.",
        links: [],
      },
      {
        n: 6,
        title: "A precondition for place-making",
        body: "Infrastructure is also what turns space into place. 'Infrastructure is the most boring, most important thing in placemaking,' notes Lucy Gara of LUC; 'daily life is a journey through infrastructure, it shapes our social lives, our health, our productivity, and above all, our sense of place and community.' The Project for Public Spaces diagram sorts a good place into four qualities, sociability, uses and activities, access and linkages, comfort and image, each of which quietly depends on the pipes and paths beneath it.",
        links: [
          {
            label: "Project for Public Spaces: what makes a great place?",
            url: "https://www.pps.org/article/grplacefeat",
          },
        ],
      },
      {
        n: 7,
        title: "How the commons was enclosed",
        body: "Here is the twist. Over the last thousand years, five core systems, land and tenure, water, energy, transportation and communication, drifted from locally held, commons-like arrangements toward central control. Three hinges stand out: enclosure, the privatising of common land; the 19th-century build-out of rail, sewers and the telegraph; and the internet. The commons was not only argued away in theory, it was enclosed in the pipe, the grid and the wire. Infrastructure is how the commons was lost.",
        links: [
          {
            label: "Enclosure of the commons",
            url: "https://en.wikipedia.org/wiki/Enclosure",
          },
        ],
      },
      {
        n: 8,
        title: "The house that owns itself",
        body: "If infrastructure enclosed the commons, re-decentralising infrastructure can help rebuild it, and Wang argues the tools now exist: micro-production and micro-suppliers reshaping resilience, AI reshaping infrastructure, and blockchain letting ownership, rules and coordination be embedded directly in the physical system. Her ETH case study, no1s1 ('no one's one'), is a small cabin that owns and governs itself through a blockchain treasury and smart contracts: it holds its own funds, sells its own access, and pays for its own upkeep, owned by no one. In her framing ownership is not natural but 'informational' and 'engineerable', a bundle of rights, access, withdrawal, management, exclusion, alienation, that can be programmed. The self-owning house is a first sketch of what a re-commoned infrastructure could look like from below. Una Wang is Hongyang Wang, a researcher at ETH Zurich. Her closing question is really about the layer under every commons: can you imagine a house that owns itself?",
        links: [
          {
            label: "no1s1, a small house that raises big questions (ETH Zurich)",
            url: "https://ethz.ch/en/news-and-events/eth-news/news/2021/10/a-small-house-raises-big-questions.html",
          },
          {
            label: "What if properties are owned by no one or everyone? (EC3 2022)",
            url: "https://doi.org/10.35490/EC3.2022.213",
          },
          {
            label: "Blockchain-enabled ownership-aware cyber-physical agents (2026)",
            url: "https://www.sciencedirect.com/science/article/pii/S2096720926000151",
          },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },

  // --- w3-d2: Matthias Fersterer - Klein Jasedow: A Commoning Community. Practices & Principles ---
  "w3-d2": {
    slug: "w3-d2",
    meta: {
      eyebrow: "Klein Jasedow: A Commoning Community. Practices & Principles",
      speaker: "Matthias Fersterer",
      socials: [
        { label: "Oya magazine", url: "https://oya-online.de/" },
        { label: "Stiftung Zukunftswerk", url: "https://stiftung-zukunftswerk.de/" },
      ],
      metaTitle: "Klein Jasedow: A Commoning Community \xb7 Matthias Fersterer",
      metaDescription:
        "Companion to Matthias Fersterer's talk at Valley of the Commons: how Klein Jasedow, Germany's longest-standing intentional community, sustains itself through commoning, care & subsistence, and conviviality, with an oral tradition inside and a layered legal shell outside. In beats with sources, plus the live session.",
    },
    items: [
      {
        type: "quiz",
        prompt: "Klein Jasedow is Germany's longest-standing intentional community. In what year did it first sprout, and where?",
        options: [
          "1968, in a West Berlin commune",
          "1976/77, by four musicians in Upper Bavaria",
          "1990, just after reunification, in Western Pomerania",
          "1997, when it moved to Klein Jasedow",
        ],
      },
      {
        type: "quiz",
        prompt: "When the community arrived in 1997, what was Klein Jasedow like?",
        options: [
          "A thriving arts town they joined",
          "A half-deserted village in a structurally weak area, with ~80% unemployment",
          "An empty greenfield site with no buildings",
          "A protected heritage site they were invited to restore",
        ],
      },
      {
        type: "quiz",
        prompt: "Fersterer says the community's inner life comes down to two questions. Which pair?",
        options: [
          "What do I own, and what do I owe?",
          "Who decides, and who pays?",
          "What can I do to make community work, and what can I refrain from doing that upsets you?",
          "What are the rules, and who enforces them?",
        ],
      },
      {
        type: "quiz",
        prompt: "How are the community's inner principles held and passed on?",
        options: [
          "A written constitution every member signs",
          "An oral tradition passed on by storytelling, with no written set of rules",
          "An app that tracks contributions and sanctions",
          "A rota drawn up by an elected council",
        ],
      },
      {
        type: "quiz",
        prompt: "The talk's 'essence: two by three' places three spheres inside a spectrum defined by two poles. What are the three spheres?",
        options: [
          "Land, labour and capital",
          "Family, work and worship",
          "Commoning, care & subsistence, and conviviality",
          "Production, distribution and consumption",
        ],
      },
      {
        type: "poll",
        prompt: "Klein Jasedow's founders still live together after ~50 years. What do you think holds a community together longest?",
        options: [
          "Shared ownership and money",
          "Shared work and daily practice",
          "Shared story and culture",
          "Shared place and land",
        ],
      },
      {
        type: "poll",
        prompt: "'No written set of rules', principles passed on by storytelling. How does that land for you?",
        options: [
          "Freeing, rules calcify",
          "Risky, it needs written agreements",
          "Depends on the size of the group",
          "Only works with deep trust",
        ],
      },
      {
        type: "poll",
        prompt: "The community wraps its essence in legal shells (e.V., eG, Stiftung, GmbH). 'Give to Caesar what is Caesar's.' Your instinct?",
        options: [
          "Wise, use the forms, keep the essence",
          "Dangerous, the cover becomes the essence",
          "Necessary but always a compromise",
          "I would avoid legal forms entirely",
        ],
      },
      {
        type: "poll",
        prompt: "Which of the three spheres pulls at you most right now?",
        options: [
          "Commoning, holding things in common",
          "Care & subsistence, meeting real needs",
          "Conviviality, freedom in interdependence",
          "All three, they only work together",
        ],
      },
      {
        type: "poll",
        prompt: "Conviviality here is 'individual freedom realised in personal interdependence', and it extends to the more-than-human. Could you live that?",
        options: [
          "Yes, that is the point of community",
          "Yes, but the human part is hard enough",
          "The more-than-human part is a stretch",
          "I would need to see it lived first",
        ],
      },
    ],
    beats: [
      {
        n: 1,
        title: "A commoning community",
        body: "Matthias Fersterer speaks from Klein Jasedow, a tiny village in the Lassaner Winkel near the Peene river in Western Pomerania, north-east Germany. He calls it a 'commony': a community whose life is organised not by ownership or command but by commoning, the ongoing practice of holding and making things in common. The community was not born here. It sprouted in 1976/77 around four musicians in Upper Bavaria, lived a while in Switzerland, and in 1997 resettled in Klein Jasedow. Today it is Germany's longest-standing intentional community whose founders still live together. Fersterer, born in Innsbruck in 1980, has lived there since 2009; he co-founded and edits the magazine Oya, publishes the thinkOya book edition with Drachen Verlag, translates (his German Ursula K. Le Guin won the Kurd-Lasswitz-Preis), and bakes sourdough for the community.",
        links: [
          {
            label: "Oya, the community's magazine (Fersterer, editor)",
            url: "https://oya-online.de/",
          },
        ],
      },
      {
        n: 2,
        title: "What there once was",
        body: "When the community arrived in 1997, Klein Jasedow was a half-deserted village of derelict buildings in a structurally weak corner of the former East: around 80 per cent unemployment and high votes for right-wing extremists. They bought ruins and resettled the place. The story matters because it sets the stakes: a stable commons was not planted in easy soil but grown, deliberately, in a place the wider economy had written off.",
        links: [
          {
            label: "Klein Jasedow, a learning site (GEN Deutschland)",
            url: "https://lernorte.gen-deutschland.de/lernort/klein-jasedow/",
          },
        ],
      },
      {
        n: 3,
        title: "What there is now",
        body: "Two and a half decades on, the same village carries a dense weave of enterprises and projects: a concert venue with excellent acoustics (the Klanghaus am See), a free democratic school (the Kleine Dorfschule Lassaner Winkel), publishing (Drachen Verlag and Oya), agroforestry and regenerative agriculture, gardens, a gong manufactory (Sona), kids' circus camps, a traditional sailing boat, a regional network and political activism. More than 60 people now live there, aged 1 to 84, and the village's population has more than doubled. The point is not the list but its shape: a self-supporting local economy that keeps the community alive without surrendering it to any single owner.",
        links: [
          {
            label: "Europ\xe4ische Akademie der Heilenden K\xfcnste (Klanghaus, courses)",
            url: "https://eaha.org/",
          },
          {
            label: "Kleine Dorfschule Lassaner Winkel (free democratic school)",
            url: "https://kleine-dorfschule.de/",
          },
        ],
      },
      {
        n: 4,
        title: "Relationships within: two questions",
        body: "How is the inside held together? Not by a rulebook. Fersterer describes a commons-based, polycentric structure carried by oral tradition, principles passed on by storytelling, with no written set of rules. It comes down to two questions each person keeps asking: 'What can I do to make community work?' and 'What can I refrain from doing that upsets you?' One question turns you toward contribution, the other toward restraint. Between them they do the work that statutes cannot: they keep the relationships, not the regulations, at the centre.",
        links: [],
      },
      {
        n: 5,
        title: "Relationships without: give to Caesar",
        body: "The outside is another matter. To meet the state, the market and the law, the community wraps its essence in a layered shell of legal bodies with written statutes and contracts: an association (e.V.), a cooperative (eG), a foundation (Stiftung Zukunftswerk, which holds most of the property), civil-law companies (GbR) and limited companies (GmbH). A timeline of foundings runs from the Gemeinschaft in Bavaria (1976) through the move to Klein Jasedow (1997), the Kr\xe4utergarten Pommerland cooperative (2001), the gong manufactory (2004), Oya Medien eG (2010), the village school (2017) and on. Fersterer's rule: 'Give to Caesar what is Caesar's', make the most of legal forms, but never mix up the cover with the essence.",
        links: [
          {
            label: "Stiftung Zukunftswerk (the foundation that holds the land)",
            url: "https://stiftung-zukunftswerk.de/",
          },
        ],
      },
      {
        n: 6,
        title: "Making kin, and the art of improvisation",
        body: "Two borrowed ideas name the everyday practice. From Donna Haraway: 'Making kin and making kind ... stretch the imagination and can change the story', kinship chosen laterally, not only by birth. And from Joseph Beuys: 'The artist's workshop is between the people', the community itself, with its circus camps, its gong ensembles and its festivals, is the artwork. Klein Jasedow grew out of musicians, and it treats communal life the way it treats music: as improvisation, listening and responding in real time rather than executing a score.",
        links: [
          {
            label: "Donna Haraway, Staying with the Trouble (making kin)",
            url: "https://www.dukeupress.edu/staying-with-the-trouble",
          },
        ],
      },
      {
        n: 7,
        title: "The essence: two by three",
        body: "Fersterer draws the essence as three overlapping circles inside a field stretched between two poles, freedom and interdependence. The three spheres are commoning (holding and making in common), care & subsistence (what is 'necessary for survival and belongs to every life', in Maria Mies and Veronika Bennholdt-Thomsen's words, including the unpaid work of reproduction), and conviviality (Ivan Illich's 'individual freedom realised in personal interdependence', extended here to the more-than-human). No sphere stands alone: 'There is no commons without commoning' (Peter Linebaugh), and no commoning without commoners bound by care and delight. And no community is alike.",
        links: [
          {
            label: "Ivan Illich, Tools for Conviviality (conviviality)",
            url: "https://en.wikipedia.org/wiki/Tools_for_Conviviality",
          },
          {
            label: "Mies & Bennholdt-Thomsen, The Subsistence Perspective",
            url: "https://en.wikipedia.org/wiki/Maria_Mies",
          },
        ],
      },
      {
        n: 8,
        title: "Patterns of commoning, and change as the only constant",
        body: "For the wider grammar, Fersterer points to Silke Helfrich and David Bollier's Free, Fair and Alive, which reads the commons as recurring patterns across three domains, provisioning, social life and peer governance, in the spirit of Christopher Alexander's pattern language: 'Patterns are identified, not invented ... to make something latent visible.' It also echoes David Graeber's prefiguration, 'building the new in the shell of the old', acting as if you are already free. Klein Jasedow's closing image is a red-sailed boat on the Achterwasser: change is the only thing constant. A commons endures not by freezing its form but by keeping the practice alive. Matthias Fersterer, matthias.fersterer@oya-online.de.",
        links: [
          {
            label: "Free, Fair and Alive (Helfrich & Bollier, New Society)",
            url: "https://newsociety.com/book/free-fair-and-alive/",
          },
          {
            label: "Stiftung Zukunftswerk Klein Jasedow",
            url: "https://stiftung-zukunftswerk.de/",
          },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },

  "w3-d3": {
    slug: "w3-d3",
    meta: {
      eyebrow: "Six years building a tokenised regenerative village in the Alentejo, wins and hard truths",
      speaker: "Luna and Sam Delesque",
      socials: [
        { label: "Samuel Delesque (personal site)", url: "https://samueldelesque.me/" },
        { label: "Traditional Dream Factory", url: "https://www.traditionaldreamfactory.com/" },
      ],
      livestream: "https://www.youtube.com/watch?v=24ifZDgNdlY",
      metaTitle: "Building Traditional Dream Factory \xb7 Luna & Sam Delesque",
      metaDescription:
        "Companion to Luna and Sam Delesque's talk at Valley of the Commons: how Traditional Dream Factory restores degraded land in the Alentejo, holds it in a Swiss commons trust, and governs a 60-citizen village through a token weighted by presence and sweat. In beats with sources, plus the live session.",
    },
    items: [
      {
        type: "quiz",
        prompt: "What does one Traditional Dream Factory token entitle the holder to?",
        options: [
          "One night's stay per year, for life",
          "A permanent house on the land",
          "One share of the village's annual profits",
          "A vote proportional only to money spent",
        ],
      },
      {
        type: "quiz",
        prompt: "Where is Traditional Dream Factory?",
        options: [
          "Findhorn, Scotland",
          "Abela, in the Alentejo region of Portugal",
          "Sintra, near Lisbon",
          "Tamera, in the south of Portugal",
        ],
      },
      {
        type: "quiz",
        prompt: "What is the role of OASA, the Swiss non-profit?",
        options: [
          "It runs the day-to-day bookings and events",
          "It markets the token to new buyers",
          "It holds the land and buildings under a regeneration constitution",
          "It is the blockchain that hosts the token",
        ],
      },
      {
        type: "quiz",
        prompt: "Besides buying tokens, which two mechanisms add voting weight at TDF?",
        options: [
          "Proof of Stake and Proof of Work",
          "Proof of Presence and Proof of Sweat",
          "Proof of Payment and Proof of Residence",
          "Proof of Vouching and Proof of Age",
        ],
      },
      {
        type: "quiz",
        prompt: "Under OASA's rules, how much of TDF's land may be developed (built on)?",
        options: [
          "5%",
          "25%",
          "45%",
          "50%",
        ],
      },
      {
        type: "poll",
        prompt: "Which part of building a village would you personally find hardest?",
        options: [
          "Restoring the degraded land",
          "Raising the money",
          "Holding the community together",
          "Building the technology",
        ],
      },
      {
        type: "poll",
        prompt: "Would you buy into a community with a token giving you one night a year for life?",
        options: [
          "Yes, gladly",
          "Only after visiting in person",
          "Only if I could resell it",
          "No, not for me",
        ],
      },
      {
        type: "poll",
        prompt: "Where should voting power in a community mostly come from?",
        options: [
          "Money contributed",
          "Work put in (sweat)",
          "Time physically present",
          "One person, one vote",
        ],
      },
      {
        type: "poll",
        prompt: "What matters most in an intentional community?",
        options: [
          "Regenerating the land",
          "Financial viability",
          "Strong social rituals and agreements",
          "Good governance software",
        ],
      },
      {
        type: "poll",
        prompt: "Would you rather steward land in common or own property outright?",
        options: [
          "Steward it in common",
          "Own it outright",
          "A mix of both",
          "I am not sure",
        ],
      },
    ],
    beats: [
      {
        n: 1,
        title: "What TDF is",
        body: "Traditional Dream Factory is a regenerative village in Abela, in Portugal's Alentejo, built on an old chicken factory the team has slowly renovated. It stewards 25 hectares, owns the factory buildings, and leases the land with a right to buy over five years. At the time of the talk it has around 60 'citizens' (global members who treat TDF as a home), roughly 30 people on the ground in season, and over 320 guests a year. It sits an hour and a half from Lisbon and 35 minutes from the beach, next to Abela village, deliberately connected to the locals rather than an off-grid bubble.",
        links: [
          { label: "Traditional Dream Factory", url: "https://www.traditionaldreamfactory.com/" },
          { label: "TDF food forest (Open Forest Protocol)", url: "https://atlas.openforestprotocol.org/1746539547000" },
        ],
      },
      {
        n: 2,
        title: "Three bodies keep the land safe",
        body: "TDF is structured as three interlocking entities so that a founder leaving, or a conflict, can never put the land at risk. OASA, a Swiss non-profit association set up around 2021, holds the land, the buildings and now Closer under a constitution committed to regeneration, with a stated goal of protecting 100,000 hectares. A Portuguese company, Enciada, is the operating vehicle, wholly owned by OASA, so profit flows back into regeneration. Closer is the software operating system, built first by Sam and now by a larger dev team.",
        links: [
          { label: "OASA (land held in trust for regeneration)", url: "https://oasa.earth/" },
          { label: "Closer platform", url: "https://closer.earth/" },
        ],
      },
      {
        n: 3,
        title: "One night a year, for life",
        body: "TDF is a tokenised village on the Celo blockchain. The utility token opened at 222 euros in 2021 and traded near 267 euros at the time of the talk, rising on a bonding curve so each purchase or sale nudges the price up. One token equals one night's stay per year for life, so 30 tokens buy a month a year; buyers can now pay by bank card, with the web3 handled in the back end. The token is both the fundraising mechanism and the governance mechanism, held in the buyer's own wallet.",
        links: [
          { label: "The Blockchain Socialist: TDF as a DAO in Portugal", url: "https://theblockchainsocialist.com/a-regenerative-village-as-a-dao-in-portugal-traditional-dream-factory/" },
          { label: "Learn more about TDF", url: "https://www.traditionaldreamfactory.com/learn-more" },
        ],
      },
      {
        n: 4,
        title: "Proof of Presence, Proof of Sweat",
        body: "On top of the token, TDF adds weights so that money does not equal power. Proof of Presence is recorded on-chain when you show up and stay; Proof of Sweat is earned by working for the project, including tech, coordination and artistic work, not just physical labour. Someone who buys 60 tokens but never appears can carry less voting weight than someone with 5 tokens who has done a month-long residency. Sweat decays about 10% to reward continued participation, and the sweat reserve (20% of tokens) is running lower after six years, making sweat scarcer and more valued.",
        links: [
          { label: "Closer governance (Proof of Presence / Proof of Sweat)", url: "https://closer.earth/" },
        ],
      },
      {
        n: 5,
        title: "Documentation as the source of truth",
        body: "Early on, Sam, Annie and the first members wrote a 'pink paper' (still downloadable) capturing the first vision, agreements, principles and values. It has since become a 'game guide' kept on GitHub as the community's living source of truth: values, agreements, how governance and the token work, and social protocols on alcohol, pets, religion and conflict. The game guide can now only be changed through the DAO, and governance itself moved off tools like Snapshot onto Closer, where citizens read a proposal, comment and vote in one place.",
        links: [
          { label: "Closer platform", url: "https://closer.earth/" },
        ],
      },
      {
        n: 6,
        title: "Farming rocks, then regenerating",
        body: "The land was severely degraded by overgrazing and industrial farming; the team joked they were 'farming rocks'. They have planted around 4,000 trees (about half survive in the hard, drying Alentejo climate), grown a food forest of 65-plus species, and dug swales, ponds and a natural pool, raising the water table from around 20 metres up to about 3 metres in places. OASA's rules cap development at 5% of the land, allow 45% for agriculture and food, and permanently rewild 50%; water is tested twice a year via DNA sampling to build a biodiversity baseline for future biodiversity credits.",
        links: [
          { label: "Sam's honest note on regeneration (Substack)", url: "https://traditionaldreamfactory.substack.com/p/tdf-2026-an-honest-note-on-regeneration" },
        ],
      },
      {
        n: 7,
        title: "Social architecture, not 'figure it out'",
        body: "TDF runs on structured social practice rather than the hope that people will just get along. Principles borrow from Burning Man (consent, gifting, leave a positive trace) and are digitally signed by everyone who books. Weekly anchors include a 9am standup, sharing and feedback circles, meal circles and Sunday saunas, plus regular Nonviolent Communication workshops and a DAO-ratified conflict-resolution protocol. Membership runs in phases: a two-week cultural onboarding, buying 30 tokens, and being vouched in by roughly 10% of citizens, with 'outboarding' possible for clear values breaches.",
        links: [
          { label: "The 10 Principles of Burning Man", url: "https://burningman.org/about/10-principles/" },
          { label: "Center for Nonviolent Communication", url: "https://www.cnvc.org/" },
        ],
      },
      {
        n: 8,
        title: "The money, and letting go",
        body: "The 2022 token launch did not sell out or raise the roughly 3.5 million euros hoped for, despite an expensive campaign; sales instead grew slowly, accelerating in the last year. Over five years TDF raised about 1.2 million euros and took roughly 400,000 euros in mostly friends-and-family loans at low or zero interest, and in 2025 operations broke roughly even (about 80,000 euros in and out), helped by events, glamping and a small monthly subscription. Luna's closing lessons: secure water before you plant, write structures and agreements early, do not build software while building a village, distribute weight and ownership from day one, hire slowly, take breaks, and put people before the project.",
        links: [
          { label: "The talk (video)", url: "https://www.youtube.com/watch?v=24ifZDgNdlY" },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },
  "w3-d4": {
    slug: "w3-d4",
    meta: {
      eyebrow: "How housing is taken out of the speculative market and held in common",
      speaker: "Clara Gromaches",
      socials: [
        { label: "Clara Gromaches (site)", url: "https://claragromaches.com/" },
        { label: "Clara Gromaches on LinkedIn", url: "https://www.linkedin.com/in/cgromaches/" },
      ],
      livestream: "https://www.youtube.com/watch?v=3lN8V0sA6qo",
      metaTitle: "Housing as a Commons \xb7 Clara Gromaches",
      metaDescription:
        "Companion to Clara Gromaches's talk at Valley of the Commons: the legal, historical and material foundations of holding housing and land in common, from stewarded-property law and the Mietshauser Syndikat to Red Vienna and earth construction. In beats with sources, plus the live session.",
    },
    items: [
      {
        type: "quiz",
        prompt: "In the David Graeber line Clara opens with, property is fundamentally what?",
        options: [
          "A relation between a person and a thing",
          "An agreement between people",
          "A right granted by the state",
          "A gift from nature",
        ],
      },
      {
        type: "quiz",
        prompt: "In the Mietshauser Syndikat model, who can veto selling a house back into the speculative market?",
        options: [
          "The local municipality",
          "The individual resident who bought in",
          "The syndicate/network, alongside the resident community",
          "The bank holding the mortgage",
        ],
      },
      {
        type: "quiz",
        prompt: "Which three characteristics define 'stewarded property' in Clara's framing?",
        options: [
          "Ownership, profit, inheritance",
          "Possession, custom, inalienability",
          "Rent, lease, sale",
          "Land, labour, capital",
        ],
      },
      {
        type: "quiz",
        prompt: "Which city did Clara repeatedly cite as a global reference for social and affordable housing?",
        options: [
          "Barcelona",
          "Freiburg",
          "Vienna",
          "Zurich",
        ],
      },
      {
        type: "quiz",
        prompt: "Why does Clara say earth construction performs well in earthquake areas?",
        options: [
          "It is heavier than concrete",
          "It vibrates with the ground at a similar frequency, making it more resistant",
          "It is reinforced with steel",
          "It cannot crack",
        ],
      },
      {
        type: "poll",
        prompt: "For a Valley dwelling, how much of daily life would you want to share?",
        options: [
          "Almost everything (shared kitchen, meals, spaces)",
          "A lot, but I keep a private bedroom",
          "A private flat plus a shared common house",
          "My own house, occasionally using shared facilities",
        ],
      },
      {
        type: "poll",
        prompt: "Which legal vehicle for holding housing out of the market appeals to you most?",
        options: [
          "Foundation model (assets cannot be sold, only transferred)",
          "Mietshauser Syndikat network veto",
          "Right-of-use cooperative",
          "Community land trust (land and building split)",
        ],
      },
      {
        type: "poll",
        prompt: "If you could build here with one local material, which?",
        options: [
          "Earth / clay",
          "Straw",
          "Timber",
          "Stone",
        ],
      },
      {
        type: "poll",
        prompt: "What matters most when starting a community from zero?",
        options: [
          "A clear, specific shared mission",
          "The right site and climate",
          "Legal protection against dispossession",
          "The economic and funding model",
        ],
      },
      {
        type: "poll",
        prompt: "How should invisible care work (cooking, cleaning, childcare) be handled?",
        options: [
          "An obligatory shared service, like seva, for everyone",
          "Paid, professionalised roles",
          "A rotating volunteer roster",
          "Left to individual households",
        ],
      },
    ],
    beats: [
      {
        n: 1,
        title: "Property is an agreement between people",
        body: "Clara opens on the legal foundations, quoting David Graeber that property 'is not a relation between a person and a thing, it is an agreement between people', and traces how it evolved over 300 years. She frames private property through William Blackstone's 'sole and despotic dominion' and a Lockean 'my freedom ends where yours begins' individualism, arguing this isolates the individual from community, tradition and nature. She ties private property to environmental loss: most of the world's land is held customarily by communities but only a small share is legally recognised, and deforestation is driven by agricultural expansion on private land.",
        links: [
          { label: "David Graeber on property (quote)", url: "https://www.goodreads.com/quotes/11031746-the-reason-it-is-possible-to-imagine-property-as-a" },
          { label: "William Blackstone", url: "https://en.wikipedia.org/wiki/William_Blackstone" },
        ],
      },
      {
        n: 2,
        title: "Four ways to hold property",
        body: "She lays out four paradigms. Private property is exclusion and dominion. Collective property, traced to Rousseau's general will and Robert Owen's cooperative communism, she critiques because a co-op or non-profit can still vote to sell out and hand assets back to the market (she uses OpenAI's drift toward for-profit as an analogy). Public property is managed by the state for citizens but never by them. Stewarded property goes beyond ownership toward a right to use, manage and inhabit, rather than to buy or sell.",
        links: [
          { label: "Robert Owen", url: "https://en.wikipedia.org/wiki/Robert_Owen" },
        ],
      },
      {
        n: 3,
        title: "Stewarded property: possession, custom, inalienability",
        body: "Clara defines stewarded property by three traits. Possession is the right to inhabit long-term (use value) rather than to trade (exchange value); custom means the rights and agreements are held between the people managing the commons, which is also why commons are fragile, since agreements are relationships; inalienability means some things are too fundamental to be made 'mine'. Under this frame housing becomes a fundamental right rather than a speculative asset. She notes the 'tragedy of the commons' arises specifically from open access with no boundaries or agreements, not from commons that are actually governed.",
        links: [],
      },
      {
        n: 4,
        title: "Commons dismantled, commons that survived",
        body: "She surveys enclosures: the seven-generations land governance of Native Americans, broken by treaty and force; the English enclosure acts that pushed farmers into cities and fuelled the Industrial Revolution through a mass transfer of wealth; and Spain's desamortizacion and parallel European disentailment laws. Against these she sets commons that endured, noting land held in common continuously in Switzerland since around 1114, and standing legal frameworks for commonly held land in Spain, Italy, Austria and Switzerland. Her point: societies know how to hold land in common but not housing, and since caring for land needs people living nearby, housing is the next frontier.",
        links: [
          { label: "Enclosure of the commons", url: "https://en.wikipedia.org/wiki/Enclosure" },
        ],
      },
      {
        n: 5,
        title: "Legal vehicles that lock housing out of the market",
        body: "Clara walks through concrete mechanisms. The Catalan Emprius foundation model works because in Spain a foundation cannot simply sell its assets: if dissolved, its land and housing must pass to another foundation with a similar goal. The Mietshauser Syndikat, originating in Freiburg, gives each house two owners, the resident community and the syndicate, so the network can veto any sale back to the market. She distinguishes these from things that look like commons but are not, such as right-of-use cooperatives where the co-op still holds the land and a large assembly could vote to sell, the Spanish surface-right model of leasing public land for around 100 years, and community land trusts, which split land from building.",
        links: [
          { label: "Mietshauser Syndikat", url: "https://en.wikipedia.org/wiki/Mietsh%C3%A4user_Syndikat" },
          { label: "Sostre Civic (right-of-use cooperatives)", url: "https://sostrecivic.coop/" },
          { label: "Community land trusts explained", url: "https://www.localhousingsolutions.org/housing-policy-library/community-land-trusts/" },
        ],
      },
      {
        n: 6,
        title: "A genealogy of collective living",
        body: "Clara shows historical experiments in shared living. The Familistere de Guise, Godin's 'social palace' for factory workers, used glass-roofed courtyards to increase social encounter; Melusina Fay Peirce's 19th-century cooperative-housekeeping proposal tried to collectivise and pay for invisible care work; Red Vienna's Gemeindebau, tax-funded, embedded communal kitchens, nurseries, schools and laundries and made Vienna a global reference for affordable housing; Soviet-era buildings used shared nurseries to draw people into communal living; and Auroville's solar communal kitchen in India shows self-provided services binding a community, organised as a fractal of clusters within clusters.",
        links: [
          { label: "Familistere de Guise (Godin)", url: "https://en.wikipedia.org/wiki/Jean-Baptiste_Andr%C3%A9_Godin" },
          { label: "Melusina Fay Peirce, cooperative housekeeping", url: "https://en.wikipedia.org/wiki/Melusina_Fay_Peirce" },
          { label: "Red Vienna social housing", url: "https://www.wien.info/en/art-culture/red-vienna/social-housing-buildings-359256" },
        ],
      },
      {
        n: 7,
        title: "Permanent-plus-temporary, and seva",
        body: "She highlights the Amritapuri ashram in Kerala as a model for a settlement that is permanent and temporary at once: a stable core of long-term residents plus a large inflow staying days to months. What levels everyone's status there is seva, obligatory voluntary time given to the community (cooking, cleaning, care work). Clara argues this could be adapted for Western communities that flow between permanent and temporary members, since every new arrival changes the relationships and some mechanism is needed to keep the balance fair.",
        links: [
          { label: "Amritapuri ashram", url: "https://amma.org/groups-centres/amritapuri/" },
        ],
      },
      {
        n: 8,
        title: "Landing it in the Alps: climate, materials, form",
        body: "For the Valley site Clara gives design principles, led by climate and solar geometry: the summer sun sits around 66 degrees and winter around 19, so orienting homes south and sizing shading lets a house stay cool in summer and passively warm its floor in winter, while mountain, tree and neighbour shadows must be read off the local solar chart. She argues for place-based, traditional building and reusing abandoned houses, pointing to abundant local materials: timber, earth, stone and straw. She showcases earth construction (cheap where clay is present, humidity-regulating, earthquake-resilient because it vibrates with the ground, now available prefabricated and 3D-printed) and straw (cheapest, excellent insulation), citing Anna Heringer's earth-and-timber work and Peter Zumthor as an Alpine reference, and closes by parking the economics as a provocation for the next week.",
        links: [
          { label: "Anna Heringer (earth architecture)", url: "https://en.wikipedia.org/wiki/Anna_Heringer" },
          { label: "Peter Zumthor", url: "https://en.wikipedia.org/wiki/Peter_Zumthor" },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },
  "w3-d5": {
    slug: "w3-d5",
    meta: {
      eyebrow: "How land ownership, set decades in advance, quietly decides what housing is ever possible",
      speaker: "Charlie Fischer",
      socials: [
        { label: "Charlie Fisher on LinkedIn", url: "https://www.linkedin.com/in/charlie-fisher-23987236/" },
        { label: "OASA (land conservancy he co-founded)", url: "https://oasa.earth/" },
      ],
      livestream: "https://www.youtube.com/watch?v=bRkjSjlRI7Y",
      metaTitle: "Knowing at the Boundaries \xb7 Charlie Fischer",
      metaDescription:
        "Companion to Charlie Fischer's talk at Valley of the Commons: mapping land ownership as a design method for collaborative housing, why enclosure and the price of land shape what is possible, and why a place's prior enabling conditions decide what communities can ever build. In beats with sources, plus the live session.",
    },
    items: [
      {
        type: "quiz",
        prompt: "In 2014, roughly what share of land ownership did Fischer's group map across Oxfordshire, mostly by hand?",
        options: [
          "About 25%",
          "About 50%",
          "About 77%",
          "About 95%",
        ],
      },
      {
        type: "quiz",
        prompt: "What does Fischer say most predicts whether a collaborative-housing project succeeds?",
        options: [
          "The skills and capital of the individuals running it",
          "The local enabling conditions, what had been done in that place before",
          "The size of the initial grant",
          "Whether a famous architect designed it",
        ],
      },
      {
        type: "quiz",
        prompt: "What happened to the roughly 15-million-pound site north of Oxford his consortium bid on in 2016?",
        options: [
          "His consortium won and built the affordable homes as planned",
          "The price was pushed past 22 million, his group lost, and the winner later dropped the affordable housing",
          "The council bought it and built a health centre",
          "It was left undeveloped as green belt",
        ],
      },
      {
        type: "quiz",
        prompt: "In Fischer's data, roughly how many collaborative-housing organisations had actually built even one home?",
        options: [
          "About one in five",
          "About half",
          "About four in five",
          "Nearly all of them",
        ],
      },
      {
        type: "quiz",
        prompt: "What mistake did the Bristol self-build on the old builder's yard make?",
        options: [
          "They used the wrong building materials",
          "They failed to get planning permission",
          "They forgot to put a land trust underneath it, so the homes became valuable and inaccessible",
          "They ran out of money before completion",
        ],
      },
      {
        type: "poll",
        prompt: "Where should communities put most of their energy to make housing possible?",
        options: [
          "Buying land now",
          "Shaping local policy and finance conditions",
          "Building relationships and trust",
          "Raising capital",
        ],
      },
      {
        type: "poll",
        prompt: "Is it acceptable for community groups to play the same financial and political game as private developers?",
        options: [
          "Yes, on the same terms as everyone",
          "Only if their integrity is preserved",
          "No, it corrupts the mission",
          "It depends on the stakes",
        ],
      },
      {
        type: "poll",
        prompt: "Which time horizon feels most useful for planning land and housing?",
        options: [
          "5 to 10 years",
          "A working lifetime (25 to 30 years)",
          "100 years",
          "Perpetual, a thousand-year view",
        ],
      },
      {
        type: "poll",
        prompt: "New build or renovation for the housing we need?",
        options: [
          "Mostly new build",
          "Mostly renovation and retrofit",
          "A balanced mix",
          "Whatever the carbon budget allows",
        ],
      },
      {
        type: "poll",
        prompt: "Why do cooperative and community groups so often fail to cooperate with each other?",
        options: [
          "They cast each other as different",
          "They compete for the same scarce funding",
          "No one leads with a strong first act of cooperation",
          "The wider culture rarely models cooperation",
        ],
      },
    ],
    beats: [
      {
        n: 1,
        title: "Mapping reveals hidden time",
        body: "Fischer frames the talk around mapping, because understanding ownership has been central to his process: he starts by tracing who owned a piece of land, not just today but across many decades, alongside the cultural histories of how it was used. His point is that the visible boundary hides far more depth and time than it shows. By the moment people notice a threat and react, that is a lagging indicator: the real decision was often made six months, or decades, earlier.",
        links: [
          { label: "Cadastre (land-ownership mapping)", url: "https://en.wikipedia.org/wiki/Cadastre" },
        ],
      },
      {
        n: 2,
        title: "Oxfordshire and the long shadow of enclosure",
        body: "In 2014 Fischer helped map roughly 77% of land ownership across Oxfordshire, largely by hand, using registries and out-of-copyright one-inch maps to see change over time. The pattern was shaped by centuries of enclosure (England's had mostly finished by around 1890), which concentrated land in the church, the state and institutions such as the Oxford and Cambridge colleges. He described very long-minded entities (St John's College's endowment alone was around a billion pounds) using land as a 'golden ring' around cities to shape future development, with an investor class stacked behind them.",
        links: [
          { label: "A short history of enclosure in Britain (The Land)", url: "https://www.thelandmagazine.org.uk/articles/short-history-enclosure-britain" },
        ],
      },
      {
        n: 3,
        title: "Everyone is inside the same system",
        body: "Fischer rejects an 'us versus them' framing: citizens building housing, colleges and developers all work with the same planning system, the same finance and the same human emotions, just different parts of it. A recurring thread of his work is that groups trying to change housing become 'marketised' themselves, because they assemble their projects out of the existing market's materials. Recognising this is useful, he argues, because it lets a group decide which parts of what they do they want to keep out of market forces.",
        links: [],
      },
      {
        n: 4,
        title: "The price of land eats everything else",
        body: "He recounts a 2016 attempt to buy land north of Oxford for 260 self-build homes with a large land trust, modelled on 1990s West German quarters and backed by a wealthy individual. Land known to be worth about 15 million pounds was pushed by the seller's agent past 22 million, and everything else the scheme wanted (affordable housing, green transport, energy) was squeezed out in that gap; his consortium came third. The winners stalled, brought in lawyers, took finance linked to the landowner, and eventually delivered million-pound homes with the affordable housing and health centre dropped. He traces this to a legal duty to obtain 'best consideration reasonably obtained', now read as extracting the maximum price.",
        links: [],
      },
      {
        n: 5,
        title: "Enabling conditions come from place, not people",
        body: "His central thesis: the local enabling conditions of a place, what has already been done there in previous decades, are a precursor to what becomes possible. Interviewing people running collaborative-housing projects across four English cities, he found success was not really about their skills, capital or networks, but about what had been achieved locally before. He charts how organisation types replace each other over time (large housing co-operatives, then tenant management organisations, then a wave of community land trusts after England gained a national CLT body in 2010), while collaborative housing stays around 1% of stock, and only about one in five such organisations ever builds a home.",
        links: [
          { label: "Community land trust (overview)", url: "https://en.wikipedia.org/wiki/Community_land_trust" },
        ],
      },
      {
        n: 6,
        title: "Marginal on purpose, at the boundary",
        body: "This is where 'boundaries' becomes explicit. Fischer argues these groups keep themselves marginal, on the edges, constantly relating to a systemic shift they hope to inspire, and that this divergent position is worth leaning into. He describes groups moving between a settled 'stratum' and a productive 'chaos' at the edge, often when a community is under threat of demolition, which forces it to define its boundaries and organise. His example is a neighbourhood that fought demolition, 'rendered points technical', built a community hub with its own revenue, and after roughly 20 years reached the point of allocating and building its own housing.",
        links: [
          { label: "Ostrom's design principles for commons (boundary principle)", url: "https://en.wikipedia.org/wiki/Elinor_Ostrom" },
        ],
      },
      {
        n: 7,
        title: "Cases: LILAC, developers, and the forgotten trust",
        body: "He runs through built examples. LILAC in Leeds (completed 2014) uses a Mutual Home Ownership Society where members pay about 35% of income and equity is detached from property value, keeping it affordable in perpetuity. The Climate Innovation District in Leeds shows a developer folding whole phases into a community trust so local assets (shops, an energy company) stay behind. A Bristol self-build on a contaminated builder's yard succeeded but 'forgot to put a trust underneath it', so the homes became valuable and inaccessible, a mistake he says keeps recurring across Europe.",
        links: [
          { label: "LILAC (Low Impact Living Affordable Community, Leeds)", url: "https://world-habitat.org/world-habitat-awards/winners-and-finalists/lilac-low-impact-living-affordable-community/" },
        ],
      },
      {
        n: 8,
        title: "Cape Town, relational registries, fertile ground",
        body: "He closes on current work with the South African Development Action Group and the International Center for Community Land Trusts, exploring a CLT as an intermediary in Cape Town's informal settlements that can hold tenure without exposing residents' identities to the state, under Roman-Dutch law, via an Ethereum fellowship. He cites Puerto Rico, where a centralised registry took about 20 years to register only around 450 of some 5,000 homes because residents reasonably distrust formal registration, and proposes more dispersed 'relational registries'. His takeaway: it is not about resources, skills or experience, but about creating the fertile ground, the soils, in which such projects can grow.",
        links: [
          { label: "Development Action Group, Cape Town", url: "https://www.dag.org.za/" },
          { label: "International Center for Community Land Trusts", url: "https://www.cltweb.org/" },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynote" },
  },
  "w4-d2": {
    slug: "w4-d2",
    meta: {
      eyebrow: "Building parallel societies through exit, one small local circle at a time",
      speaker: "Sterlin Lujan",
      socials: [
        { label: "Sterlin Lujan on X", url: "https://x.com/sterlinlujan" },
        { label: "Logos Network", url: "https://logos.co" },
      ],
      livestream: "https://www.youtube.com/watch?v=fb-ELbnuW_w",
      metaTitle: "Logos Circles \xb7 Sterlin Lujan",
      metaDescription:
        "Companion to Sterlin Lujan's talk at Valley of the Commons: why the systems are failing, the case for exit over reform, the parallel polis of communist Czechoslovakia as a model, the Logos technology stack, and Logos Circles as a grassroots activism model. In beats with sources, plus the live session.",
    },
    items: [
      {
        type: "quiz",
        prompt: "Who does Lujan credit with popularising the term 'the meaning crisis'?",
        options: [
          "Robert Putnam",
          "John Vervaeke",
          "Shoshana Zuboff",
          "Albert Hirschman",
        ],
      },
      {
        type: "quiz",
        prompt: "Which historical movement does Lujan present as the primary model Logos is imitating?",
        options: [
          "The parallel polis in communist Czechoslovakia",
          "The French Revolution",
          "The American frontier settlements",
          "The Paris Commune",
        ],
      },
      {
        type: "quiz",
        prompt: "What are the three main layers of the Logos stack (Basecamp)?",
        options: [
          "Wallet, exchange, marketplace",
          "Identity, reputation, voting",
          "Storage, messaging, blockchain",
          "Compute, bandwidth, hosting",
        ],
      },
      {
        type: "quiz",
        prompt: "Whose book does Lujan credit for the idea of a 'winnable issue'?",
        options: [
          "Saul Alinsky's Rules for Radicals",
          "Karl Marx's Das Kapital",
          "Vaclav Havel's The Power of the Powerless",
          "Balaji Srinivasan's The Network State",
        ],
      },
      {
        type: "quiz",
        prompt: "Which Logos Circle win involved Raspberry Pis for a school?",
        options: [
          "A circle in Lisbon securing a community centre",
          "A circle in Zanzibar, Tanzania",
          "A circle in Nigeria funding medical treatment",
          "A cleanup at the Liberland border",
        ],
      },
      {
        type: "poll",
        prompt: "Which framing resonates more with you for building alternatives?",
        options: [
          "Exit",
          "Voice / reform",
          "Capacity building",
          "Something else",
        ],
      },
      {
        type: "poll",
        prompt: "Where do you see the most leverage for a small group to make change?",
        options: [
          "Local community projects",
          "Technology and protocols",
          "National politics",
          "Culture and storytelling",
        ],
      },
      {
        type: "poll",
        prompt: "What is the biggest risk of the 'exit' approach?",
        options: [
          "Loss of legal protections",
          "Excluding people who cannot afford to leave",
          "Fragmentation and isolation",
          "It never scales",
        ],
      },
      {
        type: "poll",
        prompt: "If you started a Logos Circle here, which 'winnable issue' would you pick?",
        options: [
          "Public / green space",
          "Local food production",
          "Transport and access",
          "Reopening trails and paths",
        ],
      },
      {
        type: "poll",
        prompt: "How do you read the 'end of politics' idea raised in the talk?",
        options: [
          "Genuinely possible and desirable",
          "Just new political forms, not the end",
          "Mostly a semantic dispute",
          "A dangerous illusion",
        ],
      },
    ],
    beats: [
      {
        n: 1,
        title: "The systems are broken",
        body: "Lujan opens with the claim that the major systems (democracy, the economy, governance) fail to meet human needs and often actively harm people. He cites figures he attributes largely to Pew: around 60% of adults are dissatisfied with how democracy works in their country, and by the end of 2025 there were 92 autocracies against 87 democracies. He argues that over recent centuries governments and corporations have consolidated control of nearly every sector of life, framing this through the Austrian-school idea of a 'mixed economy' and the Westphalian nation state.",
        links: [
          { label: "Pew Research Center: views of democracy", url: "https://www.pewresearch.org/topic/politics-policy/political-parties-polarization/political-systems/democracy/" },
        ],
      },
      {
        n: 2,
        title: "The meaning crisis",
        body: "He connects systemic failure to what he calls the meaning crisis, a term he credits to cognitive scientist John Vervaeke and the lecture series 'Awakening from the Meaning Crisis'. He cites a near-doubling of mental-health disorders in recent decades and roughly 720,000 to 746,000 suicides a year, about one every 43 seconds. He argues this stems from a long 'disenchantment' of the world since the Enlightenment and a loss of individual agency, and invokes Robert Putnam's Bowling Alone to describe the erosion of the civic 'middleware' of clubs and associations.",
        links: [
          { label: "John Vervaeke, Awakening from the Meaning Crisis", url: "https://www.youtube.com/playlist?list=PLND1JCRq8Vuh3f0P5qjrSdb5eC1ZfZwWJ" },
          { label: "Robert Putnam, Bowling Alone", url: "https://en.wikipedia.org/wiki/Bowling_Alone" },
        ],
      },
      {
        n: 3,
        title: "Exit, not reform",
        body: "Rather than fighting or reforming the existing system, Lujan advocates building a new one, an approach he calls 'exit'. He stresses that exit need not mean physically leaving: it can be spiritual, cultural or technological, and he cites Bitcoin and crypto as a financial exit. In the Q&A he grounds the idea in Albert Hirschman's Exit, Voice, and Loyalty, noting Hirschman himself fled Nazi Germany and helped others escape, and pushes back on the claim that exit is a purely anarcho-capitalist notion.",
        links: [
          { label: "Albert O. Hirschman, Exit, Voice, and Loyalty", url: "https://www.hup.harvard.edu/books/9780674276604" },
          { label: "Shoshana Zuboff, The Age of Surveillance Capitalism", url: "https://en.wikipedia.org/wiki/The_Age_of_Surveillance_Capitalism" },
        ],
      },
      {
        n: 4,
        title: "The parallel polis",
        body: "Lujan roots the project in the 'parallel polis' of Czechoslovakia from the 1960s to the 1980s under communist rule. He cites Vaclav Havel's 1978 essay The Power of the Powerless and the Charter 77 movement, describing how dissidents built their own 'second cultures': independent education, economic exchange and self-publishing (samizdat) that circulated censored material. He argues this grew large enough to 'ignore the regime out of existence', culminating in the peaceful Velvet Revolution of 1989, and presents it as the primary model Logos is trying to imitate on a planetary scale.",
        links: [
          { label: "Vaclav Havel, The Power of the Powerless (1978)", url: "https://www.nonviolent-conflict.org/wp-content/uploads/1979/01/the-power-of-the-powerless.pdf" },
          { label: "Charter 77", url: "https://en.wikipedia.org/wiki/Charter_77" },
        ],
      },
      {
        n: 5,
        title: "What Logos is",
        body: "Logos is described as two things: a movement (the side Lujan works on) and a technology stack, backed by a team of 250-plus people and at testnet for v1. The stack uses a Linux-style micro-kernel architecture called Basecamp with three layers: decentralised censorship-resistant storage (formerly Codex), peer-to-peer private messaging (formerly Waku, descended from Ethereum's dropped Whisper protocol), and a blockchain governance layer (formerly Nomos). He frames it as public-good, protocol-level infrastructure on which developers can already build applications, citing a censorship-resistant 'pirate radio' app built by a colleague.",
        links: [
          { label: "Logos Network", url: "https://logos.co" },
          { label: "State of the Logos Network (blog)", url: "https://blog.logos.co/article/november-2025" },
        ],
      },
      {
        n: 6,
        title: "Logos Circles and winnable issues",
        body: "Logos Circles are small self-organised groups of people already living in a community who come together to tackle one specific, 'winnable' issue. Lujan credits the winnable-issue concept to Saul Alinsky's Rules for Radicals, stressing clarity, focus, emotional resonance and measurable goals so a small, agile group can win and build momentum. He insists Logos does not act top-down or 'colonialist' but offers resources, networks, technologists and a training course to communities that share its values of decentralisation, mutual aid and trust networks.",
        links: [
          { label: "Saul Alinsky, Rules for Radicals", url: "https://en.wikipedia.org/wiki/Rules_for_Radicals" },
        ],
      },
      {
        n: 7,
        title: "Wins on the ground",
        body: "Lujan reports 40-plus circles worldwide, the largest concentration in Africa (notably Nigeria and Tanzania). Examples: the prototype Lisbon circle pressured local authorities into handing over a community centre for rejected artists and now runs an urban re-wilding campaign; a Zanzibar circle raised roughly 10,000 dollars via a vibe-coded funding platform to buy Raspberry Pis for a school; a Nigerian circle raised money for a member's emergency medical treatment and is building an emergency-request app; and a team ran a trash cleanup at the Liberland border in Serbia.",
        links: [
          { label: "Logos Network", url: "https://logos.co" },
        ],
      },
      {
        n: 8,
        title: "Exit versus voice: the debate",
        body: "The talk closes with pointed pushback from the audience, arguing that 'exit' is a historically libertarian frame, that poorer people cannot exit without losing protections and infrastructure, and that 'capacity building' or 'alternatives' would be better language. Lujan concedes the concern, distances himself from strict market-libertarianism, and reframes the disagreement as largely semantic, invoking Gaelic Ireland's stateless Brehon law, panarchy (Paul-Emile de Puydt, 1860), and Robert Ellickson's Order Without Law on ranchers settling disputes without the state. He also points to the founders' book, Farewell to Westphalia, by Jarrad Hope and Peter Ludlow.",
        links: [
          { label: "Farewell to Westphalia (Hope & Ludlow)", url: "https://logos.co/farewell-to-westphalia" },
          { label: "Paul-Emile de Puydt, Panarchy (1860)", url: "https://www.panarchy.org/depuydt/1860.eng.html" },
          { label: "Robert Ellickson, Order Without Law", url: "https://www.hup.harvard.edu/books/9780674641693" },
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
  {
    label: "Week 3 \xb7 7 - 11 Sep",
    theme: "Future Living in Community",
    slugs: ["w3-d1", "w3-d2", "w3-d3", "w3-d4", "w3-d5"],
  },
];

export const MORE = ["michel", "deca"];

// The one non-talk destination, mirroring learn-ai.london/valley: learn to build
// your own agentic system. On LAL this is the /valley-ai page; from this site we
// link to the live page on learn-ai.london.
export const AI_COURSE = {
  eyebrow: "New \xb7 Learn to build it",
  title: "Build your own agentic system",
  sub: "The full journey, from zero: the prompts, the maps, the lessons. Password in the group.",
  url: "https://learn-ai.london/valley-ai",
};

// Announced but not yet published (no companion pages). Rendered on the index as
// normal-looking cards that show "Coming soon" on click instead of navigating.
// Confirmed Week 4 running order (Deca, 2026-09). Monday is Deca's closing-of-week
// deck, live at learn-ai.london/valley-w4-d5. Tue/Wed/Thu titles are not yet
// confirmed by the speakers (TBC); Friday is the team's closing keynote.
export const COMING = [
  {
    label: "Week 4 · 14 - 18 Sep",
    theme: "Governance & Funding Models",
    talks: [
      { speaker: "Deca", talk: "Game Theory of Our Shared Purpose", url: "https://learn-ai.london/valley-w4-d1" },
      { speaker: "Sterlin Lujan · Logos", talk: "Logos Circles: Activism for Parallel Societies", url: "/keynote-w4-d2" },
      { speaker: "Daniela Gandorfer", talk: "Legal System in Transformation" },
      { speaker: "Simon", talk: "Talk title TBC" },
      { speaker: "Rashmi Abbigeri · Metagov", talk: "Talk title TBC, then VotC Team closing ceremony" },
    ],
  },
];
