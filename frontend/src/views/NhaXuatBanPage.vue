<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex-1 p-5">
      <h1 class="text-3xl font-semibold text-gray-900 mb-4 h-16 md:mb-0">Quản Lý Nhà Xuất Bản</h1>
      <div class="flex flex-wrap gap-3 justify-between">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Tìm kiếm nhà xuất bản..."
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
            @click="openNhaXuatBanModal()"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Thêm nhà xuất bản
          </button>
        </div>
    </div>

    <!-- Bảng nhà xuất bản -->
    <div class="overflow-x-auto px-5 ">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-200">
          <tr>
            <th scope="col" class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mã nhà xuất bản
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tên nhà xuất bản
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Địa chỉ
            </th>
            <th scope="col" class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Số sách
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
          <tr v-else-if="filteredNhaXuatBan.length === 0">
            <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
              Không tìm thấy nhà xuất bản nào
            </td>
          </tr>
          <tr v-for="nxb in filteredNhaXuatBan" :key="nxb._id" class="hover:bg-gray-50">
            <td class="px-3 py-5 whitespace-nowrap">
              <div class="text-sm text-center font-medium text-gray-900">{{ nxb.MaNXB }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ nxb.TenNXB }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ nxb.DiaChi }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
                <div class="text-sm text-center font-medium text-gray-900">{{ nxb.booksQuantity }}</div>
            </td>

            <td class="px-3 py-5 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex justify-end space-x-2">
                <button
                  @click="openNhaXuatBanModal(nxb)"
                  class="text-blue-600 hover:text-blue-900 focus:outline-none"
                  title="Chỉnh sửa"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="confirmDeleteNhaXuatBan(nxb)"
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

    

    <!-- Modal thêm/sửa nhà xuất bản -->
    <div v-if="showNhaXuatBanModal" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showNhaXuatBanModal = false"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveNhaXuatBan">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {{ editingNhaXuatBan._id ? 'Chỉnh sửa nhà xuất bản' : 'Thêm sách nhà xuât bản' }}
                  </h3>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label for="MaNXB" class="block text-sm font-medium text-gray-700">Mã nhà xuất bản</label>
                      <input
                        type="text"
                        id="MaNXB"
                        v-model="editingNhaXuatBan.MaNXB"
                        required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label for="TenNXB" class="block text-sm font-medium text-gray-700">Tên nhà xuất bản</label>
                      <input
                        id="TenNXB"
                        v-model="editingNhaXuatBan.TenNXB"
                        type="text"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></input>
                    </div>
                    <div>
                      <label for="DiaChi" class="block text-sm font-medium text-gray-700">Địa chỉ</label>
                      <input
                        id="DiaChi"
                        v-model="editingNhaXuatBan.DiaChi"
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
                
                {{editingNhaXuatBan._id ? 'Cập nhật' : 'Thêm mới' }}
              </button>
              <button
                type="button"
                @click="showNhaXuatBanModal = false"
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
                    Bạn có chắc chắn muốn xóa nhà xuất bản <span class="font-semibold">{{ nhaXuatBanToDelete?.MaNXB }}</span>? Hành động này không thể hoàn tác.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="deleteNhaXuatBan"
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
import { getAllNhaXuatBan, createNhaXuatBan, updateNhaXuatBan, deleteNhaXuatBan as apiDeleteNhaXuatBan, getNhaXuatBanBooks } from '../api';

// State
const nhaXuatBanList = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const showNhaXuatBanModal = ref(false);
const showDeleteModal = ref(false);
const nhaXuatBanToDelete = ref(null);
const editingNhaXuatBan = reactive({
  _id: null,
  MaNXB: '',
  TenNXB: '',
  DiaChi: ''
});

const filteredNhaXuatBan = computed(() => {
  let result = [...nhaXuatBanList.value];
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(nxb => 
      nxb.TenNXB.toLowerCase().includes(query)
    );
  }
  return result;
});


const loadNhaXuatBan = async () => {
  loading.value = true;
  try {
    const response = await getAllNhaXuatBan();
    nhaXuatBanList.value = response.data;
    for (let i = 0; i < nhaXuatBanList.value.length; i++) {
      const response = await getNhaXuatBanBooks(nhaXuatBanList.value[i]._id);
      const sachList = response.data;
      const newNhaXuatBan = { ...nhaXuatBanList.value[i], booksQuantity: sachList.length};
      nhaXuatBanList.value[i] = newNhaXuatBan;
    }
    console.log(nhaXuatBanList.value);

  } catch (error) {
    console.error('Lỗi tải sách: ', error);
  } finally {
    loading.value = false;
  }
};

const openNhaXuatBanModal = (nxb = null) => {
  if (nxb) {
    Object.assign(editingNhaXuatBan, {
      _id: nxb._id,
      MaNXB: nxb.MaNXB,
      TenNXB: nxb.TenNXB || '',
      DiaChi: nxb.DiaChi
    });
    
  } else {
    Object.assign(editingNhaXuatBan, {
      _id: null,
      MaNXB: '',
      TenNXB: '',
      DiaChi: ''
    });
  }
  showNhaXuatBanModal.value = true;
};
  

const saveNhaXuatBan = async () => {
  try {
    let response;
    if (editingNhaXuatBan._id) {
      response = await updateNhaXuatBan(editingNhaXuatBan._id, editingNhaXuatBan);
    } else {
      response = await createNhaXuatBan(editingNhaXuatBan);
    }
    
    showNhaXuatBanModal.value = false;
    loadNhaXuatBan();
  } catch (error) {
    console.error('Lỗi lưu nhà xuất bản:', error);
    alert('Có lỗi xảy ra khi lưu thông tin nhà xuất bản. Vui lòng thử lại.');
  } 
};

const confirmDeleteNhaXuatBan  = (nhaXuatBan) => {
  nhaXuatBanToDelete.value = nhaXuatBan;
  showDeleteModal.value = true;
};

const deleteNhaXuatBan = async () => {
  try {
    await apiDeleteNhaXuatBan(nhaXuatBanToDelete.value._id);
    showDeleteModal.value = false;
    loadNhaXuatBan();
  } catch (error) {
    console.error('Lỗi xóa nhà xuất bản:', error);
    alert('Có lỗi xảy ra khi xóa nhà xuất bản. Vui lòng thử lại.');
  }
};

onMounted(() => {
  loadNhaXuatBan();
});
</script>