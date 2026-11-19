let pkmnCSS = '';
let keyboardHTML = '';
let allPkmn = null;

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
function copycsscalc(){ 
  navigator.clipboard.writeText(generateCalcCSS());
  alert('Generated CSS copied to clipboard!'); 
}
function idToBinaryDigits(id) {
  return ('0000000000' + parseInt(id).toString(2)).substr(-10);
}

const natures = [
  {
    id: 0,
    hex: "0x00",
    name: "Hardy",
    boost: "Attack",
    debuff: "Attack",
    like: "Spicy",
    dislike: "Spicy"
  },
  {
    id: 1,
    hex: "0x01",
    name: "Lonely",
    boost: "Attack",
    debuff: "Defense",
    like: "Spicy",
    dislike: "Sour"
  },
  {
    id: 2,
    hex: "0x02",
    name: "Brave",
    boost: "Attack",
    debuff: "Speed",
    like: "Spicy",
    dislike: "Sweet"
  },
  {
    id: 3,
    hex: "0x03",
    name: "Adamant",
    boost: "Attack",
    debuff: "SpecialAtk",
    like: "Spicy",
    dislike: "Dry"
  },
  {
    id: 4,
    hex: "0x04",
    name: "Naughty",
    boost: "Attack",
    debuff: "SpecialDef",
    like: "Spicy",
    dislike: "Bitter"
  },
  {
    id: 5,
    hex: "0x05",
    name: "Bold",
    boost: "Defense",
    debuff: "Attack",
    like: "Sour",
    dislike: "Spicy"
  },
  {
    id: 6,
    hex: "0x06",
    name: "Docile",
    boost: "Defense",
    debuff: "Defense",
    like: "Sour",
    dislike: "Sour"
  },
  {
    id: 7,
    hex: "0x07",
    name: "Relaxed",
    boost: "Defense",
    debuff: "Speed",
    like: "Sour",
    dislike: "Sweet"
  },
  {
    id: 8,
    hex: "0x08",
    name: "Impish",
    boost: "Defense",
    debuff: "SpecialAtk",
    like: "Sour",
    dislike: "Dry"
  },
  {
    id: 9,
    hex: "0x09",
    name: "Lax",
    boost: "Defense",
    debuff: "SpecialDef",
    like: "Sour",
    dislike: "Bitter"
  },
  {
    id: 10,
    hex: "0x0A",
    name: "Timid",
    boost: "Speed",
    debuff: "Attack",
    like: "Sweet",
    dislike: "Spicy"
  },
  {
    id: 11,
    hex: "0x0B",
    name: "Hasty",
    boost: "Speed",
    debuff: "Defense",
    like: "Sweet",
    dislike: "Sour"
  },
  {
    id: 12,
    hex: "0x0C",
    name: "Serious",
    boost: "Speed",
    debuff: "Speed",
    like: "Sweet",
    dislike: "Sweet"
  },
  {
    id: 13,
    hex: "0x0D",
    name: "Jolly",
    boost: "Speed",
    debuff: "SpecialAtk",
    like: "Sweet",
    dislike: "Dry"
  },
  {
    id: 14,
    hex: "0x0E",
    name: "Naive",
    boost: "Speed",
    debuff: "SpecialDef",
    like: "Sweet",
    dislike: "Bitter"
  },
  {
    id: 15,
    hex: "0x0F",
    name: "Modest",
    boost: "SpecialAtk",
    debuff: "Attack",
    like: "Dry",
    dislike: "Spicy"
  },
  {
    id: 16,
    hex: "0x10",
    name: "Mild",
    boost: "SpecialAtk",
    debuff: "Defense",
    like: "Dry",
    dislike: "Sour"
  },
  {
    id: 17,
    hex: "0x11",
    name: "Quiet",
    boost: "SpecialAtk",
    debuff: "Speed",
    like: "Dry",
    dislike: "Sweet"
  },
  {
    id: 18,
    hex: "0x12",
    name: "Bashful",
    boost: "SpecialAtk",
    debuff: "SpecialAtk",
    like: "Dry",
    dislike: "Dry"
  },
  {
    id: 19,
    hex: "0x13",
    name: "Rash",
    boost: "SpecialAtk",
    debuff: "SpecialDef",
    like: "Dry",
    dislike: "Bitter"
  },
  {
    id: 20,
    hex: "0x14",
    name: "Calm",
    boost: "SpecialDef",
    debuff: "Attack",
    like: "Bitter",
    dislike: "Spicy"
  },
  {
    id: 21,
    hex: "0x15",
    name: "Gentle",
    boost: "SpecialDef",
    debuff: "Defense",
    like: "Bitter",
    dislike: "Sour"
  },
  {
    id: 22,
    hex: "0x16",
    name: "Sassy",
    boost: "SpecialDef",
    debuff: "Speed",
    like: "Bitter",
    dislike: "Sweet"
  },
  {
    id: 23,
    hex: "0x17",
    name: "Careful",
    boost: "SpecialDef",
    debuff: "SpecialAtk",
    like: "Bitter",
    dislike: "Dry"
  },
  {
    id: 24,
    hex: "0x18",
    name: "Quirky",
    boost: "SpecialDef",
    debuff: "SpecialDef",
    like: "Bitter",
    dislike: "Bitter"
  }
];
const flavourLookup = {
  Spicy: 0,
  Sour: 1,
  Sweet: 2,
  Dry: 3,
  Bitter: 4
};
const types = [
{ id: 0, colour: '#9fa19f', name: 'Normal', teamPrefix: 'Explorer', teamSuffix: ' Crew', strong: [], weak: [1], nullify: [7] },
{ id: 1, colour: '#ff8000', name: 'Fighting', teamPrefix: 'Fist', teamSuffix: ' Warriors', strong: [5,6,16], weak: [2,13,17], nullify: [] },
{ id: 2, colour: '#81b9ef', name: 'Flying', teamPrefix: 'Wing', teamSuffix: 's From Above', strong: [1,6], weak: [5,12,14], nullify: [4] },
{ id: 3, colour: '#9141cb', name: 'Poison', teamPrefix: 'Punk', teamSuffix: 'bane', strong: [1,3,6,11,17], weak: [4,13], nullify: [] },
{ id: 4, colour: '#915121', name: 'Ground', teamPrefix: 'Sand', teamSuffix: 's of Destiny', strong: [3,5,], weak: [10,11,14], nullify: [12] },
{ id: 5, colour: '#afa981', name: 'Rock', teamPrefix: 'Boulder', teamSuffix: ' Defenders', strong: [0,2,3,9], weak: [1,4,8,10,11], nullify: [] },
{ id: 6, colour: '#91a119', name: 'Bug', teamPrefix: 'Web', teamSuffix: ' Buddies', strong: [1,4,11], weak: [2,4,11], nullify: [] },
{ id: 7, colour: '#704170', name: 'Ghost', teamPrefix: 'Shadow', teamSuffix: 's of Memory', strong: [3,6], weak: [7,16], nullify: [0,1] },
{ id: 8, colour: '#60a1b8', name: 'Steel', teamPrefix: 'Knight', teamSuffix: 's of Justice', strong: [0,2,5,6,8,11,13,14,15,17], weak: [1,4,9], nullify: [3] },
{ id: 9, colour: '#e62829', name: 'Fire', teamPrefix: 'Blaze', teamSuffix: ' Inferno', strong: [6,8,9,11,14,17], weak: [4,5,10], nullify: [] },
{ id: 10, colour: '#2980ef', name: 'Water', teamPrefix: 'Wave', teamSuffix: ' Surfers', strong: [8,9,10,14], weak: [11,12], nullify: [] },
{ id: 11, colour: '#3fa129', name: 'Grass', teamPrefix: 'Tree', teamSuffix: 'garden', strong: [4,10,11,12], weak: [2,3,6,9,14], nullify: [] },
{ id: 12, colour: '#fac000', name: 'Electric', teamPrefix: 'Spark', teamSuffix: 'shock', strong: [2,8,12], weak: [4], nullify: [] },
{ id: 13, colour: '#ef4179', name: 'Psychic', teamPrefix: 'Vision', teamSuffix: 'mancers', strong: [1,13], weak: [6,7,16], nullify: [] },
{ id: 14, colour: '#3dcef3', name: 'Ice', teamPrefix: 'Squall', teamSuffix: 'haven', strong: [14], weak: [1,5,8,9], nullify: [] },
{ id: 15, colour: '#5060e1', name: 'Dragon', teamPrefix: 'Realm', teamSuffix: 's of Rage', strong: [9,10,11,12], weak: [14,15,17], nullify: [] },
{ id: 16, colour: '#624d4e', name: 'Dark', teamPrefix: 'Power', teamSuffix: ' Offensive', strong: [7,16], weak: [1,6,17], nullify: [13] },
{ id: 17, colour: '#ef70ef', name: 'Fairy', teamPrefix: 'Disco', teamSuffix: ' Magic', strong: [1,6,16], weak: [3,8], nullify: [15] }
  
];
const kbchars = [
'A','B','C','D','E','F','G','H','I','J','K','L','M',
'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
'0','1','2','3','4','5','6','7','8','9','!','?','🚲',
'⊙','✊','🕊','☣','🕳','🪨','🐞','👻','⌶','🔥','💧','🍃','⚡',
'✲','🧊','🐲','❍','🧚','☎','☠','☮','☂','⚄','✎','☹','☺'
]
const pronouns = ['f', 'm', 'n'];

