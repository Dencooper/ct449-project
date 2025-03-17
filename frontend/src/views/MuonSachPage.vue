<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header và công cụ tìm kiếm -->
    <div class="flex-1 p-5">
      <h1 class="text-3xl font-semibold text-gray-900 mb-4 h-16 md:mb-0">Quản Lý Mượn Sách</h1>
      <!-- Bộ lọc -->
      <div class="flex flex-wrap gap-3 justify-between">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Tìm kiếm phiếu..."
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
            @click="openMuonSachModal()"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Đăng ký mượn sách
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
              Tác giả
            </th>
            <th scope="col" class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mã đọc giả
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Họ tên
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              MSNV
            </th>
            <th scope="col" class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày Mượn
            </th>
            <th scope="col" class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày Trả
            </th>
            <th scope="col" class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-300">
          <tr v-if="loading">
            <td colspan="9" class="px-6 py-4 text-center text-sm text-gray-500">
              <div class="flex justify-center">
                <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            </td>
          </tr>
          <tr v-else-if="filteredMuonSach.length === 0">
            <td colspan="9" class="px-6 py-4 text-center text-sm text-gray-500">
              Không tìm thấy phiếu mượn sách nào
            </td>
          </tr>
          <tr v-for="muonSach in filteredMuonSach" :key="muonSach._id" class="hover:bg-gray-50">
            <td class="px-3 py-5 whitespace-nowrap">
              <div class="text-sm text-center font-medium text-gray-900">{{ muonSach.MaSach.MaSach }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ muonSach.MaSach.TenSach }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
              <div class="text-sm text-left font-medium text-gray-900">{{ muonSach.MaSach.TacGia }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
              <div class="text-sm text-center font-medium text-gray-900">{{ muonSach.MaDocGia.MaDocGia }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ muonSach.MaDocGia.HoLot + " " + muonSach.MaDocGia.Ten }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ muonSach.MSNV.MSNV }}</div>
            </td>
             <td class="px-3 py-5 whitespace-nowrap">
                  <div class="text-sm text-center font-medium text-gray-900">{{ formatDate(muonSach.NgayMuon) }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
                  <div class="text-sm text-center font-medium text-gray-900">{{ muonSach.NgayTra ? formatDate(muonSach.NgayTra) : (isOverdue(muonSach.NgayMuon) ? "Quá hạn" :  "Đang mượn")}}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap text-sm font-medium">
              <div class="flex justify-center space-x-2">
                <button
                  :disabled="muonSach.NgayTra"
                  @click="openMuonSachModal(muonSach)"
                  :class="!muonSach.NgayTra ? 'text-blue-600 hover:text-blue-900 focus:outline-none' : 'opacity-50 cursor-not-allowed'"
                  title="Chỉnh sửa"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="confirmDeleteMuonSach(muonSach)"
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

    

    <!-- Modal thêm/sửa phiếu mượn sách -->
    <div v-if="showMuonSachModal" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showMuonSachModal = false"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveMuonSach">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {{ editingMuonSach._id ? 'Trả Sách' : 'Mượn sách' }}
                  </h3>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label for="MaDocGia" class="block text-sm font-medium text-gray-700">Mã đọc giả</label>
                      <input 
                        id="MaDocGia"
                        list="docgia-list"
                        v-model="editingMuonSach.MaDocGia.MaDocGia"
                        required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                        <datalist id="docgia-list">
                          <option v-for="docGia in docGiaList" :key="docGia._id" :value="docGia.MaDocGia"></option>
                        </datalist>
                    </div>
                    <div>
                      <label for="MaSach" class="block text-sm font-medium text-gray-700">Mã Sách</label>
                      <input 
                        id="MaSach"
                        list="sach-list"
                        v-model="editingMuonSach.MaSach.MaSach"
                        required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                        <datalist id="sach-list">
                          <option v-for="sach in sachList" :key="sach._id" :value="sach.MaSach"></option>
                        </datalist>
                    </div>
                    <div v-if="editingMuonSach._id">
                      <label for="NgayMuon" class="block text-sm font-medium text-gray-700">Ngày mượn</label>
                      <input
                        id="NgayMuon"
                        v-model="editingMuonSach.NgayMuon"
                        type="text"
                        :disabled="editingMuonSach._id"
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
                
                {{editingMuonSach._id ? 'Trả' : 'Mượn' }}
              </button>
              <button
                type="button"
                @click="showMuonSachModal = false"
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
                    Bạn có chắc chắn muốn xóa phiếu mượn này? Hành động này không thể hoàn tác.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="deleteMuonSach"
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

import { ref, reactive, computed, onMounted } from 'vue';
import { getAllMuonSach, createMuonSach, returnBook, getAllDocGia, getAllSach, deleteMuonSach as apiDeleteMuonSach } from '../api';
import { useToast } from 'vue-toastification';

// State
const muonSachList = ref([]);
const docGiaList = ref([]);
const sachList = ref([]);

const loading = ref(true);

const toast = useToast();
const searchQuery = ref('');
const showMuonSachModal = ref(false);
const showDeleteModal = ref(false);
const muonSachToDelete = ref(null);
const editingMuonSach = reactive({
  _id: null,
  MaSach: '',
  MaDocGia: '',
  NgayMuon: '',
});

const filteredMuonSach = computed(() => {
  let result = [...muonSachList.value];
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(muonSach => 
      muonSach.MaSach.MaSach.toLowerCase().includes(query) || 
      muonSach.MaSach.TenSach.toLowerCase().includes(query) ||
      muonSach.MaDocGia.MaDocGia.toLowerCase().includes(query) ||
      muonSach.MaDocGia.HoLot.toLowerCase().includes(query) ||
      muonSach.MaDocGia.Ten.toLowerCase().includes(query) ||
      muonSach.TrangThai.toLowerCase().includes(query)
    );
  }
  return result;
});


