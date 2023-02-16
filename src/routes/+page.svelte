<svelte:head>
    <title>Rest Countries</title>
</svelte:head>

<script>
    import {scale} from 'svelte/transition'
    import Country from './Country.svelte'
    import Search from '../assets/Search.svelte'
    export let data;
    export let form

    let countries = data.countries
    let prevCountries = countries
    let region = 'any';

    if (form?.success) {
        if(form.query.length > 0){
            countries = form.searchCountries
            prevCountries = form.searchCountries
        } else {
            countries = data.countries
        }
    }

    function populationStyle(populationNumber){
        let populationArray = String(populationNumber).split('').reverse()
        let population = [...populationArray]
        let plus = 1
        for (let i = 0; i < populationArray.length; i++){
            if (((i+1)%3) === 0) {
                population.splice(i+plus, 0, ',')
                plus++
            }
        }
        if(population[population.length-1] === ','){
            population.pop()
        }
        population = population.reverse().reduce((a, b) => a+b)
        return population
    }

</script>



<div class="forms">
    <form method="POST" action="?/search" class="forms__search"
        on:submit={(e) => {
            // e.preventDefault()
            // console.log(e)
            console.log('awa')
        }}
    >
            <Search />
            <input 
                type="text" 
                name="query" 
                class="forms__search__input" 
                placeholder="Search for a country..."
                value={form?.success ? form.query : ''}
                autocomplete
            >
    </form>
    <form class="forms__region"
        
    >
        <select class="forms__region__input"
        on:input={(e) => {
            countries = prevCountries.filter(country => {
                if(!(e.target.value === 'default')) {
                    switch (e.target.value) {
                        case 'america':
                                region = 'america';
                                return ('americas' === country.region.toLowerCase());
                            break;
                    
                        default:
                                region = e.target.value;
                                return (e.target.value === country.region.toLowerCase());
                            break;
                    }
                } else {
                    region = 'any';
                    return true
                }
                
                // country.region === e.target.value
            })
        }}>
            <option value="default" disabled selected>Filter by Region</option>
            <option value="africa">Africa</option>
            <option value="america">America</option>
            <option value="asia">Asia</option>
            <option value="europa">Europe</option>
            <option value="oceania">Oceania</option>
            <option value="default">Any</option>
        </select>
    </form>
</div>

<div class="countries">

        {#if (form?.error || (countries.length === 0))}
            <p class="countries__error">
                Don't exist a country named "{form?.query}" {(region === 'any') ? '' : `in ${region}`}.
            </p>
        {:else}
            {#each countries as country}
                <div transition:scale>
                    <Country>
                        <a class="countries__a" href={`/${country.cca3}`} slot="a">a</a>
                        <img slot="flag" class="countries__flag" src={country.flags.png} alt={country.flags.alt}/>
                        <span slot="title">{country.name.official}</span>
                        <span slot="population">{populationStyle(country.population)}</span>
                        <span slot="region">{country.region}</span>
                        <span slot="capital">{country.capital}</span>
                    </Country>
                </div>
            {/each}
        {/if}



</div>

<style lang="scss">
    :global(body.dark){
        & .forms{
            &__search{
                background-color: $dark-blue;
                &__input{
                    background-color: $dark-blue;
                    color: $white;
                    &::placeholder{
                        color: #aaa;
                    }
                }
            }

            &__region{
                &__input{
                    background-color: $dark-blue;
                    color: $white;

                    & option{
                        background-color: $white;
                        color: $dark-text;
                    }
                }
            }
        }
    }

    .countries{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 30px;
        // width: 100vw;
        padding-inline: 60px;
        position: relative;
        
        &__error{
            font-size: 2rem;
            position: absolute;
            left: 80px;
        }
        &__flag{
            height: 100%;
            width: 100%;
            object-fit: cover;
            // mix-blend-mode: multiply; 
        }

        &__a{
            position: absolute;
            display: block;
            z-index: 15;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }

    .forms{
        // background-color: #f00;
        display: flex;
        margin: 30px 60px;
        height: 50px;
        justify-content: space-between;
        
        &__search{
            background-color: $white;
            border-radius: 6px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 24vw;
            font-size: 1.6rem;
            gap: 16px;
            padding-left: 20px;
            box-shadow: $box-shadow;
            overflow: hidden;
            
            &__input{
                font-size: 1.6rem;
                height: 50px;
                width: 100%;
                border: none;
                padding-left: 8px;

                &:focus-visible{
                    outline: none;
                }
            }
        }

        &__region{
            position: relative;
            &__input{
                // display: none;
                height: 100%;
                background-color: $white;
                border-radius: 8px;
                box-shadow: $box-shadow;
                border: none;
                padding-inline: 16px;
                cursor: pointer;
                font-size: 1.6rem;
                
                &:focus{
                    outline: none;
                }
                
                & option{
                    &:first-child{
                        display: none;
                    }
                }
            }
        }
    }

    @media (max-width: 540px) {
        .countries{
            grid-template-columns: 1fr;
        }

        .forms{
            flex-direction: column;
            height: 120px;
            gap: 16px;

            &__search{
                height: 50%;
                width: 100%;
            }

            &__region{
                height: 50%;
            }
        }
    }

    @media (min-width: 540px) and (max-width: 1000px) {
        .countries{
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
</style>