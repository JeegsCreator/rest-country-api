<script>
    import Moon from '../assets/Moon.svelte'

    const changeMode = () => {
        document.body.classList.toggle('dark')
    }
</script>

<nav class="nav">
    <p class="nav__left">Where in the world?</p>
    <button on:click={changeMode} class="nav__right"><Moon /> Dark Mode</button>
</nav>

<style lang="scss">
    .nav{
        width: 100%;
        height: 60px;
        padding-inline: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $white;
        box-shadow: 0 0 10px #0003;
        font-size: 2rem;
        font-weight: 700;
        @media (max-width: 540px){
            padding-inline: 40px;
        }
    }

    :global(body.dark){
        .nav{
            background-color: $dark-blue;
        }
    }

    button{
        background-color: transparent;
        border: none;
        color: inherit;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1.6rem;
    }
</style>