const allPkmnAsync = fetch('data/src/pkmn.json').then( resp => resp.json() ).then(data => { allPkmn = data }).catch( err => {console.log(err) });


const gen9start = 906;
const maxGen8fam = 468;
let randomSeed = 151;
function random() {
    var x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
}

// ****** MINIFICATION NOTES FOR INTERNAL INFORMATION *****
// Generic Dialogue/Spit tag prefix:['a'];
// Evolution-count prefix:          ['b'];
// Password digit prefix:           ['d'];
// Evolution stage in family:       ['e'];
// Gender/Pronouns prefix:          ['g'];
// Pokedex ID:                      ['i'];
// Original teammate vs recruit:    ['o'];
// Variation prefix:                ['v'];
// Liked/Disliked flavours          ['ym', 'yk];  -- Yum/Yuck
// Partner original type1           ['z'];        -- Used to keep original team name when changing partners
// Row, Col prefixes:               ['r', 'c'];
// Type 1, Type 2:                  ['t1', t2];
// Weak/Strong/Nullify prefixes     ['w', 's', 'n'];
const charprefixes = ['h', 'f']; // Hero, Friend
const binaryprefixes = ['j', 'k', 'l', 'm', 'p', 'q', 't', 'u', 'w', 'x']; // Used for binary-encoding 'dex ID. (Do we need different prefixes for each digit? Does it actually provide any anti-lag benefit?)

