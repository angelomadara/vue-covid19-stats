<template>
    <div class="row">
        <div class="col">
            <br>
            <p> <b-icon icon='heart-fill'></b-icon> Support open source projects</p>
            <p><a href="mailto:angelomadara.dev@outlook.com"> <b-icon icon="at"></b-icon>angelomadara.dev@outlook.com</a></p>
            <p>Data source : <a href="https://www.worldometers.info/coronavirus" target="_blank">worldometers.info/coronavirus</a></p>
            <div>
                <small>API source: 
                    <p>
                        <a href="https://github.com/NovelCOVID/API" target="_blank">corona.lmao.ninja</a> | 
                        <a href="https://api.coronatracker.com">api.coronatracker.com</a></p>
                </small>
            </div>
            <social-sharing url="https://covid.vierzehn.xyz" inline-template id="share-buttons">
                <div>
                    Share this on: 
                    <network network="facebook">
                        <b-badge variant="primary"><font-awesome-icon :icon="['fab', 'facebook']" /> Facebook</b-badge>
                    </network>
                    <network network="linkedin">
                        <b-badge variant="primary"><i class="fa fa-fw fa-linkedin"></i> 
                        <font-awesome-icon :icon="['fab', 'linkedin']" class="icon alt"/> LinkedIn</b-badge>
                    </network>
                    <network network="twitter">
                        <b-badge variant="primary"><i class="fa fa-fw fa-twitter"></i>
                        <font-awesome-icon :icon="['fab','twitter']" class="icon alt"/> Twitter</b-badge>
                    </network>
                </div>
            </social-sharing>
        </div>
        
    </div>
</template>

<script>
export default {

}
</script>

<style>
#share-buttons span[data-link^="#share-"]{
    margin-right: 5px;
    cursor: pointer;
}
</style>