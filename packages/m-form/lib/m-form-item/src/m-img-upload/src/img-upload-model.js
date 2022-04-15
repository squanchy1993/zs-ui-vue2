
export default class ImgUploadModel {
  constructor({
    upload_progress = 0,
    upload_state = 'uploading', // uploading, success, fail
    tips = '上传中!',
    src = null,
    localPath = null,
    otherData = null,
    file = null
  }) {
    this.id = this._generateUUID()
    this.upload_progress = upload_progress
    this.upload_state = upload_state
    this.tips = tips
    this.src = src
    this.localPath = localPath
    this.otherData = otherData
    this.file = file
  }

  _generateUUID() {
    var d = new Date().getTime()
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now() // use high-precision timer if available
    }
    var uuid = 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
  }
}
