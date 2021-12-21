export const ITEM_TYPE = {
  $: 'treasure',
  A: 'ammunition',
  AF: 'ammunition',
  AIR: 'vehicle (air)',
  AT: "artisan's tools",
  EM: 'eldritch machine',
  EXP: 'explosive',
  FD: 'food and drink',
  G: 'adventuring gear',
  GS: 'gaming set',
  GV: 'generic variant',
  HA: 'heavy armor',
  INS: 'instrument',
  LA: 'light armor',
  M: 'melee weapon',
  MA: 'medium armor',
  MNT: 'mount',
  MR: 'master rune',
  OTH: 'other',
  P: 'potion',
  R: 'ranged weapon',
  RD: 'rod',
  RG: 'ring',
  S: 'shield',
  SC: 'scroll',
  SCF: 'spellcasting focus',
  SHP: 'vehicle (water)',
  T: 'tools',
  TAH: 'tack and harness',
  TG: 'trade good',
  VEH: 'vehicle (land)',
  WD: 'wand',
};

export const DAMAGE_TYPE = {
  A: 'acid',
  B: 'bludgeoning',
  C: 'cold',
  F: 'fire',
  O: 'force',
  L: 'lightning',
  N: 'necrotic',
  P: 'piercing',
  I: 'poison',
  Y: 'psychic',
  R: 'radiant',
  S: 'slashing',
  T: 'thunder',
};

export const CONDITIONS = [
  'blinded',
  'charmed',
  'deafened',
  'exhaustion',
  'frightened',
  'grappled',
  'incapacitated',
  'invisible',
  'paralyzed',
  'petrified',
  'poisoned',
  'prone',
  'restrained',
  'stunned',
  'unconscious',
];

export const SKILLS = {
  Acrobatics: [
    "Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you're trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship's deck. The DM might also call for a Dexterity (Acrobatics) check to see if you can perform acrobatic stunts, including dives, rolls, somersaults, and flips.",
  ],
  'Animal Handling': [
    "When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal's intentions, the DM might call for a Wisdom (Animal Handling) check. You also make a Wisdom (Animal Handling) check to control your mount when you attempt a risky maneuver.",
  ],
  Arcana: [
    'Your Intelligence (Arcana) check measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes.',
  ],
  Athletics: [
    'Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming. Examples include the following activities:',
    {
      type: 'list',
      items: [
        'You attempt to climb a sheer or slippery cliff, avoid hazards while scaling a wall, or cling to a surface while something is trying to knock you off.',
        'You try to jump an unusually long distance or pull off a stunt mid jump.',
        'You struggle to swim or stay afloat in treacherous currents, storm-tossed waves, or areas of thick seaweed. Or another creature tries to push or pull you underwater or otherwise interfere with your swimming.',
      ],
    },
  ],
  Deception: [
    "Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions. This deception can encompass everything from misleading others through ambiguity to telling outright lies. Typical situations include trying to fast-talk a guard, con a merchant, earn money through gambling, pass yourself off in a disguise, dull someone's suspicions with false assurances, or maintain a straight face while telling a blatant lie.",
  ],
  History: [
    'Your Intelligence (History) check measures your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations.',
  ],
  Insight: [
    "Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone's next move. Doing so involves gleaning clues from body language, speech habits, and changes in mannerisms.",
  ],
  Intimidation: [
    'When you attempt to influence someone through overt threats, hostile actions, and physical violence, the DM might ask you to make a Charisma (Intimidation) check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision.',
  ],
  Investigation: [
    'When you look around for clues and make deductions based on those clues, you make an Intelligence (Investigation) check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through ancient scrolls in search of a hidden fragment of knowledge might also call for an Intelligence (Investigation) check.',
  ],
  Medicine: [
    'A Wisdom (Medicine) check lets you try to stabilize a dying companion or diagnose an illness.',
  ],
  Nature: [
    'Your Intelligence (Nature) check measures your ability to recall lore about terrain, plants and animals, the weather, and natural cycles.',
  ],
  Perception: [
    'Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings and the keenness of your senses.', 'For example, you might try to hear a conversation through a closed door, eavesdrop under an open window, or hear monsters moving stealthily in the forest. Or you might try to spot things that are obscured or easy to miss, whether they are orcs lying in ambush on a road, thugs hiding in the shadows of an alley, or candlelight under a closed secret door.',
  ],
  Performance: [
    'Your Charisma (Performance) check determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment.',
  ],
  Persuasion: [
    'When you attempt to influence someone or a group of people with tact, social graces, or good nature, the DM might ask you to make a Charisma (Persuasion) check. Typically, you use persuasion when acting in good faith, to foster friendships, make cordial requests, or exhibit proper etiquette. Examples of persuading others include convincing a chamberlain to let your party see the king, negotiating peace between warring tribes, or inspiring a crowd of townsfolk.',
  ],
  Religion: [
    'Your Intelligence (Religion) check measures your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and the practices of secret cults.',
  ],
  'Sleight of Hand': [
    "Whenever you attempt an act of legerdemain or manual trickery, such as planting something on someone else or concealing an object on your person, make a Dexterity (Sleight of Hand) check. The DM might also call for a Dexterity (Sleight of Hand) check to determine whether you can lift a coin purse off another person or slip something out of another person's pocket.",
  ],
  Stealth: [
    'Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard.',
  ],
  Survival: [
    'The DM might ask you to make a Wisdom (Survival) check to follow tracks, hunt wild game, guide your group through frozen wastelands, identify signs that owlbears live nearby, predict the weather, or avoid quicksand and other natural hazards.',
  ],
};

