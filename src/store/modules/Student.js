import * as types from '../mutation-types'
import studentService from '@/service/StudentService'

const state = {
  studentList:[]
}

const mutations = {
  [types.STUDENT_LIST](state, studentList) {
    state.studentList = studentList
  }
}

const actions = {
  async getStudentList({ state, commit },params) {
    let {classId,schoolId} = params;
    let result =  await studentService.studentInfo(classId,schoolId);
    let studentList = result.data.result.result;
    commit(types.STUDENT_LIST, studentList)
  },
}

export default {
  state,
  mutations,
  actions
}
