<div class="country">
    <slot name="a"></slot>
    <div class="country__info">
        <h1 class="country__info__title">
            <slot name="title"></slot>
        </h1>
        <p class="country__info__p">
            <strong>Population</strong>
            <slot name="population"></slot>
        </p>
        <p class="country__info__p">
            <strong>Region</strong>
            <slot name="region"></slot>
        </p>
        <p class="country__info__p">
            <strong>Capital</strong>
            <slot name="capital"></slot>
        </p>
    </div>
    <picture class="country__flag">
        <slot name="flag"></slot>
    </picture>
</div>

<style lang="scss">
    :global(body.dark){
        & .country{
            background-color: $dark-blue;
        }
    }

    .country{
        width: 100%;
        aspect-ratio: 5/3;
        cursor: pointer;
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: $box-shadow;

        &:hover .country{
            &__flag{
                filter: brightness(.6);
            }

            &__info{
                opacity: 1;
            }
        }

        &__flag{
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
            top: 50% - 50%;
            left: 0;
            transition: filter .2s ease-in;
        }
        
        &__info{
            display: flex;
            width: 100%;
            height: 100%;
            flex-direction: column;
            justify-content: center;
            z-index: 10;
            position: absolute;
            padding-inline: 30px;
            top: 0;
            left: 0;
            color: $white;
            opacity: 0;
            transition: opacity .2s ease-out;
            // transition-delay: .1s;

            &__title{
                font-size: 2.6rem;
                margin-bottom: 8px;
            }

            &__p{
                font-size: 1.6rem;
            }
        }
    }
</style>