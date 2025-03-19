<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex-1 p-5">
      <h1 class="text-3xl font-semibold text-gray-900 mb-4 h-16 md:mb-0">Quản Lý Đọc Giả</h1>
      <div class="flex flex-wrap gap-3 justify-between">
          <div class="relative">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Tìm kiếm đọc giả..."
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
            @click="openDocGiaModal()"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Thêm đọc giả
          </button>
        </div>
    </div>

    <!-- Bảng đọc giả -->
    <div class="overflow-x-auto px-5 ">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-200">
          <tr>
            <th scope="col" class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mã đọc giả
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Họ và lót
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tên
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày sinh
            </th>
            <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phái
            </th>
            <th scope="col" class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Địa chỉ
            </th>
            <th scope="col" class="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Điện thoại
            </th>
            <th scope="col" class="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-300">
          <tr v-if="loading">
            <td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500">
              <div class="flex justify-center">
                <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            </td>
          </tr>
          <tr v-else-if="filteredDocGia.length === 0">
            <td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500">
              Không tìm thấy đọc giả nào
            </td>
          </tr>
          <tr v-for="docGia in filteredDocGia" :key="docGia._id" class="hover:bg-gray-50">
            <td class="px-3 py-5 whitespace-nowrap">
              <div class="text-sm text-center font-medium text-gray-900">{{ docGia.MaDocGia }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ docGia.HoLot}}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ docGia.Ten }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
                <div class="text-sm text-left font-medium text-gray-900">{{ formatDate(docGia.NgaySinh) }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
                <div class="text-sm text-left font-medium text-gray-900">{{ docGia.Phai }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
                <div class="text-sm text-left font-medium text-gray-900">{{ docGia.DiaChi }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap">
                  <div class="text-sm text-center font-medium text-gray-900">{{ docGia.DienThoai }}</div>
            </td>
            <td class="px-3 py-5 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex justify-end space-x-2">
                <button
                  @click="openDocGiaModal(docGia)"
                  class="text-blue-600 hover:text-blue-900 focus:outline-none"
                  title="Chỉnh sửa"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="confirmDeleteDocGia(docGia)"
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

    

    <!-- Modal thêm/sửa đọc giả -->
    <div v-if="showDocGiaModal" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showDocGiaModal = false"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveDocGia">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {{ editingDocGia._id ? 'Chỉnh sửa đọc giả' : 'Thêm đọc giả' }}
                  </h3>
                  <div class="mt-4 space-y-4">
                    <div>
                      <label for="MaDocGia" class="block text-sm font-medium text-gray-700">Mã đọc giả</label>
                      <input
                        type="text"
                        id="MaDocGia"
                        v-model="editingDocGia.MaDocGia"
                        required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label for="HoLot" class="block text-sm font-medium text-gray-700">Họ và lót</label>
                      <input
                        id="HoLot"
                        v-model="editingDocGia.HoLot"
                        type="text"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></input>
                    </div>
                    <div>
                      <label for="Ten" class="block text-sm font-medium text-gray-700">Tên</label>
                      <input
                        id="Ten"
                        v-model="editingDocGia.Ten"
                        type="text"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></input>
                    </div>
                    <div>
                      <label for="NgaySinh" class="block text-sm font-medium text-gray-700">Ngày sinh</label>
                      <input
                        id="NgaySinh"
                        v-model="editingDocGia.NgaySinh"
                        type="text"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="dd-mm-yyyy"
                        @input="validateDate"
                      ></input>
                      <p v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
                    </div>
                    <div>
                      <label for="Phai" class="block text-sm font-medium text-gray-700">Phái</label>
                      <input
                        id="Phai"
                        v-model="editingDocGia.Phai"
                        type="text"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></input>
                    </div>
                    <div>
                      <label for="DiaChi" class="block text-sm font-medium text-gray-700">Địa chỉ</label>
                      <input
                        id="DiaChi"
                        v-model="editingDocGia.DiaChi"
                        type="text"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></input>
                    </div>
                    <div>
                      <label for="DienThoai" class="block text-sm font-medium text-gray-700">Điện thoại</label>
                      <input
                        id="DienThoai"
                        v-model="editingDocGia.DienThoai"
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
                
                {{editingDocGia._id ? 'Cập nhật' : 'Thêm mới' }}
              </button>
              <button
                type="button"
                @click="showDocGiaModal = false"
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
                    Bạn có chắc chắn muốn xóa nhà xuất bản <span class="font-semibold">{{ docGiaToDelete?.MaDocGia }}</span>? Hành động này không thể hoàn tác.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="deleteDocGia"
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

import { ref, reactive, computed, onMounted, } from 'vue';
import { getAllDocGia, createDocGia, updateDocGia, deleteDocGia as apiDeleteDocGia } from '../api';
import { useToast } from 'vue-toastification';

const docGiaList = ref([]);
const loading = ref(true);
const toast = useToast();
const errorMessage = ref('');
const searchQuery = ref('');
const showDocGiaModal = ref(false);
const showDeleteModal = ref(false);
const docGiaToDelete = ref(null);
const editingDocGia = reactive({
  _id: null,
  MaDocGia: '',
  HoLot: '',
  Ten: '',
  NgaySinh: '',
  Phai: '',
  DiaChi: '',
  DienThoai: ''
});

const filteredDocGia = computed(() => {
  let result = [...docGiaList.value];
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(docGia => 
      docGia.HoLot.toLowerCase().includes(query) ||
      docGia.Ten.toLowerCase().includes(query) ||
      docGia.DienThoai.toLowerCase().includes(query)
    );
  }
  return result;
});


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

const openDocGiaModal = (docGia = null) => {
  if (docGia) {
    Object.assign(editingDocGia, {
      _id: docGia._id,
      MaDocGia: docGia.MaDocGia,
      HoLot: docGia.HoLot,
      Ten: docGia.Ten,
      NgaySinh: formatDate(docGia.NgaySinh),
      Phai: docGia.Phai,
      DiaChi: docGia.DiaChi,
      DienThoai: docGia.DienThoai
    });
    
  } else {
    Object.assign(editingDocGia, {
      _id: null,
      MaDocGia: '',
      HoLot: '',
      Ten: '',
      NgaySinh: '',
      Phai: '',
      DiaChi: '',
      DienThoai: ''
    });
  }
  showDocGiaModal.value = true;
};
  

const saveDocGia = async () => {
  try {
    let response;
    if (editingDocGia._id) {
      response = await updateDocGia(editingDocGia._id, editingDocGia);
      if(response){
        toast.success(`Cập nhật thông tin đọc giả ${editingDocGia.MaDocGia} thành công`, {
            position: "top-right",
            timeout: 3000,
            toastClassName: "custom-toast"
        });
      }
    } else {
      response = await createDocGia(editingDocGia);
      if(response){
        toast.success('Thêm đọc giả mới thành công', {
            position: "top-right",
            timeout: 3000,
            toastClassName: "custom-toast"
        });
      }
    }
    
    showDocGiaModal.value = false;
    loadDocGia();
  } catch (error) {
    console.error('Lỗi lưu đọc giả:', error);
    alert('Có lỗi xảy ra khi lưu thông tin đọc giả. Vui lòng thử lại.');
  } 
};

const confirmDeleteDocGia  = (docGia) => {
  docGiaToDelete.value = docGia;
  showDeleteModal.value = true;
};

const deleteDocGia = async () => {
  try {
    await apiDeleteDocGia(docGiaToDelete.value._id);
    toast.success(`Xóa đọc giả ${docGiaToDelete.value.MaDocGia} thành công`, {
        position: "top-right",
        timeout: 3000,
        toastClassName: "custom-toast"
      });
    showDeleteModal.value = false;
    loadDocGia();
  } catch (error) {
    console.error('Lỗi xóa đọc giả:', error);
    alert('Có lỗi xảy ra khi xóa đọc giả. Vui lòng thử lại.');
  }
};

const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
      .format(new Date(dateString))
      .replace(/\//g, '-'); ;
};
const validateDate = () => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\-(0[1-9]|1[0-2])\-\d{4}$/;
  if (editingDocGia.NgaySinh && !regex.test(editingDocGia.NgaySinh)) {
    errorMessage.value = 'Ngày sinh không đúng định dạng dd-mm-yyyy';
  } else {
    errorMessage.value = '';
  }
}
onMounted(() => {
  loadDocGia();
});
</script>