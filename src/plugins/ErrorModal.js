class ErrorModal {}
ErrorModal.install = function (Vue) {
    this.ErrorEvent = new Vue();
    Vue.showErrorModal = function (error) {
        var data = error.detail || error.non_field_errors || JSON.stringify(error);
        var params = {
            data: data,
            opts: {
                title: 'Ошибка',
                size: 'md',
                buttonSize: 'md',
                okVariant: 'primary',
                centered: true
            }
        }
        ErrorModal.ErrorEvent.$emit('show', params);
    }
    Vue.prototype.$showErrorModal = function (error) {
        var data = error.detail || error.non_field_errors || JSON.stringify(error);
        var params = {
            data: data,
            opts: {
                title: 'Ошибка',
                size: 'md',
                buttonSize: 'md',
                okVariant: 'primary',
                centered: true
            }
        }
        ErrorModal.ErrorEvent.$emit('show', params);
    }
}
export default ErrorModal;