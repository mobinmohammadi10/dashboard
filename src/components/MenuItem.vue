<template>
  <li :id="'links_' + id">
    <router-link v-if="isUsedVueRouter" :to="menuItem.link">
      <i class="bx" :class="menuItem.icon || 'bx-square-rounded'" />
      <span class="links_name">{{ menuItem.name }}</span>
    </router-link>
    <a v-else @click.stop.prevent="menuItemClicked" :href="menuItem.link">
      <i class="bx" :class="menuItem.icon || 'bx-square-rounded'" />
      <span class="links_name">{{ menuItem.name }}</span>
    </a>
    <span :data-target="'links_' + id" class="tooltip">
      {{ menuItem.tooltip || menuItem.name }}
    </span>
  </li>
</template>

<script setup>
const props = defineProps({
  menuItem: {
    type: Object,
    required: true
  },
  id: {
    type: [Number, String],
    required: true
  },
  isUsedVueRouter: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['menu-item-clicked'])

const menuItemClicked = () => {
  emit('menu-item-clicked', props.menuItem.link)
}
</script>

<style scoped>
li {
  position: relative;
  margin: 8px 0;
  list-style: none;
}

a {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: var(--bg-color);
}

a:hover {
  background: var(--menu-items-hover-color);
}

.links_name {
  color: var(--menu-items-text-color);
  font-size: 15px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}

a:hover .links_name,
a:hover i {
  transition: all 0.5s ease;
  color: var(--bg-color);
}

i {
  height: 50px;
  min-width: 50px;
  line-height: 50px;
  font-size: 18px;
  border-radius: 12px;
  text-align: center;
}

.tooltip {
  position: absolute;
  z-index: 3;
  background: #ffffff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: 0s;
}
</style>
