<template>
    <div class="fixed-bg-contain">
        <div class="back-bg-contain" :style="{opacity: opacity}">
            <img class="hidden-md hidden-lg lazyload" :data-src="src">
            <img class="hidden-xs hidden-sm lazyload" :data-src="srcWeb">
        </div>
        <div class="bg-text">{{ text }}</div>
    </div>
</template>

<script>
export default {
    name: 'fixedbackground',
    props: ['text', 'src', 'src-web'],
    data: function(){
        return{
            opacity: 0,
        }
    },
    methods: {
        handleScroll: function(e){
            let currentH = window.pageYOffset
            if(currentH > (this.$el.offsetTop - 200) && currentH < (this.$el.offsetTop + window.innerHeight/2)){
                this.opacity = 1
            }
            else{
                this.opacity = 0
            }
        }
    },
    mounted: function(){
        window.addEventListener('scroll', this.handleScroll);
    }
}
</script>

<style scoped>
    .fixed-bg-contain{
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .bg-text{
        color: #FFFFFF;
        font-size: 26px;
        font-weight: bold;
        letter-spacing: -0.5px;
    }
    .back-bg-contain{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: -1;
        transition: opacity 0.7s ease;
    }
    img{
        width: 100%;
    }
    
</style>