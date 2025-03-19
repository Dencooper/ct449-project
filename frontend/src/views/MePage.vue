<template>
  <div class="flex flex-col min-h-screen justify-center items-center">
    <h1 class="text-3xl font-bold mb-12">Thông Tin Cá Nhân</h1>
    
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
    
    <div v-else class="w-full max-w-3xl">
      <div>
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="p-4 border-b">
            <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {{ error }}
            </div>
            
            <form @submit.prevent="updateProfile">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div>
                  <label for="MSNV" class="block text-gray-700 mb-2 ms-2">Mã số</label>
                  <input 
                    type="text" 
                    id="MSNV" 
                    v-model="nhanVienInfo.MSNV" 
                    class="input"
                    disabled
                    required
                  />
                </div>
                
                <div class="md:col-span-2">
                  <label for="HoTen" class="block text-gray-700 mb-2 ms-2">Họ tên</label>
                  <input 
                    type="text" 
                    id="HoTen" 
                    v-model="nhanVienInfo.HoTen" 
                    class="input"
                    required
                  />
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label for="SoDienThoai" class="block text-gray-700 mb-2 ms-2">Số điện thoại</label>
                  <input 
                    type="text" 
                    id="SoDienThoai" 
                    v-model="nhanVienInfo.SoDienThoai" 
                    class="input"
                    required
                  />
                </div>
                
                <div class="md:col-span-2">
                  <label for="DiaChi" class="block text-gray-700 mb-2 ms-2">Địa chỉ</label>
                  <input 
                    type="text" 
                    id="DiaChi" 
                    v-model="nhanVienInfo.DiaChi" 
                    class="input"
                    required
                  />
                </div>
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
                      v-model="nhanVienInfo.password" 
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
import { updateProfile as updateNhanVienProfile } from '../api';
import { useToast } from 'vue-toastification';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();
const loading = ref(true);
const updateLoading = ref(false);
const error = ref('');
const confirmPassword = ref('');

const nhanVienInfo = ref({
    MSNV: '',
    HoTen: '',
    SoDienThoai: '',
    DiaChi: ''
});

const passwordMismatch = computed(() => {
    return nhanVienInfo.value.password && confirmPassword.value && nhanVienInfo.value.password !== confirmPassword.value;
});


const updateProfile = async () => {
    if (passwordMismatch.value) {
        return;
    }

    updateLoading.value = true;
    error.value = '';
    try {
        await updateNhanVienProfile({
            MSNV: nhanVienInfo.value.MSNV,
            HoTen: nhanVienInfo.value.HoTen,
            SoDienThoai: nhanVienInfo.value.SoDienThoai,
            DiaChi: nhanVienInfo.value.DiaChi,
            password: nhanVienInfo.value.password || undefined
        });

        await authStore.fetchCurrentNhanVien();
        toast.success('Cập nhật thông tin cá nhân thành công', {
          position: "top-right",
          timeout: 3000,
          toastClassName: "custom-toast"
        });
        nhanVienInfo.value.password = '';
        confirmPassword.value = '';

    } catch (err) {
        error.value = 'Cập nhật thông tin thất bại. Vui lòng thử lại.';
        console.error(err);
    } finally {
        updateLoading.value = false;
    }
};

onMounted(async () => {
    if (!authStore.nhanVien) {
        router.push('/login');
        return;
    }
    try {
        if (authStore.nhanVien) {
            nhanVienInfo.value.MSNV = authStore.nhanVien.MSNV || '';
            nhanVienInfo.value.HoTen = authStore.nhanVien.HoTenNV || '';
            nhanVienInfo.value.SoDienThoai = authStore.nhanVien.SoDienThoai || '';
            nhanVienInfo.value.DiaChi = authStore.nhanVien.DiaChi || '';
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    } finally {
        loading.value = false;
    }
});
</script>
