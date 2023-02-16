const searchURL = "https://restcountries.com/v3.1/name/"

/** @type {import('./$types').Actions} */
export const actions = {
    search: async ({request}) => {
        const data = await request.formData()
        const query = data.get('query')
        // console.log(query)

        const res = await fetch(searchURL+query.replace(' ', '%20'))
        const searchCountries = await res.json()
        const error = (() => (searchCountries.status === 404) ? true : false )()
        console.log(error)
        return{success: true, searchCountries, query, error}
    }
}