const familyBinaryPrefixes = ['j', 'k', 'l', 'm', 'p', 'q', 't', 'u', 'w'] // If we're tracking evostage anyways, we can save a digit on binary prefixes (add the x back in to be able to cover all Gen9 pkmn as well?)

const nameCharacters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '_'
];
const natureDigitId = 8;
const heroInfoDigitId = 9;
const miscInfoDigitId = 'A';
const pkmnConfirmDigitId = 'B';

function generateKeyboardHTML(){
  return kbdisplayHTML() + kbbuttondisplayHTML() + characterNameEntries() + characterPwdEntries() + keyboardEndBtn();
}

function characterNameEntries() {
  let charHTML = '';
  for(let c=0; c<charprefixes.length; c++) {
    charHTML += `
    <div class="${charprefixes[c]} keyboard-entry kb kb_name">
      ${generateNewNameInputs()}
    </div>`;
  }
  return charHTML;
}

function characterPwdEntries() {
  let charHTML = '';
  for(let c=0; c<charprefixes.length; c++) {
    charHTML += `
    <div class="${charprefixes[c]} keyboard-entry kb kb_password">
      ${generatePwdInputs(charprefixes[c])}
    </div>`;
  }
  return charHTML;
}

function getRowCols(){
  let positions = [];
  for(let r=1; r<=5; r++){
    for(let c=1; c<=13; c++){
      positions.push({ row: r, col: c, order: random() })
    }
  }
  return positions.sort( (a,b) => (b.order-a.order) );
}

function generatePwdInputs(heroType) {
  return generateNameInputs() + generateNatureInput() + generateHeroInfo(heroType) + generateMiscInfo() + generatePkmnList();
}

function generateNameInputs(){
  let nameInputs = '';
  for(let i=0; i<8; i++) {
    nameInputs += `<div class="d${i}">${generateNameInput(i)}</div>`;
  }
  return nameInputs;
}

function generateNewNameInputs() {
  let output = '';
  for(let d=0; d<8; d++) {
    let row = 1, col = 1;
    for(let a=0; a<nameCharacters.length; a++) {
      output += '\n\t' + generatePwdInput(d, {row: row, col: col}, {e: nameCharacters[a]});
      col ++;
      if(col > 13) {
        row++;
        col = 1;
      }
    }
  }
  return output;
}

function generateNameInput(i){
  const pkmnBinaryPrefix = binaryprefixes[i];
  const rowCols = getRowCols();
  
  let output = '';
  for(let p=0; p<2; p++) {
    for(let a=0; a<nameCharacters.length; a++) {
      output += '\n\t' + generatePwdInput(i, rowCols.pop(), {e: nameCharacters[a], [pkmnBinaryPrefix]: p})
    }
  }
  output += generateFillerInputs(i, rowCols);
  return output;
}

function generateNatureInput(){
  const rowCols = getRowCols();
  const pkmnBinaryPrefix = binaryprefixes[natureDigitId]
  let output = '';
  for(let n=0; n<natures.length; n++){
    for(let p=0; p<2; p++){
      const nature = natures[n];
      const data = { n: nature.id, [pkmnBinaryPrefix]: p }
      if(nature.like != nature.dislike) {
        data['ym'] = flavourLookup[nature.like];
        data['yk'] = flavourLookup[nature.dislike];
      }
      output += '\n\t' + generatePwdInput(natureDigitId, rowCols.pop(), data);
    }
  }
  output += generateFillerInputs(natureDigitId, rowCols);
  return output;
}

function generateHeroInfo(herotype) {
  const rowCols = getRowCols();
  const pkmnBinaryPrefix = binaryprefixes[parseInt(`0x${heroInfoDigitId}`)];
  let output = '';
  for (let p=0; p<2; p++) {
    if(herotype === charprefixes[0]) { // Hero pkmn
      // Type ID of first partner
      for (let t=0; t<types.length; t++) {
        const data = {z: t, [pkmnBinaryPrefix]: p }
        output += '\n\t' + generatePwdInput(heroInfoDigitId, rowCols.pop(), data)
      }
    } else { // Partner pkmn
        for(let o=0; o<2; o++) {
          const data = {o: o, [pkmnBinaryPrefix]: p };
          output += '\n\t' + generatePwdInput(heroInfoDigitId, rowCols.pop(), data);
        }  
    }
  }
  output += generateFillerInputs(heroInfoDigitId, rowCols);
  return output;
}

