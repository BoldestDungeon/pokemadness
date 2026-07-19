let allPkmn;

const pkmnUrl = 'https://cdn.shopify.com/s/files/1/0636/7294/2787/files/pkmn.json?v=1769608864';
const submittedProperties = [];
const filteredPokemon = [];
const gen9start = 906;
let currentMon;

function startQuizRandom(){
  const arrayId = parseInt(Math.random() * filteredPokemon.length);
  updateQuiz(arrayId);
  currentMon = arrayId;
  document.getElementById('quiz').classList.add('ready')
  document.getElementById('intro').classList.add('ready')
  
}

function startQuiz() {
  const selector = document.getElementById('start-at');
  const arrayId = selector.value;
  updateQuiz(arrayId);
  currentMon = parseInt(selector.value);
  document.getElementById('quiz').classList.add('ready')
  document.getElementById('intro').classList.add('ready')
}
function updateQuiz(index) {
  const data = filteredPokemon[index];
  const pkmn = data.pkmn;
  const formData = data.formData;
  document.getElementById('name').innerText = pkmn.name + (formData.form == 'default' ? '' : ` (${formData.form})`)
  const imgUrl = (formData.image || pkmn.image);
  const urlParts = imgUrl.split('/');
  const imgName = urlParts[urlParts.length - 1]
  document.getElementById('portrait').src = 'https://cdn.shopify.com/s/files/1/0630/9386/6596/files/' + imgName;
  document.getElementById('type1').innerText = formData.type1
  document.getElementById('type2').innerText = formData.type2
  document.getElementById('height').innerText = formData.height + 'm'
  document.getElementById('weight').innerText = formData.weight + 'kg'
  document.getElementById('colour').innerText = formData.colour
  document.getElementById('bodytype').innerText = allPkmn.bodyLookup[formData.bodyId] || allPkmn.bodyLookup[pkmn.defaultBodyId]
  
  const quiz = document.getElementById('quiz');
  quiz.className = `ready type1_${formData.type1.toLowerCase()} type2_${formData.type2?.toLowerCase() || formData.type1.toLowerCase()}`
  
}

function goNext(){
  recordAnswers();
  resetForm();
  currentMon = (currentMon + 1);
  if(currentMon == filteredPokemon.length) { currentMon = 0; }
  updateQuiz(currentMon);
}

function recordAnswers(){
  const form = document.forms['questions'];
  const currentMonData = filteredPokemon[currentMon];
  const response = {tags: [], dexId: currentMonData.pkmn.dexId, formId: currentMonData.formData.id }
  
  for(let i=0; i<form.length; i++){
    const field = form[i];
    if(field.type === 'checkbox') {
      field.checked && response.tags.push(field.name);
    }
    else if(field.value) {
      response.additionalData = field.value
    }
  }
  (response.additionalData || response.tags.length) && submittedProperties.push(response);
}
function resetForm(){
  const form = document.forms['questions'];
  form.reset();
  const header = document.getElementById('quiz')
  header.scrollIntoView();
}

fetch(pkmnUrl).then(resp => resp.json()).then( pkmn => {allPkmn = pkmn; document.dispatchEvent(new CustomEvent('pkmn'))})

document.addEventListener('pkmn', promptForStuff)

function promptForStuff() {
  const select = document.getElementById('start-at')
  for(let i in allPkmn) {
    if(isNaN(parseInt(i)) || i >= gen9start) { continue; }
    let pkmn = allPkmn[i];
    let forms = pkmn.forms;

    for(let f=0; f<forms.length; f++) {
      const form = forms[f];
      if(form.tags) { continue; }
      const data = { pkmn: pkmn, formId: form.id, formData: form }
      const name = `#${pkmn.dexId} - ${pkmn.name}${ form.form == 'default' ? '' : ' (' + form.form + ')'}`
      const option = document.createElement('option');
      option.innerText = name;
      option.value = filteredPokemon.length;
      select.appendChild(option);
      filteredPokemon.push(data);
    }
    
  }
  
}

function copyResponses(){ 
  recordAnswers();
  navigator.clipboard.writeText(JSON.stringify(submittedProperties));
  alert(`${submittedProperties.length} Pokémon Responses copied! Please send to Ironskink/BoldestDungeon via Discord!`); 
}