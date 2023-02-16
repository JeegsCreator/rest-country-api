<script>
    import {onMount} from 'svelte'
    import Arrow from '../../assets/Arrow.svelte'
    export let data
    let currencyKey
    let nameKey
    let languages

    let populationArray = String(data.country[0].population).split('').reverse()
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

    languages = Object.values(data.country[0].languages)

    async function fetchBorder (code) {
        const res = await fetch("https://restcountries.com/v3.1/alpha/"+code+"?fields=name,cca3")
        const data = await res.json()
        // console.log(data.name.common)
        return{
            name: data.name.common,
            cca3: data.cca3
        }
    }

    let bordersToRender = []
    let finished = false
    
    onMount(async () => {
        let borders = []
        currencyKey = Object.keys(data.country[0].currencies)[0]
        nameKey = Object.keys(data.country[0].name.nativeName)[0]
        
        let border = data.country[0].borders
        border = border.map(c => {
            fetchBorder(c).then((res) => {
                bordersToRender.push(res)
            }).finally(() =>  finished = !finished)
        })
        console.log(bordersToRender)
        
    })

</script>

<svelte:head>
    <title>{data.country[0].name.official} | Rest Countries</title>
</svelte:head>

<div class="country">
    <div class="country__head">
        <a href="/" class="country__head__button">
            <Arrow />
            Back
        </a>
    </div>
    <div class="country__grid">
        <picture class="country__grid__flag">
            <img class="country__grid__flag__img" src={data.country[0].flags.svg} alt={data.country[0].flags.alt}>
        </picture>
        <div class="country__grid__info">
            <h1 class="country__grid__info__title">{data.country[0].name.official}</h1>
            <div class="country__grid__info__characteristic">
                <p><strong>Native Name:</strong> {data.country[0].name.nativeName[nameKey]?.official}</p>
                <p><strong>Top Level Domain:</strong> {data.country[0].tld[0]}</p>
                <p><strong>Population:</strong> {population}</p>
                <p><strong>Currencies:</strong> {data.country[0].currencies[currencyKey]?.name}</p>
                <p><strong>Region:</strong> {data.country[0].region}</p>
                <p><strong>Language:</strong> {languages.reduce((a, b) => a+', '+b)}</p>
                <p><strong>Sub Region:</strong> {data.country[0].subregion}</p>
                <p><strong>Capital:</strong> {data.country[0].capital.reduce((a, b) => a+', '+b)}</p>
            </div>
            <div class="country__grid__info__border">
                <p><strong>Border Countries:</strong></p>
                <div class="country__grid__info__border__countries">
                    {#key finished}
                        {#each bordersToRender as c}
                            <a href={c.cca3} class="country__grid__info__border__countries__button">{c.name}</a>
                        {/each}
                    {/key}
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    :global(body){
        height: calc(100vh - 60px);
    }

    :global(body.dark){
        .country{
            &__head{
                &__button{
                    background-color: $dark-blue;
                    color: $white;
                }
            }

            &__grid{
                &__info{
                    &__border{
                        &__countries{
                            &__button{
                                background-color: $dark-blue;
                                color: $white;
                            }
                        }
                    }
                }
            }
        }
    }
    
    .country{
        // background-color: #f00;
        height: calc(100vh - 60px);
        padding-inline: 60px;
        &__head{
            padding-block: 30px;
            &__button{
                display: block;
                height:40px;
                width: 100px;
                background-color: $white;
                box-shadow: $box-shadow;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-size: 1.4rem;
                border-radius: 8px;
                color: $dark-text;
                text-decoration: none;
            }
        }

        &__grid{
            // background-color: #f00;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 120px;
            
            &__flag{
                height: 100%;
                width: 100%;

                &__img{
                    width: 100%;
                    object-fit: scale-down;
                }
            }

            &__info{
                display: flex;
                flex-direction: column;
                justify-content: center;

                &__title{
                    font-size: 4rem;
                    margin-bottom: 16px;
                }

                &__characteristic{
                    font-size: 1.6rem;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4px;
                }

                &__border{
                    display: flex;
                    margin-top: 30px;
                    gap: 16px;
                    font-size: 1.4rem;
                    align-items: center;
                    
                    &__countries{
                        gap: 16px;
                        display: flex;
                        
                        &__button{
                            font-size: 1.4rem;
                            display: block;
                            height:40px;
                            width: 100px;
                            background-color: $white;
                            box-shadow: $box-shadow;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 8px;
                            color: $dark-text;
                            text-decoration: none;
                        }
                    }
                }
            }
        }

        @media (max-width: 540px) {
            width: calc(100vw);
            padding-inline: 20px;
            &__grid{
                // background-color: #f00;
                width: 100%;
                grid-template-columns: 1fr;
                grid-template-rows: 1fr;
                gap: 20px;
                
                &__info{
                    &__characteristic{
                        grid-template-columns: 1fr;
                    }

                    &__border{
                        &__countries{
                            flex-wrap: wrap;
                        }
                    }
                }
            }
        }

        @media (min-width: 540px) and (max-width: 1000px) {
            &__grid{
                grid-template-columns: 1fr;
                grid-template-rows: 1fr;
                gap: 20px;
                &__info{
                    padding-bottom: 40px;
                }
            }
        }
    }
</style>