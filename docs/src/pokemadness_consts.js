let pkmnCSS = '';
let keyboardHTML = '';
let allPkmn = null;
let natures = null;
let types = null;
let additionalTags = null;

const gen9start = 906;
const maxGen8fam = 468;
let randomSeed = 151;

const flavourLookup = {
  Spicy: 0,
  Sour: 1,
  Sweet: 2,
  Dry: 3,
  Bitter: 4
};

const kbchars = [
'A','B','C','D','E','F','G','H','I','J','K','L','M',
'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
'0','1','2','3','4','5','6','7','8','9','!','?','🚲',
'⊙','✊','🕊','☣','🕳','🪨','🐞','👻','⌶','🔥','💧','🍃','⚡',
'✲','🧊','🐲','❍','🧚','☎','☠','☮','☂','⚄','✎','☹','☺'
]

const pronouns = ['f', 'm', 'n'];

const colours = [ 
  'Black', 'Blue', 'Brown', 'Gray', 'Green', 'Pink', 'Purple', 'Red', 'White', 'Yellow' 
]

// TODO: Add image lookups, assumed limb data, etc?
const bodyLookup = [
    "Pokémon consisting of only a head",
    "Pokémon consisting of a head and legs",
    "Pokémon with fins",
    "Pokémon with an insectoid body",
    "Pokémon with a quadruped body",
    "Pokémon with two or more pairs of wings",
    "Pokémon consisting of multiple bodies",
    "Pokémon with tentacles or a multiped body",
    "Pokémon consisting of a head and a base",
    "Pokémon with a bipedal, tailed form",
    "Pokémon with a bipedal, tailless form",
    "Pokémon with a single pair of wings",
    "Pokémon with serpentine bodies",
    "Pokémon consisting of a head and arms"
]

const eggGroupLookup = [
  { "name": "Monster", "id": 0, "count": 81 },
  { "name": "Grass", "id": 1, "count": 89 },
  { "name": "Dragon", "id": 2, "count": 72 },
  { "name": "Water 1", "id": 3, "count": 114 },
  { "name": "Bug", "id": 4, "count": 91 },
  { "name": "Flying", "id": 5, "count": 73 },
  { "name": "Field", "id": 6, "count": 278 },
  { "name": "Fairy", "id": 7, "count": 66 },
  { "name": "No Eggs Discovered", "id": 8, "count": 151  },
  { "name": "Human-Like", "id": 9, "count": 70 },
  { "name": "Water 3", "id": 10, "count": 37 },
  { "name": "Mineral", "id": 11, "count": 84 },
  { "name": "Amorphous", "id": 12, "count": 63 },
  { "name": "Water 2", "id": 13, "count": 34 },
  { "name": "Ditto", "id": 14, "count": 1 }
]

const statRatingThresholds = {
  // For giving a rating from 0 to 5 (10) stars
  hp: [1, 35, 70, 110, 160],
  atk: [1, 50, 75, 110, 150],
  def: [1, 50, 75, 110, 150],
  sp_atk: [1, 50, 75, 110, 150],
  sp_def: [1, 50, 75, 110, 150],
  speed: [1, 50, 75, 110, 150],
  height: [0.1, 0.5, 0.75, 1.0, 1.5, 2, 4, 6, 10, 12], // In m
  weight: [0.1, 2, 5, 10, 30, 60, 125, 250, 500, 800], // In kg
  baseFriendship: [35, 50, 70, 100, 140],
}

const specialCaseDexIds = [
  // Pokemon that have too many forms for normal cases
  201, // Unown
  327, // Spinda - Do we care about the spots?
  869, // Alcremie
]

