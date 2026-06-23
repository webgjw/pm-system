<template>
  <router-view />

  <van-tabbar route fixed>
    <van-tabbar-item to="/" icon="home-o">
      机选
    </van-tabbar-item>
    <van-tabbar-item to="/history" icon="records">
      历史
    </van-tabbar-item>
  </van-tabbar>
</template>