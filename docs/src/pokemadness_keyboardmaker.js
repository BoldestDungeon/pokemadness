
function generatePkmnList() {
  let rowCols = getRowCols();
  let output = '';

  for(let dexId in allPkmn) {
    const pkmn = allPkmn[dexId];
    if(!pkmn.dexId || pkmn.dexId >= gen9start) { continue; }

    // Reshuffle a fresh row/col deck if we're on a special case 'mon
    if(specialCaseDexIds.includes(pkmn.dexId)) { 
      rowCols = getRowCols() 
    }

    const forms = pkmn.forms;
    for(let f=0; f<forms.length; f++) {
      const formObj = forms[f];
      const props = generatePkmnProps(pkmn, formObj);

      // Reshuffle a fresh row/col deck if we're empty
      if(!rowCols.length) { 
        rowCols = getRowCols() 
      }
      const rowCol = rowCols.pop();
      output += generatePwdInput(pkmnConfirmDigitId, rowCol, props)
    }
  }
  return output;
}

function generatePkmnProps(pkmn, formObj) {
  const typeBasedData = generateTypeBasedData(formObj);
  const formBasedData = generateFormBasedData(formObj);
  const speciesData = generateSpeciesData(pkmn);
  
  // Merge all that into one big object...
  const data = {...typeBasedData, ...formBasedData, ...speciesData}
  return data;
}

function generateSpeciesData(pkmn) {
  const data = {};
  data[dexIdPrefix] = pkmn.dexId;
  data[familyIdPrefix] = pkmn.familyId;
  data[evoStagePrefix] = pkmn.evoStage;
  data[familyBinaryPrefix] = idToBinaryData(pkmn.familyId, familyBinaryLength);

  const evolutionData = pkmn.evolutionFamily;
  data[maxEvoStagePrefix] = evolutionData.maxEvoStage;
  data[canEvolvePrefix] = pkmn.evoStage < evolutionData.maxEvoStage ? '1' : '0';
  // TODO: Track what each 'Mon can evolve from/into for dialogue moments

  data[baseFriendshipPrefix] = getStarRating('baseFriendship', pkmn.baseFriendship)
  data[eggGroupPrefix] = generateEggGroupData(pkmn.eggGroups);
  
  return data;
}

function generateEggGroupData(eggGroups) {
  const encoding = [];
  // Store all of the egg groups this 'mon is a member of
  for(let e=0; e < eggGroups.length; e++) {
    const groupName = eggGroups[e];
    const eggGroup = eggGroupLookup.find(group => group.name == groupName)
    if(!eggGroup) {
      console.error(`${groupName} is not a known egg group!`);
      continue;
    }
    encoding.push(eggGroup.id);
  }
  return encoding;
}

function generateFormBasedData(formObj) {
  const data = {};

  // Base Stats: 0 - 5 stars
  data[hpPrefix] = getStarRating('hp', formObj.baseStats.hp)
  data[atkPrefix] = getStarRating('atk', formObj.baseStats.atk)
  data[defPrefix] = getStarRating('def', formObj.baseStats.def)
  data[spatkPrefix] = getStarRating('sp_atk', formObj.baseStats.sp_atk)
  data[spdefPrefix] = getStarRating('sp_def', formObj.baseStats.sp_def)
  data[spdPrefix] = getStarRating('speed', formObj.baseStats.speed)

  // Size: 0 - 10 stars
  data[heightPrefix] = getStarRating('height', formObj.height)
  data[weightPrefix] = getStarRating('weight', formObj.weight)

  // Appearance
  data[colourPrefix] = colours.findIndex(colour => colour == formObj.colour);
  data[bodytypePrefix] = formObj.bodyId;

  // Form ID
  data[variationPrefix] = formObj.id
  // TODO: Region/variation name?

  // Everything else
    data[tagPrefix] = generateTagData(formObj.tags)

  return data;
}

function generateTagData(tags) {
  if(!tags) { return []; }

  const tagIdList = [];
  for(let t=0; t < tags.length; t++) {
    const tagName = tags[t];
    const tag = getOrCreateTag(tagName);
    tagIdList.push(tag.id);
  }
  return tagIdList;
}

function getOrCreateTag(tagName) {
  let tag = additionalTags.find(tag => tag.name == tagName);
  if(tag) { return tag; }

  tag = {
    id: additionalTags.length,
    name: tagName,
    category: tagName.split('_')[0],
    value: tagName.split('_')[1]
  }
  additionalTags.push(tag);
  return tag;
}

