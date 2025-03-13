<template>
  <div>
    <div class="hidden lg:flex lg:flex-shrink-0 h-full w-full">
      <div class="flex flex-col w-64">
        <div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4">
              <h1 class="text-xl font-bold text-gray-800">Quản Lý Thư Viện</h1>
            </div>
            <nav class="mt-5 flex-1 px-2 bg-white space-y-1">
              <div class="space-y-1">
                <router-link 
                  v-for="item in menuItems" 
                  :key="item.name" 
                  :to="item.to" 
                  :class="[
                    activeMenu === item.id 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  ]"
                >
                  {{ item.name }}
                </router-link>
              </div>
            </nav>
          </div>
          
          <!-- User profile -->
          <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div class="flex-shrink-0 group block w-full">
              <div class="flex items-center">
                <div>
                  <img class="inline-block h-10 w-10 rounded-full" :src="avatarUrl" alt="Admin avatar" />
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">Admin</p>
                  <button class="text-xs font-medium text-gray-500 group-hover:text-gray-700" @click="handleLogout">Đăng xuất</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth';

const router = useRouter()

const authStore = useAuthStore();
const props = defineProps({
  activeMenu: {
    type: String,
    default: 'dashboard'
  }
});

const sidebarOpen = ref(false);

// URL hình ảnh avatar mặc định
const avatarUrl = computed(() => {
  return 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff';
});

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}


const menuItems = [
  { id: 'dashboard', name: 'Dashboard', to: '/'},
  { id: 'sach', name: 'Sách', to: '/sach'},
  { id: 'nhaxuatban', name: 'Nhà xuất bản', to: '/nhaxuatban'},
  { id: 'docgia', name: 'Đọc giả', to: '/docgia' },
  { id: 'muonsach', name: 'Mượn sách', to: '/muonsach' },
  { id: 'nhanvien', name: 'Nhân viên', to: '/nhanvien'},
];
</script>