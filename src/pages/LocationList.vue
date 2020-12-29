<template>
  <div>
    <div class="list-location">
      <TrackingBar @clicked="searchByQuery" :query="query" />
      <div class="dropdown__container">
        <dropdown label="Any type" :options="types" @choosed="searchByType" />
        <!--Custom Dropdown-->
        <div class="dropdown">
          <button
            class="dropdown__btn"
            :class="{ 'dropdown__btn--active': isOpenDistrict, 'light-blue-dropdown': changedDropdown}"
            @click="isOpenDistrict = !isOpenDistrict"
          >
            {{ districtSelected ? districtSelected.name : "Districts" }}
            <svg class="dropdown__icon" v-if="!isOpenDistrict">
              <use
                xlink:href="@/assets/images/sprite.svg#icon-chevron-down"
              ></use>
            </svg>
            <svg class="dropdown__icon" v-else>
              <use
                xlink:href="@/assets/images/sprite.svg#icon-chevron-up"
              ></use>
            </svg>
          </button>
          <button
            v-if="isOpenDistrict"
            tabindex="-1"
            class="dropdown__backdrop"
            @click="isOpenDistrict = !isOpenDistrict"
          ></button>
          <div class="dropdown__content" v-if="isOpenDistrict">
            <span
              class="dropdown__link"
              :style="[
                districtSelected === null
                  ? { 'background-color': '#068dc9', color: '#fff' }
                  : null,
              ]"
              @click="searchByDistrict(null)"
              >Districts</span
            >
            <span
              v-for="(district, keyDistrict) in districts"
              class="dropdown__link"
              :key="keyDistrict"
              :style="appliedStyleDropdownDistrict(district)"
              @click="searchByDistrict(district)"
            >
              {{ district.name }}
            </span>
          </div>
        </div>
        <dropdown
          label="Services"
          :options="services"
          @choosed="searchByService"
          :isLastDropdown="true"
        />
      </div>
      <div v-if="locations.length > 0">
        <location-tab
          v-for="(location, index) in locations"
          :key="index"
          v-bind:location="location"
        />
      </div>
      <div
        style="text-align: center; padding-top: 1rem"
        v-if="!isLoading && locations.length < 1"
      >
        <strong>Data not found</strong>
      </div>
      <div style="text-align: center" v-if="isLoading">
        <pulse-loader />
      </div>
      <Pagination
        :paginator="paginator"
        v-if="paginator && locations.length > 0 && !isLoading"
        @changePage="getLocations"
      />
    </div>
    <div class="map">
      <Map :locations="maps" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import LocationTab from "@/components/LocationTab.vue";
import Map from "@/components/Map.vue";
import Dropdown from "@/components/Dropdown.vue";
import TrackingBar from "@/components/TrackingBar.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "LocationList",
  components: {
    LocationTab,
    Map,
    Dropdown,
    TrackingBar,
    PulseLoader,
    Pagination,
  },
  data() {
    return {
      query: null,
      typeSelected: null,
      districtSelected: null,
      serviceSelected: null,
      locations: [],
      maps: [],
      perpage: 20,
      types: [],
      districts: [],
      services: [],
      isOpenDistrict: false,
      changedDropdown: false,
      isLoading: false,
      paginator: null,
    };
  },
  methods: {
    async getTypes() {
      const vm = this;

      vm.types = [];
      await axios
        .get(`http://159.138.38.21:30081/api/locker/v1/site/findSiteTypeList`, {
          headers: {
            "X-Req-Language": "en",
          },
        })
        .then(function (response) {
          // handle success
          vm.types = response.data.map(function (type) {
            return {
              id: type.siteTypeEnmu,
              name: type.siteTypeName,
            };
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    async getDistricts() {
      const vm = this;

      vm.districts = [];
      await axios
        .get(`http://159.138.38.21:30081/api/user/v1/district/listNested`, {
          headers: {
            "X-Req-Language": "en",
          },
        })
        .then(function (response) {
          // handle success
          response.data.forEach((district) => {
            vm.districts.push({
              id: district.districtId,
              name: district.enName,
              isParent: true,
            });
            district.children.forEach((subDistrict) => {
              vm.districts.push({
                id: subDistrict.districtId,
                name: subDistrict.enName,
                isParent: false,
              });
            });
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    async getServices() {
      const vm = this;

      vm.services = [];
      await axios
        .get(
          `http://159.138.38.21:30081/api/service/v1/service/all/simpleInfo`,
          {
            headers: {
              "X-Req-Language": "en",
            },
          }
        )
        .then(function (response) {
          // handle success
          vm.services = response.data.map(function (service) {
            return {
              id: service.lockerServiceName,
              name: service.lockerServiceName,
            };
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    async getLocations(page = 0) {
      const vm = this;

      vm.isLoading = true;
      vm.locations = [];
      await axios
        .post(
          `http://159.138.38.21:30081/api/locker/v1/queryForMap`,
          {
            size: vm.perpage,
            page: page,
            queryKeyword: vm.query,
            siteTypes: vm.typeSelected ? [vm.typeSelected] : [],
            level3AriaId: vm.districtSelected ? vm.districtSelected.id : null,
            services: vm.serviceSelected,
          },
          {
            headers: {
              "X-Req-Language": "en",
              username: "alfredwebsite",
              password: "alfredwebsite",
            },
          }
        )
        .then(function (response) {
          // handle success
          vm.locations = response.data.content;
          vm.paginator = response.data;
          vm.isLoading = false;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    async getMaps() {
      const vm = this;

      vm.maps = [];
      await axios
        .post(
          `http://159.138.38.21:30081/api/locker/v1/listForMap`,
          {
            queryKeyword: vm.query,
            siteTypes: vm.typeSelected ? [vm.typeSelected] : [],
            level3AriaId: vm.districtSelected ? vm.districtSelected.id : null,
            services: vm.serviceSelected,
          },
          {
            headers: {
              "X-Req-Language": "en",
            },
          }
        )
        .then(function (response) {
          // handle success
          vm.maps = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    handleEscape(e) {
      if (e.key === "Esc" || e.key === "Escape") {
        this.isOpenDistrict = false;
      }
    },
    searchByQuery(query) {
      this.query = query;
      this.getLocations();
      this.getMaps();
    },
    searchByType(type) {
      this.typeSelected = type;
      this.getLocations();
      this.getMaps();
    },
    searchByDistrict(district) {
      this.isOpenDistrict = !this.isOpenDistrict;
      this.districtSelected = district;
      this.getLocations();
      this.getMaps();
      if(district === null){
        this.changedDropdown = false;
      }
      else{
        this.changedDropdown = true;
      }
    },
    searchByService(service) {
      this.serviceSelected = service;
      this.getLocations();
      this.getMaps();
    },
    appliedStyleDropdownDistrict(district) {
      let style = {
        "text-align": "left",
        "border-bottom": "solid 1px var(--color-grey-lightest)"
      };
      if (!district.isParent) {
        style["padding-left"] = "3em";
        style["border-bottom"] = "none";
      }

      if (
        district &&
        this.districtSelected &&
        this.districtSelected.id === district.id
      ) {
        style["background-color"] = "#068dc9";
        style["color"] = "#FFF";
      }

      return style;
    },
  },
  mounted() {
    if (typeof this.$route.query.q !== "undefined") {
      this.query = this.$route.query.q;
    }

    this.getTypes();
    this.getDistricts();
    this.getServices();
    this.getLocations();
    this.getMaps();
  },
  created() {
    document.addEventListener("keydown", this.handleEscape);
  },
  destroyed() {
    document.removeEventListener("keydown", this.handleEscape);
  },
};
</script>