function generateMiscInfo() {
  // Gender/Pronouns, Evolution Count and Variation ID
  const rowCols = getRowCols();
  let output = '';
  for(let pro=0; pro<pronouns.length; pro++) {
    const pronounCode = pronouns[pro];
    for(let evo=0; evo<3; evo++){
      for(let v=0; v<7; v++){
        const data = { g: pronouns[pro], e: evo, v: v };
        output += '\n\t' + generatePwdInput(miscInfoDigitId, rowCols.pop(), data);
      }
    }
  }
  output += generateFillerInputs(miscInfoDigitId, rowCols);
  return output;
}

function generatePkmnList() {
  let rowCols = [];
  let output = '';

  for(let dexId in allPkmn) {
    const dexIdInt = parseInt(dexId)
    if(dexIdInt >= gen9start) {
      break;
    }
    const pkmn = allPkmn[dexId];
    const dexIdBin = idToBinaryDigits(dexIdInt);
    const forms = pkmn.forms;
    
    const data = { i: dexId }
    
    for(let d=0; d<binaryprefixes.length; d++) {
      const binprefix = 'b' + binaryprefixes[d];
      data[binprefix] = dexIdBin[d];
    }
    
    for(let f=0; f<forms.length; f++){
      const form = forms[f];
      data.bv = f;
      data.s = []; // Type strengths (resistances)
      data.w = []; // Type weaknesses
      data.n = []; // Types nullified
      
      let type1 = types.find(t => t.name.toLowerCase() == form.type1.toLowerCase());
      let type2 = types.find(t => t.name.toLowerCase() == form.type2.toLowerCase());
      
      if (type1.name.toLowerCase() === 'normal' && type2) {
        // Swap things like "Normal/Flying" to make 'Normal' the seconadary type
        type1 = type2;
        type2 = types[0];
      }
      data.t1 = type1.id.toString(18);
      if(type2) {
        data.t2 = type2.id.toString(18);
      }
      const allResist = type1.strong.concat( type2?.strong || [] );
      const allWeak = type1.weak.concat( type2?.weak || [] );
      const allNull = type1.nullify.concat( type2?.nullify || [] );
      
      for(let r=0; r<allResist.length; r++){
        const resistId = allResist[r];
        if(!allNull.includes(resistId) && !allWeak.includes(resistId)){
          data.s.push(resistId.toString(18));
        }
      }
      for(let w=0; w<allWeak.length; w++) {
        const weakId = allWeak[w];
        if(!allNull.includes(weakId) && !allResist.includes(weakId)) {
          data.w.push(weakId.toString(18));
        }
      }
      for(let n=0; n<allNull.length; n++) {
        // Nullification overrides everything
        data.n.push(allNull[n].toString(18));
      }
      if(!rowCols.length) {
        rowCols = getRowCols();
      }
      console.log('TIME TO POKÉ');
      output += '\n\t' + generatePwdInput(pkmnConfirmDigitId, rowCols.pop(), data);
    }
    
  }
  // Add an 'invalid' entry in each row/col position
  rowCols = getRowCols();
  output += generateFillerInputs(pkmnConfirmDigitId, rowCols);

  return output;  
}

function generateFillerInputs(digitNum, rowCols){
  let output = '';
  for(let i=0; i<rowCols.length; i++) {
    const rowCol = rowCols[i];
    output += '\n\t' + `<details class="invalid d${digitNum} r${rowCol.row} c${rowCol.col}"><summary></summary></details>`
  }
  return output;
}

function generatePwdInput(digitNum, rowCol, props) {
  let classStr = `d${digitNum.toString(16).toUpperCase()} r${rowCol.row} c${rowCol.col}`;
  for(let key in props) {
    if(props[key] instanceof Array){
      for(let i=0; i< props[key].length; i++){
        classStr += ` ${key}${props[key][i]}`
      }
    } else {
      classStr += ` ${key}${props[key]}`
    }
  }
  return `<details class="${classStr}"><summary></summary></details>`
}

