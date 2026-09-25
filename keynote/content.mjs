// Browser ES module. The talk companions: beats and reading, no quiz content.
// The live multi-phone quiz was retired 2026-09-25 (see docs/archive/keynote-live-quiz.md);
// each talk's quiz/survey results now live only in data/keynote-results.json.
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
      metaTitle: "The Market, the State and the Commons \xb7 Deca",
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    beats: [
      { n: 1, title: "Twenty years before FarmLab", body: "Silvia opens with the path that led here: two decades in Barcelona at the frontier of digital fabrication, at IAAC and Fab Lab Barcelona, robotic construction, and directing the Fixing the Future festival. The turning question was simple: why not start applying these ideas in real life?", links: [{ label: "Silvia Brandi: optimism as activism (shemakes)", url: "https://shemakes.eu/blog/silvia-brandi" }] },
      { n: 2, title: "FarmLab: a lab on a farm", body: "FarmLab is a creative living lab in rural Styria, Austria, at the intersection of traditional craft, digital fabrication, and sustainable agriculture. It is four things at once: a fab lab (a node of the global Fab Lab Network), a semi-self-sufficient small farm with a heritage orchard and a flock of sheep, a rural creative hub open to local and international communities, and a living testbed for how we make, produce and live together.", links: [{ label: "FarmLab", url: "https://www.farmlab.at/" }, { label: "FarmLab in the Fab Lab directory", url: "https://www.fablabs.io/labs/farmlab" }] },
      { n: 3, title: "Revitalising rural life", body: "The mission: revitalise rural contexts as places of encounter, exchange and diversity, connect inherited knowledge with contemporary technologies and local resources, and explore circular, regenerative ways of producing and living. The labs span digital fabrication, ceramics, wool and textiles, woodworking, and a bio-corner of natural dyes and biomaterials. In 2026 FarmLab won first prize in the crafts category of the Styrian Vulkanland Innovation Award.", links: [{ label: "From a small farm to an open creative hub", url: "https://creativesunite.eu/article/from-small-farm-to-open-creative-hub-the-model-of-farmlab" }, { label: "The FarmLab labs", url: "https://www.farmlab.at/labs" }] },
      { n: 4, title: "The power of networks", body: "A small rural place, plugged into the world. FarmLab is a node between scales, an active member of the Fab Lab Network (over 3,000 labs worldwide, instigated by MIT, sharing one inventory and the Fab Academy), alongside Vulca (European makerspaces), the European Creative Hubs Network, and CRAB, the Creative Rural Hubs community. Her question runs both ways: how can a network become a place, and a place become a network?", links: [{ label: "The Fab Lab network (Fab Foundation)", url: "https://fabfoundation.org/about/" }, { label: "Vulca, European makerspaces", url: "https://vulca.eu/" }] },
      { n: 5, title: "Translating scales", body: "Networks let ideas, knowledge and experience travel and take new forms somewhere else. Silvia's MitMachRäume project brings the model home: a local network of makerspaces across a rural area of 30,000 people in southeast Styria, connected by a digital platform, so tools, knowledge and a wider international community come within reach of the neighbourhood.", links: [{ label: "FarmLab", url: "https://www.farmlab.at/" }] },
      { n: 6, title: "Building local agency", body: "Agency is the capacity to act: not only access to resources, but to the tools, knowledge, relationships and confidence needed to do something with them. It is the question that drives the whole project: how can a rural community today build the agency to make, learn and act, in a sustainable way?", links: [] },
      { n: 7, title: "A year of situated making", body: "The talk closes on 'one year at the FarmLab', where making follows the seasons: winter is slow making (baskets, wood, forge), spring brings the shearers and the wool cycle from spinning to felting, summer is colours and ceramics with natural dyes, raku and 3D-printed clay, and autumn readies for the cold. The principle underneath: knowledge can travel, materials remain situated, and shared knowledge increases the capacity of situated communities to act.", links: [{ label: "FarmLab", url: "https://www.farmlab.at/" }] },
    ],
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
    cta: { label: "Valley of the Commons", url: "/keynotes" },
  },

  "w4-d3": {
    slug: "w4-d3",
    meta: {
      eyebrow: "Startup cities, network states and prediction markets are not new: they are old political theories wearing new tech",
      speaker: "Daniela Gandorfer",
      socials: [
        { label: "Daniela Gandorfer on X", url: "https://x.com/FelizzyS" },
        { label: "Daniela Gandorfer on LinkedIn", url: "https://www.linkedin.com/in/danielagandorfer/" },
      ],
      livestream: "https://www.youtube.com/watch?v=7g_QQQelCaY",
      metaTitle: "Legal System in Transformation \xb7 Daniela Gandorfer",
      metaDescription:
        "Companion to Daniela Gandorfer's talk at Valley of the Commons: social contract theory behind today's governance debates, startup cities and law as a service, the Prospera v. Honduras case, network states and empire, market-based governance, and collective governance as a fourth path. In beats with sources.",
    },
    beats: [
      {
        n: 1,
        title: "Three exits from the state of nature",
        body: "Gandorfer opens with social contract theory, the Enlightenment debate about whether and why we need government, as the shared root under today's governance arguments about exit, community and sovereignty. In the 'state of nature' thought experiment, Hobbes saw a war of all against all, life 'solitary, poor, nasty, brutish, short', so people surrender all rights to one sovereign who stands above the law, a logic she hears in strongman politics today. Locke starts from a milder nature and grounds government in protecting pre-existing natural rights, above all property, before life, the individualist model behind US and European constitutions, with a right to overthrow a government that fails to protect life, liberty and property. Rousseau's nature is peaceful, but people leave it for the common good, trading individual will for a collective 'general will'. She stresses these are not semantic variants of one idea: they are three fundamentally different theories of freedom and government, and exit, network states and market-based governance each draw on a different one.",
        links: [
          { label: "State of nature (overview)", url: "https://en.wikipedia.org/wiki/State_of_nature" },
          { label: "Social contract (overview)", url: "https://en.wikipedia.org/wiki/Social_contract" },
        ],
      },
      {
        n: 2,
        title: "Sovereignty tied to land, until now",
        body: "Before centralized law, Europe had near-constant war between princes and landlords. The Peace of Westphalia (1648), which ended the Thirty Years' War, tied sovereignty to territory for the first time: rule and law bound to a fixed border, and crossing it meant war. Everything downstream, the nation state, international law, the public/private divide, rests on that link between power and land. Gandorfer's claim is that we are living through the biggest change to that order since 1648: digital tools finally let power and law detach from territory, and every actor, states, China, universities and 'tech bros', is scrambling to work out what replaces it. She cites Klaus Schwab's 2016 observation that power is shifting from states to non-state actors and from established institutions to loose networks, but warns against celebrating that reflexively: the biggest non-state actors are large companies, and a state's alternative to losing power is often deeper surveillance and authoritarian control.",
        links: [
          { label: "Peace of Westphalia (overview)", url: "https://en.wikipedia.org/wiki/Peace_of_Westphalia" },
          { label: "The Fourth Industrial Revolution (Schwab, 2016)", url: "https://en.wikipedia.org/wiki/Fourth_Industrial_Revolution" },
        ],
      },
      {
        n: 3,
        title: "A new governance frontier, and its cost",
        body: "She maps the vocabulary now filling the gap: futarchy and prediction markets, law as a service, startup cities, network states, parallel societies, competitive governance. She traces 'frontier' back to the US westward movement and its 'manifest destiny' mythology, and warns the word carries the same charge here: frontier dynamics dissolve existing social orders, property systems, jurisdictions and rights that real people depend on, even while they open real possibility. Her point is not to kill the excitement, she is building in this space herself, but to hold it for a moment: international law is already failing (the US asserting it stands above international law, with Greenland and Gaza as live examples), leaving a vacuum that private actors, not only idealistic communities, are moving fast to fill.",
        links: [
          { label: "Frontier Thesis (Turner, the concept she is reacting to)", url: "https://en.wikipedia.org/wiki/Frontier_Thesis" },
        ],
      },
      {
        n: 4,
        title: "Startup cities: privatizing law itself",
        body: "Startup cities (she references Prospera and others) are privately built jurisdictions that negotiate their own legal systems and courts, which she calls the biggest sovereignty innovation since the end of the Middle Ages, because sovereignty used to be something only states could hold. Since someone still has to fund the legal system, they run as businesses, offering law as a product you opt into, the way a company already chooses arbitration under Swiss or Dubai law. She traces the idea to David Friedman's 'law as a private good': rival private rights-enforcement agencies compete for customers and pre-negotiate shared arbitration courts, so law ends up sold like books or cars, exactly as Friedman argued in 1973 and still explains in talks today. Melanie Swan's 2015 blockchain work extends this into smart contracts, law as granular and personalized as a Starbucks order. Gandorfer flags the same gap in both: no one has a real answer for criminal law, 'we deal with that later', because letting a buyer's ability to pay decide a criminal verdict, or a death penalty, is where the market logic breaks down in the open.",
        links: [
          { label: "Law as a Private Good (David Friedman)", url: "http://www.daviddfriedman.com/Academic/Law_as_a_private_good/Law_as_a_private_good.html" },
          { label: "David Friedman on private rights-enforcement agencies (talk video)", url: "https://www.youtube.com/watch?v=-PnkC7CNvyI" },
          { label: "Blockchain: Blueprint for a New Economy (Swan, 2015)", url: "https://archive.org/details/blockchainbluepr0000swan" },
        ],
      },
      {
        n: 5,
        title: "When a company sues a country: Prospera v. Honduras",
        body: "Her case study of what 'law as a service' produces in practice. Honduras created ZEDE special jurisdictions and sold sovereign-like status to the company Prospera; a change in government later revoked that law, and Prospera responded by suing Honduras in international investment arbitration for roughly $10.7 to $10.8 billion, close to a third of the country's GDP by Gandorfer's estimate. Either outcome is grim for Honduras: settle and absorb a huge loss, or lose the case outright, since reversing the constitutional change is read as breaching the legal stability investors were promised. Her larger point: this is not a hypothetical about some future network state. A private company already has real legal standing to sue a state and its people, and the same tool is available to any company, hers included as an example, Palantir or a Chinese state company.",
        links: [
          { label: "Prospera v. Honduras: charter city to arbitration fight", url: "https://legalclarity.org/prospera-honduras-from-charter-city-to-arbitration-fight/" },
          { label: "Key takeaways from Honduras Prospera Inc. v. Honduras (Kluwer Arbitration Blog)", url: "https://legalblogs.wolterskluwer.com/arbitration-blog/a-local-remedies-pitfall-avoided-for-now-key-takeaways-from-honduras-prospera-inc-v-honduras/" },
        ],
      },
      {
        n: 6,
        title: "Network states: exit without competition, empire not state",
        body: "Balaji Srinivasan's 'network state', an aligned online community that crowdfunds scattered territory and eventually petitions existing states for recognition, grew out of the same investor circles as the startup-city movement but inverts its logic. Startup-city advocates believe rival legal providers make everyone better off through competition; Peter Thiel-aligned network-state builders hold, in Thiel's own words, that 'competition is for losers' and monopoly is the goal, competitive on the outside, hierarchical within, run essentially as a firm with a founder-CEO and no vote. Gandorfer cites Praxis founder Dryden Brown's language of empire, 'a state operates within rules, an empire writes them', as evidence of how far this stretches, and traces the same appetite for un-owned territory into the Trump administration's interest in Greenland and in real-estate plans she says she has seen floated for Gaza, both places where a 'new sovereign' first requires stripping an existing population of its claim to the land.",
        links: [
          { label: "The Network State (Balaji Srinivasan)", url: "https://thenetworkstate.com/" },
          { label: "The Network State and Topological Fetishism in Greenland (Data & Society, on Praxis)", url: "https://datasociety.net/points/the-network-state-and-topological-fetishism-in-greenland/" },
          { label: "Competition Is for Losers (Thiel, Wall Street Journal, 2014)", url: "https://www.csun.edu/~vcact00f/497CapStone/Peter%20Thiel_%20Competition%20Is%20for%20Losers%20-%20WSJ.pdf" },
        ],
      },
      {
        n: 7,
        title: "Markets as governance, and why they wobble",
        body: "The fourth model she surveys is market-as-decision: futarchy (Robin Hanson) and prediction markets used to set policy, 'vote on values, bet on beliefs'. Her example: put a phone-theft policy to a prediction market, let traders bet on the theft rate under each rule, and adopt whichever the market prices as producing less theft. In the Q&A, she and the room press the model's weak joints: who funds the market when there is no single company with a stake in the answer; a market that is not genuinely liquid can be gamed or gives a distorted signal; and a 'second-order' problem where people are incentivized to bet on the socially popular answer rather than their honest belief, since the payout depends on matching consensus. Her verdict: markets are real information tools, useful for finding facts people have no incentive to share, but treating price as truth, and therefore as the thing that governs, quietly hands the outcome to whoever can move the largest position.",
        links: [
          { label: "Shall We Vote on Values, But Bet on Beliefs? (Hanson)", url: "https://mason.gmu.edu/~rhanson/futarchy.pdf" },
          { label: "Futarchy (overview)", url: "https://en.wikipedia.org/wiki/Futarchy" },
        ],
      },
      {
        n: 8,
        title: "A fourth path, and building it with, not against",
        body: "Gandorfer's own preference is collective governance, where value is 'decided, not priced', but she is candid it is also the least developed of the four, decades of unresolved experiments (DAOs, decentralized physical infrastructure, ReFi) rather than working models, often undone by the same lack of a business model that funds the other three so easily. Her own project is one attempt at it: what began as a Princeton- and Harvard-backed non-profit push for a 'decentralized right to breathe' reframed a London pollution charge, imposed with too few air sensors to back it up, as data a community could hold and act on itself, and grew into a for-profit arm building mobile air-quality sensors and biometric wearables so residents, not a platform, keep a stake in their own pollution data. Her closing argument is not to fight the state, market or corporation head-on but to take what works from each, a firm's capacity to execute, a market's price signal, a state's protections, a community's legitimacy, and test it small, since every one of the other three models has centuries of history behind it and none of them, hers included, has fully worked yet.",
        links: [
          { label: "Logische Phantasie Lab: Decentralized Right to Breathe", url: "https://www.lo-ph.agency/dertb" },
          { label: "Legal System in Transformation (talk video)", url: "https://www.youtube.com/watch?v=7g_QQQelCaY" },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynotes" },
  },

  "w4-d4": {
    slug: "w4-d4",
    meta: {
      eyebrow: "How a Prague hacker space borrowed against crypto instead of selling it, and what it takes to do the same with a building",
      speaker: "Simon Kozak",
      socials: [
        { label: "Simon Kozak on LinkedIn", url: "https://www.linkedin.com/in/simon-kozak/" },
        { label: "Simon Kozak on X", url: "https://x.com/microHoffman" },
      ],
      livestream: "https://www.youtube.com/watch?v=MBWJUw9w48A",
      metaTitle: "Funding Community Needs \xb7 Simon Kozak",
      metaDescription:
        "Companion to Simon Kozak's talk at Valley of the Commons: why banks and communities are a poor fit, the Bordel hackerspace onchain mortgage in Prague, how a peer-to-pool crypto-collateral loan actually works, moving toward tokenized real estate as collateral, DAO treasuries, and the open question of undercollateralized, reputation-based lending. In beats with sources.",
    },
    beats: [
      {
        n: 1,
        title: "Why financing communities is a poor fit for banks",
        body: "Simon Kozak works on OWN (formerly called PWN), which builds onchain mortgages: peer-to-peer and peer-to-pool loans settled entirely in smart contracts. His starting problem: regenerative communities constantly need financing (land, a property, renovation, infrastructure) but each community needs different terms, and banks generally will not lend against crypto holdings or accept the repayment schedules communities actually need. The usual choices are a poor fit: take whatever a bank offers, or sell the asset you wanted to keep. Kozak frames OWN's work as sitting at the crossroads of cypherpunk and solarpunk: using trustless, crypto-native infrastructure in service of physical, community-owned space.",
        links: [
          { label: "OWN: onchain mortgages", url: "https://own.casa/" },
        ],
      },
      {
        n: 2,
        title: "The Bordel case: a hacker space needs a new home",
        body: "The concrete case is Bordel, a Prague hacker and makerspace for hackers, makers and artists that grew out of the city's Parallel Polis crypto scene and needed to buy a new building. Because Bordel's community is deeply crypto-native, going to a bank was not realistic, and members did not want to sell their crypto to fund the purchase, only to use it. An onchain mortgage let them borrow against ETH-based collateral instead, while also turning the loan into what Kozak calls an alternative to a donation: supporters lend at a below-market rate (as low as 5%) because they want the project to exist.",
        links: [
          { label: "Bordel Hackerspace", url: "https://bordel.wtf/" },
          { label: "Fund a Hackerspace: the Bordel onchain mortgage", url: "https://loan.bordel.wtf/" },
        ],
      },
      {
        n: 3,
        title: "How the onchain mortgage actually works",
        body: "The borrower proposes terms (collateral asset, loan-to-value, interest, repayment schedule, credit asset); lenders then pool stablecoins into a lending vault (an ERC-4626 vault, the standard for tokenized share-of-a-pool contracts) until the target is reached. Once funded, the credit asset (typically USDC) goes to the borrower and the collateral is locked in a smart-contract escrow. For Bordel: weETH (ether.fi's liquid-restaked ETH) as collateral, 75% loan-to-value, a 5-year term, roughly $3,000 monthly installments and a 5% minimum fixed rate. There is no price-based liquidation, only time-based: if repayments are missed, lenders reclaim collateral proportional to what they funded. In the live Q&A, Jeff Emmett pressed on the risk of collateralising a volatile asset (ETH) against a slow, non-volatile one (real estate) over a long duration, a mismatch Kozak agreed is one of the model's open risks.",
        links: [
          { label: "ERC-4626: Tokenized Vault Standard", url: "https://eips.ethereum.org/EIPS/eip-4626" },
          { label: "ether.fi: what is weETH", url: "https://help.ether.fi/en/articles/595737-weeth" },
        ],
      },
      {
        n: 4,
        title: "Who ends up owning Bordel",
        body: "Bordel is structured as a joint-stock company; whoever supplies collateral (not whoever lends the stablecoins, who is simply repaid their loan) receives proportional shares in that company, contributed through a shared multisig wallet that acts as the borrower. Repayments come from ordinary operations (membership fees, space revenue), and members who help repay can receive newly issued shares in return. Kozak is explicit that the mortgage is a means, not the end: the actual goal is a rent-free, mortgage-free hacker space where all revenue goes back into the space rather than debt service.",
        links: [
          { label: "Fund a Hackerspace: loan terms and rewards", url: "https://loan.bordel.wtf/" },
        ],
      },
      {
        n: 5,
        title: "From crypto collateral to tokenized real estate",
        body: "Bordel's ETH-as-collateral structure is, in Kozak's words, a workaround: no legal work was needed because nothing about the mortgage touches the property directly. The harder, more interesting frontier is using the real estate itself as collateral. One approach he describes: an SPV (a special-purpose company) holds the property, issues shares, those shares are tokenized, and the tokenized shares (not the property title) serve as collateral. This is highly jurisdiction-dependent: he cites Switzerland and the Czech Republic as places where the legal link between tokenized shares and company shares is workable today, and flags that the same structure will not work in every country.",
        links: [
          { label: "Switzerland's DLT Act: ledger-based securities", url: "https://pestalozzilaw.com/en/insights/news/legal-insights/ledger-based-securities-introduction-dlt-shares-switzerland/" },
          { label: "CMTA standard for tokenizing shares of Swiss corporations", url: "https://cmta.ch/standards/standard-for-the-tokenization-of-shares-of-swiss-corporations-using-the-distributed-ledger-technology" },
        ],
      },
      {
        n: 6,
        title: "DAO treasuries and community tokens as collateral",
        body: "Kozak also describes a purely digital use case: a DAO holding stablecoins in its treasury can structure a loan against that treasury to generate stable income while giving its token holders liquidity, rather than letting the treasury sit idle. He names Gnosis as a DAO OWN is in discussion with for this. In the Q&A, the conversation extends this to Traditional Dream Factory's TDF token (each token a right to one night per year at the Alentejo village, in perpetuity): TDF could in principle tokenize the property into TDF-like tokens and use those as collateral for further building, though he notes the token's illiquidity (not yet openly tradable) remains the key obstacle to using it as reliable collateral.",
        links: [
          { label: "GnosisDAO", url: "https://docs.gnosis.io/docs/What-is-GnosisDAO" },
          { label: "Traditional Dream Factory: the $TDF token", url: "https://www.traditionaldreamfactory.com/token" },
        ],
      },
      {
        n: 7,
        title: "The open frontier: undercollateralized, reputation-based lending",
        body: "Kozak closes his prepared remarks by naming what he sees as the most interesting unsolved case: undercollateralized lending, where a community with real reputation and personal trust between members (say, 60k in collateral against a 100k need) could borrow without full collateral the way most DeFi protocols require. He frames this as replacing missing loan-to-value with reputation and relationships, an idea with real-world precedent (undercollateralized DeFi credit protocols already exist for institutional borrowers) but, in his words, still very experimental for communities.",
        links: [
          { label: "Maple Finance: onchain credit without full collateral", url: "https://maple.finance/" },
        ],
      },
      {
        n: 8,
        title: "Q&A: paying lenders in something other than money",
        body: "The Q&A's most generative thread is about non-financial incentives for lenders who are already ideologically aligned but still need a nudge: Bordel offered perks (memberships, private events) instead of high APR; another attendee described a project that repaid lenders in a redeemable local currency (interest paid in vouchers usable onsite) rather than cash, so a below-market cash rate becomes an attractive real rate once you count what you would have paid for the same stay or service anyway. Kozak connects this directly back to TDF's model of selling a token for a fixed number of nights per year, at a price that gives the lender a good effective rate while costing the community only its marginal cost of hosting.",
        links: [
          { label: "Traditional Dream Factory: the $TDF token", url: "https://www.traditionaldreamfactory.com/token" },
          { label: "Simon Kozak, \"Funding Community Needs\" (talk video)", url: "https://www.youtube.com/watch?v=MBWJUw9w48A" },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynotes" },
  },

  "w4-d5": {
    slug: "w4-d5",
    meta: {
      eyebrow: "Token voting has failed as decentralized governance, and DAOs must build legitimacy before they vote on anything",
      speaker: "Rashmi Abbigeri",
      socials: [
        { label: "Rashmi Abbigeri on X", url: "https://x.com/rashmivabbigeri" },
        { label: "RWX Labs (her research/build studio)", url: "https://www.rwxlabs.com/" },
      ],
      livestream: "https://www.youtube.com/watch?v=EnSJZ_2VuVs",
      metaTitle: "State of Governance and Funding Models \xb7 Rashmi Abbigeri",
      metaDescription:
        "Companion to Rashmi Abbigeri's talk at Valley of the Commons: Metagov's research on DAO governance, from Lessig's four modalities and ownership rights through token-voting's failure modes, conviction voting and bicameral houses, DAO constitutions and the 'Farewell to DAOs' thesis, to the ENS DAO retrospective and how DAOs fund themselves. In beats with sources.",
    },
    beats: [
      {
        n: 1,
        title: "Metagov, DAOstar, and governing many worlds",
        body: "Rashmi Abbigeri is a research engineer at Metagov, an interdisciplinary nonprofit research collective (founded 2019) that builds standards and infrastructure for digital self-governance. Her main project is DAOstar, the DAO standards body, where she co-authored EIP-4824 (daoURI), a standard JSON schema for publishing a DAO's membership and governance metadata on chain, now adopted by DAOs including the Optimism Collective, Arbitrum Foundation and ENS DAO. She frames the talk through Metagov founder Joshua Tan and Michael Zargham's course 'Governing Many Worlds': the prehistory of the DAO concept, and Lawrence Lessig's four modalities of regulation from Code and Other Laws of Cyberspace, law, norms, markets and code/architecture, and the premise behind 'code is law': that a platform's terms of service can constrain behaviour at societal scale the way law does.",
        links: [
          { label: "ERC-4824: Common Interfaces for DAOs", url: "https://eips.ethereum.org/EIPS/eip-4824" },
          { label: "DAOstar (Metagov)", url: "https://metagov.org/projects/daostar" },
          { label: "Lessig, Code and Other Laws of Cyberspace", url: "https://en.wikipedia.org/wiki/Code_and_Other_Laws_of_Cyberspace" },
        ],
      },
      {
        n: 2,
        title: "Ownership rights, soulbound identity, and pricing the commons",
        body: "She works through the ownership questions a DAO has to answer for any shared resource: the right to use it, the right to alter or destroy it, and the right to profit or claim yield from it, and how unclear it often is who holds each right, or how anyone verifies it. She covers 'Decentralized Society' (DeSoc), the 2022 proposal for non-transferable 'soulbound' tokens encoding reputation and affiliation, framed as a reaction against web3's hyper-financialization, where governance rights are simply purchased tokens. She also raises Harberger taxes (self-assessed property value plus a right for anyone to force a sale at that price) as a way to price scarce commons resources, but is skeptical it suits a single room or amenity rather than an ecosystem-level commons.",
        links: [
          { label: "Weyl, Ohlhaver, Buterin: Decentralized Society (2022)", url: "https://www.radicalxchange.org/updates/papers/desoc.pdf" },
          { label: "Harberger Tax", url: "https://en.wikipedia.org/wiki/Harberger_Tax" },
        ],
      },
      {
        n: 3,
        title: "The governance spectrum: financialized, reputation, market",
        body: "Abbigeri lays out a spectrum of DAO governance models. At one end, financialized, token-weighted governance (Compound, Uniswap), where voting power is purchased along with the token, and implementing it in a smart contract is simple. In the middle, reputation-based governance, exemplified by Optimism's non-transferable badgeholders, where a participant's history in the ecosystem, not just token holdings, earns them a role such as core contributor or delegate. At the other end, market and algorithmic mechanisms, citing DAOstack's Holographic Consensus, where members stake GEN tokens predicting which proposals will pass; predicted winners get 'boosted' to a lower quorum, letting a DAO process many proposals without every token holder reviewing each one.",
        links: [
          { label: "DAOstack: Holographic Consensus", url: "https://gitcoin.co/mechanisms/holographic-consensus" },
        ],
      },
      {
        n: 4,
        title: "Web2 'monarchies' and the limits of platform democracy",
        body: "She compares how users relate to Apple, Meta or Netflix to living under a monarchy: terms of service nobody reads or can alter, arbitrary rule changes to ranking or moderation, and a 'holdup problem' where switching costs (family on WhatsApp, web3 on Telegram) trap people even once they dislike the service. She connects this to Balaji Srinivasan's 'network state' framing of community as a subscription people can supposedly just exit, arguing real exit gets harder the more integrated someone becomes. Her cautionary case is Facebook's February 2009 referendum on its terms of service: only about 0.3% of users (600,000 of roughly 175 million) voted, illustrating the 'unpaid labor' and cognitive load of platform voting; she notes web3 DAO turnout runs only somewhat better, at roughly 1 to 10%.",
        links: [
          { label: "Facebook: opening governance of service and policy to users (2009)", url: "https://about.fb.com/news/2009/02/facebook-opens-governance-of-service-and-policy-process-to-users/" },
          { label: "Balaji Srinivasan, The Network State", url: "https://thenetworkstate.com/" },
        ],
      },
      {
        n: 5,
        title: "Why token voting fails: concentration, attacks, legal wrappers",
        body: "Metagov's retrospective research (detailed later on ENS) found that power concentration is set at a DAO's token launch and barely shifts afterward, even as delegation is encouraged; delegates become 'politicians' representing a protocol without agreeing on implementation. She invokes, without naming it, the Condorcet Jury Theorem: crowds only make better decisions than individuals if each voter is right more than half the time, a condition plutocratic, low-turnout DAO voting rarely meets. She covers governance attacks (passing a proposal to drain a treasury one controls) and vote-buying, and traces DAOs' early preference for Delaware or Wyoming legal wrappers, Wyoming passed the first US DAO LLC law in 2021, to avoiding personal liability during crypto's regulatory uncertainty, rather than any governance ideal.",
        links: [
          { label: "Condorcet's jury theorem", url: "https://en.wikipedia.org/wiki/Condorcet%27s_jury_theorem" },
          { label: "Wyoming DAO LLC law explained", url: "https://www.legalnodes.com/article/wyoming-dao-llc" },
        ],
      },
      {
        n: 6,
        title: "Beyond one-token-one-vote: conviction, quadratic, bicameral",
        body: "She surveys mechanisms built to fix simple token voting. Conviction voting, live-explained in the room by Jeff Emmett, arose from early Aragon DAO votes where a large holder ('whale') would swing the outcome in the final minutes; conviction instead accrues to a choice over time and decays slowly if you change your mind, turning a single snapshot vote into a continuous signal (built by Aragon, 1Hive, BlockScience and Commons Stack). Quadratic voting, from Weyl and Buterin's work, prices extra votes at the square of their number so voters reveal how strongly, not just which way, they feel. And bicameral structures such as Optimism's Token House (token-weighted) paired with its Citizens' House (one-person-one-vote via non-transferable badges, allocating retroactive public-goods funding) split which decisions each body should make.",
        links: [
          { label: "A Brief History of Conviction Voting", url: "https://blog.block.science/a-brief-history-of-conviction-voting/" },
          { label: "Vitalik Buterin, Quadratic Payments: A Primer", url: "https://vitalik.eth.limo/general/2019/12/07/quadratic.html" },
          { label: "Optimism: Introducing the Citizens' House", url: "https://optimism.io/blog/introducing-the-citizens-house-10m-op-to-public-goods" },
        ],
      },
      {
        n: 7,
        title: "Constitutions, gov/acc, and 'Farewell to DAOs'",
        body: "Metagov's constitutions research, tracing a lineage back to Usenet's early declared norms, analyzed dozens of DAO constitutions for their goals, values, rights and enforcement (a mix of forum discussion, off-chain 'temperature check' snapshot votes, on-chain execution and smart contracts), publishing a template for 'computational constitutionalism'. Its gov/acc (Governance Acceleration) initiative, led by a Metagov research director, ran 52-plus structured interviews (via the open-source AI facilitation tool Harmonica) mapping 11 governance problems, 41 proposed solutions and 59 actors; 'token voting failure' was the top-cited problem. This research feeds Govbase, Metagov's open database of governance projects, and the 'Farewell to DAOs' thesis aired at Stanford's July 2026 SBC DAO Workshop: first-generation, token-holder-governed DAOs failed to deliver reliability and legitimacy, and any second generation must build legitimacy infrastructure, and legible, possibly AI-assisted coordination, before it optimizes voting mechanics.",
        links: [
          { label: "Constitutions of Web3 (Metagov)", url: "https://constitutions.metagov.org/article" },
          { label: "gov/acc: governance acceleration (Metagov)", url: "https://gov-acc.metagov.org/" },
          { label: "Govbase: open governance database", url: "https://govbase.metagov.org/" },
          { label: "SBC DAO Workshop 2026, “Farewell to DAOs”", url: "https://luma.com/28l6e18l" },
        ],
      },
      {
        n: 8,
        title: "DAOs of the world, the ENS retrospective, and funding models",
        body: "Metagov's 'State of DAOs' series compares DAOs by country: Japan treats DAOs as an upgrade to existing institutions, with a DAO law recognizing NFT holders as members; Korea's most active DAO is an off-chain K-pop fan club; Taiwan's DAOs resemble civic-tech nonprofits. Metagov's ENS DAO retrospective (built on public forum, snapshot and on-chain data) found power concentration frozen since token launch, low turnout driven by cognitive and time cost, and delegates clustering into nine informal voting blocs. She also runs through DAO mergers gone wrong (Gnosis's contested xDai token-swap merger, and Fei Protocol and Rari Capital's Tribe DAO, which unwound after an $80M hack and a reversed reimbursement vote) and how DAOs fund themselves, token launches, VC, investment DAOs like MetaCartel, grants, NFTs, versus how they fund others, via Gitcoin's direct grants, quadratic funding and retroactive public-goods funding mechanisms.",
        links: [
          { label: "DAOstar: announcing the State of DAOs in Asia series", url: "https://daostar.substack.com/p/announcing-the-state-of-daos-in-asia" },
          { label: "ENS DAO: Final ENS Retro Report", url: "https://discuss.ens.domains/t/final-ens-retro-report/22096" },
          { label: "xDai's contested Gnosis merger (CoinDesk)", url: "https://www.coindesk.com/tech/2021/11/12/xdai-wants-a-gnosis-merger-to-stay-relevant-but-some-tokenholders-are-crying-foul" },
          { label: "Gitcoin funding mechanisms", url: "https://gitcoin.co/mechanisms" },
          { label: "State of Governance and Funding Models (talk video)", url: "https://www.youtube.com/watch?v=EnSJZ_2VuVs" },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynotes" },
  },

  "sterlin-parallel-mind": {
    slug: "sterlin-parallel-mind",
    meta: {
      eyebrow: "Why building parallel societies is how a species can purposely architect a planetary mind",
      speaker: "Sterlin Lujan",
      socials: [
        { label: "Sterlin Lujan on X", url: "https://x.com/sterlinlujan" },
        { label: "Logos Network", url: "https://logos.co" },
      ],
      livestream: "https://www.youtube.com/watch?v=iDuYa1QnaK0",
      metaTitle: "The Parallel Mind \xb7 Sterlin Lujan",
      metaDescription:
        "Companion to Sterlin Lujan's talk at Valley of the Commons: the poly-crisis as a Molochian trap, Teilhard de Chardin's noosphere and Omega Point, Michael Levin's bioelectric evidence for collective intelligence in cells, and parallel communities as a deliberate blueprint for a planetary mind. In beats with sources.",
    },
    beats: [
      {
        n: 1,
        title: "Not on behalf of an institution",
        body: "Lujan opens by framing what the talk is not: most speakers who come to Valley of the Commons speak for an institution or a particular incentive. He wants instead to address one question that has bothered him for years: everything being built here, call it the parallel society space, the network state space, the eco-village space, what does it actually mean? What are we doing as a species?",
        links: [],
      },
      {
        n: 2,
        title: "Acapulco, 2018: two futurists, one attractor",
        body: "He traces the talk's origin to a 2018 experience at the Anarchapulco conference: on MDA, watching sand on a beach undulate into fractal patterns, then machines, then mandalas that felt like a language. Trying to make sense of it, he connected it to two thinkers he had studied for years: Terence McKenna's notion of a 'transcendental object at the end of time' pulling history forward, and Ray Kurzweil's The Singularity Is Near, where accelerating technology culminates in an 'age of spiritual machines' (asked in an interview if he believes God exists, Kurzweil answered 'not yet'). Despite coming from opposite worlds, psychedelic storyteller and technologist, Lujan reads both as describing the same pull toward a culmination point, which he names 'the parallel mind': the idea that humanity already has a blueprint to deliberately engineer a 'salvation device' rather than wait for one.",
        links: [
          { label: "Terence McKenna, The Transcendental Object at the End of Time", url: "https://archive.org/details/terence-mckenna-the-transcendental-object-at-the-end-of-time-2014" },
          { label: "Ray Kurzweil, The Singularity Is Near", url: "https://www.singularity.com/aboutthebook.html" },
        ],
      },
      {
        n: 3,
        title: "The poly-crisis as hyperobject, the planet as wounded",
        body: "Lujan describes humanity as being in an emergency scenario, beset by what many thinkers call the poly-crisis or meta-crisis: not a list of separate problems but a multivariate situation with cascade dynamics between crises that no individual can fully grasp. He borrows eco-philosopher Timothy Morton's term for this, a 'hyperobject', something so vast in time and space it defeats ordinary understanding. He pairs this with what he calls the 'wounded planet thesis': the planet as a living organism (the Lovelockian Gaia hypothesis), where humanity's own traumas, disenchantment and institutional failures have become feedback loops that damage the biosphere directly.",
        links: [
          { label: "Timothy Morton, Hyperobjects", url: "https://www.upress.umn.edu/9780816689231/hyperobjects/" },
          { label: "Gaia hypothesis", url: "https://en.wikipedia.org/wiki/Gaia_hypothesis" },
        ],
      },
      {
        n: 4,
        title: "The Molochian trap",
        body: "The mechanism behind the poly-crisis, in Lujan's telling, is what Daniel Schmachtenberger calls a Molochian dynamic (a term Schmachtenberger traces to Scott Alexander's essay 'Meditations on Moloch'): Moloch, the Canaanite deity to whom tribes sacrificed their children to win the war or guarantee good weather, stands for any competitive system that forces short-term sacrifices that hollow out the whole in the long run. Institutions racing to maximise profit or accelerate technology, Lujan argues, are running this same engine of self-destruction. He is explicit that this is not a case against building fast per se but against accelerationism without circumspection, and frames exit and parallel-society building as the alternative to being ground through the sacrifice.",
        links: [
          { label: "Scott Alexander, Meditations on Moloch", url: "https://slatestarcodex.com/2014/07/30/meditations-on-moloch/" },
          { label: "The Consilience Project (Daniel Schmachtenberger)", url: "https://consilienceproject.org/about-the-project/" },
          { label: "Moloch", url: "https://en.wikipedia.org/wiki/Moloch" },
        ],
      },
      {
        n: 5,
        title: "Teilhard de Chardin: noosphere, Omega point, and a choice instead of an automatism",
        body: "Lujan's central intellectual anchor is Pierre Teilhard de Chardin, a Jesuit priest and paleontologist whose posthumously published The Phenomenon of Man (written 1938 to 1940) describes matter evolving toward higher complexity and consciousness, converging on a 'noosphere', a planet-enveloping layer of collective mind, and ultimately an 'Omega point' where the universe 'harmonizes around love'. Where Chardin, McKenna and Kurzweil all treat this convergence as effectively automatic, built into the nature of the universe, Lujan explicitly departs from them: he argues it is not automatic, but an engineering blueprint, an architecture a species has to choose and build, using consciousness's gift for spotting and shaping emergent properties (McKenna's 'strange attractor': mostly hidden, like an iceberg, but visible enough at the edges to be worked with).",
        links: [
          { label: "The Phenomenon of Man", url: "https://en.wikipedia.org/wiki/The_Phenomenon_of_Man" },
        ],
      },
      {
        n: 6,
        title: "Michael Levin: cells already run on collective intelligence",
        body: "To ground the abstraction, Lujan turns to Michael Levin's bioelectricity research at Tufts University. Levin's lab has shown that injecting cells with bioelectric-signaling compounds (which Lujan calls 'morphoceuticals') can instruct a Xenopus tadpole to grow a functioning eye on its tail instead of its head, and can rearrange frog faces, because the electrical pattern among cells is itself a kind of communication channel that specifies anatomy. Lujan cites Levin's language of a 'platonic space' of patterns that organisms tap into, and a case where turning on a tumor-causing oncogene depolarizes a cell from the collective, but restoring its bioelectric connection to neighboring cells suppresses the tumor even though the oncogene is still present. His takeaway, which he says struck him the day of the talk: cancer is a coordination problem, a cell that has gone rogue from the collective and treats the rest of the body as an open environment to exploit.",
        links: [
          { label: "Blackiston & Levin, Ectopic eyes outside the head in Xenopus tadpoles (2013)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3587383/" },
          { label: "Chernet & Levin, Transmembrane voltage potential controls oncogene-mediated tumorigenesis (2014)", url: "https://ncbi.nlm.nih.gov/pmc/articles/PMC4102810/" },
          { label: "Michael Levin, a Platonic Space background for questions in consciousness", url: "https://mlevin77.substack.com/p/a-platonic-space-background-for-questions" },
        ],
      },
      {
        n: 7,
        title: "The parallel-mind blueprint: communities as subroutines",
        body: "Lujan's proposed architecture borrows from massively parallel computing: distributed subsystems that each focus on one problem still produce system-wide fault tolerance and emergent, superlinear gains, the same way the brain is decentralized rather than centrally controlled. He argues that purposely built parallel communities, each an accurately-communicating node, are the necessary and sufficient conditions for a new kind of planetary mind, because legacy institutions optimize for their own local conditions at the expense of collective flourishing and cannot solve problems (like oceanic microplastics) that outrun '19th-century governance technology'. His example is Prospera, the Honduras charter city he says is focused specifically on longevity tech, regenerative medicine and biotech; in his framing, other communities focusing on other problems and talking to each other constitute the coordination layer, comparable in the Q&A to Reticulum, a self-routing mesh network with no central address tree, as a concrete technical analogue for how nodes could coordinate without centralization. Lujan's own main companion, on Logos Circles, sketches the on-the-ground, single-issue version of exactly this kind of node.",
        links: [
          { label: "Prospera", url: "https://prospera.hn/" },
          { label: "Reticulum Network Stack", url: "https://reticulum.network/manual/whatis.html" },
          { label: "Logos Circles: Activism for Parallel Societies (Lujan's main companion)", url: "/keynote-w4-d2" },
        ],
      },
      {
        n: 8,
        title: "Not power, but love: process philosophy and the closing note",
        body: "Lujan closes by naming the philosophical tradition behind his claim that this convergence must be chosen rather than automatic: process philosophy, associated above all with Alfred North Whitehead (who also co-authored Principia Mathematica with Bertrand Russell), and, he notes, contested by thinkers like Alexander Bard, whose Process and Event (2023) argues the 'Event called God' is something humans create out of need. Lujan's own formulation: 'the problem of nature is not one that can be solved by power, it can only be solved by love,' which is why he thinks politics and left-right conflict are beside the point when communities can instead build enclaves around shared values. In the Q&A an audience member linked his 2018 experience to Bill Plotkin's concept of 'ecological awakening' (the shift from egocentric to ecocentric), and another quoted Charles Eisenstein's line that 'the more beautiful world our hearts know is possible is inevitable' while still requiring everything we can do to bring it about, both of which Lujan took as reinforcing his own case for treating this as deliberate, chosen work rather than a foregone conclusion.",
        links: [
          { label: "Alfred North Whitehead, Process and Reality", url: "https://en.wikipedia.org/wiki/Process_and_Reality" },
          { label: "Alexander Bard & Jan Soderqvist, Process and Event", url: "https://syntheism.com/" },
          { label: "Bill Plotkin, on eco-awakening", url: "https://www.animas.org/the-realm-of-purpose-least-realized/" },
          { label: "Charles Eisenstein, The More Beautiful World Our Hearts Know Is Possible", url: "https://charleseisenstein.org/books/the-more-beautiful-world-our-hearts-know-is-possible/" },
          { label: "The Parallel Mind (talk video)", url: "https://www.youtube.com/watch?v=iDuYa1QnaK0" },
        ],
      },
    ],
    cta: { label: "Valley of the Commons", url: "/keynotes" },
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
  {
    label: "Week 4 \xb7 14 - 18 Sep",
    theme: "Governance & Funding Models",
    // The first entry is Deca's closing-of-week deck, a self-contained reveal.js
    // page at /keynote-w4-d1 with no companion room, so it is a link object
    // (speaker, talk, url) rather than a room slug; it renders first via
    // soonCardHtml, ahead of the room slugs.
    slugs: [
      { speaker: "Deca", talk: "Game Theory of Our Shared Purpose", url: "/keynote-w4-d1" },
      "w4-d2",
      "w4-d3",
      "w4-d4",
      "w4-d5",
    ],
  },
];

export const MORE = ["michel", "deca", "sterlin-parallel-mind"];

// The one non-talk destination, mirroring learn-ai.london/valley: learn to build
// your own agentic system. On LAL this is the /valley-ai page; from this site we
// link to the live page on learn-ai.london.
export const AI_COURSE = {
  eyebrow: "New \xb7 Learn to build it",
  title: "Build your own agentic system",
  sub: "The full journey, from zero: the prompts, the maps, the lessons. Password in the group.",
  // WARNING: this is the LAL page; the CTA is currently NOT rendered (see
  // keynote.js renderIndex). Before re-enabling aiCourseHtml(), repoint this to
  // the VOTC /valley-ai mirror, or it reintroduces a live learn-ai.london link.
  url: "https://learn-ai.london/valley-ai",
};

// Category tags for the 3D Constellation view (keynote-graph.mjs). Each talk
// carries three tags, one per axis couple: solar/lunar (X), global/local (Y),
// vision/impl (Z). href is the same-site companion (/keynote-<slug>), an
// external Learn AI London page, or null when no companion exists yet. Talks
// without a companion still appear as nodes (label, no link). Mirrors
// learn-ai.london /valley (src/lib/valley/schedule.ts).
export const AXES = {
  x: { pos: { id: "solar", label: "Solarpunk", emoji: "\u{1F31E}" }, neg: { id: "lunar", label: "Lunarpunk", emoji: "\u{1F319}" } },
  y: { pos: { id: "global", label: "Global", emoji: "\u{1F30D}" }, neg: { id: "local", label: "Local", emoji: "\u{1F3E1}" } },
  z: { pos: { id: "vision", label: "Vision", emoji: "\u{1F52D}" }, neg: { id: "impl", label: "Implementation", emoji: "\u{1F527}" } },
};

export const CATEGORIES = [
  { id: "w1-d1", speaker: "Felix Fritsch", talk: "Opening Day", href: "/keynote-w1-d1", spine: "#ff6b35", tags: ["solar", "local", "vision"] },
  { id: "w1-d2", speaker: "Michel Bauwens", talk: "The Return of the Commons", href: "/keynote-w1-d2", spine: "#b14fff", tags: ["solar", "global", "vision"] },
  { id: "w1-d3", speaker: "Adam Arvidsson", talk: "Industrious Modernity", href: "/keynote-w1-d3", spine: "#c9b3ff", tags: ["solar", "global", "vision"] },
  { id: "w1-d4", speaker: "Amber Case", talk: "Calm Technology", href: "/keynote-w1-d4", spine: "#34d399", tags: ["lunar", "global", "vision"] },
  { id: "w1-d5", speaker: "Jeff Emmett", talk: "From P2P to P4P", href: "/keynote-w1-d5", spine: "#d97757", tags: ["lunar", "global", "impl"] },
  { id: "w2-d1", speaker: "Roberto Valenti", talk: "Liminal Village", href: "/keynote-w2-d1", spine: "#ff6b35", tags: ["solar", "local", "impl"] },
  { id: "w2-d2", speaker: "Kilian Jörg", talk: "Reclaiming the Commons", href: "/keynote-w2-d2", spine: "#b14fff", tags: ["solar", "global", "vision"] },
  { id: "w2-d3", speaker: "Lorenzo Patuzzo", talk: "Monasteries of the 21st Century", href: "/keynote-w2-d3", spine: "#c9b3ff", tags: ["solar", "local", "impl"] },
  { id: "w2-d4", speaker: "Stefan Schütz", talk: "Local Production & Money", href: "/keynote-w2-d4", spine: "#34d399", tags: ["solar", "local", "impl"] },
  { id: "w2-d5", speaker: "Silvia Brandi", talk: "International FabLab Network", href: "/keynote-w2-d5", spine: "#d97757", tags: ["solar", "global", "impl"] },
  { id: "w3-d1", speaker: "Una Wang", talk: "As Above, So Below", href: "/keynote-w3-d1", spine: "#ff6b35", tags: ["solar", "local", "impl"] },
  { id: "w3-d2", speaker: "Matthias Fersterer", talk: "Klein Jasedow", href: "/keynote-w3-d2", spine: "#b14fff", tags: ["solar", "local", "impl"] },
  { id: "w3-d3", speaker: "Luna and Sam Delesque", talk: "Building Traditional Dream Factory", href: "/keynote-w3-d3", spine: "#c9b3ff", tags: ["solar", "local", "impl"] },
  { id: "w3-d4", speaker: "Clara Gromaches", talk: "Housing as a Commons", href: "/keynote-w3-d4", spine: "#34d399", tags: ["solar", "global", "vision"] },
  { id: "w3-d5", speaker: "Charlie Fischer", talk: "Knowing at the Boundaries", href: "/keynote-w3-d5", spine: "#d97757", tags: ["solar", "local", "impl"] },
  { id: "w4-d1", speaker: "Deca", talk: "Game Theory of Our Shared Purpose", href: "/keynote-w4-d1", spine: "#ff6b35", tags: ["solar", "global", "vision"] },
  { id: "w4-d2", speaker: "Sterlin Lujan · Logos", talk: "Logos Circles", href: "/keynote-w4-d2", spine: "#b14fff", tags: ["lunar", "global", "vision"] },
  { id: "w4-d3", speaker: "Daniela Gandorfer", talk: "Legal System in Transformation", href: "/keynote-w4-d3", spine: "#c9b3ff", tags: ["lunar", "global", "vision"] },
  { id: "w4-d4", speaker: "Simon Kozak", talk: "Funding Community Needs", href: "/keynote-w4-d4", spine: "#34d399", tags: ["lunar", "local", "impl"] },
  { id: "w4-d5", speaker: "Rashmi Abbigeri · Metagov", talk: "The State of Governance & Funding Models", href: "/keynote-w4-d5", spine: "#d97757", tags: ["solar", "global", "impl"] },
  { id: "sterlin-parallel-mind", speaker: "Sterlin Lujan", talk: "The Parallel Mind", href: "/keynote-sterlin-parallel-mind", spine: "#b14fff", tags: ["solar", "global", "vision"] },
  { id: "michel", speaker: "Michel Bauwens", talk: "Cosmo-Localism", href: "/keynote-michel", spine: "#b14fff", tags: ["solar", "global", "vision"] },
  { id: "deca", speaker: "Deca", talk: "The Market, the State and the Commons", href: "/keynote-deca", spine: "#c9b3ff", tags: ["lunar", "global", "vision"] },
];