const loadMuonSach = async () => {
  loading.value = true;
  try {
    const response = await getAllMuonSach();
    muonSachList.value = response.data;
    for (const muonSach of muonSachList.value) {
      muonSach.TrangThai = muonSach.NgayTra ? formatDate(muonSach.NgayTra) : isOverdue(muonSach.NgayMuon) ? "Quá hạn" : "Đang mượn"
    }
  } catch (error) {
    console.error('Lỗi tải phiếu mượn sách: ', error);
  } finally {
    loading.value = false;
  }
};

const loadDocGia = async () => {
  loading.value = true;
  try {
    const response = await getAllDocGia();
    docGiaList.value = response.data;
  } catch (error) {
    console.error('Lỗi tải đọc giả: ', error);
  } finally {
    loading.value = false;
  }
};

const loadSach = async () => {
  loading.value = true;
  try {
    const response = await getAllSach({avaiable: true});
    sachList.value = response.data;
  } catch (error) {
    console.error('Lỗi tải sách: ', error);
  } finally {
    loading.value = false;
  }
};


const openMuonSachModal = (muonSach = null) => {
  if (muonSach) {
    Object.assign(editingMuonSach, {
      _id: muonSach._id,
      MaSach: muonSach.MaSach,
      MaDocGia: muonSach.MaDocGia,
      NgayMuon: formatDate(muonSach.NgayMuon)
    });
    
  } else {
    Object.assign(editingMuonSach, {
      _id: null,
      MaSach: {},
      MaDocGia: {}
    });
  }
  showMuonSachModal.value = true;
};
  

const saveMuonSach = async () => {
  try {
    let response;
    if (editingMuonSach._id) {
      response = await returnBook(editingMuonSach._id);
      if(response){
        toast.success(`Đã trả sách ${editingMuonSach.MaSach.MaSach} của đọc giả ${editingMuonSach.MaDocGia.MaDocGia}  thành công`, {
          position: "top-right",
          timeout: 3000,
          toastClassName: "custom-toast"
        });
      }
    } else {
      response = await createMuonSach(editingMuonSach);
      if(response){
        toast.success(`Đã thêm phiếu mượn sách ${editingMuonSach.MaSach.MaSach} của đọc giả ${editingMuonSach.MaDocGia.MaDocGia}  thành công`, {
          position: "top-right",
          timeout: 3000,
          toastClassName: "custom-toast"
        });
      }
    }
    
    showMuonSachModal.value = false;
    loadMuonSach();
  } catch (error) {
    console.error('Lỗi lưu phiếu mượn sách:', error);
    toast.error('Có lỗi xảy ra khi lưu thông tin phiếu mượn sách. Vui lòng thử lại.', {
      position: "top-right",
      timeout: 3000,
      toastClassName: "custom-toast"
    });
  } 
};

const confirmDeleteMuonSach  = (muonSach) => {
  muonSachToDelete.value = muonSach;
  showDeleteModal.value = true;
};

const deleteMuonSach = async () => {
  try {
    const response = await apiDeleteMuonSach(muonSachToDelete.value._id);
    if(response){
      toast.success('Đã xóa phiếu mượn sách thành công', {
          position: "top-right",
          timeout: 3000,
          toastClassName: "custom-toast"
        });
    }
    showDeleteModal.value = false;
    loadMuonSach();
  } catch (error) {
    console.error('Lỗi xóa đọc giả:', error);
    alert('Có lỗi xảy ra khi xóa đọc giả. Vui lòng thử lại.');
  }
};


const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
      .format(new Date(dateString))
      .replace(/\//g, '-');
};

const isOverdue = (ngayMuon) => {
    return ngayMuon < new Date().getDate - 30;
};

onMounted(() => {
  loadSach();
  loadDocGia();
  loadMuonSach();
});
</script>