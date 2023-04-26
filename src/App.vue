<script setup lang="ts">
import { useRouter } from 'vue-router'
import AboutIcon from '~icons/ph/info-bold'
import AccountIcon from '~icons/ph/user-circle'
import FeedbackIcon from '~icons/ph/chat-bold'
import LegalIcon from '~icons/ph/file'
import LogoutIcon from '~icons/ph/sign-out-bold'

const { state } = useState()
const { isEditDrawer } = useSelector()
const closeDrawer = ref(false)
const colorInStorage = localStorage.getItem('vueuse-color-scheme')

onMounted(() => {
  const html = document.getElementsByTagName('html')

  html[0].setAttribute('theme', colorInStorage)
})

const router = useRouter()

const optionLists = shallowRef([
  {
    id: 1,
    slug: 'account',
    name: 'Account',
    function: () => {
      closeDrawer.value = true
    },
    icon: AccountIcon,
  },
  {
    id: 2,
    slug: 'feedBack',
    name: 'FeedBack',
    function: () => {
      router.push('/FeedBack')
    },
    icon: FeedbackIcon,
  },
  {
    id: 3,
    slug: 'about',
    name: 'About',
    function: () => {
      router.push('/About')
    },
    icon: AboutIcon,
  },
  {
    id: 3,
    slug: 'legal',
    name: 'Legal',
    function: () => {
      router.push('/Legal')
    },
    icon: LegalIcon,
  },
  {
    id: 3,
    slug: 'logout',
    name: 'Logout',
    // function: () => {
    //   emits('Logout', props.todo.id)
    // },
    icon: LogoutIcon,
  },
])
</script>

<template>
  <div id="main" my-auto of-hidden h-screen grid
    class="md:grid-cols-[320px_1fr] border gap-8 px-5 py-4 text-rubik  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 border bg-primary text-main">
    <LayoutBlur :background="state.category.value.color.hex" />
    <LeftPanel class="md:block hidden" />
    <div class="py-2 overflow-y-scroll">
      <div class="border border-blue mx-auto max-w-2xl">
        <router-view />
      </div>
    </div>
  </div>
  <!-- <div class="absolute top-[10px] right-[20px]">
    <SubtleBg @click="closeDrawer = true">
      <li class="i-ph:dots-three-outline-vertical-thin w-4 h-4" />
    </SubtleBg>
  </div> -->

  <div class="absolute top-[10px] right-[20px]">
    <DDropDown ref="dropdownRef" triggers="click">
      <template #overlay>
        <div ref="list" tabindex="-1" class="betaselect__content-wrapper" style=" width: 240px;">
          <ThemeSwitcher />
          <ul role="listbox">
            <li v-for="option, idx in optionLists" :id="`null-${idx}`" :key="idx" class="betaselect__element left"
              role="option" @click="option.function">
              <component :is="option.icon" :key="idx" class="w-4 h-4 fill-current text-grey cursor-pointer"
                aria-hidden="true" />

              <span class=" betaselect__option">
                {{ option.name }}
              </span>
            </li>
          </ul>
        </div>
      </template>
      <template #activator="{ toggle }">
        <SubtleBg color="bg-upload" class="px-2 py-3 rounded-lg" @click="toggle">
          <li class="i-ph:dots-three-outline-vertical-thin w-4 h-4 text-main" />
        </SubtleBg>
      </template>
    </DDropDown>
  </div>
  <DDrawer :width="1070" :visible="closeDrawer" closable @close="closeDrawer = false">
    <template #header />
  </DDrawer>
</template>

<style>
body {
  @apply font-rubik;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
