export default {
  userNo: "",
  fdPosterId:"",
  loading:false,
  setMess:function(newData) {
    this.userNo = newData
  },
  setLoad:function(newData) {
    this.loading = newData
  },
  fdPosterId:function(newData) {
    this.fdPosterId = newData
  }
}

