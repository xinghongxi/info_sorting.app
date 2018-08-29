import Vue from 'vue'
import App from '../App'
import Router from 'vue-router'
import home from '@/page/home'
import user from '@/page/user'
import userSet from '@/page/userSet'
import userPassword from '@/page/userPassword'
import account from '@/page/account'
import classSelection from '@/components/classSelection'
import classSelectionManage from '@/page/classSelectionManage'
import classSelectionManageAdd from '@/page/classSelectionManageAdd'
import classSelectionManageStudent from '@/page/classSelectionManageStudent'
import classSelectionManageStudentInfo from '@/page/classSelectionManageStudentInfo'
import classSelectionManageStudentInfoSet from '@/page/classSelectionManageStudentInfoSet'
import classSelectionMovieAcquisition from '@/page/classSelectionMovieAcquisition'
import photoSorting from '@/page/photoSorting'
import photoSortingConfirm from '@/page/photoSortingConfirm'
import classSelectionMoveManage from '@/page/classSelectionMoveManage'
import classSelectionMoveManageUpload from '@/page/classSelectionMoveManageUpload'
import classSelectionStudentOrder from '@/page/classSelectionStudentOrder'
import classSelectionManageInvitingParent from '@/page/classSelectionManageInvitingParent'
import classSelectionManageDealingParen from '@/page/classSelectionManageDealingParen'
import classSelectionManageDealingParenInfo from '@/page/classSelectionManageDealingParenInfo'
import manageSchool from '@/page/manageSchool'
import manageSchoolBasics from '@/page/manageSchoolBasics'
import manageSchoolClass from '@/page/manageSchoolClass'
import manageSchoolTeacher from '@/page/manageSchoolTeacher'
import manageSchoolTeacherAdd from '@/page/manageSchoolTeacherAdd'
import classSelectionManageStudentInfoSetSample from '@/page/classSelectionManageStudentInfoSetSample'
import expandSchool from '@/page/expandSchool'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     if (from.meta.keepAlive) {
  //       from.meta.savedPosition = document.body.scrollTop
  //     }
  //     return { x: 0, y: to.meta.savedPosition || 0 }
  //   }
  // },
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: '/home',
          component: home
        },
        {
          path: '/user',
          component: user,
        },
        {
          path: '/userSet',
          component: userSet,
        },
        {
          path: '/userPassword',
          component: userPassword,
        },
        {
          path: '/account',
          component: account,
        },
        {
          path: '/classSelection',
          component: classSelection,
          meta: {
            title: 'home',
            keepAlive: true
          }
        },
        {
          path: '/classSelectionManage',
          component: classSelectionManage,
        },
        {
          path: '/classSelectionManageAdd',
          component: classSelectionManageAdd,
        },
        {
          path: '/classSelectionManageStudent',
          component: classSelectionManageStudent,
        },
        {
          path: '/classSelectionManageStudentInfo',
          component: classSelectionManageStudentInfo,
        },
        {
          path: '/classSelectionManageStudentInfoSet',
          component: classSelectionManageStudentInfoSet,
        },
        {
          path: '/classSelectionMovieAcquisition',
          component: classSelectionMovieAcquisition,
        },
        {
          path: '/photoSorting',
          component: photoSorting,
        },
        {
          path: '/photoSortingConfirm',
          component: photoSortingConfirm,
        },
        {
          path: '/classSelectionMoveManage',
          component: classSelectionMoveManage,
        },
        {
          path: '/classSelectionMoveManageUpload',
          component: classSelectionMoveManageUpload,
        },
        {
          path: '/classSelectionStudentOrder',
          component: classSelectionStudentOrder,
        },
        {
          path: '/classSelectionManageInvitingParent',
          component: classSelectionManageInvitingParent,
        },
        {
          path: '/classSelectionManageDealingParen',
          component: classSelectionManageDealingParen,
        },
        {
          path: '/classSelectionManageDealingParenInfo',
          component: classSelectionManageDealingParenInfo,
        },
        {
          path: '/manageSchool',
          component: manageSchool,
        },
        {
          path: '/manageSchoolBasics',
          component: manageSchoolBasics,
        },
        {
          path: '/manageSchoolClass',
          component: manageSchoolClass,
        },
        {
          path: '/manageSchoolTeacher',
          component: manageSchoolTeacher,
        },
        {
          path: '/manageSchoolTeacherAdd',
          component: manageSchoolTeacherAdd,
        },
        {
          path: '/classSelectionManageStudentInfoSetSample',
          component: classSelectionManageStudentInfoSetSample,
        },
        {
          path: '/expandSchool',
          component:expandSchool,
        },
      ]
    }
  ]
})
