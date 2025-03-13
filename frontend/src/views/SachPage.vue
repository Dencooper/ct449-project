<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header và công cụ tìm kiếm -->
    <div class="flex-1 p-5">
      <h1 class="text-3xl font-semibold text-gray-900 mb-4 h-16 md:mb-0">Quản Lý Sách</h1>
      <!-- Bộ lọc -->
      <div class="flex flex-wrap gap-3 justify-between">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Tìm kiếm sách..."
              class="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              @input="handleSearch"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <button
            @click="openSachModal()"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Thêm sách
          </button>
        </div>
    </div>

    <!-- Bảng sách -->
    <div class="overflow-x-auto px-5 ">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-200">
          <tr>
            <th scope="col" class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mã sách
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tên sách
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Đơn giá
            </th>
            <th scope="col" class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Số quyển
            </th>
            <th scope="col" class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Năm
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tác giả
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nhà xuất bản
            </th>
            <th scope="col" class="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-300">
          <tr v-if="loading">
            <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
              <div class="flex justify-center">
                <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            </td>
          </tr>
          <tr v-else-if="filteredSach.length === 0">
            <td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500">
              Không tìm thấy quyển sách nào
            </td>
          </tr>
          <tr v-for="sach in filteredSach" :key="sach._id" class="hover:bg-gray-50">
            <td class="px-3 py-5 whitespace-nowrap">
              <div class="text-sm text-center font-medium text-gray-900">{{ sach.MaSach }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ sach.TenSach }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ formatDonGia(sach.DonGia) }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
                <div class="text-sm text-center font-medium text-gray-900">{{ sach.SoQuyen }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
              <div class="flex items-center">
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ sach.NamXuatBan }}</div>
                </div>
              </div>
            </td>
             <td class="px-3 py-5 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ sach.TacGia }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ sach.MaNXB.TenNXB }}</div>
            </td>

            <td class="px-3 py-5 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex justify-end space-x-2">
                <button
                  @click="openSachModal(sach)"
                  class="text-blue-600 hover:text-blue-900 focus:outline-none"
                  title="Chỉnh sửa"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="confirmDeleteSach(sach)"
                  class="text-red-600 hover:text-red-900 focus:outline-none"
                  title="Xóa"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    

    <!-- Modal thêm/sửa sách -->
    <div v-if="showSachModal" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showSachModal = false"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveSach">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {{ editingSach._id ? 'Chỉnh sửa sách' : 'Thêm sách mới' }}
                  </h3>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label for="MaSach" class="block text-sm font-medium text-gray-700">Mã sách</label>
                      <input
                        type="text"
                        id="MaSach"
                        v-model="editingSach.MaSach"
                        required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label for="TenSach" class="block text-sm font-medium text-gray-700">Tên Sách</label>
                      <input
                        id="TenSach"
                        v-model="editingSach.TenSach"
                        type="text"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></input>
                    </div>
                    <div>
                      <label for="DonGia" class="block text-sm font-medium text-gray-700">Giá (VNĐ)</label>
                      <input
                        type="number"
                        id="DonGia"
                        v-model="editingSach.DonGia"
                        required
                        min="0"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label for="MaNXB" class="block text-sm font-medium text-gray-700">Nhà xuất bản</label>
                      <select
                        id="MaNXB"
                        v-model="editingSach.MaNXB"
                        required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="" disabled>Chọn danh mục</option>
                        <option v-for="nhaXuatBan in nhaXuatBanList" :key="nhaXuatBan._id" :value="nhaXuatBan._id">
                          {{ nhaXuatBan.TenNXB }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label for="SoQuyen" class="block text-sm font-medium text-gray-700">Số quyển</label>
                      <input
                        type="number"
                        id="SoQuyen"
                        v-model="editingSach.SoQuyen"
                        required
                        min="0"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label for="NamXuatBan" class="block text-sm font-medium text-gray-700">Năm xuất bản</label>
                      <input
                        type="number"
                        id="NamXuatBan"
                        v-model="editingSach.NamXuatBan"
                        required
                        min="0"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label for="TacGia" class="block text-sm font-medium text-gray-700">Tác giả</label>
                      <input
                        id="TacGia"
                        v-model="editingSach.TacGia"
                        type="text"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></input>
                    </div>
                    
                    
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                
                {{editingSach._id ? 'Cập nhật' : 'Thêm mới' }}
              </button>
              <button
                type="button"
                @click="showSachModal = false"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal xác nhận xóa -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showDeleteModal = false"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Xác nhận xóa
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Bạn có chắc chắn muốn xóa sách <span class="font-semibold">{{ sachToDelete?.MaSach }}</span>? Hành động này không thể hoàn tác.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="deleteSach"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Xóa
            </button>
            <button
              type="button"
              @click="showDeleteModal = false"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, reactive, computed, onMounted, watch } from 'vue';
