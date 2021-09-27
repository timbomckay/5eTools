const fs = require('fs');
const convertTags = require('./convert-tags');
const processEntries = require('./process-entries');
const itemsData = require('../_data/items.json');
const baseItems = require('../_data/items-base.json');
const magicVariants = require('../_data/magicvariants.json').variant.map((item) => {
  const { inherits, ...rest } = item;

  return {
    ...rest,
    ...inherits
  };
});

const items = [
  ...itemsData.item,
  ...baseItems.baseitem,
  ...magicVariants,
];

const variants = itemsData.itemGroup.map(group => {
  return group.items.map(item => item.split('|').shift());
}).flat();

const itemTypes = {
	A: "Ammunition",
	AF: "Ammunition",
	AT: "Artisan's Tools",
	EM: "Eldritch Machine",
	EXP: "Explosive",
	FD: "Food & Drink",
	G: "Adventuring Gear",
	GS: "Gaming Set",
	HA: "Heavy Armor",
	INS: "Instrument",
	LA: "Light Armor",
	M: "Melee Weapon",
	MA: "Medium Armor",
	MNT: "Mount",
	MR: "Master Rune",
	GV: "Generic Variant",
	P: "Potion",
	R: "Ranged Weapon",
	RD: "Rod",
	RG: "Ring",
	S: "Shield",
	SC: "Scroll",
	SCF: "Spellcasting Focus",
	OTH: "Other",
	T: "Tools",
	TAH: "Tack & Harness",
	TG: "Trade Good",
	$: "Treasure",
	VEH: "Vehicle (Land)",
	SHP: "Vehicle (Water)",
	AIR: "Vehicle (Air)",
	WD: "Wand",
};

const damageType = {
	A: "Acid",
	B: "Bludgeoning",
	C: "Cold",
	F: "Fire",
	O: "Force",
	L: "Lightning",
	N: "Necrotic",
	P: "Piercing",
	I: "Poison",
	Y: "Psychic",
	R: "Radiant",
	S: "Slashing",
	T: "Thunder",
};

