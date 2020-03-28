<template>
    <div>
        timeline 
    </div>
</template>

<script>
export default {
    // confirmed, recovered, deaths
    // 
    data(){
        return {
            data : {}
        }
    },
    created(){
    },
    methods: {
        confirmed(){
            this.axios.get(`https://api.covid19api.com/country/philippines/status/confirmed/live`).then(res => {
                this.reports = res.data
                this.data = [
                    {
                        name: 'Total Confirmed',
                        value: res.data.cases,
                    },
                    {
                        name: 'Total Recovered',
                        value: res.data.recovered,
                    },
                    {
                        name: 'Total Deaths',
                        value: res.data.deaths,
                    },
                ]
            })
        }
    }
}
</script>

<style>

</style>