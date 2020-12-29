<template>
  <div class="location-tab" v-on:click="showDetail(location.siteId)">
      <div class="location-tab__description">
        <h3 class="location-tab__subtitle">{{ location.siteTypeDisplayName }}</h3>
        <div class="location-tab__code">
          <p class="location-tab__code-text">{{ location.siteSerialNumber }}</p>
          <button class="location-tab__code-copy-btn">
            <span 
              v-clipboard:copy="location.siteSerialNumber"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >Copy code</span> &nbsp;&nbsp;
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
        <h2 class="location-tab__heading">{{ location.siteName }}</h2>
        <p class="location-tab__location">
          {{ location.streetAddress }}
        </p>
        <p class="location-tab__duration" v-if="location.everyDayFlag">Opens 24 hours</p>
        <p class="location-tab__duration" v-else><span v-for="(time, index) in location.siteServiceTime" :key="index">{{ time }}<span v-if="index < location.siteServiceTime.length-1">, </span></span></p>
      </div>
      <figure class="location-tab__image">
        <img :src="'http://159.138.38.21:30081/api/file/v1/download/' + location.sitePic[0].pictureIds" alt="Location Image" v-if="location.sitePic.length > 0" />
      </figure>
      <div class="location-tab__actions">
        <span v-for="(service, index) in location.serviceSet" :key="index" class="icon-group">
          <!--Icon Return -->
          <svg
            width="19"
            height="17"
            viewBox="0 0 19 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            v-if="service.functionType === 'SEND'"
            class="icon-return"
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
          <span v-if="service.functionType === 'SEND'" class="icon-return-tooltop">
            Returns
          </span>
          <!--Icon Dry CLeaning -->
          <svg
            class="svg-margin icon-dry"
            width="28"
            height="15"
            viewBox="0 0 28 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            v-if="service.functionType === 'DRY_CLEANING'"
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
          <span v-if="service.functionType === 'DRY_CLEANING'" class="icon-dry-tooltip">
            Dry cleaning
          </span>
          <!--Icon Parcel Collection -->
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            v-if="service.functionType === 'COLLECT'"
            class="icon-parcel"
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
          <span v-if="service.functionType === 'COLLECT'" class="icon-parcel-tooltip">
            Parcel
          </span>
          <!--Icon Laundry -->
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            v-if="service.functionType === 'LAUNDRY'"
            class="icon-laundry"
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
          <span v-if="service.functionType === 'LAUNDRY'" class="icon-laundry-tooltip">
            Laundry
          </span>
        </span>
        <!-- <button class="location-tab__actions-btn">Get directions</button> -->
      </div>
    </div>
</template>
<script>
export default {
    name: 'LocationTab',
    props: {
      location: {
        type: Object,
        required: true,
      },
    },
    data() {
        return {
            isCopy: false,
        };
    },
    methods: {
      showDetail(id) {
        if (this.isCopy) {
          return;
        }

        this.$router.push({ 
          path: `location/${id}`
        });
      },
      onCopy: function (e) {
        alert('You just copied: ' + e.text);
      },
      onError: function () {
        alert('Failed to copy texts')
      }
  }
}
</script>