export const ITEM_PROPERTY = {
  A: {
    name: 'Ammunition',
    entries: [
      'Requires ammo, drawn as part of attack. After combat, spend 1 minute to recover half expended.',
      'Treat as improvised weapon for melee (slings must be loaded).',
    ],
  },
  AF: {
    name: 'Ammunition',
    entries: [
      'Requires ammo, drawn as part of attack. After combat, spend 1 minute to recover half expended.',
      'Treat as improvised weapon for melee (slings must be loaded).',
    ],
  },
  BF: {
    name: 'Burst Fire',
    entries: [
      "Can spray a 10-foot-cube area in normal range; each creature in area makes DC 15 Dex save or take weapon's damage (uses ten pieces of ammo).",
    ],
  },
  F: {
    name: 'Finesse',
    entries: [
      'Your choice of your Str or Dex modifier for attack and damage rolls. Same modifier for both rolls.',
    ],
  },
  H: {
    name: 'Heavy',
    entries: [
      'Small/Tiny creatures have disadvantage on attack rolls.',
    ],
  },
  L: {
    name: 'Light',
    entries: [
      'A light weapon is small and easy to handle, making it ideal for use when fighting with two weapons.',
    ],
  },
  LD: {
    name: 'Loading',
    entries: [
      'Can fire only once regardless of the number of attacks you can normally make.',
    ],
  },
  R: {
    name: 'Reach',
    entries: [
      'Adds 5 feet to your reach.',
    ],
  },
  RLD: {
    name: 'Reload',
    entries: [
      'Reload this weapon using an action or bonus action (your choice).',
    ],
  },
  T: {
    name: 'Thrown',
    entries: [
      'Throw this weapon as a ranged attack. If it is a melee weapon, use the ability modifier for the attack and damage roll that you would use for a melee attack.',
    ],
  },
  '2H': {
    name: 'Two-Handed',
    entries: [
      'Requires two hands to attack with.',
    ],
  },
  V: {
    name: 'Versatile',
    entries: [
      'Use the damage in parentheses when making a melee attack with two hands.',
    ],
  },
};

