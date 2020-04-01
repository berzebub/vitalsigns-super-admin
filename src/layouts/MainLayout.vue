<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      persistent
      show-if-above
      :width="105"
      :breakpoint="100"
      content-class="bg-black"
      v-if="$q.platform.is.desktop"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item class="color-white q-py-sm" to="/hospital" clickable v-ripple>
            <q-item-section>
              <div align="center">
                <q-icon
                  size="33px"
                  name="hotel"
                  :color="$route.name == 'hospital' ? 'white' : 'grey'"
                />
                <div
                  class="q-pb-sm"
                  :class="$route.name == 'hospital' ? 'text-white' : 'text-grey'"
                >โรงพยาบาล</div>
              </div>
            </q-item-section>
          </q-item>

          <q-item class="color-white q-py-sm" clickable v-ripple>
            <q-item-section>
              <div align="center">
                <q-icon
                  size="33px"
                  name="settings"
                  :color="$route.name == 'settings' ? 'white' : 'grey'"
                />
                <div
                  class="q-pb-sm"
                  :class="$route.name == 'settings' ? 'text-white' : 'text-grey'"
                >เพิ่มเติม</div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";

export default {
  name: "MainLayout",

  components: {
    EssentialLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Docs",
          caption: "quasar.dev",
          icon: "school",
          link: "https://quasar.dev"
        },
        {
          title: "Github",
          caption: "github.com/quasarframework",
          icon: "code",
          link: "https://github.com/quasarframework"
        },
        {
          title: "Discord Chat Channel",
          caption: "chat.quasar.dev",
          icon: "chat",
          link: "https://chat.quasar.dev"
        },
        {
          title: "Forum",
          caption: "forum.quasar.dev",
          icon: "record_voice_over",
          link: "https://forum.quasar.dev"
        },
        {
          title: "Twitter",
          caption: "@quasarframework",
          icon: "rss_feed",
          link: "https://twitter.quasar.dev"
        },
        {
          title: "Facebook",
          caption: "@QuasarFramework",
          icon: "public",
          link: "https://facebook.quasar.dev"
        }
      ]
    };
  }
};
</script>
