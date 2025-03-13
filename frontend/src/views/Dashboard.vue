<template>
  <div class="min-h-screen bg-gray-100">
      <!-- Main content -->
      <main class="flex-1 p-5">
        <h1 class="text-2xl font-semibold text-gray-900 mb-4 h-16 md:mb-0">Dashboard</h1>
        <!-- Thống kê tổng quan -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div class="rounded-full h-12 w-12 flex items-center justify-center bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-gray-600 text-sm font-medium">Tổng đơn hàng</h2>
              <p class="text-2xl font-semibold text-gray-800">{{ stats.totalOrders }}</p>
              <p class="text-sm text-green-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                {{ stats.orderGrowth }}% so với tháng trước
              </p>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div class="rounded-full h-12 w-12 flex items-center justify-center bg-green-100 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-gray-600 text-sm font-medium">Doanh thu</h2>
              <p class="text-2xl font-semibold text-gray-800">{{ formatPrice(stats.totalRevenue) }}</p>
              <p class="text-sm text-green-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                {{ stats.revenueGrowth }}% so với tháng trước
              </p>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div class="rounded-full h-12 w-12 flex items-center justify-center bg-purple-100 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-gray-600 text-sm font-medium">Khách hàng</h2>
              <p class="text-2xl font-semibold text-gray-800">{{ stats.totalCustomers }}</p>
              <p class="text-sm text-green-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                {{ stats.customerGrowth }}% so với tháng trước
              </p>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div class="rounded-full h-12 w-12 flex items-center justify-center bg-red-100 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-gray-600 text-sm font-medium">Sản phẩm</h2>
              <p class="text-2xl font-semibold text-gray-800">{{ stats.totalProducts }}</p>
              <p class="text-sm text-gray-500">{{ stats.lowStockProducts }} sản phẩm sắp hết hàng</p>
            </div>
          </div>
        </div>
        
        <!-- Biểu đồ doanh thu -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-gray-800">Doanh thu theo thời gian</h2>
            <div class="flex space-x-2">
              <button 
                v-for="period in ['7 ngày', '30 ngày', '90 ngày']" 
                :key="period"
                @click="selectedPeriod = period"
                class="px-3 py-1 text-sm rounded-md"
                :class="selectedPeriod === period ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              >
                {{ period }}
              </button>
            </div>
          </div>
          
          <div class="h-80">
            <!-- Giả lập biểu đồ -->
            <div class="w-full h-full flex items-end justify-between">
              <div v-for="(item, index) in chartData" :key="index" class="h-full flex flex-col justify-end items-center">
                <div 
                  class="w-12 bg-blue-500 rounded-t-md transition-all duration-500"
                  :style="{ height: `${item.percentage}%` }"
                ></div>
                <span class="text-xs text-gray-500 mt-2">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Đơn hàng gần đây -->
          <div class="bg-white rounded-lg shadow-md">
            <div class="p-6 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-800">Đơn hàng gần đây</h2>
                <router-link to="/admin/orders" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Xem tất cả
                </router-link>
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mã đơn hàng
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khách hàng
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tổng tiền
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="order in recentOrders" :key="order._id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-blue-600">
                        <router-link :to="`/admin/orders/${order._id}`">
                          #{{ order._id.substring(0, 8) }}
                        </router-link>
                      </div>
                      <div class="text-xs text-gray-500">{{ formatDate(order.createdAt) }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ order.customer.name }}</div>
                      <div class="text-xs text-gray-500">{{ order.customer.email }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="getStatusClass(order.status)"
                      >
                        {{ getStatusText(order.status) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ formatPrice(order.totalAmount) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <!-- Sản phẩm bán chạy -->
          <div class="bg-white rounded-lg shadow-md">
            <div class="p-6 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-800">Sản phẩm bán chạy</h2>
                <router-link to="/admin/products" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Xem tất cả
                </router-link>
              </div>
            </div>
            
            <div class="p-6">
              <ul class="divide-y divide-gray-200">
                <li v-for="product in topProducts" :key="product._id" class="py-4 flex">
                  <div class="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      :src="product.imageUrl || '/placeholder.svg?height=100&width=100'" 
                      :alt="product.name" 
                      class="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div class="ml-4 flex-1">
                    <div class="flex justify-between">
                      <div>
                        <h3 class="text-sm font-medium text-gray-900">{{ product.name }}</h3>
                        <p class="text-sm text-gray-500">{{ product.category }}</p>
                      </div>
                      <p class="text-sm font-medium text-gray-900">{{ formatPrice(product.price) }}</p>
                    </div>
                    <div class="mt-2 flex justify-between">
                      <div class="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                        {{ product.soldCount }} đã bán
                      </div>
                      <div class="text-sm text-gray-500">
                        Còn {{ product.stock }} sản phẩm
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

// Dữ liệu mẫu cho thống kê
const stats = ref({
  totalOrders: 1254,
  orderGrowth: 12.5,
  totalRevenue: 1250000000,
  revenueGrowth: 8.2,
  totalCustomers: 3850,
  customerGrowth: 5.3,
  totalProducts: 428,
  lowStockProducts: 12
});

// Dữ liệu mẫu cho biểu đồ
const selectedPeriod = ref('30 ngày');
const chartData = ref([
  { label: 'T2', percentage: 45 },
  { label: 'T3', percentage: 60 },
  { label: 'T4', percentage: 30 },
  { label: 'T5', percentage: 70 },
  { label: 'T6', percentage: 85 },
  { label: 'T7', percentage: 50 },
  { label: 'CN', percentage: 40 }
]);

// Dữ liệu mẫu cho đơn hàng gần đây
const recentOrders = ref([
  {
    _id: '6123456789abcdef01234567',
    createdAt: '2023-08-15T08:30:00.000Z',
    customer: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com'
    },
    status: 'Delivered',
    totalAmount: 29970000
  },
  {
    _id: '6123456789abcdef01234568',
    createdAt: '2023-08-14T10:15:00.000Z',
    customer: {
      name: 'Trần Thị B',
      email: 'tranthib@example.com'
    },
    status: 'Processing',
    totalAmount: 36020000
  },
  {
    _id: '6123456789abcdef01234569',
    createdAt: '2023-08-13T14:45:00.000Z',
    customer: {
      name: 'Lê Văn C',
      email: 'levanc@example.com'
    },
    status: 'Shipped',
    totalAmount: 7170000
  },
  {
    _id: '6123456789abcdef01234570',
    createdAt: '2023-08-12T09:20:00.000Z',
    customer: {
      name: 'Phạm Thị D',
      email: 'phamthid@example.com'
    },
    status: 'Pending',
    totalAmount: 12020000
  },
  {
    _id: '6123456789abcdef01234571',
    createdAt: '2023-08-11T16:30:00.000Z',
    customer: {
      name: 'Hoàng Văn E',
      email: 'hoangvane@example.com'
    },
    status: 'Cancelled',
    totalAmount: 29300000
  }
]);

// Dữ liệu mẫu cho sản phẩm bán chạy
const topProducts = ref([
  {
    _id: 'prod1',
    name: 'iPhone 13 Pro',
    category: 'Điện thoại',
    price: 28990000,
    soldCount: 152,
    stock: 48,
    imageUrl: '/placeholder.svg?height=100&width=100'
  },
  {
    _id: 'prod3',
    name: 'Laptop Dell XPS 13',
    category: 'Laptop',
    price: 35990000,
    soldCount: 89,
    stock: 23,
    imageUrl: '/placeholder.svg?height=100&width=100'
  },
  {
    _id: 'prod4',
    name: 'AirPods Pro',
    category: 'Phụ kiện',
    price: 5990000,
    soldCount: 215,
    stock: 67,
    imageUrl: '/placeholder.svg?height=100&width=100'
  },
  {
    _id: 'prod6',
    name: 'Apple Watch Series 7',
    category: 'Đồng hồ thông minh',
    price: 11990000,
    soldCount: 78,
    stock: 32,
    imageUrl: '/placeholder.svg?height=100&width=100'
  }
]);

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('vi-VN', options);
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Processing':
      return 'bg-blue-100 text-blue-800';
    case 'Shipped':
      return 'bg-purple-100 text-purple-800';
    case 'Delivered':
      return 'bg-green-100 text-green-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'Pending':
      return 'Chờ xác nhận';
    case 'Processing':
      return 'Đang xử lý';
    case 'Shipped':
      return 'Đang giao hàng';
    case 'Delivered':
      return 'Đã giao hàng';
    case 'Cancelled':
      return 'Đã hủy';
    default:
      return status;
  }
};

onMounted(async () => {
  // Trong thực tế, bạn sẽ gọi API để lấy dữ liệu thống kê
  // await fetchDashboardStats();
});
</script>