<template>
    <a target="_blank" :href="href">
        <div class="question-button">{{text}}</div>
    </a>
</template>

<script>

export default {
    props: ['href', 'text']
    
}
</script>

<style scoped>

    a:hover{
        text-decoration: none;
    }
    
    .question-button{
        width: 100%;
        max-width: 500px;
        height: 80px;
        border-radius: 40px;
        background-color: #ef4326;
        box-shadow: -2.8px 1.1px 7px 0 rgba(0, 0, 0, 0.1);
        text-align: center;
        color: #FFFFFF;
        letter-spacing: -0.4px;
        font-size: 18px;
        line-height: 80px;
    }

    @media screen and (min-width: 1024px){
        .question-button{
            height: 100px;
            line-height: 100px;
            margin: 0 auto;
            border-radius: 50px;
        }
    }
    
</style>