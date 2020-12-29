<template>
    <div class="fs-inner-container map-fixed">
        <gmap-map :center="center" :zoom="zoom" style="width: 100%; height: 1000px">
            <gmap-marker v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true" :draggable="true"
            @click="showDetail(m.id)"
            :key="index"
            ></gmap-marker>
        </gmap-map>
    </div>
</template>
<script>
export default {
    name: 'Map',
    props: {
      locations: {
        type: Array,
        required: true,
      },
      zoom: {
        type: Number,
        default: 12,
      },
      lat: {
        type: Number,
        required: false,
      },
      lng: {
        type: Number,
        required: false,
      },
    },
    data() {
        return {
            markers: [],
            center: {
                lat: this.lat ? this.lat : 22.302711,
                lng: this.lng ? this.lng : 114.177216
            },
        };
    },
    methods: {
        assignMarkers() {
            const vm = this;

            vm.markers = [];
            vm.locations.forEach(function(location) {
                let position = {};
                position.lat = location.latitude;
                position.lng = location.longitude;

                vm.markers.push({
                    position: position,
                    id: location.siteId
                });
            });
        },
        showDetail(id) {
            this.$router.push({ 
                path: `location/${id}`
            });
        }
    },
    watch: {
        locations: function () {
            this.assignMarkers()
        },
    },
    mounted() {
        this.assignMarkers();
    }
}
</script>
  