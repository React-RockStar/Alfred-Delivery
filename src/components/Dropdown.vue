<template>
  
  <div class="dropdown">
    <!-- {{options}} -->
    <button
      class="dropdown__btn"
      :class="{ 'dropdown__btn--active': isOpen, 'light-blue-dropdown': changedDropdown }"
      @click="isOpen = !isOpen"
    >
      {{ optionSelected ? optionSelected.name : label }}
      <svg class="dropdown__icon" v-if="!isOpen">
        <use xlink:href="@/assets/images/sprite.svg#icon-chevron-down"></use>
      </svg>
      <svg class="dropdown__icon" v-else>
        <use xlink:href="@/assets/images/sprite.svg#icon-chevron-up"></use>
      </svg>
    </button>
    <button
      v-if="isOpen"
      tabindex="-1"
      class="dropdown__backdrop"
      @click="isOpen = !isOpen"
    ></button>
    <div
      class="dropdown__content"
      v-if="isOpen"
      :style="[isLastDropdown ? { 'margin-left': '-75px' } : null]"
    >
      <span
        class="dropdown__link"
        :style="[
          optionSelected === null
            ? { 'background-color': '#068dc9', color: '#fff' }
            : null,
        ]"
        @click="choosed(null)"
        >{{ label }}</span
      >
      
      <span
        v-for="(option, index) in options"
        class="dropdown__link"
        :key="index"
        :style="[
          optionSelected && optionSelected.id === option.id
            ? { 'background-color': '#068dc9', color: '#fff' }
            : null, 
        ]"
        @click="choosed(option)">
          {{ option.name }}
        </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dropdown",
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    isLastDropdown: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      // options: [
      //   { group: true, group_name: "Redemption Center"},
      //   { id: '1', name: '4PX'},
      //   { id: '2', name: '5PX'},
      //   { group: true, group_name: "Smart Locker"},
      //   { id: '3', name: '6px' },
      //   { id: '4', name: '7px' },
      // ],
      isOpen: false,
      optionSelected: null,
      changedDropdown: false,
    };
  },
  methods: {
    handleEscape(e) {
      if (e.key === "Esc" || e.key === "Escape") {
        this.isOpen = false;
      }
    },
    choosed(option) {
      console.log("Data: "+option)
      this.isOpen = !this.isOpen;
      this.optionSelected = option;
      this.$emit("choosed", option ? option.id : null);
      if(option === null){
        this.changedDropdown = false;
      }
      else{
        this.changedDropdown = true;
      }
    },
  },
  created() {
    document.addEventListener("keydown", this.handleEscape);
    this.options.splice(0, 0, { id: '0', name: 'Redemption Center'});
    this.options.splice(this.options.length-2, 0, { id: '0', name: 'Smart Locker'});
    
  },
  destroyed() {
    document.removeEventListener("keydown", this.handleEscape);
  },
};
</script>
