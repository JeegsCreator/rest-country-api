const AllURL = 'https://restcountries.com/v3.1/all'
const filter = '?fields=name,cca3,flags,population,region,capital'

/** @type {import('./$types').PageLoad} */
export async function load ({fetch, params}) {
    const res = await fetch(AllURL+filter)
    const data = await res.json()
    // console.log(data)
    return {
        countries: data
    }
}