// ****** MINIFICATION CONSTANTS FOR INTERNAL INFORMATION *****
const tagPrefix = 'a'               // Generic Dialogue/Spit tag prefix
const evoCountPrefix = 'b'          // Count of how many times the character has evolved since being on the team (for pkmn who join at higher evolution stages)
const pwdDigitPrefix = 'd'          // Tracks digits in password entry
const evoStagePrefix = 'e'          // Evolution stage in family (0-based)
const maxEvoStagePrefix = 'em'      // Max Evolution stage in family (0-based)
const canEvolvePrefix = 'ep'        // Whether or not this 'Mon can evolve to another stage
const genderPrefix = 'g'            // For Gender/Pronouns 
const dexIdPrefix = 'i'             // For Pokedex ID
const familyIdPrefix = 'j'          // For Evolution Family ID
const firstPartnerPrefix = 'o'      // Original teammate vs later recruit
const variationPrefix = 'v'         // Variation prefix for tracking different regional forms, etc.
const likePrefix = 'ym'             // 'Yum'
const dislikePrefix = 'yk'          // 'Yuck'
const partnerT1Prefix = 'z'         // Partner original type1  -- Used to keep original team name when changing partners

const type1Prefix = 't1'
const type2Prefix = 't2'
const elWeakPrefix = 'w'
const elStrongPrefix = 's'
const elNullifyPrefix = 'n'

// Stat prefixes
const hpPrefix = 'xh'
const atkPrefix = 'xa'
const defPrefix = 'xd'
const spatkPrefix = 'xm'
const spdefPrefix = 'xr'
const spdPrefix = 'xs'
const weightPrefix = 'xw'
const heightPrefix = 'xh'

// Appearance prefixes
const colourPrefix = 'vc'
const bodytypePrefix = 'vb'

// Social prefixes
const eggGroupPrefix = 're'
const baseFriendshipPrefix = 'rf'

const rowPrefix = 'r'               // Row/Col for keyboard position
const colPrefix = 'c'

const charprefixes = ['h', 'f'];    // Hero, Friend

const familyBinaryPrefix = 'p'      // For binary-encoding family ID. Followed by number (0-9) for OFF or letter (A-J) for ON
const familyBinaryLength = 9;
const maxNameLength = familyBinaryLength - 1; // With our binary encoding, we can pair each with a letter or nature

const natureDigitId = maxNameLength;  // IDs are 0-indexed, so the nature digit comes immediately after the last name digit this way
const heroInfoDigitId = natureDigitId +1;
const miscInfoDigitId = heroInfoDigitId + 1;
const pkmnConfirmDigitId = miscInfoDigitId + 1;

const nameCharacters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '_'
];

function loadData() {
  const allPkmnAsync = fetch('/pokemadness/data/pkmn.json').then( resp => resp.json() ).then(data => { allPkmn = data }).catch( err => {console.log(err) });
  const naturesAsync = fetch('/pokemadness/data/natures.json').then( resp => resp.json() ).then(data => { natures = data }).catch( err => {console.log(err) });
  const typesAsync = fetch('/pokemadness/data/types.json').then( resp => resp.json() ).then(data => { types = data }).catch( err => {console.log(err) });
  const tagsAsync = fetch('/pokemadness/data/tags.json').then(resp => resp.json() ).then(data => { additionalTags = data }).catch( err => {console.log(err)});

  return Promise.all([ 
    allPkmnAsync, 
    naturesAsync, 
    typesAsync, 
    tagsAsync,
  ]);
}
function copyresult(){ 
  if(!allPkmn) { 
    alert('Not ready yet!');
  }
  navigator.clipboard.writeText(generateKeyboardHTML());
  alert('Generated HTML copied to clipboard!'); 
}
function copycss(){ 
  navigator.clipboard.writeText(generateCSS());
  alert('Generated CSS copied to clipboard!'); 
}

function binaryStringWithPadding(id, binaryLength) {
  binaryLength = binaryLength || familyBinaryLength;

  let binaryStringWithPadding = '0000000000' + parseInt(id).toString(2);
  binaryStringWithPadding = binaryStringWithPadding.substring(binaryStringWithPadding.length - binaryLength)

  return binaryStringWithPadding;
}
function toHex(number) { 
  return number.toString(16).toUpperCase() 
}
function random() {
    var x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
}