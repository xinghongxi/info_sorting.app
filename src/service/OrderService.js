import request from '@/utils/request'

class OrderService{
  async orderList(teacherId,pageNum,pageSize){
      return request({
        url:'/student/list/order/info?teacherId=' + teacherId + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
        method:'get'
      })
  }
}

export default new OrderService();