function keyboardEndBtn(){
  return '\n\t' + `<details class="kb_confirm"><summary></summary></details>`;
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

function generateCSS() {
  return generateTypeBasedCSS() + generateTextDisplayCSS() + generatePkmnBasedCSS()// + generateSplitBasedCSS();
}

function generateTypeBasedCSS(){
  return teamNameCSS() + portraitBorderCSS();
}

function teamNameCSS(){
  let output = '';
  for(let t=0; t<types.length; t++) {
    const typeobj = types[t];
    output += `
:has(.${charprefixes[0]} .t1${typeobj.id.toString(18)}[open]) .team:before {
  content: "${typeobj.teamPrefix}";
}
:has(.${charprefixes[1]} .t1${typeobj.id.toString(18)}[open]) .team:after {
  content: "${typeobj.teamSuffix}";
}`;
  }
  return output;
}

function portraitBorderCSS() {
  let output = '';
  for(let t=0; t<types.length; t++) {
    const typeobj = types[t];
    output += `
:has(.${charprefixes[0]} .t1${typeobj.id.toString(18)}[open]) .hero-img,
:has(.${charprefixes[1]} .t1${typeobj.id.toString(18)}[open]) .friend-img {
  border-color: ${typeobj.colour};
}
:has(.${charprefixes[0]}.${charprefixes[0]} .t2${typeobj.id.toString(18)}[open]) .hero-img,
:has(.${charprefixes[1]}.${charprefixes[1]} .t2${typeobj.id.toString(18)}[open]) .friend-img {
  border-bottom-color: ${typeobj.colour};
  border-left-color: ${typeobj.colour};
}`;
  }
  return output;
}

function generateTextDisplayCSS() {
  return kbDisplayCSS() + nameDisplayCSS() + natureDisplayCSS();
}

function kbdisplayHTML() {
  return `<div class="kbdisplay">${kbdisplayLetterHTML()}</div>`;
}

function kbbuttondisplayHTML() {
  let output = '';
  let row = 1;
  let col = 1;
  for(let l=0; l<kbchars.length; l++) {
    const letter = kbchars[l];
    output += `
  <div class="kbletter r${row} dr${row} c${col} dc${col}" ${row > 2 ? 'pwd_only' : 'kb_alpha' }><span class="digit_disp">${letter}</span></div>`;
    col+=1;
    if(col > 13) {
      col = 1;
      row += 1;
    }
  }
  
  return `<div class="kbletters">${output}</div>`;
}

function kbdisplayLetterHTML() {
  let output = '\n';
  for (let c=0; c<charprefixes.length; c++) {
    const charprefix = charprefixes[c];
    for(let d=0; d<12; d++) {
      const digitCode = d.toString(12).toUpperCase();
      output += `<span class="dd${charprefix}${digitCode}">`
      let row = 1, col = 1;
      for(let a=0; a<kbchars.length; a++) {
        output+=`<span class="dr${row} dc${col}"><span class="digit_disp">${kbchars[a]}</span></span>`
        col++;
        if(col > 13) {
          col = 1;
          row ++;
        }
      }
      output += '<\/span>\n'
    }
  }
  return output;
}

function kbDisplayCSS() {
  let output = '';

  for(let d=0; d<12; d++) {
    const digitCode = d.toString(12).toUpperCase();
    if(d) { output += ','; }
    output += `
:not(:has(.${charprefixes[0]} .d${digitCode}[open])) .dd${charprefixes[0]}${digitCode},
:not(:has(.${charprefixes[1]} .d${digitCode}[open])) .dd${charprefixes[1]}${digitCode}`;
    for(let col=1; col<=13; col++) {
      output+=`,
:has(.${charprefixes[0]} .d${digitCode}.c${col}[open]) .dd${charprefixes[0]}${digitCode}>:not(.dc${col}),
:has(.${charprefixes[1]} .d${digitCode}.c${col}[open]) .dd${charprefixes[1]}${digitCode}>:not(.dc${col})`
    }
    for(let row=1; row <= 5; row++) {
      output+=`,
:has(.${charprefixes[0]} .d${digitCode}.r${row}[open]) .dd${charprefixes[0]}${digitCode}>:not(.dr${row}),
:has(.${charprefixes[1]} .d${digitCode}.r${row}[open]) .dd${charprefixes[1]}${digitCode}>:not(.dr${row})`
    }
  }
  output += ` {
  display: none;
}`
  
  return output;
}

function nameDisplayCSS() {
  let output = '';
  for(let a=0; a<26; a++) {
    for(let d=0; d<8; d++) {
      if(d) { output += ','; }
      let selector = '';
      
      if(d == 0) { selector = 'name:before'; }
      else if (d == 7) { selector = 'name:after'; }
      else { selector = `name>:nth-child(${Math.ceil(d/2)}):${d%2 ? 'before' : 'after'}`; }
      output += `
:has(.${charprefixes[0]} .d${d}.e${String.fromCharCode(65+a)}[open]) .${selector},
:has(.${charprefixes[1]} .d${d}.e${String.fromCharCode(65+a)}[open]) .${charprefixes[1]}${selector}`
    }
    output += ` {
  content: '${ String.fromCharCode(65+a) }';
}`
  }
  return output;
}

function natureDisplayCSS() {
  let output = '';
  for(let n=0; n<natures.length; n++) {
    let natureObj = natures[n];
    output += `
:has(.${charprefixes[0]} .n${natureObj.id}[open]) .nature:before,
:has(.${charprefixes[1]} .n${natureObj.id}[open]) .${charprefixes[1]}nature:before {
  content: '${natureObj.name}';
}
`
  }
  return output;
}

function generatePkmnBasedCSS() {
  return pkmnPwdConfirm() + pkmnNameDisplay() + pkmnImageDisplay();
}

function pkmnPwdConfirm() {
  let output = '';
  for(let i=0; i<binaryprefixes.length; i++) {
    const prefix = binaryprefixes[i];
    if(i) { output += ',' }
    output += `
:not(:has(.${charprefixes[0]} .${prefix}0[open])) .${charprefixes[0]} .b${prefix}0,
:not(:has(.${charprefixes[0]} .${prefix}1[open])) .${charprefixes[0]} .b${prefix}1,
:not(:has(.${charprefixes[1]} .${prefix}0[open])) .${charprefixes[1]} .b${prefix}0,
:not(:has(.${charprefixes[1]} .${prefix}1[open])) .${charprefixes[1]} .b${prefix}1`
  }
  for(let v=0; v<7; v++) {
    output += `,
:not(:has(.${charprefixes[0]} .v${v}[open])) .${charprefixes[0]} .bv${v},
:not(:has(.${charprefixes[1]} .v${v}[open])) .${charprefixes[1]} .bv${v}`
  }
  output += ` {
  display: none;
}`
  
  return output;
}

function pkmnNameDisplay() {
  let output = ` .vari:before,
 .${charprefixes[1]}vari:before {
  content: 'Normal';
}`;
  for (let dexId in allPkmn) {
    const dexIdInt = parseInt(dexId)
    if(dexIdInt >= gen9start) {
      break;
    }
    const pkmn = allPkmn[dexId];
    output += `
:has(.${charprefixes[0]} .i${dexIdInt}[open]) .mon:before,
:has(.${charprefixes[1]} .i${dexIdInt}[open]) .${charprefixes[1]}mon:before {
  content: '${pkmn.name}';
}`
    for(var f=0; f<pkmn.forms.length; f++){ 
      const form = pkmn.forms[f];
      if(form.form !== 'default') {
        output += `
:has(.${charprefixes[0]} .i${dexIdInt}.v${f}[open]) .vari:before,
:has(.${charprefixes[1]} .i${dexIdInt}.v${f}[open]) .${charprefixes[1]}vari:before {
  content: '${form.form}';
}`
      }
    }
    
  }
  return output;
}

function pkmnImageDisplay() {
  let output = ``;
  for (let dexId in allPkmn) {
    const dexIdInt = parseInt(dexId)
    if(dexIdInt >= gen9start) {
      break;
    }
    const pkmn = allPkmn[dexId];
    output += `
:has(.${charprefixes[0]} .i${dexIdInt}[open]) .hero-img,
:has(.${charprefixes[1]} .i${dexIdInt}[open]) .friend-img {
  background: url(https://pkmn.short.gy/${dexIdInt}.png);
}`
    for(let f=1; f<pkmn.forms.length; f++) {
      output += `
:has(.${charprefixes[0]} .i${dexIdInt}.bv${f}[open]) .hero-img,
:has(.${charprefixes[1]} .i${dexIdInt}.bv${f}[open]) .friend-img {
  background: url(https://pkmn.short.gy/${dexIdInt}v${f}.png);
}`
    }
  }
  return output;
}

function generateCalcCSS() {
  return calcTypeBasedCSS() + calcTextDisplayCSS() + calcPkmnBasedCSS() //+ calcSplitBasedCSS();
}

function calcTypeBasedCSS() {
  // Team name and border colours
  let output = `
 .team:before {
  content: var(--team-prefix);
}
 .team:after {
  content: var(--team-suffix)
}
 .hero-img {
  border-color: var(--${charprefixes[0]}t1-colour);
  border-right-color: var(--${charprefixes[0]}t2-colour);
  border-bottom-color: var(--${charprefixes[0]}t2-colour);
}
 .partner-img {
  border-color: var(--${charprefixes[1]}t1-colour);
  border-right-color: var(--${charprefixes[1]}t2-colour);
  border-bottom-color: var(--${charprefixes[1]}t2-colour);
}`;
  for(let t=0; t<types.length; t++) {
    const typeobj = types[t];
    output += `
:has(.${charprefixes[0]} .t1${typeobj.id.toString(18)}[open]) {
  --team-prefix: "${typeobj.teamPrefix}";
  --${charprefixes[0]}t1-color: ${typeobj.colour};
  --${charprefixes[0]}t2-color: ${typeobj.color};
}
:has(.${charprefixes[1]} .t1${typeobj.id.toString(18)}[open]) {
  --team-suffix: "${typeobj.teamSuffix}";
  --${charprefixes[1]}t1-color: ${typeobj.colour};
  --${charprefixes[1]}t2-color: ${typeobj.color};
}`;
  }
  for(let t=0; t<types.length; t++) {
    const typeobj = types[t];
    output += `
:has(.${charprefixes[0]}.${charprefixes[0]} .t2${typeobj.id.toString(18)}[open]) {
  --${charprefixes[0]}t2-color: ${typeobj.color};
}
:has(.${charprefixes[1]}.${charprefixes[1]} .t2${typeobj.id.toString(18)}[open]) {
  --${charprefixes[1]}t2-color: ${typeobj.color};
}`;
  }
  return output;
}

function calcTextDisplayCSS() {
  let output = `
${kbDisplayCSS()}
 .name:before {
  content: var(--${charprefixes[0]}n0)var(--${charprefixes[0]}n1)var(--${charprefixes[0]}n2)var(--${charprefixes[0]}n3)var(--${charprefixes[0]}n4)var(--${charprefixes[0]}n5)var(--${charprefixes[0]}n6)var(--${charprefixes[0]}n7);
}
 .${charprefixes[1]}name:before {
  content: var(--${charprefixes[1]}n0)var(--${charprefixes[1]}n1)var(--${charprefixes[1]}n2)var(--${charprefixes[1]}n3)var(--${charprefixes[1]}n4)var(--${charprefixes[1]}n5)var(--${charprefixes[1]}n6)var(--${charprefixes[1]}n7);
}
 .nature:before {
  content: var(--${charprefixes[0]}nat);
}
 .${charprefixes[1]}nature:before {
  content: var(--${charprefixes[1]}nat);
}`;
  for(let c=0; c<26; c++) {
    for(let d=0; d<8; d++) {
      output += `
:has(.${charprefixes[0]} .d${d}.e${String.fromCharCode(65+c)}[open]) { --${charprefixes[0]}n${d}: '${String.fromCharCode(65+c)}'; }
:has(.${charprefixes[1]} .d${d}.e${String.fromCharCode(65+c)}[open]) { --${charprefixes[1]}n${d}: '${String.fromCharCode(65+c)}'; }`
    }
  }
  
  for(let n=0; n<natures.length; n++) {
    const natureObj = natures[n];
    output += `
:has(.${charprefixes[0]} .n${natureObj.id}[open]) { --${charprefixes[0]}nat: '${natureObj.name}'; }
:has(.${charprefixes[1]} .n${natureObj.id}[open]) { --${charprefixes[1]}nat: '${natureObj.name}'; } `
  }
  return output;
}

function calcPkmnBasedCSS() {
  let output = `
${pkmnPwdConfirm()}
 .mon:before {
  content: var(--mon);
}
 .${charprefixes[1]}mon:before {
  content: var(--${charprefixes[1]}mon);
}
 .${charprefixes[0]}img {
  background: var(--img);
}
 .${charprefixes[1]}img {
  background: var(--${charprefixes[1]}img);
}`;
  
  for(let p in allPkmn) {
    const pkmn = allPkmn[p];
    const dexIdInt = parseInt(p);
    if(dexIdInt >= gen9start) {break;}
    output += `
:has(.${charprefixes[0]} .i${dexIdInt}[open]) {
  --${charprefixes[0]}mon: "${pkmn.name}";
  --${charprefixes[0]}img: url(https://pkmn.short.gy/${p}.png);${pkmn.forms[0].form == 'default' ? '' : `
  --${charprefixes[1]}var: '${pkmn.forms[0].form }';`}
}
:has(.${charprefixes[1]} .i${dexIdInt}[open]) {
  --${charprefixes[1]}mon: "${pkmn.name}";
  --${charprefixes[1]}img: url(https:\/\/pkmn.short.gy/${p}.png);${pkmn.forms[0].form == 'default' ? '' : `
  --${charprefixes[1]}var: '${pkmn.forms[0].form }';`}
}`;
    for (var f=1; f<pkmn.forms.length; f++) {
      output += `
:has(.${charprefixes[0]} .i${dexIdInt}.v${f}[open]) {
  --${charprefixes[1]}img: url(https:\/\/pkmn.short.gy/${p}v${f}.png);
  --${charprefixes[1]}var: '${pkmn.forms[f].form}';
}
:has(.${charprefixes[1]} .i${dexIdInt}.v${f}[open]) {
  --${charprefixes[1]}img: url(https:\/\/pkmn.short.gy/${p}v${f}.png);
  --${charprefixes[1]}var: '${pkmn.forms[f].form}';
}`;
    }
  }
  return output;
}

window.addEventListener('load', function() {
  allPkmnAsync.then( () => {
    kbtarget.innerHTML = generateKeyboardHTML();
    kbtarget2.innerHTML = generateKeyboardHTML2();
  });
})

function generateKeyboardHTML2() {
  return kbdisplayHTML() + kbbuttondisplayHTML() + characterNameEntries() + characterPwdEntries2();
}

function characterPwdEntries2() {
  // Two separate password blocks: Hero and Friend
  for(let c=0; c<charprefixes.length; c++) {
    charHTML += `
    <div class="${charprefixes[c]} keyboard-entry kb kb_password">
      ${generatePwdInputs2(charprefixes[c])}
    </div>`;
  }
  return charHTML;
}
function generatePwdInputs2(heroType) {
  return generateNameInputs2() + generateNatureInput2() + generateHeroInfo2(heroType) + generateMiscInfo2() + generatePkmnList2();
}
function generateNewNameInputs2() {
  let output = '';
  for(let d=0; d<8; d++) {
    output += `<div class="$d{d}">` + '\n';
    let row = 1, col = 1;
    for(let a=0; a<nameCharacters.length; a++) {
      output += '\n\t' + generatePwdInput(d, {row: row, col: col}, {e: nameCharacters[a]});
      col ++;
      if(col > 13) {
        row++;
        col = 1;
      }
    }
    output += '\n</div>'
  }
  return output;
}
function generateNatureInput2() {
  // Nature code plus pokedex binary digit (50 input digits used)
  const rowCols = getRowCols();
  const pkmnBinaryPrefix = binaryprefixes[natureDigitId]
  let output = '';
  for(let n=0; n<natures.length; n++){
    for(let p=0; p<2; p++){
      const nature = natures[n];
      const data = { n: nature.id, [pkmnBinaryPrefix]: p }
      if(nature.like != nature.dislike) {
        data['ym'] = flavourLookup[nature.like];
        data['yk'] = flavourLookup[nature.dislike];
      }
      output += '\n\t' + generatePwdInput(natureDigitId, rowCols.pop(), data);
    }
  }
  output += generateFillerInputs(natureDigitId, rowCols);
  return `  <div class="d${natureDigitId}>
      ${output}
  </div>`;

}

function generateHeroInfo2(heroType) {
  const rowCols = getRowCols();
  const pkmnBinaryPrefix = binaryprefixes[parseInt(`0x${heroInfoDigitId}`)];
  let output = '';
  for (let p=0; p<2; p++) {
    if(herotype === charprefixes[0]) { // Hero pkmn
      // Type ID of first partner
      for (let t=0; t<types.length; t++) {
        const data = {z: t, [pkmnBinaryPrefix]: p }
        output += '\n\t' + generatePwdInput(heroInfoDigitId, rowCols.pop(), data)
      }
    } else { // Partner pkmn
        for(let o=0; o<2; o++) {
          const data = {o: o, [pkmnBinaryPrefix]: p };
          output += '\n\t' + generatePwdInput(heroInfoDigitId, rowCols.pop(), data);
        }  
    }
  }
  output += generateFillerInputs(heroInfoDigitId, rowCols);
  return `  <div class="d${heroInfoDigitId}>
      ${output}
  </div>`;
}

function generateMiscInfo2() {

}

function generatePkmnList2() {
  let rowCols = [];
  let output = '';

  for(let dexId in allPkmn) {
    if(isNaN(dexId)) { continue; }

    const dexIdInt = parseInt(dexId);

    const pkmn = allPkmn[dexId];
    const evoFam = pkmn.evolutionFamily;
    const evoFamId = evoFam.id;

    const dexIdBin = idToBinaryDigits(dexIdInt);
    const forms = pkmn.forms;
    
    const data = { i: dexId }
    
    for(let d=0; d<binaryprefixes.length; d++) {
      const binprefix = 'b' + binaryprefixes[d];
      data[binprefix] = dexIdBin[d];
    }
    
    for(let f=0; f<forms.length; f++){
      const form = forms[f];
      data.bv = f;
      data.s = []; // Type strengths (resistances)
      data.w = []; // Type weaknesses
      data.n = []; // Types nullified
      
      let type1 = types.find(t => t.name.toLowerCase() == form.type1.toLowerCase());
      let type2 = types.find(t => t.name.toLowerCase() == form.type2.toLowerCase());
      
      if (type1.name.toLowerCase() === 'normal' && type2) {
        // Swap things like "Normal/Flying" to make 'Normal' the seconadary type
        type1 = type2;
        type2 = types[0];
      }
      data.t1 = type1.id.toString(18);
      if(type2) {
        data.t2 = type2.id.toString(18);
      }
      const allResist = type1.strong.concat( type2?.strong || [] );
      const allWeak = type1.weak.concat( type2?.weak || [] );
      const allNull = type1.nullify.concat( type2?.nullify || [] );
      
      for(let r=0; r<allResist.length; r++){
        const resistId = allResist[r];
        if(!allNull.includes(resistId) && !allWeak.includes(resistId)){
          data.s.push(resistId.toString(18));
        }
      }
      for(let w=0; w<allWeak.length; w++) {
        const weakId = allWeak[w];
        if(!allNull.includes(weakId) && !allResist.includes(weakId)) {
          data.w.push(weakId.toString(18));
        }
      }
      for(let n=0; n<allNull.length; n++) {
        // Nullification overrides everything
        data.n.push(allNull[n].toString(18));
      }
      if(!rowCols.length) {
        rowCols = getRowCols();
      }
      console.log('TIME TO POKÉ');
      output += '\n\t' + generatePwdInput(pkmnConfirmDigitId, rowCols.pop(), data);
    }
    
  }
  // Add an 'invalid' entry in each row/col position
  rowCols = getRowCols();
  output += generateFillerInputs(pkmnConfirmDigitId, rowCols);

  return output;  

}

/*
function characterPwdEntries() {
  let charHTML = '';
  for(let c=0; c<charprefixes.length; c++) {
    charHTML += `
    <div class="${charprefixes[c]} keyboard-entry kb kb_password">
      ${generatePwdInputs(charprefixes[c])}
    </div>`;
  }
  return charHTML;

  function generateNameInputs(){
  let nameInputs = '';
  for(let i=0; i<8; i++) {
    nameInputs += `<div class="d${i}">${generateNameInput(i)}</div>`;
  }
  return nameInputs;
}

function generateNewNameInputs() {
  let output = '';
  for(let d=0; d<8; d++) {
    let row = 1, col = 1;
    for(let a=0; a<nameCharacters.length; a++) {
      output += '\n\t' + generatePwdInput(d, {row: row, col: col}, {e: nameCharacters[a]});
      col ++;
      if(col > 13) {
        row++;
        col = 1;
      }
    }
  }
  return output;
}

function generateNameInput(i){
  const pkmnBinaryPrefix = binaryprefixes[i];
  const rowCols = getRowCols();
  
  let output = '';
  for(let p=0; p<2; p++) {
    for(let a=0; a<nameCharacters.length; a++) {
      output += '\n\t' + generatePwdInput(i, rowCols.pop(), {e: nameCharacters[a], [pkmnBinaryPrefix]: p})
    }
  }
  output += generateFillerInputs(i, rowCols);
  return output;
}
*/