export const SOURCES = {
  AI: 'Acquisitions Incorporated',
  AL: "Adventurers' League",
  AWM: 'Adventure with Muk',
  AZfyT: 'A Zib for your Thoughts',
  AitFR: 'Adventures in the Forgotten Realms',
  BGDIA: "Baldur's Gate: Descent Into Avernus",
  CM: 'Candlekeep Mysteries',
  CoS: 'Curse of Strahd',
  DC: 'Divine Contention',
  DIP: 'Dragon of Icespire Peak',
  DMG: "Dungeon Master's Guide",
  DoD: 'Domains of Delight',
  EEPC: "Elemental Evil Player's Companion",
  EET: 'Elemental Evil: Trinkets',
  EFR: 'Eberron: Forgotten Relics',
  EGW: "Explorer's Guide to Wildemount",
  ERLW: 'Eberron: Rising from the Last War',
  ESK: 'Essentials Kit',
  FTD: 'Fizban\'s Treasury of Dragons',
  GGR: "Guildmasters' Guide to Ravnica",
  GoS: 'Ghosts of Saltmarsh',
  HEROES_FEAST: "Heroes' Feast",
  HftT: 'Hunt for the Thessalhydra',
  HoL: 'The House of Lament',
  HotDQ: 'Hoard of the Dragon Queen',
  IDRotF: 'Icewind Dale: Rime of the Frostmaiden',
  IMR: 'Infernal Machine Rebuild',
  KKW: "Krenko's Way",
  LLK: 'Lost Laboratory of Kwalish',
  LMoP: 'Lost Mine of Phandelver',
  LR: 'Locathah Rising',
  MFF: "Mordenkainen's Fiendish Folio",
  MM: 'Monster Manual',
  MOT: 'Mythic Odysseys of Theros',
  MTF: "Mordenkainen's Tome of Foes",
  MaBJoV: 'Minsc and Boo\'s Journal of Villainy',
  NRH: 'NERDS Restoring Harmony',
  OGA: 'One Grung Above',
  OoW: 'The Orrery of the Wanderer',
  OotA: 'Out of the Abyss',
  PHB: "Player's Handbook",
  PotA: 'Princes of the Apocalypse',
  RMBRE: 'The Lost Dungeon of Rickedness: Big Rick Energy',
  RMR: 'Dungeons & Dragons vs. Rick and Morty: Basic Rules',
  RoT: 'The Rise of Tiamat',
  RoTOS: 'The Rise of Tiamat Online Supplement',
  RtG: 'Return to Glory',
  SAC: 'Sage Advice Compendium',
  SADS: 'Sapphire Anniversary Dice Set',
  SCAG: "Sword Coast Adventurer's Guide",
  SCC: 'Strixhaven: A Curriculum of Chaos',
  SCC_ARiR: 'A Reckoning in Ruins',
  SCC_CK: 'Campus Kerfuffle',
  SCC_HfMT: 'Hunt for Mage Tower',
  SCC_TMM: 'The Magister\'s Masquerade',
  SCREEN: "Dungeon Master's Screen",
  SCREEN_WILDERNESS_KIT: "Dungeon Master's Screen: Wilderness Kit",
  SDW: "Sleeping Dragon's Wake",
  SKT: "Storm King's Thunder",
  SLW: "Storm Lord's Wrath",
  TCE: "Tasha's Cauldron of Everything",
  TLK: 'The Lost Kenku',
  TTP: 'The Tortle Package',
  TftYP: 'Tales from the Yawning Portal',
  ToA: 'Tomb of Annihilation',
  ToD: 'Tyranny of Dragons',
  VGM: "Volo's Guide to Monsters",
  VRGR: "Van Richten's Guide to Ravenloft",
  WBtW: 'The Wild Beyond the Witchlight',
  WDH: 'Waterdeep: Dragon Heist',
  WDMM: 'Waterdeep: Dungeon of the Mad Mage',
  XGE: "Xanathar's Guide to Everything",
  XMtS: 'X Marks the Spot',
};
