"use strict";
const main = document.querySelector(".main");
const cicy = document.querySelector('.search input')
const container = document.querySelector('.search')
const searchIcon = document.querySelector('.find')
const aye = document.querySelector('.aye')
const audio = document.querySelector('.audio')
const renderMeaning = function (input) {
  // IMPLEMENTING WORD AND PHONETIC
  document.querySelector('h1').textContent = input.word
  document.querySelector('.phonetics').textContent = input.phonetic
  // IMPLEMENTING AUDIO
  audio.style.display = 'flex'
  const loop = []
  input.phonetics.map(function(phonetic){
    loop.push(phonetic.audio);
  })
  const firstAudio = loop.find(yoo => yoo != '')
  audio.addEventListener('click', function(){
    const allAudio = document.querySelector('audio')
    allAudio.src = `${firstAudio}`
    allAudio.play()
  })
  // CLEARING THE MAIN CONTENT
  main.innerHTML = ''
  const hey = input.meanings
  hey.map(function(meanings){
    const ul = document.createElement('ul')
  // IMPLEMENTING SYNONYMS
    const hmm = meanings.synonyms
    const synonyms = document.createElement('div')
    synonyms.classList.add('synonyms')
    if(hmm.length > 0){
      synonyms.innerHTML = `
      <h4>Synonyms</h4>
      `
      const h4 = document.querySelector('.synonyms h4')
      hmm.map(function(ha){
        const span = document.createElement('span')
        span.classList.add('cursive')
        span.innerHTML = `${ha}`
        synonyms.append(span)
      })
    }else{
      synonyms.innerHTML = ``
    }
  // IMPLEMENTING LIST OF THE MEANING(S)
    const buus = meanings.definitions
    buus.map(function(buu){
      const li = document.createElement('li')
      li.innerHTML = `${buu.definition}`
      ul.append(li)
    })
    const box = document.createElement('div')
    box.innerHTML = `
    <h3 class="part-of-speech cursive">${meanings.partOfSpeech}</h3>
        <h4 class="meaning">Meaning</h4>
    `
    box.append(ul)
    box.append(synonyms)
    main.append(box)
  // IMPLEMENTING MEANING OF LINKS
    const kemi = document.querySelectorAll('.synonyms span')
    kemi.forEach(function(ay){
      ay.addEventListener('click', function(){
        const ayText = ay.textContent
        getMeaning(ayText)
        cicy.value = ayText
        window.scroll({
          top: 0,
          behavior: 'smooth'
        })
      })
    })
  })
  // IMPLEMENTING FOOTER LINKS
  const anchor = document.querySelector('.footer a')
  anchor.textContent = `${input.sourceUrls}`
  anchor.href = `${input.sourceUrls}`
};
const getMeaning = function (word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(function (response) {
      if(response.status !== 200){
        throw new Error('Word not found')
      }
      return response.json();
    })
    .then(data => renderMeaning(data[0]))
    .catch(err =>{
      // DISPLAYING ERROR
      const error = document.createElement('section')
      error.classList.add('err')
      error.innerHTML = `<span class="cursive">' ${cicy.value} '</span> not found`
      aye.append(error)
      setTimeout(function(){
        error.remove()
        cicy.value = ''
      },4000)
    });
};
searchIcon.addEventListener('click', function(){
  getMeaning(cicy.value)
})
document.addEventListener('keypress', function(e){
  if(e.key === 'Enter' && cicy.value !== ''){
    getMeaning(cicy.value)
  }
})
// IMPLEMENTING SMOOTH SCROLLING
document.querySelector('.up').addEventListener('click', function(){
  window.scroll({
    top: 0,
    behavior: 'smooth'
  })
})
