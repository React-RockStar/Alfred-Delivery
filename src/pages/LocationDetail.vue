<template>
  <div>
    <div class="list-location">
      <TrackingBar @clicked="searchByQuery" />
      <div class="location-details">
        <div class="location-details__back" v-on:click="backToList">
          <img src="@/assets/icons/buttons/back-grey-arrow.png" />
          <span class="location-tab__subtitle">Back to list</span>
        </div>
        <div>
          <figure class="location-details__image">
            <!-- <img :src="'http://159.138.38.21:30081/api/file/v1/download/' + location.sitePic[0].pictureIds" alt="Location Image" v-if="location.sitePic.length > 0" /> -->
          </figure>
        </div>
        <div class="location-tab__description">
          <h3 class="location-tab__subtitle">
            {{ location ? location.siteTypeDisplayName : null }}
          </h3>
          <div class="location-tab__code">
            <p class="location-tab__code-text">
              {{ location ? location.siteSerialNumber : null }}
            </p>
            <button class="location-tab__code-copy-btn">
              <span
                v-clipboard:copy="location ? location.siteSerialNumber : null"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                >Copy code</span
              >
              &nbsp;&nbsp;
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11 0C12.1046 0 13 0.89543 13 2V9C13 10.1046 12.1046 11 11 11H9.92633L10 11.0299V12C10 13.1046 9.10457 14 8 14H2C0.89543 14 0 13.1046 0 12V5C0 3.89543 0.89543 3 2 3H3V2C3 0.89543 3.89543 0 5 0H11ZM5 9H11V2H5V9ZM3 5H2V12H8V11.0052L7.97899 11H5C3.89543 11 3 10.1046 3 9V5Z"
                  fill="#808080"
                />
              </svg>
            </button>
          </div>
          <h2 class="location-tab__heading">
            {{ location ? location.siteName : null }}
          </h2>
          <p class="location-tab__location">
            {{ location ? location.streetAddress : null }}
          </p>
        </div>
        <!-- <div class="location-tab__actions">
          <button class="location-tab__actions-btn">Get directions</button>
        </div> -->
        <div class="locatoin-details__icons" v-if="location">
          <div
            v-for="(service, index) in location.serviceFunctionTypeNameList"
            :key="index"
          >
            <!--Icon Return -->
            <svg
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              v-if="service === 'SEND'"
            >
              <path
                d="M6.99816 6H15C16.6569 6 18 7.34315 18 9V13C18 14.6569 16.6569 16 15 16H1"
                stroke="#068DC9"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 10.2426L6.46446 6.70711C6.07394 6.31658 6.07394 5.68342 6.46446 5.29289L10 1.75736"
                stroke="#068DC9"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <span v-if="service === 'SEND'">Parcel</span>
            <!--Icon Dry CLeaning -->
            <svg
              class="svg-margin"
              width="28"
              height="15"
              viewBox="0 0 28 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              v-if="service === 'DRY_CLEANING'"
            >
              <path
                d="M13.9913 6.44999C14.8748 6.4505 15.6836 5.86107 15.9231 4.96713C16.209 3.9002 15.5758 2.80352 14.5089 2.51764C13.8172 2.33231 13.1131 2.53321 12.6254 2.98812C12.3608 3.23495 12.1599 3.55657 12.0594 3.93185"
                stroke="#068DC9"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M6.26887 12.1588L14 7.18881L21.7311 12.1588C22.5707 12.6985 22.1884 14 21.1904 14H6.80963C5.81158 14 5.42933 12.6985 6.26887 12.1588Z"
                stroke="#068DC9"
                stroke-width="2"
                stroke-linejoin="round"
              />
            </svg>
            <span v-if="service === 'DRY_CLEANING'">Dry cleaning</span>
            <!--Icon Parcel Collection -->
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              v-if="service === 'COLLECT'"
            >
              <rect
                x="1"
                y="1"
                width="16"
                height="16"
                rx="2"
                stroke="#068DC9"
                stroke-width="2"
              />
              <rect x="11" y="3" width="4" height="4" rx="1" fill="#068DC9" />
              <rect x="4" y="9" width="8" height="2" rx="1" fill="#068DC9" />
              <rect x="4" y="12" width="5" height="2" rx="1" fill="#068DC9" />
            </svg>
            <span v-if="service === 'COLLECT'">ASOS return</span>
            <!--Icon Laundry -->
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              v-if="service === 'LAUNDRY'"
            >
              <rect
                x="1"
                y="1"
                width="16"
                height="16"
                rx="2"
                stroke="#068DC9"
                stroke-width="2"
              />
              <rect x="9" y="3" width="6" height="2" rx="1" fill="#068DC9" />
              <circle cx="9" cy="10" r="3" stroke="#068DC9" stroke-width="2" />
              <circle cx="4" cy="4" r="1" fill="#068DC9" />
              <circle cx="7" cy="4" r="1" fill="#068DC9" />
            </svg>
            <span v-if="service === 'LAUNDRY'">Laundry</span>
          </div>
        </div>
      </div>
    </div>
    <div class="map">
      <Map
        :locations="[location]"
        :zoom="18"
        :lat="location.latitude"
        :lng="location.longitude"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Map from "@/components/Map.vue";
import TrackingBar from "@/components/TrackingBar.vue";

export default {
  name: "LocationDetails",
  components: {
    Map,
    TrackingBar,
  },
  data() {
    return {
      id: null,
      location: null,
    };
  },
  methods: {
    backToList() {
      this.$router.push({
        path: "/",
      });
    },
    async getLocation() {
      const vm = this;

      await axios
        .get(`http://159.138.38.21:30081/api/locker/v1/info/${vm.id}`)
        .then(function (response) {
          // handle success
          // console.log(response);
          vm.location = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    searchByQuery(query) {
      this.$router.push({
        path: "/?q=" + query,
      });
    },
    onCopy: function (e) {
      alert("You just copied: " + e.text);
    },
    onError: function () {
      alert("Failed to copy texts");
    },
  },
  async mounted() {
    this.id = this.$route.params.id;
    await this.getLocation();
  },
};
</script>