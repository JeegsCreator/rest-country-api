const NameURL = 'https://restcountries.com/v3.1/alpha/'
/** @type {import('./$types').PageLoad} */
export async function load ({params, fetch}) {
    const res = await fetch(NameURL+params.slug)
    const country = await res.json()
    // console.log(country[0])

    return {
        country
    }
}