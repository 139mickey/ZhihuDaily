<template>
    <div class="daily-menu">
        <!-- h1>menu</h1 -->
        <ul>
            <li :class="active">每日推荐</li>
            <li>主题日报</li>

        </ul>
    </div>
</template>

<script>
    export default {
        name: 'v-menu',
        data () {
            return {
                active: 'on',
                msg: 'In Menu Component'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .daily-menu {
        width: 150px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        io2 background: #f5f7f9;
    }

    .daily-menu ul {
        list-style: none;
    }

    .daily-menu li {
        font-size: 18px;
        text-align: center;
        margin: 5px 0;
        padding: 10px 0;
        cursor: pointer;
        border-right: 2px solid transparent;
        transition: all .3s ease-in-out;
    }

    .daily-menu li:hover {
        background: #e3e8ee;
    }

    .daily-menu li.on {
        border-right: 2px solid #3399ff;
    }

    .daily-menu ul li a {
        display: block;
        color: inherit;
        text-decoration: none;
        padding: 5px 0;
        margin: 5px 0;
        cursor: pointer;
    }

    .daily-menu ul li a:hover,
    .daily-menu ul li a.on {
        color: #3399ff;
    }
</style>