import { getAllSach, createSach, updateSach, deleteSach as apiDeleteSach, getAllNhaXuatBan } from '../api';

// State
const sachList = ref([]);
const nhaXuatBanList = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const showSachModal = ref(false);
const showDeleteModal = ref(false);
const sachToDelete = ref(null);
const editingSach = reactive({
  _id: null,
  MaSach: '',
  TenSach: '',
  DonGia: 0,
  MaNXB: '',
  SoQuyen: 0,
  NamXuatBan: 0,
  TacGia: ''
});

const filteredSach = computed(() => {
  let result = [...sachList.value];
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(sach => 
      sach.TenSach.toLowerCase().includes(query) || 
      sach.TacGia.toLowerCase().includes(query)
    );
  }
  return result;
});


const loadSach = async () => {
  loading.value = true;
  try {
    const response = await getAllSach();
    sachList.value = response.data;
  } catch (error) {
    console.error('Lỗi tải sách: ', error);
  } finally {
    loading.value = false;
  }
};


const loadNhaXuatBan = async () => {
  try {
    const response = await getAllNhaXuatBan();
    nhaXuatBanList.value = response.data;
  } catch (error) {
    console.error('Lỗi tải nhà xuất bản: ', error);
  }
};

const openSachModal = (sach = null) => {
  if (sach) {
    Object.assign(editingSach, {
      _id: sach._id,
      MaSach: sach.MaSach,
      TenSach: sach.TenSach || '',
      DonGia: sach.DonGia,
      MaNXB: sach.MaNXB?._id || sach.MaNXB || '',
      SoQuyen: sach.SoQuyen,
      NamXuatBan: sach.NamXuatBan,
      TacGia: sach.TacGia
    });
    
  } else {
    Object.assign(editingSach, {
      _id: null,
      MaSach: '',
      TenSach: '',
      DonGia: 0,
      category: '',
      SoQuyen: 0,
      imageUrl: ''
    });
  }
  showSachModal.value = true;
};
  

const saveSach = async () => {
  try {
    let response;
    if (editingSach._id) {
      response = await updateSach(editingSach._id, editingSach);
    } else {
      response = await createSach(editingSach);
    }
    
    showSachModal.value = false;
    loadSach();
  } catch (error) {
    console.error('Lỗi lưu sách:', error);
    alert('Có lỗi xảy ra khi lưu thông tin sách. Vui lòng thử lại.');
  } 
};

const confirmDeleteSach  = (sach) => {
  sachToDelete.value = sach;
  showDeleteModal.value = true;
};

const deleteSach = async () => {
  try {
    await apiDeleteSach(sachToDelete.value._id);
    showDeleteModal.value = false;
    loadSach();
  } catch (error) {
    console.error('Lỗi xóa sách:', error);
    alert('Có lỗi xảy ra khi xóa sách. Vui lòng thử lại.');
  }
};

const formatDonGia = (DonGia) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(DonGia);
};

onMounted(() => {
  loadNhaXuatBan();
  loadSach();
});
</script>