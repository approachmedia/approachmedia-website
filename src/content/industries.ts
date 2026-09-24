/**
 * The Industries hub and its sixteen pages.
 *
 * Copy is the owner's draft (industry-pages-data.json, 24 Sep 2026), used
 * verbatim. Nothing here is written by the site.
 *
 * `sources` is the one thing added, and it is what the brief's README asks
 * for under "Reconcile duplicate category labels before assigning projects".
 * A page has no project list of its own: it draws real published projects
 * from the industry records that already exist, so every card carries a real
 * client, exhibition, city, year and photograph, and nothing can drift out of
 * step with the portfolio. The names below are the site's own canonical
 * industry list; ones absent from the database are simply skipped.
 *
 * The draft also named two or three example projects per page ("Shafalya —
 * GIHED Property Show", "Meril — MedTech Expo"). Those are NOT used. The
 * README requires each card to be checked against its project record before
 * publishing, and that check cannot be done from here, so the pages show what
 * the database actually holds for the sector instead of a hand-typed list
 * that could point at a project that has moved, been renamed or never had a
 * page. The suggestions are kept in the brief for the editor.
 */

export type IndustryPage = {
  name: string
  slug: string
  title: string
  meta: string
  headline: string
  tagline: string
  intro: string
  h2: string
  body: string
  features: string[]
  gallery: string
  event: string
  faq: string
  answer: string
  cta: string
  closing: string
  /**
   * YouTube playlists for this sector, from the channel's own playlists page.
   * Absent or empty means the page renders no video section at all, so an
   * unfilled sector costs nothing.
   *
   * A page can carry more than one: Architecture & Building Materials covers
   * hardware, ceramics tiles and ceramics machinery, which are three separate
   * playlists on the channel.
   *
   * Ids are the `list=` value from the playlist URL. They come in two lengths
   * on this channel — one 34-character "PL"+32 id and fourteen 13-character
   * ones — and both are real. The short form was briefly mistaken here for a
   * truncated copy; the share links settle it, since the `&si=` parameter
   * follows the id intact.
   */
  playlists?: { id: string; label: string }[]
  /** Existing industry records this page draws its projects from. */
  sources: string[]
  /** Those names as slugs, which is what the database is queried on. */
  sourceSlugs: string[]
}

