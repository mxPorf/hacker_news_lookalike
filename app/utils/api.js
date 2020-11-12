const baseURI = "https://hacker-news.firebaseio.com/v0/"
const suffix = ".json?print=pretty"

function filterByType(arr, desired){
  const out = arr.filter( ({type}) => type === desired )
  return out
}

function removeDead(lista){
  return lista.filter(Boolean).filter(({dead}) => dead !== true)
}

function removeDeleted(arr){
  return arr.filter(({deleted}) => deleted !== true)
}

function fetchItem(id) {
  const path = `${baseURI}item/${id}${suffix}`
  return fetch(path)
    .then((res)=>res.json())
}


export function getStoriesByType(type){
  // 1. preguntar por top stories
  //   recibe arreglo de ids
  // 2. preguntar por la informacion del arreglo de ids
  //   recibe arreglo de objetos
  // 3. filtrar objetos por tipo y sin muertos
  //   recibe arreglo de objetos
  // 4. regresar el arreglo de objetos
  return fetch(`${baseURI}${type}stories${suffix}`)
    .then((res) => res.json())
    .then((idArr) => {
      if(!idArr){
        throw new Error(`Problem fetching ${type} stories`)
      }
      return idArr.slice(0,50)
    })
    .then((data) => (Promise.all(data.map(fetchItem))))
    .then((unfiltered) => removeDeleted(filterByType(removeDead(unfiltered), 'story')))
}

export function getUserProfile(userID){
  return fetch(`${baseURI}/user/${userID}${suffix}`)
    .then((res) => (res.json()))
}

export function getManyItems(lista, type='story'){
  return Promise.all(lista.map(fetchItem))
    .then( (arr) => {
      if(!arr){
        throw new Error('Problem fetching items')
      }
      if (arr.length > 50){
        arr = arr.slice(0,50)
      }
      return arr
    })
    .then( (unfiltered) => (removeDeleted(filterByType(removeDead(unfiltered), type))) )
}