const data = [ ...items ].map((item) => {
  if (variants.includes(item.name)) {
    variants.splice(variants.indexOf(item.name), 1);
    return null;
  }

  const output = {
    name: item.name
  };

  output.sources = {
    [item.source]: item.page
  };

  [
    'range',
    'srd',
    'tier',
    'charges',
  ].forEach((key) => {
    if (item[key] != null) {
      output[key] = item[key];
    }
  });

  if (item.rarity && ![
    'unknown (magic)',
    'none',
    'unknown',
  ].includes(item.rarity)) {
    output.rarity = item.rarity;
  }

  if (item.additionalEntries) {
    if (item.entries != null) {
      item.entries.push(...item.additionalEntries);
    } else {
      item.entries = item.additionalEntries;
    }
  }

  if (item.entries != null) {
    output.entries = processEntries(item.entries).flat();
  }

  if (item.property != null) {
    output.properties = item.property;
  }

  if (item.dmg1 != null) {
    const damage = {
      roll: item.dmg1,
      type: damageType[item.dmgType]
    }

    if (item.dmg2) {
      if (item.property.includes('V')) {
        damage.versatile = item.dmg2;
      }
    }

    output.damage = damage;
  }

  if (item.reqAttune != null) {
    output.attunement = item.reqAttune;
  }

  if (item.containerCapacity) {
    output.container = true;
  }

  if (item.otherSources) {
    output.source = [
      ...item.otherSources.map(src => src.source),
      output.source,
    ];
  }

  if (item.hasFluffImages) {
    output.image = true;
  }

  if (item.type === 'GV') {
    let excludes = null;

    if (item.excludes) {
      if ('name' in item.excludes) {
        excludes = item.excludes.name.toLowerCase().replace('armor', '').trim();
      }
    }

    if (item.requires.length > 1) {
      if ('sword' in item.requires[0] || 'axe' in item.requires[0]) {
        output.type = 'Weapon (any axe or sword)';
      } else {
        const type = item.requires.map((req) => {
            return itemTypes[req.type]
              .replace('Armor', '')
              .trim();
        }).join(' or ').toLowerCase();

        output.type = `Armor (${type})`;
      }

      if (excludes != null) {
        output.type = output.type.replace(')', `, but not ${excludes})`);
      }
    } else {
      const requires = item.requires[0];
      if (requires.sword) {
        if (requires.dmgType) {
          if (requires.dmgType === 'S') {
            output.type = 'Weapon (any sword that deals slashing damage)';
          } else {
            console.log(item.name, ' - ', requires);
          }
        } else {
          output.type = 'Weapon (any sword)';
        }
      } else if (requires.axe) {
        output.type = 'Weapon (any axe)';
      } else if (requires.armor) {
        output.type = 'Armor (light, medium, or heavy)';
      } else if (requires.weapon) {
        output.type = 'Weapon (any)';
      } else if (requires.type) {
        output.type = itemTypes[requires.type];
      } else {
        console.log(item.name, ' - ', item.source, item.page, requires);
        output.type = 'Generic Variant';
      }

      if (excludes != null) {
        output.type = `(any but not ${excludes})`;
      }
    }
  } else if (item.wondrous != null) {
    output.type = 'Wondrous Item';
  } else if (item.ac) {
    output.type = item.baseItem
      ? `Armor (${ item.baseItem.split('|').shift().replace(' armor', '') })`
      : `Armor (${ itemTypes[item.type].replace(' Armor', '') })`;
  } else if (item.staff) {
    output.type = 'Staff';
  } else if (item.weaponCategory) {
    output.type = item.baseItem
      ? `Weapon (${ item.baseItem.split('|').shift() })`
      : 'Weapon';
  } else if (item.poison) {
    output.type = item.poisonTypes
      ? `Poison (${item.poisonTypes.join(' or ')})`
      : 'Poison';
  } else if (item.age) {
    output.type = `${itemTypes[item.type]} (${item.age})`;
  } else if (item.type) {
    output.type = itemTypes[item.type];
  } else if (!item._copy) {
    console.log(item.name, ' - no type or copy');
  }

  if (item._copy) {
    output.extends = {
      item: item._copy.name,
    }

    if (item._copy._mod) {
      output.extends.entries = processEntries(item._copy._mod.entries.items);
    }
  }

  if (item.additionalSources) {
    item.additionalSources.forEach(({source, page}) => {
      output.sources[source] = page;
    });
  }

  const report = Object.keys(item).filter(k => {
    const ignore = [
      ...Object.keys(output),
      '_copy',
      'ability',
      'ac',
      'additionalSources',
      'additionalEntries',
      'age',
      'axe',
      'ammoType',
      'armor',
      'atomicPackContents',
      'attachedSpells',
      'baseItem',
      'bonusAbilityCheck',
      'bonusAc',
      'bonusSavingThrow',
      'bonusProficiencyBonus',
      'bonusWeaponDamage',
      'bonusSpellAttack',
      'bonusSpellSaveDc',
      'bonusWeapon',
      'bonusWeaponAttack',
      'bow',
      'club',
      'conditionImmune',
      'containerCapacity',
      'crossbow',
      'curse',
      'dagger',
      'dexterityMax',
      'dmg1',
      'dmg2',
      'dmgType',
      'excludes',
      'firearm',
      'focus',
      'grantsProficiency',
      'hammer',
      'hasFluff',
      'hasFluffImages',
      'immune',
      'lootTables',
      'mace',
      'net',
      'otherSources',
      'packContents',
      'page',
      'poison',
      'poisonTypes',
      'property',
      'rarity',
      'recharge',
      'reload',
      'reqAttune',
      'reqAttuneAlt',
      'reqAttuneTags',
      'requires',
      'resist',
      'scfType',
      'sentient',
      'spear',
      'staff',
      'stealth',
      'strength',
      'sword',
      'tattoo',
      'value',
      'vulnerable',
      'weapon',
      'weaponCategory',
      'weight',
      'weightNote',
      'wondrous',
      'nameSuffix',
      'nameRemove',
      'weightMult',
      'weightExpression',
      'valueMult',
      'valueExpression',
      'barding',
      'crewMin',
      'crewMax',
      'vehSpeed',
      'capPassenger',
      'capCargo',
      'travelCost',
      'shippingCost',
      'carryingCapacity',
      'crew',
      'vehAc',
      'vehHp',
      'vehDmgThresh',
      'ammo',
      'namePrefix',
      'source',
      'page',
      'speed',
    ];

    return !ignore.includes(k);
  });

  if (report.length) {
    // console.log(item.name, report, '(', item.source, item.page, ')');
  }

  return output;
}).filter(item => item != null);

fs.writeFile('./data/items.json', JSON.stringify(data, null, 2), (err) => {
  if (err != null) { console.log(err); }

  fs.stat('./data/items.json', (err, stats) => {
    if (err) {
      console.log(`File doesn't exist.`);
    } else {
      console.log('\n')
      console.log('items:', data.length, ' | ', 'filesize:', stats.size);
      console.log('\n\n');
    }
  });
});