export const INDUSTRY_PAGES: IndustryPage[] = [
  {
    name: "Real Estate",
    slug: "real-estate",
    title: "Real Estate Exhibition Stall Design | Approach Media",
    meta: "Showcase property developments with custom exhibition stalls. Explore real estate projects and plan model displays, presentations and buyer meeting spaces.",
    headline: "Real Estate Exhibition Stall Design",
    tagline: "Give buyers a space to picture their next address.",
    intro: "A property exhibition brings your development into a single space. Approach Media designs and builds real estate exhibition stalls that introduce the project, make its location and features easy to explore, and give your sales team room for meaningful conversations.",
    h2: "Bring the project into focus",
    body: "The layout should help visitors move from first impression to a closer look. A model can become the centrepiece, supported by readable masterplans, project visuals and a comfortable consultation area. Whether you are presenting one development or a wider portfolio, we shape the space around the story you need to tell.",
    features: [
      "Model displays positioned for viewing from multiple angles",
      "Project and location graphics that are easy to read",
      "Screens for walkthroughs and development presentations",
      "Seating for buyer, investor and channel-partner meetings",
    ],
    gallery: "Explore exhibition spaces created to present developments and welcome property buyers.",
    event: "Planning a property exhibition? Share the developments you want to feature and the number of conversations your team needs to accommodate.",
    faq: "Can one stall showcase several property developments?",
    answer: "Yes. The brief can group developments by location, property type or brand. Clear display zones and a shared consultation area help visitors find the project that interests them.",
    cta: "Let’s Build a Space Around Your Next Development",
    closing: "Share your property exhibition, stall size and project presentation needs.",
    playlists: [
      { id: "PLwb-9hDSfdnBkE1CBami1DgBoRVoY3nOg", label: "Real Estate" },
    ],
    sources: ["Real Estate", "Builder & Real Estate"],
    sourceSlugs: ["real-estate", "builder-real-estate"],
  },
  {
    name: "Pharmaceuticals",
    slug: "pharmaceuticals",
    title: "Pharma Exhibition Stall Design | Approach Media",
    meta: "Plan a pharmaceutical exhibition stall with clear product displays and meeting spaces. Explore pharma projects and discuss your next exhibition brief.",
    headline: "Pharmaceutical Exhibition Stall Design",
    tagline: "Make your capabilities clear. Make business conversations easier.",
    intro: "Your pharma exhibition stall needs to introduce your business and support detailed discussions. Approach Media creates exhibition spaces for pharmaceutical brands, with layouts shaped around product portfolios, company capabilities and partner meetings.",
    h2: "Organise the space around your business priorities",
    body: "A broad product range needs a clear presentation. We plan how visitors discover your key categories and where your team can explain manufacturing, supply or partnership opportunities. Graphics, display areas and meeting spaces work together to give each conversation the right setting.",
    features: [
      "Product categories presented through a clear visual hierarchy",
      "Capability graphics using your approved content",
      "Meeting areas for distributors and business partners",
      "Storage for literature and presentation materials",
    ],
    gallery: "See selected exhibition stands for pharmaceutical businesses.",
    event: "Preparing for a pharma exhibition? Tell us which products, capabilities and partnership opportunities should lead your presentation.",
    faq: "What content should we provide for a pharma stall?",
    answer: "Share your brand guidelines, approved product information, capability presentations and meeting requirements. Your team should approve all product claims and technical wording before graphics go into production.",
    cta: "Plan Your Next Pharma Exhibition Stall",
    closing: "Tell us about your event, product range and business meeting requirements.",
    playlists: [
      { id: "PLAMomwxKUIWk", label: "Pharma" },
    ],
    sources: ["Pharmaceuticals", "Pharmaceutical Industry"],
    sourceSlugs: ["pharmaceuticals", "pharmaceutical-industry"],
  },
  {
    name: "Healthcare & Medical Devices",
    slug: "healthcare-medical-devices",
    title: "Healthcare Exhibition Stall Design | Approach Media",
    meta: "Create a healthcare exhibition space for medical devices, product demonstrations and professional meetings. Explore our work and discuss your stall.",
    headline: "Healthcare & Medical Device Exhibition Stall Design",
    tagline: "Help visitors understand the device, the application and the difference.",
    intro: "Medical products often need more than a display shelf. Approach Media designs healthcare exhibition spaces that bring products, demonstrations and professional discussions into a considered layout, helping your team explain what you offer.",
    h2: "Give demonstrations room to work",
    body: "We start with what visitors need to see and how your team will explain it. Device dimensions, viewing positions, presentation screens and discussion areas help define the layout. The aim is a space where a product introduction can develop into a focused technical conversation.",
    features: [
      "Device display positions with clear visitor sightlines",
      "Demonstration areas planned around the equipment brief",
      "Screens for approved product and application content",
      "Meeting areas for clinical, procurement and distribution discussions",
    ],
    gallery: "Explore selected healthcare exhibition projects and their display layouts.",
    event: "Planning a healthcare exhibition? Share the devices you will display and how your team intends to demonstrate them.",
    faq: "What if our device needs power or a working demonstration?",
    answer: "Include equipment dimensions, utility needs and the intended demonstration in the brief. These requirements should be reviewed against venue rules before the display layout and installation plan are finalised.",
    cta: "Create a Clearer Product Experience",
    closing: "Send your exhibition details and medical device display requirements.",
    playlists: [
      { id: "PLUKI3Ta53T80", label: "Healthcare, Medical & Surgical Equipment" },
    ],
    sources: ["Healthcare"],
    sourceSlugs: ["healthcare"],
  },
  {
    name: "Machinery & Engineering",
    slug: "machinery-engineering",
    title: "Machinery Exhibition Stall Design | Approach Media",
    meta: "Plan an exhibition stall around your machinery, demonstrations and technical meetings. Explore engineering projects and discuss your equipment display.",
    headline: "Machinery & Engineering Exhibition Stall Design",
    tagline: "Put your engineering where buyers can see it.",
    intro: "The machine is often the reason visitors stop. Approach Media designs machinery and engineering exhibition stalls around the equipment you want to showcase, with space for viewing, explanation and technical discussions.",
    h2: "Start with the equipment. Build the visitor experience around it.",
    body: "Equipment dimensions, access needs and demonstration plans should shape the stand from the beginning. We bring the brand presentation into that practical layout, so your machines remain visible and your team has space to explain their applications.",
    features: [
      "Equipment placement based on dimensions and display priorities",
      "Visitor routes around static or operating exhibits",
      "Application graphics and technical presentation points",
      "Discussion areas for engineering and procurement teams",
    ],
    gallery: "See how machinery and engineering products take their place on the show floor.",
    event: "Preparing for an engineering or machinery exhibition? Share the equipment list early so the stall can be planned around it.",
    faq: "What information is needed for a large machine display?",
    answer: "Provide dimensions, weight, service connections, installation access and any operating clearances. Floor-loading limits, handling arrangements and demonstration permissions must be confirmed with the venue and relevant specialists.",
    cta: "Build Your Stall Around Your Equipment",
    closing: "Share your machine list, exhibition floor plan and demonstration brief.",
    playlists: [
      { id: "PLGB2tjkivEUE", label: "Engineering, Machine Manufacturers & Ancillary Suppliers" },
      { id: "PLLYpCaUQavDU", label: "Ceramic Raw Material & Machinery" },
    ],
    sources: ["Machine Manufacturers & Machine Tools", "Manufacturing", "Foundry and Steel Industry"],
    sourceSlugs: ["machine-manufacturers-machine-tools", "manufacturing", "foundry-and-steel-industry"],
  },
  {
    name: "Food, Beverage & FMCG",
    slug: "food-beverage-fmcg",
    title: "Food & FMCG Exhibition Stall Design | Approach Media",
    meta: "Showcase food, beverage and FMCG products with custom exhibition stalls for product discovery, sampling and trade meetings. Explore our work.",
    headline: "Food, Beverage & FMCG Exhibition Stall Design",
    tagline: "Make your products easy to discover and worth stopping for.",
    intro: "From the first look at the packaging to a conversation about distribution, every interaction matters. Approach Media designs food, beverage and FMCG exhibition stalls that give your range a clear presence and your team a practical place to engage buyers.",
    h2: "Balance product discovery with business discussions",
    body: "Your display should make it easy to understand the range without overwhelming visitors. Where sampling is part of the brief, the layout can separate serving, browsing and meetings. New launches can take a prominent position while supporting products remain easy to find.",
    features: [
      "Product shelving grouped by range or category",
      "Dedicated positions for launches and hero products",
      "Sampling counters and replenishment space where required",
      "Trade meeting areas for retailers and distributors",
    ],
    gallery: "Browse selected stands created for food, beverage and consumer-product exhibitors.",
    event: "Planning a food or FMCG exhibition? Tell us what you are launching, displaying or sampling and who you want to meet.",
    faq: "Can the layout include tasting or sampling?",
    answer: "Sampling can be included in the brief, with serving, storage and queue space considered together. Food handling, refrigeration, water and waste requirements should be confirmed with your team and the organiser.",
    cta: "Give Your Product Range a Stronger Show Presence",
    closing: "Share your exhibition, product list and sampling requirements.",
    playlists: [
      { id: "PLc5QXiXx_qSM", label: "Food \u2014 Exporters, Brands, Machinery & Plants" },
    ],
    sources: ["Food & Beverage", "Food Industry", "FMCG"],
    sourceSlugs: ["food-beverage", "food-industry", "fmcg"],
  },
  {
    name: "Textiles & Apparel",
    slug: "textiles-apparel",
    title: "Textile & Apparel Stall Design | Approach Media",
    meta: "Present fabrics and fashion collections through custom exhibition stalls. Plan garment displays, sample areas and buyer meetings with Approach Media.",
    headline: "Textile & Apparel Exhibition Stall Design",
    tagline: "Let buyers see the collection, feel the detail and explore the range.",
    intro: "Fabric, colour and finish deserve a display that gives them room. Approach Media designs textile and apparel exhibition stalls around your collections, with layouts that support browsing, sample presentation and trade conversations.",
    h2: "Create a clear journey through the collection",
    body: "We plan the display around how you sell: finished garments, fabric samples, seasonal collections or manufacturing capabilities. Hanging space, display surfaces and lighting form a consistent setting, while buyer seating gives your team room to discuss the next order.",
    features: [
      "Garment rails and collection zones",
      "Tables or counters for fabric and sample presentation",
      "Lighting selected with product colour and texture in mind",
      "Storage for additional sizes, samples and catalogues",
    ],
    gallery: "Explore exhibition displays for textile and apparel collections.",
    event: "Taking a collection to an exhibition? Share the range, display quantities and buyer meeting needs with us.",
    faq: "How can we show a large collection in a limited area?",
    answer: "Select the pieces that should lead the presentation, then organise supporting items by collection or category. Additional samples can be kept in storage for your team to bring into individual buyer discussions.",
    cta: "Build a Space for Your Next Collection",
    closing: "Tell us about your textile or apparel exhibition and the range you want to present.",
    playlists: [
      { id: "PLMlLtnl3qqm4", label: "Garment & Apparel" },
    ],
    sources: ["Textile Industry", "Textiles & Apparel", "Garment, Cloth, Fashion Industry"],
    sourceSlugs: ["textile-industry", "textiles-apparel", "garment-cloth-fashion-industry"],
  },
  {
    name: "Solar & Renewable Energy",
    slug: "solar-renewable-energy",
    title: "Solar Exhibition Stall Design | Approach Media",
    meta: "Showcase solar products and renewable energy solutions with custom exhibition stalls. Explore energy projects and plan your next product display.",
    headline: "Solar & Renewable Energy Exhibition Stall Design",
    tagline: "Make the technology visible. Make the application understandable.",
    intro: "Your exhibition space should help buyers connect a product with the system it belongs to. Approach Media designs solar and renewable energy exhibition stalls that bring physical products, application stories and business discussions together.",
    h2: "Explain how your solutions fit together",
    body: "Modules, components and supporting equipment each need the right display context. We plan product groupings and visual explanations around your audience, whether the focus is distribution, installation or larger project discussions. A clear hierarchy helps visitors understand where to begin.",
    features: [
      "Display planning for panels, components and equipment",
      "Application diagrams and system presentations",
      "Screens for project references and technical explanations",
      "Meeting areas for channel partners and project teams",
    ],
    gallery: "See selected exhibition stands for solar and energy brands.",
    event: "Preparing for an energy exhibition? Tell us which products and applications need the most attention.",
    faq: "Can solar panels or equipment become part of the stall design?",
    answer: "They can be considered in the concept when dimensions, weight and mounting details are available. Display supports and any powered exhibits require technical review before fabrication and installation.",
    cta: "Plan Your Next Energy Exhibition Presence",
    closing: "Share your event, product dimensions and presentation priorities.",
    playlists: [
      { id: "PLDJbvV2uV0Tg", label: "Solar & Renewable Energy" },
    ],
    sources: ["Solar Industry", "Solar / Energy"],
    sourceSlugs: ["solar-industry", "solar-energy"],
  },
  {
    name: "Water & Water Treatment",
    slug: "water-treatment",
    title: "Water Treatment Stall Design | Approach Media",
    meta: "Present water treatment systems, purification products and components in a custom exhibition stall. Explore relevant projects and share your brief.",
    headline: "Water & Water Treatment Exhibition Stall Design",
    tagline: "Make complex systems easier to explore.",
    intro: "From individual components to complete treatment solutions, your product range needs a clear story. Approach Media designs water-industry exhibition stalls that help visitors understand what you offer and give your team space to explain the application.",
    h2: "Connect the product with the process",
    body: "We organise displays around your priorities: finished products, treatment stages, components or industrial applications. Product presentation and process graphics can work together, with meeting space nearby for technical questions and commercial discussions.",
    features: [
      "Product groupings by application or treatment stage",
      "Component displays that keep small products visible",
      "Process graphics and presentation screens",
      "Technical discussion areas with catalogue access",
    ],
    gallery: "Explore selected stands for water and purification businesses.",
    event: "Planning a water-industry exhibition? Share your product mix and whether the display will be static or demonstrative.",
    faq: "Can we include a working water-treatment demonstration?",
    answer: "Include it in the initial brief. Water supply, drainage, electrical needs, spill management and organiser permissions need to be established before a working demonstration is included in the final plan.",
    cta: "Bring Your Water Solutions Into Focus",
    closing: "Tell us about your exhibition and the systems or components you want to showcase.",
    playlists: [
      { id: "PLcqJ0_Ld4aw4", label: "Industrial RO & Water Purification" },
    ],
    sources: ["Water & Water Purification Industry"],
    sourceSlugs: ["water-water-purification-industry"],
  },
  {
    name: "Plastics",
    slug: "plastics",
    title: "Plastics Exhibition Stall Design | Approach Media",
    meta: "Plan a plastics exhibition stall for materials, finished products or processing equipment. Explore our work and discuss your display requirements.",
    headline: "Plastics Exhibition Stall Design",
    tagline: "Show buyers what your products make possible.",
    intro: "A plastics exhibition can bring materials, components and processing technology into the same conversation. Approach Media designs stalls that give your offering a clear identity and help visitors understand its applications.",
    h2: "Make each product category easy to understand",
    body: "The right layout depends on what you are presenting. Material samples need close inspection, finished products need context, and processing equipment needs space. We develop the display around those differences while keeping the brand message consistent.",
    features: [
      "Sample displays grouped by material or application",
      "Product shelving and display plinths",
      "Equipment zones when machinery is part of the brief",
      "Meeting space for sourcing and manufacturing discussions",
    ],
    gallery: "Browse selected projects for plastics-industry exhibitors.",
    event: "Preparing for a plastics exhibition? Tell us whether your focus is materials, products, machinery or a combination.",
    faq: "Can we display both product samples and a processing machine?",
    answer: "Yes. Plan the equipment footprint and access first, then use sample displays to explain what the process produces. Final positioning depends on the machine requirements and the venue’s rules.",
    cta: "Plan a Stall Around Your Plastics Business",
    closing: "Share your product range, equipment details and exhibition floor plan.",
    playlists: [
      { id: "PLConZcwuHJwU", label: "Plastic Machinery" },
    ],
    sources: ["Plastic Industry"],
    sourceSlugs: ["plastic-industry"],
  },
  {
    name: "Printing & Packaging",
    slug: "printing-packaging",
    title: "Printing & Packaging Stall Design | Approach Media",
    meta: "Display print quality, packaging formats and production capabilities in a custom exhibition stall. Explore projects and plan your next show presence.",
    headline: "Printing & Packaging Exhibition Stall Design",
    tagline: "Let buyers get closer to the details that set your work apart.",
    intro: "Print finishes and packaging formats reward a closer look. Approach Media designs printing and packaging exhibition stalls that make samples accessible, organise your range and create space to discuss the right solution with buyers.",
    h2: "Make the sample display part of the story",
    body: "A strong display helps visitors compare formats, materials and finishes without losing sight of your wider capabilities. We plan shelves, counters and presentation areas around your sample range, with room for conversations about specifications and production needs.",
    features: [
      "Sample walls organised by format or end use",
      "Counters for handling and comparing materials",
      "Focused lighting for print and surface detail",
      "Presentation space for production capabilities",
    ],
    gallery: "Explore selected exhibition projects for printing and packaging businesses.",
    event: "Planning a printing or packaging exhibition? Share the samples, formats and capabilities you want buyers to discover.",
    faq: "How should we choose samples for the stand?",
    answer: "Prioritise samples that show meaningful differences in format, material, application or finish. A focused selection with clear labels gives your team a useful starting point for more detailed discussions.",
    cta: "Give Your Print and Packaging Work Room to Stand Out",
    closing: "Send your exhibition brief and the sample range you want to display.",
    playlists: [
      { id: "PLT_RgNqMSftg", label: "Cosmetic & Packaging" },
    ],
    sources: ["Printing and Packaging Industry"],
    sourceSlugs: ["printing-and-packaging-industry"],
  },
  {
    name: "Architecture & Building Materials",
    slug: "architecture-building-materials",
    title: "Building Materials Stall Design | Approach Media",
    meta: "Showcase building materials, architectural products and fittings with custom exhibition displays. Explore our work and plan your product experience.",
    headline: "Architecture & Building Materials Exhibition Stall Design",
    tagline: "Help visitors see the material in use.",
    intro: "Building products are easier to understand when visitors can explore their finish, scale and function. Approach Media designs exhibition spaces for architectural products and building materials, bringing samples and application ideas into a coherent presentation.",
    h2: "Move from individual samples to real applications",
    body: "A material wall, fitted display or walk-through arrangement can help visitors imagine how a product belongs in a project. We plan the balance between sample access, working displays and meeting space around your range and the people you want to reach.",
    features: [
      "Material and finish sample walls",
      "Display zones for doors, windows, fittings or surfaces",
      "Lighting that supports inspection of texture and detail",
      "Meeting spaces for architects, dealers and project buyers",
    ],
    gallery: "See selected architectural product and building-material exhibition displays.",
    event: "Preparing for a building or architecture exhibition? Tell us which products visitors should see, touch or operate.",
    faq: "Can doors, windows or fittings be shown as working displays?",
    answer: "Working displays can be included in the brief. Dimensions, weight, fixing requirements and operating clearances should be reviewed so the display has the support and space it needs.",
    cta: "Build an Exhibition Space Around Your Materials",
    closing: "Share your product range, display samples and exhibition requirements.",
    playlists: [
      { id: "PLeURasR9qYSg", label: "Hardware, Doors & Windows, Glass, Lighting, Laminate & Wood" },
      { id: "PLQRf0VS8DjBg", label: "Ceramic Tiles Manufacturing" },
    ],
    sources: ["Architecture, Building materials, Art and Design", "Hardware, Kitchen and Bathroom Fittings Industry", "Wood Industry"],
    sourceSlugs: ["architecture-building-materials-art-and-design", "hardware-kitchen-and-bathroom-fittings-industry", "wood-industry"],
  },
  {
    name: "Cosmetics & Personal Care",
    slug: "cosmetics-personal-care",
    title: "Cosmetics Exhibition Stall Design | Approach Media",
    meta: "Present beauty and personal care products with custom exhibition stalls. Plan product displays, tester areas and buyer meetings with Approach Media.",
    headline: "Cosmetics & Personal Care Exhibition Stall Design",
    tagline: "Create a closer encounter with your brand.",
    intro: "Beauty and personal care products need a setting that reflects their identity. Approach Media designs exhibition stalls that bring packaging, product ranges and brand presentation together, with space for discovery and business conversations.",
    h2: "Give every range a clear place",
    body: "A new launch, a complete collection and a private-label offer need different kinds of attention. We organise the presentation around your commercial priorities, using display levels, graphics and lighting to help visitors explore without overcrowding the space.",
    features: [
      "Product shelves and launch display positions",
      "Tester or demonstration counters where required",
      "Mirrors and lighting planned around the presentation brief",
      "Meeting space for retail, distribution and private-label enquiries",
    ],
    gallery: "Explore selected exhibition work for cosmetics and personal care brands.",
    event: "Planning a beauty or personal care exhibition? Tell us about your ranges, launch plans and visitor experience.",
    faq: "Can the stall include product testing or demonstrations?",
    answer: "Include the intended experience in the brief so the layout can allow for testers, supplies and staff access. Your team should define product handling procedures and approve any product claims used in the display.",
    cta: "Bring Your Beauty Brand to the Show Floor",
    closing: "Share your exhibition, collection and product presentation brief.",
    playlists: [
      { id: "PLT_RgNqMSftg", label: "Cosmetic & Packaging" },
    ],
    sources: ["FMCG"],
    sourceSlugs: ["fmcg"],
  },
  {
    name: "Automotive & Components",
    slug: "automotive-components",
    title: "Automotive Exhibition Stall Design | Approach Media",
    meta: "Showcase automotive parts and engineering capabilities in a custom exhibition stall. Explore automotive projects and discuss your next trade show.",
    headline: "Automotive & Components Exhibition Stall Design",
    tagline: "Give precision products a clear presentation.",
    intro: "From a small component to a complete assembly, every display should help buyers understand the application. Approach Media designs automotive exhibition stalls that combine product presentation, technical information and space for business discussions.",
    h2: "Connect the component to its role",
    body: "Visitors should be able to identify your key products and explore what makes them relevant. We plan displays around product families, applications or capabilities, with space for close inspection and conversations with your technical team.",
    features: [
      "Component displays grouped by function or application",
      "Plinths for larger parts and assemblies",
      "Application diagrams and technical presentation screens",
      "Meeting areas for OEM, sourcing and distribution discussions",
    ],
    gallery: "Browse selected exhibition stands for automotive and component businesses.",
    event: "Preparing for an automotive exhibition? Share the components, assemblies and capabilities you want to present.",
    faq: "How can small components remain visible in a large stall?",
    answer: "Bring priority components to an accessible viewing height and group them clearly. Labels, focused lighting and application visuals can help visitors understand their role without crowding the display.",
    cta: "Put Your Automotive Capabilities on Display",
    closing: "Tell us about your exhibition, product range and meeting requirements.",
    sources: ["Automotive", "Automobile Industry"],
    sourceSlugs: ["automotive", "automobile-industry"],
  },
  {
    name: "Industrial Automation",
    slug: "industrial-automation",
    title: "Automation Exhibition Stall Design | Approach Media",
    meta: "Create an exhibition space for automation products, control systems and demonstrations. Explore our work and plan a clear technical presentation.",
    headline: "Industrial Automation Exhibition Stall Design",
    tagline: "Show the process behind the promise.",
    intro: "Automation becomes easier to understand when visitors can see how it works. Approach Media designs exhibition stalls that bring control products, demonstrations and application stories together in a clear, approachable space.",
    h2: "Make demonstrations easy to follow",
    body: "We plan where visitors will stand, what they should see and how your team will explain the system. Physical products and screen content can support the same story, while a nearby discussion area gives technical enquiries room to develop.",
    features: [
      "Demonstration stations organised by application",
      "Control product and panel displays",
      "Screens positioned for guided explanations",
      "Cable routes and service access considered in the layout",
    ],
    gallery: "Explore selected automation exhibition stands and product displays.",
    event: "Planning an automation exhibition? Share your demonstration sequence, equipment and presentation needs.",
    faq: "What do you need to plan an interactive demonstration?",
    answer: "Provide the demonstration sequence, equipment dimensions, utility needs and the expected visitor interaction. Moving parts, operating clearances and technical responsibilities should be agreed before the design is finalised.",
    cta: "Turn Your Automation Story Into an Exhibition Experience",
    closing: "Send your event details and demonstration brief.",
    playlists: [
      { id: "PLfXfxTQjWQXQ", label: "Automation \u2014 Drives, Sensors, Motors, Gears & Touch Panels" },
    ],
    sources: ["Automation Industry"],
    sourceSlugs: ["automation-industry"],
  },
  {
    name: "Electrical & Lighting",
    slug: "electrical-lighting",
    title: "Electrical & Lighting Stall Design | Approach Media",
    meta: "Showcase electrical products and lighting ranges in a custom exhibition stall. Plan organised displays, demonstrations and trade meeting areas.",
    headline: "Electrical & Lighting Exhibition Stall Design",
    tagline: "Give each product the setting it needs.",
    intro: "Electrical products and lighting ranges need displays that explain both function and application. Approach Media designs exhibition stalls that organise your range, support product presentations and give trade visitors a clear route through your offering.",
    h2: "Plan the display around what visitors need to compare",
    body: "Some products benefit from a structured sample wall; others need to be seen in operation. We shape display zones around those needs, considering product visibility, presentation conditions and the space your team needs to answer questions.",
    features: [
      "Product walls grouped by category or application",
      "Demonstration positions for selected working products",
      "Lighting display zones with appropriate backgrounds",
      "Meeting areas for dealers, contractors and project buyers",
    ],
    gallery: "See selected exhibition spaces for electrical and lighting products.",
    event: "Preparing for an electrical or lighting exhibition? Share the range and identify which products need powered displays.",
    faq: "Can lighting products be demonstrated within the stall?",
    answer: "Include fixture specifications, mounting needs and the effects you want visitors to compare. The display design should account for surrounding hall light, power provision and organiser requirements.",
    cta: "Plan Your Electrical or Lighting Exhibition Stall",
    closing: "Tell us about your event, product range and demonstration requirements.",
    playlists: [
      { id: "PLeURasR9qYSg", label: "Hardware, Doors & Windows, Glass, Lighting, Laminate & Wood" },
    ],
    sources: ["Electrical Industry", "CCTV, TV, Wire and Cable Industry"],
    sourceSlugs: ["electrical-industry", "cctv-tv-wire-and-cable-industry"],
  },
  {
    name: "Pumps, Valves & Gears",
    slug: "pumps-valves-gears",
    title: "Pumps & Valves Stall Design | Approach Media",
    meta: "Present pumps, valves, gears and industrial components in a custom exhibition stall. Explore projects and plan product displays and technical meetings.",
    headline: "Pumps, Valves & Gears Exhibition Stall Design",
    tagline: "Make industrial components easier to inspect and understand.",
    intro: "Technical buyers need to see the product and discuss where it fits. Approach Media designs exhibition stalls for pumps, valves, gears and related components, combining accessible displays with clear application information.",
    h2: "Give each product a useful context",
    body: "A focused display helps visitors compare your range and ask better questions. We organise products by application, size or function, with positions for selected assemblies or cutaways when available. Technical graphics support the display without competing with it.",
    features: [
      "Plinths and counters suited to the product range",
      "Displays for cutaways or assemblies where available",
      "Application and specification graphics",
      "Seating for engineering and commercial discussions",
    ],
    gallery: "Explore selected exhibition projects featuring industrial components.",
    event: "Taking pumps, valves or transmission products to an exhibition? Share the display list and your technical presentation needs.",
    faq: "How do you plan displays for heavy components?",
    answer: "Product weight, dimensions, centre of gravity and handling requirements need to be shared at the start. Suitable supports, placement and venue loading limits must be reviewed before the display is built.",
    cta: "Create a Clearer Display for Your Industrial Products",
    closing: "Share your exhibition plan and the components you want buyers to explore.",
    playlists: [
      { id: "PLMzuH_LgNu34", label: "Chemical, Pump & Motor Manufacturing" },
    ],
    sources: ["Pump Valves and Gears Industry"],
    sourceSlugs: ["pump-valves-and-gears-industry"],
  },
]

export const INDUSTRY_BY_SLUG = new Map(INDUSTRY_PAGES.map(i => [i.slug, i]))

/**
 * A shape check on a playlist id, not a length rule.
 *
 * An earlier version of this required eighteen characters, on the assumption
 * that anything shorter had been truncated in the copy. That was wrong: this
 * channel has both 34-character and 13-character playlist ids, and the share
 * URLs prove the short ones are whole — `&si=` follows the id, so nothing was
 * cut off. The floor would have hidden fourteen working playlists.
 *
 * So this only rejects what cannot be an id at all: empty, or characters
 * outside the set YouTube uses. Whether a real id points at a real playlist
 * is not knowable from here and is not guessed at.
 */
export function isLikelyPlaylistId(id: string | undefined): id is string {
  return !!id && /^[A-Za-z0-9_-]{10,60}$/.test(id)
}
