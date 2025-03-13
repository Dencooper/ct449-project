<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Hồ Sơ Người Dùng</h1>
    
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-1">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-6 text-center">
            <div class="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-blue-600">
                {{ getInitials(authStore.user?.firstName, authStore.user?.lastName) }}
              </span>
            </div>
            <h2 class="text-xl font-semibold">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</h2>
            <p class="text-gray-600">{{ authStore.user?.email }}</p>
          </div>
          
          <div class="border-t">
            <ul>
              <li>
                <router-link to="/profile" class="block px-4 py-3 hover:bg-gray-50 flex items-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Thông tin cá nhân
                </router-link>
              </li>
              <li>
                <router-link to="/orders" class="block px-4 py-3 hover:bg-gray-50 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Đơn hàng của tôi
                </router-link>
              </li>
              <li>
                <router-link to="/wishlist" class="block px-4 py-3 hover:bg-gray-50 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Danh sách yêu thích
                </router-link>
              </li>
              <li>
                <button @click="logout" class="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="md:col-span-2">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-4 border-b">
            <h2 class="text-lg font-semibold">Thông tin cá nhân</h2>
          </div>
          
          <div class="p-4">
            <div v-if="updateSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Cập nhật thông tin thành công!
            </div>
            
            <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {{ error }}
            </div>
            
            <form @submit.prevent="updateProfile">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label for="firstName" class="block text-gray-700 mb-2">Họ</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    v-model="userInfo.firstName" 
                    class="input"
                    required
                  />
                </div>
                
                <div>
                  <label for="lastName" class="block text-gray-700 mb-2">Tên</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    v-model="userInfo.lastName" 
                    class="input"
                    required
                  />
                </div>
              </div>
              
              <div class="mb-4">
                <label for="email" class="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="userInfo.email" 
                  class="input"
                  required
                />
              </div>
              
              <div class="mb-6">
                <h3 class="text-gray-700 mb-2">Thay đổi mật khẩu</h3>
                <p class="text-sm text-gray-500 mb-2">Để trống nếu bạn không muốn thay đổi mật khẩu</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="password" class="block text-gray-700 mb-2">Mật khẩu mới</label>
                    <input 
                      type="password" 
                      id="password" 
                      v-model="userInfo.password" 
                      class="input"
                      minlength="6"
                    />
                  </div>
                  
                  <div>
                    <label for="confirmPassword" class="block text-gray-700 mb-2">Xác nhận mật khẩu</label>
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      v-model="confirmPassword" 
                      class="input"
                    />
                    <p v-if="passwordMismatch" class="text-red-500 text-sm mt-1">
                      Mật khẩu không khớp
                    </p>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                :disabled="updateLoading || passwordMismatch"
              >
                <span v-if="updateLoading">Đang cập nhật...</span>
                <span v-else>Cập nhật thông tin</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(true);
const updateLoading = ref(false);
const updateSuccess = ref(false);
const error = ref('');
const confirmPassword = ref('');

const userInfo = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
});

const passwordMismatch = computed(() => {
    return userInfo.value.password && confirmPassword.value && userInfo.value.password !== confirmPassword.value;
});

const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const updateProfile = async () => {
    if (passwordMismatch.value) {
        return;
    }

    updateLoading.value = true;
    error.value = '';
    updateSuccess.value = false;

    try {
        await updateUserProfile({
            firstName: userInfo.value.firstName,
            lastName: userInfo.value.lastName,
            email: userInfo.value.email,
            password: userInfo.value.password || undefined
        });

        // Cập nhật thông tin người dùng trong store
        await authStore.fetchCurrentUser();

        updateSuccess.value = true;
        userInfo.value.password = '';
        confirmPassword.value = '';

        // Tự động ẩn thông báo thành công sau 3 giây
        setTimeout(() => {
            updateSuccess.value = false;
        }, 3000);
    } catch (err) {
        error.value = 'Cập nhật thông tin thất bại. Vui lòng thử lại.';
        console.error(err);
    } finally {
        updateLoading.value = false;
    }
};

const logout = () => {
    authStore.logout();
    router.push('/login');
};

onMounted(async () => {
    if (!authStore.isLoggedIn) {
        router.push('/login');
        return;
    }
    try {

        if (authStore.user) {
            userInfo.value.firstName = authStore.user.firstName || '';
            userInfo.value.lastName = authStore.user.lastName || '';
            userInfo.value.email = authStore.user.email || '';
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    } finally {
        loading.value = false;
    }
});
</script>