function generateTypeBasedData(formObj) {
  const data = {};

  data[elStrongPrefix]  = []; // Type strengths (resistances)
  data[elWeakPrefix]    = []; // Type weaknesses
  data[elNullifyPrefix] = []; // Types nullified

  const doubleStrongPrefix = `${elStrongPrefix}${elStrongPrefix}`;
  const doubleWeakPrefix = `${elWeakPrefix}${elWeakPrefix}`;
  data[doubleStrongPrefix] = [];  // Double-resist
  data[doubleWeakPrefix]   = [];  // Double-weakness

  let type1 = types.find(t => t.name.toLowerCase() == formObj.type1.toLowerCase());
  let type2 = types.find(t => t.name.toLowerCase() == formObj.type2.toLowerCase());

  if (type1.name.toLowerCase() === 'normal' && type2) {
    // Swap things like "Normal/Flying" to make 'Normal' the seconadary type
    type1 = type2;
    type2 = types[0];
  }

  data[type1Prefix] = type1.id.toString(18);
  if (type2) {
    data[type2Prefix] = type2.id.toString(18);
  }
  const allResist = type1.strong.concat(type2?.strong || []);
  const allWeak = type1.weak.concat(type2?.weak || []);
  const allNull = type1.nullify.concat(type2?.nullify || []);

  for (let r = 0; r < allResist.length; r++) {
    const resistId = allResist[r];
    if (!allNull.includes(resistId) && !allWeak.includes(resistId)) {
      // An element is resisted if we're not also weak to it
      const resistIdStr = resistId.toString(18);
      if(data[elStrongPrefix].includes(resistIdStr)) {
        // Upgrade to doubly-resisted
        data[doubleStrongPrefix].push(resistIdStr)
      }
      else {
        data[elStrongPrefix].push(resistIdStr);
      }
    }
  }
  for (let w = 0; w < allWeak.length; w++) {
    const weakId = allWeak[w];
    if (!allNull.includes(weakId) && !allResist.includes(weakId)) {
      // An elemental weakness only if we're not also strong to it
      const weakIdStr = weakId.toString(18);
      if(data[elWeakPrefix].includes(weakIdStr)) {
        // Upgrade to double-weakness
        data[doubleWeakPrefix].push(weakIdStr)
      }
      data[elWeakPrefix].push(weakIdStr);
    }
  }
  for (let n = 0; n < allNull.length; n++) {
    // Nullification overrides everything
    data[elNullifyPrefix].push(allNull[n].toString(18));
  }

  return data;
}

function idToBinaryData(id, binaryLength) {
  // MINIFICATION NOTES:
  //   Converts an ID number to binary class values
  //   Numbers are used for 0 digits, Letters for 1 digits
  // EXAMPLE: An ID of 5 is 0000000101 in binary digits (Length 10)
  //   Returns ['0', '1', '2', '3', '4', '5', '6', 'h', '8', 'j']

  const encoding = [];
  binaryLength = binaryLength || familyBinaryLength;
  
  const binaryDigits = binaryStringWithPadding(id, binaryLength);

  // Start 'true' bits at 'a', unless binaryLength is larger than 10 somehow
  const firstTrueVal = 'a'.charCodeAt(0) + Math.max(0, binaryLength-10);
  for(let i=0; i < binaryDigits.length; i++) {
    const digitVal = parseInt(binaryDigits[i]);
    if(digitVal) {
      encoding.push(String.fromCharCode(firstTrueVal + i))
    }
    else {
      encoding.push(i.toString(Math.max(binaryLength, 10)));
    }
  }
  return encoding;
}

function getStarRating(statId, value) {
  const thresholds = statRatingThresholds[statId];
  if(!thresholds) {
    console.error(`${statId} is not a recognized stat!`)
    return '0'
  }
  // If we've topped out the scale, give max stars
  if(value >= thresholds[thresholds.length - 1]) {
    return thresholds.length;
  }
  // Otherwise, find the first index with a value higher than our supplied value
  // (A value between the elements 0 and 1 will therefore return as 1-star, etc)
  return thresholds.findIndex(val => val > value)
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

// Generates a random sorting of rows/columns with no repeats
function getRowCols(){
  let positions = [];
  for(let r=1; r<=5; r++){
    for(let c=1; c<=13; c++){
      positions.push({ row: r, col: c, order: random() })
    }
  }
  return positions.sort( (a,b) => (b.order-a.order) );
}