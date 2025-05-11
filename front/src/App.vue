<template>
    <HeaderNav/>
    <div class="container-fluid">
        <div class="row g-1">
            <SideNav/>
            <div class="col-md-9"><router-view/></div>
        </div>
    </div>
</template>

<script>

import HeaderNav from "@/components/common/HeaderNav.vue";
import SideNav from "@/components/common/SideNav.vue";

export default {
  name: 'App',
  components: {
      HeaderNav,
      SideNav
  }
}
</script>
