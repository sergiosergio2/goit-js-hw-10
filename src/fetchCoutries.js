export default function fetchCountries(name){
    return  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,flags,languages,capital,population `)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
     
  }