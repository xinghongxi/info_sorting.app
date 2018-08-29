import * as types from '../mutation-types'
import classService from '@/service/ClassService';
const classSampleCache = new Map();

const state = {
  classList:[],
  classResult:[],
  classId:'',
  afterSamplePhotos:[],
  untReatedImgs:[],
  samplePhotos:[],
  hasNextPage:true,
  statu:'',
  studentInfo:{}
}
const mutations = {
   [types.LIST_CAPITALDEAL](state, listCapitalDeal) {
    if(listCapitalDeal != null){
       state.classList = listCapitalDeal;
    }
  },
   [types.SAMPLE_PHOTOS](state, samplePhotos) {  //获取样本照片
     state.samplePhotos = samplePhotos;
  },
  [types.UNT_REATED_IMGS](state, untReatedImgs) {  //获取待分拣照片
        state.hasNextPage = !(untReatedImgs.length < 10);
        state.untReatedImgs.push(...untReatedImgs)
  },
   [types.UNT_REATED_IMGS_TO_CHANGE](state,statu) {  //点击确认或叉子 删除本地和store中的照片
     state.untReatedImgs = state.untReatedImgs.slice(1)
     state.statu = statu;
    },
  [types.CLEAR_UNTREATED_IMGS](state) {  //切换班级 清空待分拣照片
    state.untReatedImgs = []
  },
  [types.STUDENT_INFO](state,studentInfo) {  //切换班级 清空待分拣照片
    state.studentInfo = studentInfo
  },
  getClassId(state,classId){
    state.classId = classId;
    window.localStorage.setItem('classId',classId);
  },
  [types.GET_NEW_DATA](state) {
    let untReatedImgs = state.untReatedImgs;
    let samplePhotos = JSON.parse(JSON.stringify(state.samplePhotos))
    if( untReatedImgs.length > 0) {
      let group = untReatedImgs[0].recommandStudents;
      var list = [];
      var pickUpList = []
      group.forEach(function (val, index, arr) {
        list.push(val.student_id)
      });
      var _this = this
      list.unshift(untReatedImgs[0].studentId);  //获取六个概率接近的id
      list = [...new Set(list)]  //去重
      // console.warn(list)
      samplePhotos.forEach(function (val1, index1, arr1) {
        list.forEach(function (val2, index2, arr2) {
          if (val1.id == val2) {
            samplePhotos.splice(index1, 1);  //删掉概率大的
            pickUpList.push(val1)  //抽取到概率大的
          }
        });
      });
      state.afterSamplePhotos = [...pickUpList,...samplePhotos];  //[概率大的，概率小的]
    }else{
      state.afterSamplePhotos = samplePhotos
    }
      // console.error('样本',state.afterSamplePhotos)
      // console.error('待分拣',state.untReatedImgs)
  },
  [types.CLASS_RESULT](state,studentResult) {  //切换班级 清空待分拣照片
    state.classResult = studentResult
  }
}

const actions = {
  async getClassInfo ({ state, commit },schoolId) {
    let result =  await classService.classList(schoolId)
    let listCapitalDeal = await result.data.result.result;
    await commit(types.LIST_CAPITALDEAL, listCapitalDeal)
  },
  async samplePhoto ({ state, commit },params) {
    let {schoolId,classId} = params;
    let result = await readClassSamples(schoolId,classId)
    await commit(types.SAMPLE_PHOTOS, result)
  },
  async untReatedImg ({ state, commit },params) {
    let {schoolId,classId,staffId} = params;
    let result =  await classService.untReatedImg(schoolId,classId,staffId)
    let untReatedImgs = await result.data.result.rows;
    await commit(types.UNT_REATED_IMGS, untReatedImgs)
  },
  async confirmImg ({ state, commit },params) {
    let {studentFeedId,staffId,studentId} = params;
    let result =  await classService.confirmImg(studentFeedId,staffId,studentId)
    let statu = await result.data.statu;
    if(statu){
      await commit(types.UNT_REATED_IMGS_TO_CHANGE,statu)
    }
  },
  async passtodoImg ({ state, commit },studentFeedId) {
    let result = await classService.passtodoImg(studentFeedId)
    let statu = await result.data.statu;
    if(statu){
      await commit(types.UNT_REATED_IMGS_TO_CHANGE,statu)
    }
  },
  async getClassList ({ state, commit },classId) {
    let result = await classService.getClassList(classId)
    let studentResult = result.data.result;
    await commit(types.CLASS_RESULT, studentResult)
  },
  async getStudentInfo ({ state, commit },studentId) {
    let result = await classService.getStudentInfo(studentId)
    let studentInfo = result.data.result;
    commit(types.STUDENT_INFO, studentInfo)
  },
  // async judge({ state, commit },params) {
  //   let {studentId,classId,flag} = params
  //   let result = await classService.judge(studentId,classId,flag)
  //   let studentInfo = result.data.result;
  //   console.error(result.data)
  // },
}

async function readClassSamples(schoolId,classId){  //样本
  var rows = null;
  if (classSampleCache.has(classId)) {
    let cacheRows  = classSampleCache.get(classId);
    rows = [...cacheRows];
    // console.log('学生样本，本次是从缓存里读取的 ',rows);
  } else {
    // console.log('从远程去读取样本 ' , classId);
    let resp = await classService.samplePhoto(schoolId,classId)
    rows = resp.data.result.rows;
    if (rows.length > 0) {
      let cacheRows = [...rows];
      classSampleCache.set(classId,cacheRows);
    }
  }
  return [...rows]
}
export default {
  state,
  mutations,
  actions,
}
