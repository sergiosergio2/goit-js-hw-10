import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from "lodash";
import fetchCountries from "./fetchCoutries";

const DEBOUNCE_DELAY = 300;
const ref = {
input: document.querySelector('#search-box'),
list:document.querySelector('.country-list'),
article:document.querySelector('.country-info'),
}

ref.input.addEventListener('input',debounce(searchCountry,DEBOUNCE_DELAY));

function searchCountry() {
  const searchRequest=ref.input.value.trim();
  if(searchRequest!=="") {
fetchCountries(searchRequest)
  .then(data => {  
    if(data.length===1){
      watchCountry(...data)
    }else if(data.length>10){
      Notify.info("Too many matches found. Please enter a more specific name.");
      writeList('');
      writeBoxCountry('');
    }else{
      watchListCountry(data);
    }
        })
  .catch(error => {
    if(error=="Error: 404"){
      writeList('');
      writeBoxCountry('');
      return Notify.failure("Oops, there is no country with that name"); 
    }
            console.log(error);
        });
}
}
 function watchCountry(country){
  writeList('');
  const str =`
   <img class="country-flag" src="${country.flags.svg}" alt="flag ${country.name.common}" width="40" height="30">
   <span class="country-name"> ${country.name.official} </span>
  <ul class="country-list">
  <li class="country-item">
  Capital:&#32; <span class="country-value"> ${country.capital} </span>
  </li>
  <li class="country-item">
  Population:&#32; <span  class="country-value"> ${country.population}  </span>
  </li>
  <li class="country-item">
  Languages: &#32;&#32;&#32;&#32; <span  class="country-value"> ${Object.values(country.languages).join(", ") }   </span>
  </li>
  </ul>`
 writeBoxCountry(str);
 }

function watchListCountry(countryes){
  writeBoxCountry('');
const htmlList = [];
for(const country of countryes){
  htmlList.push(`
  <li>
  <img src="${country.flags.svg}" alt="flag ${country.name.common}" width="40" height="30">
  <span class="country-value">${country.name.official}</span>
  </li>
  `)
}
writeList(htmlList.join('\n')) ;
}

function writeBoxCountry(value){
  
  ref.article.innerHTML = value;
}

function writeList(value){
  ref.list.innerHTML = value;
}
