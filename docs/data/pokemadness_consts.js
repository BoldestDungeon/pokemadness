let pkmnCSS = '';
let keyboardHTML = '';
let allPkmn = null;
let natures = null;
let types = null;

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

// ****** MINIFICATION CONSTANTS FOR INTERNAL INFORMATION *****
const splitPrefix = 'a'             // Generic Dialogue/Spit tag prefix
const evoCountPrefix = 'b'          // Count of how many times the character has evolved since being on the team (for pkmn who join at higher evolution stages)
const pwdDigitPrefix = 'd'          // Tracks digits in password entry
const evoStage = 'e'                // Evolution stage in family (0-based)
const genderPrefix = 'g'            // For Gender/Pronouns 
const dexIdPrefix = 'i'             // For Pokedex ID
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
  const allPkmnAsync = fetch('data/src/pkmn.json').then( resp => resp.json() ).then(data => { allPkmn = data }).catch( err => {console.log(err) });
  const naturesAsync = fetch('data/src/natures.json').then( resp => resp.json() ).then(data => { natures = data }).catch( err => {console.log(err) });
  const typesAsync = fetch('data/src/types.json').then( resp => resp.json() ).then(data => { types = data }).catch( err => {console.log(err) });

  return Promise.all([ allPkmnAsync, naturesAsync, typesAsync]);
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

function idToBinaryDigits(id) {
  const str = '0000000000' + parseInt(id).toString(2);
  return str.substring(str.length - 10);
}
function toHex(number) { 
  return number.toString(16).toUpperCase() 
}
function random() {
    var x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
}