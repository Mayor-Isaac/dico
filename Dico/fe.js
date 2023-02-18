"use strict";
const main = document.querySelector(".main");
const cicy = document.querySelector('.search input')
const container = document.querySelector('.search')
const searchIcon = document.querySelector('.find')
const aye = document.querySelector('.aye')
const audio = document.querySelector('.audio')
const renderMeaning = function (input) {
  document.querySelector('h1').textContent = input.word
  document.querySelector('.phonetics').textContent = input.phonetic
  main.innerHTML = ''
  const hey = input.meanings
  hey.map(function(meanings){
    const ul = document.createElement('ul')
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
  const anchor = document.querySelector('.footer a')
  anchor.textContent = `${input.sourceUrls}`
  anchor.href = `${input.sourceUrls}`
  audio.addEventListener('click', function(){
    const allAudio = document.querySelector('audio')
    if(input.phonetics[0].audio != ''){
    allAudio.src = `${input.phonetics[0].audio}`
    allAudio.play()}
  })
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
      const error = document.createElement('section')
      error.classList.add('err')
      error.innerHTML = `<span class="cursive">' ${cicy.value} '</span> not found`
      aye.append(error)
      setTimeout(function(){
        error.remove()
      },4000)
    });
    audio.style.display = 'flex'
};
searchIcon.addEventListener('click', function(){
  getMeaning(cicy.value)
})
document.addEventListener('keypress', function(e){
  if(e.key === 'Enter' && cicy.value !== ''){
    getMeaning(cicy.value)
  }
})
document.querySelector('.up').addEventListener('click', function(){
  window.scroll({
    top: 0,
    behavior: 'smooth'
  })
})